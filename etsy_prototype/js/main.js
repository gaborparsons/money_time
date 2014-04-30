function convert(){

//getting the value of time from the given parameters
    //parameters given by user - these values will come in the form
    var moneyEarned = 3000;
    var moneyRemaining = 500;
    var freeTime = 24;
    var paraEarning = 50;
    var paraTime = 90;
    var paraSaving = 30;

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