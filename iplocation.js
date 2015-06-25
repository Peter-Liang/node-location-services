var http = require('http');
var querystring = require('querystring');
var request = require('request');
var iconv = require('iconv-lite');
var url = require('url');

http.createServer(function (req, res) {
    var ip = url.parse(req.url, true).query.ip;
    request.post('http://www.ip5.me/index.php')
        .form({
            s: ip,
            doit: 1
        })
        .pipe(iconv.decodeStream('gb2312')).collect(function (err, body) {
            var jsdom = require('jsdom');
            jsdom.env(body, function (errors, window) {
                if (errors) {
                    console.log(errors);
                }
                var $ = require('jquery')(window);
                var locate = $('#ip_pos').text();
                console.log(locate);
                res.writeHead(200, {'Content-Type': 'text/plain; charset=utf8'});
                res.end(locate);
            });
        });
}).listen(1337);
console.log('Port 1337 start listening.');