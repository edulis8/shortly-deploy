var db = require('../config');
var crypto = require('crypto');

var mongoose = require('mongoose')

// alternatively, var Schema = mongoose.Schema
// and use new Schema
var urlsSchema = mongoose.Schema ({
    url: String,
    base_url: String,
    code: String,
    title: String,
    visits: Number
  });


var Link = mongoose.model('Link', urlsSchema);


var createSha = function(url){
  var shasum = crypto.createHash('sha1');
  shasum.update(url);
  return shasum.digest('hex').slice(0, 5);
};
  
urlsSchema.pre('save', function(next){
  var code = createSha(this.url);
  this.code = code;
  next();
});

// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function(){
//     this.on('creating', function(model, attrs, options){
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });

module.exports = Link;
