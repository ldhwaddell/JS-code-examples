/*
Lucas Waddell
A00447906
Code to connect server to database
*/

const express = require("express"); // start express application
let mysql = require("mysql2"); // start mysql application
const server = express(); // define top level function
const port = 3454; //the port the server uses

let database = mysql.createConnection({
  host: "127.0.0.1",
  user: "l_waddell",
  password: "desireEFFORTwould04",
  database: "l_waddell",
  connectTimeout: 10000,
});
database.connect();

server.use(express.json()); // implement JSON recognition
server.use(express.urlencoded({ extended: true })); // implement incoming name:value pairs to be any type

let allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // allow any origin
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE"); // allow any method
  res.header("Access-Control-Allow-Headers", "Content-Type"); // accept only headers with this type
  next(); // middleware callback function required for processing
};
server.use(allowCrossDomain); // implement allowable domain characteristics

// essentially lets user know the server is running and
//on which port
var serverside = server.listen(3454, function () {
  console.log("Listening on port %d", serverside.address().port);
});

/**
 * A request to terminate the program
 */
process.on("SIGTERM", function () {
  console.log("Shutting server down.");
  database.close();
  server.close();
});

/**
 * Called in the initial creation of the database. No longer used,
 * kept in code to show how databse was created. Inserts the
 * request values of BlogNumber, Content, Published, and WordBank into
 * the mySQL2 database.
 */
server.post("/blogInsert", function (request, response) {
  console.log(request.body.BlogNumber);
  console.log(request.body.Content);
  console.log(request.body.Published);
  console.log(request.body.WordBank);

  database.query(
    "INSERT INTO Blogs VALUES (?, ?, ?, ?)",
    [
      request.body.BlogNumber,
      request.body.Content,
      request.body.Published,
      request.body.WordBank,
    ],
    function (err, res) {
      if (err) console.log(err);

      return response.status(200).send("SUCCESS");
    }
  );
});

/**
 * Gets the content of each blog based on BlogNumber,
 * where BlogNumber is the key. Returns an object that is used by the callback
 * to show what is saved under content on the DB
 */
server.post("/getBlog", function (request, response) {
  database.query(
    "SELECT Content FROM Blogs WHERE BlogNumber=?",
    [request.body.BlogNumber],

    function (err, res) {
      if (err)
        console.log(
          "An error has been thrown while searching for your record."
        );
      return response.status(200).send(res);
    }
  );
});

/**
 * Gets the Published status of each blog based on BlogNumber,
 * where BlogNumber is the key. Returns an object that is used by the callback
 * to show whether the current blog is published
 */
server.post("/getPublished", function (request, response) {
  database.query(
    "SELECT Published FROM Blogs WHERE BlogNumber=?",
    [request.body.BlogNumber],

    function (err, res) {
      if (err)
        console.log(
          "An error has been thrown while searching for your record."
        );
      return response.status(200).send(res);
    }
  );
});

/**
 * Called upon pressing the save or cancel buttons.
 * Updates all of the content of the particular blog in the database,
 * based on BlogNumber being the key
 */
server.post("/blogUpdate", function (request, response) {
  let arg =
    "UPDATE Blogs SET Content = '" +
    [request.body.Content] +
    "', Published = '" +
    [request.body.Published] +
    "', WordBank = '" +
    [request.body.WordBank] +
    "' WHERE BlogNumber=?";

  database.query(
    arg,
    [request.body.BlogNumber],

    function (err, res) {
      if (err)
        console.log(
          err + "An error has been thrown while updating your record."
        );
      return response.status(200).send(res);
    }
  );
});

/**
 * Solely updates the published status of the respective blog.
 */
server.post("/blogUpdatePublished", function (request, response) {
  let arg =
    "UPDATE Blogs SET Published = '" +
    [request.body.Published] +
    "' WHERE BlogNumber=?";

  database.query(
    arg,
    [request.body.BlogNumber],

    function (err, res) {
      if (err)
        console.log(
          err + "An error has been thrown while updating your record."
        );
      return response.status(200).send(res);
    }
  );
});