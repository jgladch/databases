var mysql = require('mysql');
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  user: "root",
  password: "",
  database: "chat"
});

dbConnection.connect();

var queryString = "insert into Users (username) values (?)";
  var queryArgs = 'will';
  dbConnection.query(queryString, queryArgs, function(err, rows) {
    if(err) {console.log(err);}
    console.log(rows);
  })
  dbConnection.query("select id from Users where username = 'will'", function(err, rows) {
    if(err) {console.log(err);}
    console.log(rows);
  })
  var message = "howdy", userid = 7, roomname = 'lobby';
  var queryString = "insert into Messages (text, user_id, roomname) values (" + message +
    ','+userid+','+roomname+')';
  dbConnection.query(queryString, queryArgs, function(err, rows) {
    if(err) {'saveMessage',console.log(err);}
    console.log(rows);
  })

dbConnection.end();