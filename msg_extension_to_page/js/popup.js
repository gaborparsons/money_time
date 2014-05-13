var enterBt = document.getElementById('theButton');
var newAlert = document.getElementById('alert');

//Adding listener to button
enterBt.addEventListener('click', function(){
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
        // console.log(localStorage.getItem(inputs[i].id));
        if(localStorage.getItem(inputs[i].id) != '' && localStorage.getItem(inputs[i].id) !== null){
        // if(localStorage.getItem(inputs[i].id) != ''){
            inputs[i].value = localStorage.getItem(inputs[i].id);
        }else{
            enterBt.innerHTML = 'Enter';
            break;
        }
    }

    //If there is a moneyTime value...
    // if(localStorage.getItem('result') != '' && typeOf localStorage.getItem('result') !== 'null'){
    if(localStorage.getItem('result') != '' && localStorage.getItem('result') !== null){
        showResults();
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

    //Any field missing?
    if(isMissing){
        newAlert.innerHTML = 'You have to fill out all fields!';
    }else{
        saveValues(inputs);
        // alert ('Your values have been saved. You can modify your parameters by coming back to this page');
        // newAlert.innerHTML = 'Your values have been saved. You can modify your parameters by coming back to this page';
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
    
    // console.log(result);
    //Save result as a localStorage var
    localStorage['result'] = result;
    localStorage['isActive'] = 'true';
    
    showResults();      //Show message
    //HOW TO REFRESH PAGE?!?!?!
}

function showResults(){
    newAlert.innerHTML = 'Your hour = US$ ' + localStorage.getItem('result');

    var btn = document.getElementById('onOff');

    if(!btn){
        var container = document.getElementById('container');
        var btn = document.createElement("BUTTON");
        btn.setAttribute('id', 'onOff');        
        container.appendChild(btn);
        var t = document.createTextNode("Turn off");
        btn.appendChild(t);
        btn.style.backgroundColor = '#fd004b';
    }
    checkBtFormatting(btn);

    //Add listener to button
    btn.addEventListener('click', function(){
        //Turn button on/off
        localStorage['isActive'] = (localStorage['isActive'] == 'true') ? ('false') : ('true');
        checkBtFormatting(btn);
    }, false);

    //Send value to background page
    sendValue(localStorage['result']);
}

function sendValue(){
    //Send value to background page, not to main tab!
    //Sends
    chrome.runtime.sendMessage({result: localStorage['result'], isActive: localStorage['isActive']}, function(response) {
      console.log(response.msg);
    });    

    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
 //        chrome.tabs.sendMessage(tabs[0].id, {moneyTime: result});    
    // });
}

function checkBtFormatting(btn){
    console.log(localStorage['isActive']);

    //Change button formatting
    if(localStorage['isActive'] == 'true'){
        console.log('red button');
        btn.innerHTML = "Turn off";
        btn.style.backgroundColor = '#fd004b'; 
    }else{
        console.log('gray button');
        btn.innerHTML = "Turn on";
        newAlert.style.color = '#BBBBBB'
        btn.style.backgroundColor = '#BBBBBB';        
    }      
}