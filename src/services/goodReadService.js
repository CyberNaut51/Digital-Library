const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:goodreadsService');

const parser = xml2js.Parser({ explicitArray: false });
function goodreadsService() {
  function getBookById(id) {
    return new Promise((resolve, reject) => {
      axios.get(`https://www.goodreads.com/book/show/${id}.xml?key=DfCebivYEX013ToRUIqppA`)
        .then((responce) => {
          parser.parseString(responce.data, (err, result) => {
            if (err) debug(err);
            else {
              debug(result.GoodreadsResponse.book.authors.author[0].name);
              resolve(result.GoodreadsResponse.book);
            }
          });
        })
        .catch((err) => {
          reject(err);
          debug(err);
        });
      // resolve({ description: 'our description' });
    });
  }
  return { getBookById };
}

module.exports = goodreadsService();
