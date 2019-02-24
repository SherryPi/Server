const http = require("http");
const port = 5000;

http.createServer((req, res)=>{ //create http server
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    var r = require("rethinkdb");
    var connection = null;
    //var obj1 = {host: '34.204.183.169', port: 28015, db: 'Weatherwayz', user: 'rethinkdb', password: 'weatherwayz'};
    var obj2 = {host: '34.204.183.169', port: 28015, user: 'admin'};
    r.connect( obj2, function(err, conn) {
        if (err){
            console.log("cannot connect");
            console.log(err);
            throw err;
        }
        connection = conn;

        r.db("Weatherwayz").table('Users').
        run(connection, function(err, result) {
            if (err) throw err;
            console.log(JSON.stringify(result._responses, null, 2));
        });
    });
    
}).listen(port); //server object listen on port 5000;
