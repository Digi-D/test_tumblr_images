var express = require("express");
var request = require("request");
var hbs = require("hbs");

var app = express();
app.set('port', (process.env.PORT || 5000));

app.use(express.static('public'));
app.use(express.static('bower_components'));

app.set('view engine', 'html');
app.engine('html', require('hbs').__express);



function GetPhotoURLs(url,res){

  var photo_urls=new Array();

  request({
      url: url,
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200)
      {
          //clean and parse JSONp response from tumblr API
          var blog_stream= body.substring(22,body.length-2);
          blog_stream=JSON.parse(blog_stream);

          for(var i=0;i<blog_stream.posts.length;i++)
          {
            photo_urls[i]=blog_stream['posts'][i]['photo-url-500'];
            //console.log(photo_urls[i]+"\n");
          }

          res.json(photo_urls);

          console.log("urls sent");
      }
      else
      {
          photo_urls[0]='none';
          res.json(photo_urls);
          console.log("nope!");
      }
  });
}


app.get('/', function(request, response) {
    response.render('tumblr_test', { title: 'grab Nf0 from tumblr blog', layout: 'tumblr_test_layout' });
});

app.get('/api/tumblr_test',function(request, response) {

  GetPhotoURLs('http://rad0m1mg.tumblr.com/api/read/json', response);
  
});


app.listen(app.get('port'), function() {
  console.log("Node app is running on:" + app.get('port'));
});
