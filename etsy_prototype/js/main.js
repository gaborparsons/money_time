function convert(){
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
            var timeValue = moneyValue * 10;
            timeValue = Math.round(timeValue * 100) / 100;

            bodyText = bodyText.substring(0, i) + timeValue + ' hours ' + bodyText.substring(j);

            //jump to next iteration
            i = j;
        }
    }

    // console.log(bodyText);
    body[0].innerHTML = bodyText;
}