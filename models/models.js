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
  html: String,
  primary_tag: String,
  title: String,
  head : String,
  author : String,
  pubDate: Date
});

var models = {
      sites : mongoose.model('sites', siteSchema),
      articles : mongoose.model('articles', articleSchema),
    };
    return models;
}

