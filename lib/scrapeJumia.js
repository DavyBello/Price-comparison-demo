const request = require('request');
const cheerio = require('cheerio');

module.exports = function(query, callback) {
  let products = [];
  return new Promise(function(resolve, reject) {
    let url = 'https://www.jumia.com.ng/catalog/?q=' + query;
    request(url, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        let $ = cheerio.load(body);
        $('.sku, .-gallery').each((i, element) => {
          let productLink = $(element).find('a').attr('href');
          let productTitle = $(element).find('.name').text();
          let productPrice = '₦' + $(element).find('.price').first().find('span').last().text();
          let productImgLink = $(element).find('img').attr('data-src');

          products[i] = {
            title: productTitle,
            price: productPrice,
            link: productLink,
            imgLink: productImgLink,
            source: 'Jumia'
          }
        });
        //callback({}, products);
        resolve(products);
      }
    });
  });
};
