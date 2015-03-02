/**
 * Date: 12-3-11
 * 演示程序2
 * 说明: 连接redis，并进行读写
 */
var http = require("http");
var redis = require("redis");
//var client = redis.createClient();
var client = redis.createClient(6379, "121.40.83.122");
var i = 1;

http.createServer(
    function (request, response) {

        response.writeHead(200, {"Content-Type": "text/html; charset=UTF-8"});

        response.write("欢迎您第" + i + "次访问服务器！<br>Welcome!<br>");

        client.on("error", function(err){
            console.log("Error: " + err);
        });

        client.on("connect", function(){
            // start server();
            client.set("demo2_key", "服务器访问被访问次数: i = " + i, function(){
                console.log(reply.toString());
            });

            client.get("demo2_key", function (err, result) {
                console.log(result);
                response.write(result);
                response.end();
            });
        });

        i++;
    }).listen(3000);

console.log("服务器开启");