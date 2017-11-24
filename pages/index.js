import React from 'react'
import Head from 'next/head'
import 'isomorphic-fetch'

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
  Input,
  InputGroup,
  InputGroupButton,
} from 'reactstrap';

const Loading = (props) => {
  const loadingStyle = {
    left: '0px',
    top: '0px',
    width: '100%',
    height: '100%',
    zIndex: '9999',
    background: 'url(/static/img/Preloader_3.gif) center no-repeat #fff'
  }

  return (
    <Row style={{height: '100px'}}>
      <div style={loadingStyle}></div>
    </Row>
  )
}

export default class Home extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      query: '',
      products: [],
      count: 0,
      loading: false
    }
  }

  async doSearch(e) {
    console.log(`Searching for ${this.state.query}`);
    //console.log(this.props);
    if (this.state.query) {
      this.setState({loading: true})
      let res = await fetch(`/products/${this.state.query}`)
      let products = await res.json()
      this.setState({
        products: products.items,
        count: products.count,
        query: products.query,
        loading: false,
      })
    } else {
      this.setState({
        products: [],
        count: 0,
        query: '',
        loading: false
      })
    }
  }

  updateInputValue(evt){
    //console.log("input field updated with "+evt.target.value);
    this.state={query: evt.target.value};
  }

  render() {
    return (
      <div>
        <Head>
          <meta charSet="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>

          <link rel="stylesheet" href="/static/css/font-awesome/css/font-awesome.min.css" />
          <link rel="stylesheet" href="/static/css/bootstrap.min.css"/>
          <title>
            Price Comparison Demo
          </title>
        </Head>
        <Container>
          <br />
          <br />
          <Row>
              <Col md="4" >
                <InputGroup>
                  <InputGroupButton>
                    <Button color="primary" onClick={e => this.doSearch(e)}><i className="fa fa-search"></i> Search</Button>
                  </InputGroupButton>
                  <Input type="text" id="query" onChange={evt => this.updateInputValue(evt)} placeholder="Enter query e.g Techno Spark"/>
                </InputGroup>
              </Col>
          </Row>
          <br/>
          <Row>
            <Col md="12">
              <Card>
                <CardBody>
                  <Row>
                    <Col sm="12">
                      <CardTitle className="mb-0">Results {(this.state.query) &&  `for ${this.state.query}`}</CardTitle>
                      <div className="small text-muted">{this.state.count} item(s)</div>
                    </Col>
                  </Row>
                  <hr/>
                  {(this.state.loading) ? <Loading /> :
                  <Row>
                    {this.state.products.map((product, index) => (
                      <Col xs="12" sm="6" md="3" key={index} style={{paddingTop: '15px', paddingBottom: '15px'}}>
                        <Card className="border-primary">
                          <CardBody>
                            <Row>
                              <Col>
                                <div>
                                  <a href={product.link}>
                                    <img src={product.imgLink} style={{maxWidth: '100%'}}/>
                                  </a>
                                </div>
                                <Row>
                                  <Col>
                                    <div className="text-muted">{product.price}</div>
                                  </Col>
                                  <Col md="4">
                                    <div className="text-success">{product.source}</div>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                            <hr/>
                            <Row>
                              <Col>
                                <CardTitle className="mb-0"><a href={product.link}>{product.title}</a></CardTitle>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                    ))}
                  </Row>}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
