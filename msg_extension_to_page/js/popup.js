//Adding listener to button
document.getElementById('theButton').addEventListener('click', function(){
	validateForm();
}, false);

//Selecting the inputs
var inputs = [];
inputs = document.getElementsByTagName('input');

checkExisting();

//0. Check for existing values
function checkExisting(){
	console.log('Checking for existing values.');
    for(var i = 0; i < inputs.length; i++){
        //Is there a value already?
        //Note: our localStorage variables have the same name as our id's
        if(localStorage.getItem(inputs[i].id) != ''){
            inputs[i].value = localStorage.getItem(inputs[i].id);
        }
    }
}

//1. Validate form
function validateForm(){
	console.log('Validating form.');
    var isMissing = false;
    for(var i = 0; i < inputs.length; i++){
        if(inputs[i].value == ''){
            isMissing = true;
        }
    }

	var newAlert = document.getElementById('alert');
    //Any field missing?
    if(isMissing){
        newAlert.innerHTML = 'You have to fill out all fields!';
    }else{
        saveValues(inputs);
        // alert ('Your values have been saved. You can modify your parameters by coming back to this page');
        newAlert.innerHTML = 'Your values have been saved. You can modify your parameters by coming back to this page';
    }
}

//2. Save values
function saveValues(){
	console.log('Saving values.');
    for(var i = 0; i < inputs.length; i++){
        //Saving a localStorage value with the same name as the input id
        localStorage[inputs[i].id] = inputs[i].value;
    }
    calculateMoneyTime();
}

//3. Calculate money time
function calculateMoneyTime(){

//getting the value of time from the given parameters
    //parameters given by user - these values will come in the form

    // //Debug
    // for(var i = 0; i < inputs.length; i++){
    //     //Is there a value already?
    //     //Note: our localStorage variables have the same name as our id's
    //     console.log(localStorage.getItem(inputs[i].id));
    // }

    var moneyEarned = parseFloat(localStorage['moneyEarned']);
    var moneyRemaining = parseFloat(localStorage['moneyRemaining']);
    var freeTime = parseFloat(localStorage['freeTime']);
    var paraEarning = parseFloat(localStorage['paraEarning']);
    var paraTime = parseFloat(localStorage['paraTime']);
    var paraSaving = parseFloat(localStorage['paraSaving']);

    //adjusting the values received to a common value (money/month / time in h)
    var freeTimeMonth = freeTime/7*365/12
    var paraTimeHour = paraTime/2;
    var paraSavingHour = 100*60/paraSaving;

    //mathematical result
    var mathResult = moneyEarned/freeTimeMonth;
    //subjective result
    var subjectiveResult = (paraEarning + paraTimeHour + paraSavingHour)/3;
    //"comfort-level" adjustment
    var percentage = moneyRemaining/moneyEarned;
    if(percentage < 0.1){
        var comfort = 0;
    }
    if(percentage > 0.25){
        var comfort = 1;
    }
    else{
        var comfort = (percentage - 0.1)/(0.25 - 0.1);
    }

    //result
    var result = Math.max(mathResult, subjectiveResult) * percentage + Math.min(mathResult, subjectiveResult) * (1-percentage);
    result = Math.round(result * 100) / 100;
    
    console.log(result);
    sendValue(result);
}

function sendValue(result){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, {moneyTime: result}, function(response) {
	    console.log(response.farewell);
	  });
	});
}
