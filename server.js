const express = require('express')
const next = require('next')
const app = next({dev: process.env.NODE_ENV !== 'production'})
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000

const scrapeJumia = require('./lib/scrapeJumia');
const scrapeKonga = require('./lib/scrapeKonga');

app.prepare().then(() => {
  const server = express();

  server.get('/products/:query', async (req, res) => {
    let query = req.params.query;
    let items = [];

    let kongaProducts = await scrapeKonga(query);
    console.log('konga fetched');
    kongaProducts.forEach((result)=>{
      items.push(result);
    })

    let jumiaProducts = await scrapeJumia(query);
    console.log('jumia fetched');
    jumiaProducts.forEach((result)=>{
      items.push(result);
    })

    let response = {
      title: 'allProducts',
      items: items,
      count: items.length,
      query: query,
    }
    res.json(response);
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
