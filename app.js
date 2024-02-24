// global 模組引入
var content = require("./data");
//Establish web server
var http = require("http");
http.createServer(function(request, response){
    console.log(request.url)
    //回傳的格式定義
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write ("<h1>testing url info</h1>");
    response.end();
   // local port 127.0.0.1.8080
}).listen(8080);

var a = 1;

console.log(a);
console.log(content);
//抓目錄路徑
console.log(path.dirname('/sd.das/yy.js'));
//路徑合併字串相加
console.log(path.join(_dirname, "/xx"));
//抓檔名
console.log(path.basename(_dirname, "/xx/ww/tt.js"));
//抓副檔名
console.log(path.extname(_dirname, "/xx/ww/tt.js"));
//分析路徑
console.log(path.parse(_dirname, "/xx/ww/tt.js"));


