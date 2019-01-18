const axios = require('axios');
const xml2js = require('xml2js');
const parser = xml2js.Parser({explicitArray: false});

axios.get('https://www.goodreads.com/book/show/50.xml?key=DfCebivYEX013ToRUIqppA')
    .then((responce)=>{
        parser.parseString(responce.data,(err,res)=>{
            if(err) console.log(err);
            else console.log(res.GoodreadsResponse.book.description);
        });
        //console.log(responce.data);
    })
    .catch((err) => {
    console.log(err)
});