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

exports.findAllMessages = function(res, cb){
  var queryString = "select * from Messages";

  dbConnection.query(queryString, function(err, records) {
    if(err) {console.log(error);}
    console.log("Callback: ",cb);
    console.log("Records: ",records);
    cb(res, records);
  });
};

exports.findUser = function(username, cb){
  var queryString = "select * from Users where username = ? ";
  var queryArgs = username;
  dbConnection.query(queryString, queryArgs, function(err, rows) {
    if(err) {
      console.log('findUSer',error);
      return;
    }
    cb(rows);
  })
};

exports.saveUser = function(username, cb){
  var queryString = "insert into Users (username) values (?)";
  var queryArgs = username;
  dbConnection.query(queryString, queryArgs, function(err, rows) {
  })
  exports.findUser(username, cb);
};

exports.saveMessage = function(message, userid, roomname, cb){
  var queryString = "INSERT into messages (text, user_id, roomname) values (?,?,?)";
  var queryArgs = [message, userid, roomname];
  dbConnection.query(queryString, queryArgs, function(err, rows) {
    if(err) {'saveMessage',console.log(err);}
    cb(rows);
  })
};
