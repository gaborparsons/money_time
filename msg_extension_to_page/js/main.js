//Check script loading
console.log('Loaded main.js');

//Listens
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    console.log(request.moneyTime);
    convert(request.moneyTime);
    // if (request.greeting == "hello")
    //   sendResponse({farewell: "goodbye"});
  }
);



function convert(result){
console.log('Converting values...');
//converting the money values in the document to time value
    var body = document.getElementsByTagName('body');
    var bodyText = body[0].innerHTML;
    // console.log(bodyText);

    for(var i = 0; i < bodyText.length; i++){
        // console.log(bodyText[i]);

        //Found money?
        if(bodyText[i] == '$'){
            // console.log('Found money!');
            var moneyValue = '';
            var j = i + 1;

            //Start concatenating:
            while((!isNaN(bodyText[j]) || bodyText[j] == '.') && j < bodyText.length){
                // console.log('concatenating');
                moneyValue += bodyText[j]; //Concatenate
                j ++;
            }
            // console.log(moneyValue);
            //var timeValue = moneyValue * 10;
            var timeValue = moneyValue / result;
            timeValue = Math.round(timeValue * 100) / 100;

            //now let's get the value of hours and minutes
            var timeHours = Math.floor(timeValue);
            var timeMinutes = (timeValue - timeHours) * 60;
            timeMinutes = Math.round(timeMinutes);

            if(timeHours > 0){
                bodyText = bodyText.substring(0, i) + timeHours + ' h ' + timeMinutes + " min " + bodyText.substring(j);
            }else{
                bodyText = bodyText.substring(0, i) + timeMinutes + " min " + bodyText.substring(j);

            }

            //jump to next iteration
            i = j;
        }
    }

    // console.log(bodyText);
    body[0].innerHTML = bodyText;
}