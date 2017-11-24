const fs = require('fs-extra');
const cheerio = require('cheerio');

let $ = cheerio.load(fs.readFileSync('./sites/jumia.html'));

module.exports = function() {
  $('.sku, .-gallery').each((i, element) => {
    let productLink = $(element).find('a').attr('href');
    let productTitle = $(element).find('.name').text();
    let productPrice = '₦' + $(element).find('.price').first().find('span').last().text();
    let productImgLink = $(element).find('img').attr('data-src');

    console.log(productTitle);
    console.log(productPrice);
    console.log(productLink);
    console.log(productImgLink);
  });
};
