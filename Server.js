const express = require("express");

const mysql = require("mysql");
const cors = require("cors");

const PORT = process.env.PORT || 4000;
var bodyParser = require("body-parser");
const app = express();
const router = express.Router();
app.use(cors());
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "gethdb"
});

connection.connect(function(err) {
  err ? console.log(err) : console.log(connection);
});

//require("./routes/html-routes")(app, connection);
app.get("/Category/:wallet_addr", function(req, res) {
  connection.query(
    "select category from Category where wallet_addr=?",
    [req.params.wallet_addr],
    function(err, results) {
      err ? res.send(err) : res.json({ data: results });
    }
  );
});

app.get("/About/:wallet_addr", function(req, res) {
  connection.query(
    "select * from Users where user_id=?",
    [req.params.wallet_addr],
    function(err, results) {
      err ? res.send(err) : res.json({ data: results });
    }
  );
});

app.get("/Experience/:wallet_addr", function(req, res) {
  connection.query(
    "select * from Experience where user_id=?",
    [req.params.wallet_addr],
    function(err, results) {
      err ? res.send(err) : res.json({ data: results });
    }
  );
});

app.put("/EditAboutUser/:user_id", function(req, res) {
  connection.query(
    "UPDATE Users SET first_name=?,last_name=?,about=? ,skills=?  WHERE user_id =?",
    [
      req.body.first_name,
      req.body.last_name,
      req.body.about,
      req.body.skills,
      req.params.user_id
    ],
    function(err, results, fields) {
      err ? res.send(err) : res.send(JSON.stringify(results));
    }
  );
});
// app.get("/validation", function(req, res) {
//   connection.query("SELECT * FROM validateRequests", function(err, results) {
//     err ? res.send(err) : res.json({ data: results });
//   });
// }).then(
//   function(req,res){
//     connection.query("SELECT * FROM validateRequests", function(err, results) {
//       err ? res.send(err) : res.json({ data: results });
//   });

app.get("/certis/:sentby", function(req, res) {
  connection.query(
    "SELECT * FROM validateRequests WHERE `sentby` =?",
    [req.params.sentby],
    function(err, results) {
      err ? res.send(err) : res.json({ data: results });
    }
  );
});

app.get("/certificate/:certiname", function(req, res) {
  connection.query(
    "SELECT swarm_id FROM validateRequests WHERE `certiname` =?",
    [req.params.certiname],
    function(err, results) {
      err ? res.send(err) : res.json({ data: results });
    }
  );
});

//update status of certificate
app.put("/validation", function(req, res) {
  connection.query(
    "UPDATE `validateRequests` SET `status`=?  WHERE `certiname` =?",
    [req.body.stat, req.body.cert],
    function(err, results, fields) {
      err ? res.send(err) : res.send(JSON.stringify(results));
    }
  );
});

app.delete("/validation", function(req, res) {
  console.log(req.body);
  connection.query(
    "DELETE FROM `validateRequests` WHERE `certiname`=?",
    [req.body.cert],
    function(error, results, fields) {
      if (error) throw error;
      res.end("Record has been deleted!");
    }
  );
});

app.post("/UserTable", function(req, res) {
  var postData = req.body;
  connection.query("INSERT INTO Users SET ?", postData, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.post("/CompanyTable", function(req, res) {
  var postData = req.body;
  connection.query("INSERT INTO Company SET ?", postData, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.post("/AddExperience", function(req, res) {
  var postData = req.body;
  connection.query("INSERT INTO Experience SET ?", postData, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.post("/Category", function(req, res) {
  var postData = req.body;
  connection.query("INSERT INTO Category SET ?", postData, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
