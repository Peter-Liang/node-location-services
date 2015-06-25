var http = require('http');
var request = require('request');
var iconv = require('iconv-lite');
var url = require('url');

http.createServer(function (req, res) {
    var phone = url.parse(req.url, true).query.phone;
    request.get('http://virtual.paipai.com/extinfo/GetMobileProductInfo?mobile=' + phone + '&amount=10000')
        .pipe(iconv.decodeStream('gb2312')).collect(function (err, body) {
            if(err) {
                console.log(err);
            }

            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf8'});
            res.end(body);
        });
}).listen(1338);
console.log('Port 1338 start listening.');