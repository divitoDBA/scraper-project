var mongoose = require('mongoose');
var models = require('../models/models.js')(mongoose) ;

/* Function: 
 *
 * Description: insert new article metadata and relevant info from main page
 *
 */

exports.recArticleData = function (v_URL,v_pTAG,v_TITLE,v_HEAD,v_AUTHOR,v_DATE,Result) {
      var recArticle = new models.articles({
                           article_url : v_URL ,
                           available : true  ,
                           last_scraped: Date.now() ,
                           last_scraped_status: true ,
                           html: null ,
                           primary_tag: v_pTAG ,
                           title: v_TITLE ,
                           head: v_HEAD ,
                           author: v_AUTHOR ,
                           pubDate: v_DATE }); 

      recArticle.save(function(err,article) {
               if(err) {
                          switch(err.code) {
                                case 11000: //expected duplicated document ;
                                            break ;
                                default:
                                         console.log(Date.now() + ' recArticle NOT_OK');
                                         console.log(err) ;
                                         Result('recArticle NOT_OK');
                                           }
                       }
               else { console.log(Date.now() + ' ' + ' ' + v_URL + ' recArticle OK')   ;
                      Result(article.id) ; }
                    }) ;
}

/* ---- end --- */

/* Function: 
 *
 * Description: insert new domain + site
 *
*/

 exports.recSiteData = function (v_DOMAIN,v_URL,v_AVAIL,v_LS,v_LSS,Result){
      var recSite   = new models.sites({
                          domain: v_DOMAIN ,
                          site_url: v_URL ,
                          available: v_AVAIL ,
                          last_scraped: v_LS ,
                          last_scraped_status: v_LSS  });

      recSite.save(function(err) {
               if(err) {
                          switch(err.code) {
                                case 11000: // expected duplicated document
                                            break ;
                                default:
                                         console.log('recSite NOT_OK');
                                         console.log(err) ;
                                         Result('recSite NOT_OK');
                                           }
                       }
               else { Result('recSite OK'); } 

                                 }) ;
}

/* --- end  ---------- */

/* Function:
 *  
 * Description: insert new data for each scraped article
 *    
 *    
 */

 exports.recData = function (v_URL,Result){
      var recData   = new models.data({
                           article_url: v_URL ,
                           article_text: null ,
                           article_html: null ,
                           article_tags: null }) ; 

      recData.save(function(err) {
               if(err) {
                         switch(err.code) {
                         case 11000: // expected duplicated document
                                     break ;
                            default:
                                       console.log('recData NOT_OK');
                                       console.log(err) ;
                                       Result('recData NOT_OK');
                                           }
                       }
               else { Result('recData OK'); } 

                                 }) ;
}

/* --- end  ---------- */

/* Function:
 *
 * Description: log every collector.js run 
 *
*/

 exports.logRun = function (v_site,v_url,v_status,v_date,Result){
      var recRun   = new models.runlog({
                         domain: v_site ,
                         site_url: v_url ,
                         run_status: v_status ,
                         run_date: v_date }) ;

      recRun.save(function(err) {
               if(err) {
                          console.log('logRun err.code: ' + err.code);
                          switch(err.code) {
                          case 11000: // expected duplicated document
                                       break ;
                             default:
                                       console.log('recRun NOT_OK');
                                       console.log(err) ;
                                       Result('recRun NOT_OK');
                                           }
                       }
               else { Result('recRun OK'); }

                               }) ;
}


