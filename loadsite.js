var mongoscrape = require('./controllers/mongoscrape.js') ;

var domain='http://www.entrepreneur.com' ; 
var siteUrl='http://www.entrepreneur.com/topic/sales/' ; 
var available = true ; 
var last_scraped = Date.now() ; 
var last_scraped_status = true ; 


/* --- save new Site -------------------------------------------------------------------------------- */
   mongoscrape.recSiteData(domain,siteUrl,available,last_scraped,last_scraped_status,function(result) {
       console.log(Date.now() + ' mongoscrape.loadSite result es: ' + result) ;
       process.exit() ; 
      });
/* --- end save new Site ---------------------------------------------------------------------------- */
