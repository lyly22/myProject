/**
 * Created by Administrator on 2015/12/11.
 */
var http=require('http');
var fs=require('fs');
http.createServer(function(req,res){
    if(req.url=='/'){
        fs.readFile('clock.html',function(err,data){
            if(err){
                res.end('ดํมห');
            }else{
                res.end(data);
            }
        })
    }else if(req.url==='/clock'){
        console.log(req.url);
        res.setHeader('Access-Control-Allow-Origin','http://localhost:63342');
        res.write(new Date().toLocaleString());
        res.end();
    }
}).listen(8080,'localhost');
