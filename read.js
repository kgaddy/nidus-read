var config 	= require('./config.js'),
	http 	= require('http'),
	sys 	= require ('util'),
	url 	= require('url'),
	mysql	= require('mysql');
	
var server = http.createServer(function(request, response) {
	var urlObj = url.parse(request.url, true);
	//console.log(urlObj.path);

	request.addListener('end',function() {
		var log = new Log();
		
		switch(urlObj.path)
		{
			case '/':
				log.GetAllLogs(response);
				break;
			case '/currentErrors':
			log.GetCurrentErrors(response);
				break;				
		}
	});
}).listen(8002);
console.log('Read Server Started:8002')
	
//connect to mysql	
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : config.MYSQLusername,
  password : config.MYSQLpassword,
  port : config.MYSQLport,
  database: config.MYSQLdbname
});

var Log = (function () {
    function Log(date,code,description,ip,value,refId) {
        this.DateLog = date;
		this.Code = code
		this.Description = description;
		this.IPAddress = ip;
		this.Value = value;
		this.RefId = refId;
    }
	
	Log.prototype.GetAllLogs = function(response){
		connection.query('select lc.name as location,l.id, l.date, l.code, l.ipAddress,l.value, l.refId from log as l join location as lc on l.refId=lc.id', [], function(err, results) {
            response.writeHead(200, {'Content-Type': 'application/json'});
            var str = JSON.stringify(results);
			response.write(str);   
            response.end();
		});
	}
	
	Log.prototype.GetCurrentErrors = function(response){
		
		connection.query('select id,code,msg,ipAddress,refId,date,viewDate from error where viewDate is null', [], function(err, results) {
            response.writeHead(200, {'Content-Type': 'application/json'});
			console.log(results);
            var str = JSON.stringify(results);
			response.write(str);   
            response.end();
		});
	}
	
	Log.prototype.logValue = function () {
		var that=this;
		connection.connect(function(err) {
		console.log('connected');
		ClientConnectionReady(connection);
	    // connected! (unless `err` is set)
	  });

	  function ClientConnectionReady(connection)
	  {
		  try{
			  connection.query('USE Log',
			  function(error, results) {
				  if (error) {
					  console.log('ClientConnectionReady Error: ' + error.message);
					  //connection.end();
					  return;
				  }
				  ClientReady(connection);
			  });
		  }
		  catch(err){
			  console.log(err)
		  }
	  };

	  function ClientReady(connection)
	  {
		  var values = [that.DateLog, that.Code, that.Description, that.IPAddress,that.Value,that.RefId];
		  connection.query('INSERT INTO log SET date = ? , code = ? , description =? , ipAddress = ?, value=?, refId=?', values,
		  function(error, results) {
			  if (error) {
				  console.log("ClientReady Error: " + error.message);
				  //connection.end();
				  return;
			  }
		  });
	  }
	};
	return Log;
})();

