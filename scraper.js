var request = require('request');
var cheerio = require('cheerio');

var mongoscrape = require('./controllers/mongoscrape.js') ;

url = 'http://www.entrepreneur.com/topic/sales' ;

    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            
            $('.block').filter(function(){
                var data = $(this);
                title = data.text();
                ptag = data.children().first().text();
                title = data.find('h3').text();
                head = data.find($('.deck')).text();
                author = data.find($('.byline')).text();
                pubdate = data.find($('time')).text();
                vURL = data.find($('h3').find('a'));
                articleUrl = vURL.toString().split('=')[1].split('"')[1] ; 
 
   /* --- save ARTICLE data ---------------------------------------------------------------------------- */
    mongoscrape.recArticleData(articleUrl,ptag,title,head,author,pubdate,function(result) {
                            console.log(Date.now() + ' mongoscrape.recArticleData rc: ' + result) ;
                                });
   /* --- end save ARTICLE data  ----------------------------------------------------------------------- */
 
                })

        }
       console.log('scraper end') ;
    })
