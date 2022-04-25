/*
Lucas Waddell
A00447906
The javascript and express framework for the server.
*/

const express = require("express"); // start express application
const server = express(); // define top level function
const port = 3454; //the port the server uses

//an array object to house the values of the three input boxes server side
const blog = ["", "", ""];

server.use(express.json()); // implement JSON recognition
server.use(express.urlencoded({ extended: true })); // implement incoming name:value pairs to be any type

let allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // allow any origin
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE"); // allow any method
  res.header("Access-Control-Allow-Headers", "Content-Type"); // accept only headers with this type
  next(); // middleware callback function required for processing
};
server.use(allowCrossDomain); // implement allowable domain characteristics

/**
 * Upon receiving a post at this url execute callback function
 * save the name of the object in req to the first space of the blog object
 */
server.post("/input1", function (req, res) {
  console.log("name: " + req.body.name);
  blog[0] = req.body.name;

  return res.status(200).send(blog);
});

/**
 * Upon receiving a post at this url execute callback function
 * save the name of the object in req to the second space of the blog object
 */
server.post("/input2", function (req, res) {
  console.log("name: " + req.body.name);
  blog[1] = req.body.name;

  return res.status(200).send(blog);
});

/**
 * Upon receiving a post at this url execute callback function
 * save the name of the object in req to the third space of the blog object
 */
server.post("/input3", function (req, res) {
  console.log("name: " + req.body.name);
  blog[2] = req.body.name;

  return res.status(200).send(blog);
});

/**
 * Upon receiving a post at this url execute callback function
 * return the entire blag array to be put back into the
 * appropriate box by the callback function
 */
server.get("/getAllInput", function (req, res) {
  return res.status(200).send(blog);
});

// essentially lets user know the server is running and
//on which port
server.listen(port, function () {
  console.log("Listening on port 3454");
});

//push proof of concept