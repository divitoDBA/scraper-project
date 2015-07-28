var mongoose = require('mongoose');
var models = require('../models/models.js')(mongoose) ;

/* connection to mongoDB */
 mongoose.connect("mongodb://localhost:27017/scraper-dev");

/* Function: 
 *
 * Description: insert new article data 
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
                  pubDate: v_DATE 
                                      });

      recArticle.save(function(err) {
               if(err) {
                          /* console.log('ARTICLE err.code: ' + err.code); */
                          switch(err.code) {
                                case 11000: //console.log(Date.now() + ' recArticle duplicado') ;
                                            break ;
                                default:
                                         console.log(Date.now() + ' recArticle NOT_OK');
                                         console.log(err) ;
                                         Result('recArticle NOT_OK');
                                           }
                        }
               else { console.log(Date.now() + ' recArticle OK') }  ;
                      Result('recArticle OK') ;
                   }) ;
}

/* ---- end --- */

/* Function: 
 *
 * Description: insert new site
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
                          console.log('SITE err.code: ' + err.code);
                          switch(err.code) {
                                case 11000: console.log(Date.now() + ' recSite duplicated') ;
                                            break ;
                                default:
                                         console.log('recSite NOT_OK');
                                         console.log(err) ;
                                         Result('recSite NOT_OK');
                                           }
                       }
               else { console.log(Date.now() + ' recSite OK') }
                      Result('recSite OK');
                   }) ;
}

/* --- end  ---------- */
