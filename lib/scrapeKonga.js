const request = require('request');
const cheerio = require('cheerio');

module.exports = function(query, callback) {
  let products = [];
  return new Promise(function(resolve, reject) {
    let url = 'https://www.konga.com/catalogsearch/result/?q=' + query;
    request(url, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        let $ = cheerio.load(body);
        let productPrice;
        $('.product-block').each((i, element) => {
          let productLink = $(element).find('a.product-block-link').attr('href');
          let productTitle = $(element).find('a').find('span').last().text();
          let specialPrice = $(element).find('.special-price').text();
          if (specialPrice) {
            productPrice = specialPrice;
          } else
            productPrice = $(element).find('.original-price').text();
          let productImgLink = $(element).find('img').attr('src');

          products[i] = {
            title: productTitle,
            price: productPrice,
            link: productLink,
            imgLink: productImgLink,
            source: 'Konga'
          }
        });
        //callback({}, products);
        resolve(products);
      }
    });
  });
};
