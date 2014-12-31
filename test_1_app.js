// on heroku at https://floating-retreat-1732.herokuapp.com

var express = require("express");
var request = require("request");
var hbs = require("hbs");

var app = express();
app.use(express.static('public'));
app.use(express.static('bower_components'));

app.set('view engine', 'html');
app.engine('html', require('hbs').__express);


var url = "http://rad0m1mg.tumblr.com/api/read/json";
var photo_urls= new Array();

request({
    url: url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        //console.log(body) // Print the json response
        var inhale_jsonp=body;

        //clean and parse JSONp response from tumblr API
        var blog_stream= inhale_jsonp.substring(22,inhale_jsonp.length-2);
        blog_stream=JSON.parse(blog_stream);

        //console.log(blog_stream['posts'][0]['photo-url-500']);

        for(var i=0;i<blog_stream.posts.length;i++)
        {
          //console.log(i+": "+ blog_stream['posts'][i]['photo-url-500']);
          photo_urls[i]=blog_stream['posts'][i]['photo-url-500'];

        }
    }
    else
    {
        photo_urls[0]='none';
    }
});


app.get('/', function(request, response) {
    response.render('tumblr_test', { title: 'grab Nf0 from tumblr blog', layout: 'tumblr_test_layout' });
});

app.get('/api/tumblr_test',function(request, response) {
  response.json(photo_urls);
});


app.set('port', (process.env.PORT || 5000));
