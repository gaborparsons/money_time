//Creating a button inside of the main page
var btn = document.createElement("BUTTON");
btn.setAttribute('id', 'theButton');
var t = document.createTextNode("CLICK ME");
btn.appendChild(t);
//Appending to DOM 
document.body.appendChild(btn);
console.log('olá');

//Adding listener
btn.addEventListener("click",
function() {
    console.log('message sent');
    window.postMessage({ type: "FROM_PAGE", text: "Hello from the webpage!" }, "*");
}, false);   


//Listening to incoming messages
var port = chrome.runtime.connect();

window.addEventListener("message", function(event) {
	console.log("message received");
  // We only accept messages from ourselves
  if (event.source != window)
    return;

  if (event.data.type && (event.data.type == "FROM_PAGE")) {
    console.log("Content script received: " + event.data.text);
    port.postMessage(event.data.text);
  }
}, false);