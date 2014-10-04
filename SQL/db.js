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
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/

exports.findAllMessages = function(cb){
  var queryString = 'SELECT * FROM messages;';
  dbConnection.query(queryString, function(err, rows){
    if (err) {console.log(err);}
    cb(rows);
  });
};

exports.findUser = function(username, cb){
  var queryString = 'SELECT * FROM users WHERE username = ?;';
  var queryArgs = username;
  dbConnection.query(queryString, queryArgs, function(err, rows){
    if (err) {console.log(err)}
    cb(rows);
  });
};

exports.saveUser = function(username, cb){
  var queryString = "INSERT INTO users (username) VALUES (?);";
  var queryArgs = username;
  dbConnection.query(queryString, queryArgs, function(err, rows){
    if (err) {console.log(err);}
  });
  exports.findUser(username, cb);
};

exports.saveMessage = function(message, userid, roomname, cb){
  console.log("Save Message: "+message+", "+userid+", "+roomname);
  var queryString = "INSERT INTO messages (text, user_id, roomname) VALUES (??, ??, ??);";
  var queryArgs = [message, userid, roomname];
  dbConnection.query(queryString, queryArgs, function(err, rows){
    if (err) {console.log(err);}
    cb(rows);
  });
};
