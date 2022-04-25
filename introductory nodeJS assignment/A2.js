/*
Lucas Waddell
A00447906
The javascript for control for the three input boxes, 
setup, and callbacks
*/

//constant for the ip address and port of the server
const SERVER_URL = "http://140.184.230.209:3454";

/**
 * called once the page is loaded, gets
 * information from the server
 */
function setup() {
  $.get(SERVER_URL + "/getAllInput", callback1).fail(errorCallback1);
}

/**
 * Gets the users input from respective input box,
 * create an object to store the input,
 * post it to the server with respective url
 */
function saveInput(inputNumber) {
  //first input box
  if (inputNumber == 1) {
    let box1Val = $("#input1").val();
    let object1 = { name: box1Val };
    $.post(SERVER_URL + "/input1", object1, callback1).fail(errorCallback1);
    //second input box
  } else if (inputNumber == 2) {
    let box2Val = $("#input2").val();
    let object2 = { name: box2Val };
    $.post(SERVER_URL + "/input2", object2, callback1).fail(errorCallback1);
    //third input box
  } else {
    let box3Val = $("#input3").val();
    let object3 = { name: box3Val };
    $.post(SERVER_URL + "/input3", object3, callback1).fail(errorCallback1);
  }
}

/**
 * call back function for posting and getting from the server.
 * Sets the value of each respective input box to the proper value from
 * the serverside blog array
 * @param {*} blog the array that holds the values of each input box
 */
function callback1(blog) {
  //the first box
  $("#input1").val(blog[0]);
  //the second box
  $("#input2").val(blog[1]);
  //the third box
  $("#input3").val(blog[2]);
}

/**
 * Used when posting or getting from server fails
 * @param {*} err the error message
 */
function errorCallback1(err) {
  console.log(err.responseText);
}