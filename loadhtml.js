var async = require('async');
var request = require('request');
var cheerio = require('cheerio');

var mongoscrape = require('./controllers/mongoscrape.js') ;

// url = 'http://www.entrepreneur.com/article/248596' ;
url = 'http://www.entrepreneur.com/article/248762' ;


    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html, {normalizeWhitespace: true});
            
            var linea = 0 ;
            $('.bodycopy').filter(function(){
                var data = $(this);
                article_text = data.text();
                article_html = data.html();

                console.log('article_text: ' + article_text + '\n'); 
                console.log('article_html: ' + article_html + '\n'); 

                linea++ ;
                })

        }
       console.log('article text scraper end') ;
    }) ; 



    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html, {normalizeWhitespace: true});
            
            var linea = 0 ;
            $('.article-tags').filter(function(){
                var data = $(this);
                text = data.text();

                console.log('tags: ' + text + '\n') ; 
                linea++ ;
                })
        }
       console.log('article tags scraper end') ;
    }) ; 

