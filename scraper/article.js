var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var mongoose = require('mongoose');

var mongoscrape = require('../controllers/mongoscrape.js') ;

exports.scrapArticles = function(v_URL,Result) 
{

/* Functionality: 
 *
 * .- Request HTML page
 * .- Retrieve from main page:
 *            Article title 
 *            Primary tag
 *            Article head
 *            Article autor
 *            Article publication date
 *            Article URL
 *
 * .- Insert scraped information into ARTICLES collection
 * .- Insert reference for article artifacts (text, html, tags) in DATA collection
 *
 */

console.log(Date.now() + ' [scraper.js][BEGIN]: ' + v_URL) ; 
request(v_URL, function(error, response, html,callback)
     {
        if(!error){
            var $ = cheerio.load(html, {normalizeWhitespace: true});
            
            $('.block').filter(function()
               {
                var data = $(this);
                ptag = data.children().first().text();
                title = data.find('h3').text();
                head = data.find($('.deck')).text();
                author = data.find($('.byline')).text();
                pubdate = data.find($('time')).text();
                vURL = data.find($('h3').find('a'));
                articleUrl = vURL.toString().split('=')[1].split('"')[1] ; 

                mongoscrape.recArticleData(articleUrl,ptag,title,head,author,pubdate) ;                           
                })
                  }
        console.log(Date.now() + ' [scraper.js][END] ' + v_URL) ;
        Result(null,'[SCRAPER OK] ' + v_URL) ; 
    })
}

