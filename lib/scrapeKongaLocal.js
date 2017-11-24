const fs = require('fs-extra');
const cheerio = require('cheerio');

let $ = cheerio.load(fs.readFileSync("./sites/konga.html"));

module.exports = function() {
  let productPrice;
  $('.product-block').each((i, element) => {
    let productLink = 'https://www.konga.com' + $(element).find('a.product-block-link').attr('href');
    let productTitle = $(element).find('a').find('span').last().text();
    let specialPrice = $(element).find('.special-price').text();
    if (specialPrice){
      productPrice = specialPrice;
    } else
      productPrice = $(element).find('.original-price').text();
    let productImgLink = $(element).find('img').attr('src');

    console.log(productTitle);
    console.log(productPrice);
    console.log(productLink);
    console.log(productImgLink);
  });
};
