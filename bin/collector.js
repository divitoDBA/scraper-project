
var config = require('../config/config.js'); 

var mongoose = require('mongoose');
var mongoscrape = require('../controllers/mongoscrape.js') ;

var scraper = require('../scraper/article.js') ; 

mongoose.connect("mongodb://localhost:27017/scraper-dev", function(err)
 { 
    if (err) {
           console.log('error during db connection') ;
           console.log(err);
           process.exit(10) ;
             }
    else {
           var domain = config.domain ; 
           var sites  = config.sites ; 

           sites.forEach(function(site) 
             {
               console.log(Date.now() + ' processing ' + site) ;
               scraper.scrapArticles(site,function(err,status) 
                 {
                    if (err) { console.log(Date.now() + ' [collector.js][scraper.js]' + site + 'ended NOT_OK'); 
                               console.log(err) ; 
                             }
                    else { 
                               console.log (Date.now() + ' ' + status); 
                               console.log (Date.now() + ' [collector.js] logging run for ' + site); 
                               mongoscrape.logRun(domain,site,true,Date.now()) ; 
                               console.log (Date.now() + ' [collector.js][scraper.js] ' + site + ' ended OK');
                         }
                 }); 

             }); 
       }
 });

