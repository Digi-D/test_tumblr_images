var express = require("express");
var request = require("request");

var app = express();


var url = "http://rad0m1mg.tumblr.com/api/read/json";

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
          console.log(i+": "+ blog_stream['posts'][i]['photo-url-500']);
        }
    }
});


var port = Number(process.env.PORT|| 3000);
app.listen(port);
