var mysql = require('mysql');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('chat','root','');

var User = sequelize.define('Users', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  username: Sequelize.STRING(20),
});

var Messages = sequelize.define('Messages', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  text: Sequelize.STRING(140),
  user_id: Sequelize.INTEGER,
  roomname: Sequelize.STRING(20)
});

User.sync();
Messages.sync();


exports.findAllMessages = function(res, cb){
  Messages.findAll().success(function(msg) { cb(res, msg); });
};

exports.findUser = function(username, cb){
  User.find({ where: ['username = ?', username]}).success(function(err, user){
    if (err) { console.log("finduser broke");}
    cb(user);
  });
};

exports.saveUser = function(username, cb){
  var newUser = User.build({username: username});
  newUser.save().success(function(){
    console.log("User has been saved!");
  });
  //This could be the source of a bug
  exports.findUser(username, cb);
};

exports.saveMessage = function(message, userid, roomname, cb){
  var newMessage = Messages.build({text: message, user_id: userid, roomname: roomname});
  newMessage.save().success(function(msg){console.log("Message is: ", msg); cb(err, res, msg); });
};
