
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'jonathan',
  password: 'Hemligt1',
  database: 'node_project'
});

db.connect(function(err){
  if(err) {
      console.log(err);
  } else {
      console.log('connected to mySQL');
  }
});


module.exports = db;
