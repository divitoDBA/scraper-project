module.exports = function(mongoose) {

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var siteSchema = new Schema({
    domain: { type: String, required: true, index: {unique: true } },
    site_url   : { type: String, required: true, index: {unique: true } },
    available : Boolean,
    last_scraped  : Date,
    last_scraped_status   : Boolean
});

var articleSchema = mongoose.Schema({
  article_url: { type: String, required: true, index: {unique: true } },
  available: Boolean,
  last_scraped : Date,
  last_scraped_status : Boolean,
  primary_tag: String,
  title: String,
  head : String,
  author : String,
  pubDate: Date
});

var dataSchema = mongoose.Schema({
  article_url: [{type: mongoose.Schema.Types.ObjectId, ref: 'articles'}],
  article_text: String,
  article_html: String,
  article_tags: String 
}) ; 

var runLogSchema = mongoose.Schema({
  domain:       { type: String, required: true, index: true },
  site_url:     { type: String, required: true, index: true },
  run_status:   Boolean,
  run_date:     Date 
}) ; 


var models = {
      sites : mongoose.model('sites', siteSchema),
      articles : mongoose.model('articles', articleSchema),
      data : mongoose.model('data', dataSchema),
      runlog : mongoose.model('runlog', runLogSchema),
    };
    return models;
}

