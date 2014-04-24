function convert(){
    $( "div:contains('$')" ).css( "text-decoration", "underline" );

    var tempMoneyDivs = $("div:contains('$')"); //all divs containing a dollar sign
    var moneyDivs = [];
    for(var i = 0; i < tempMoneyDivs.length; i++){
        console.log($(tempMoneyDivs[i]).children().length);
        if($(tempMoneyDivs[i]).children().length == 0){
            // moneyDivs.push(tempMoneyDivs[i]);
        }
    }

    for(var i = 0; i < moneyDivs.length; i++){
        // console.log(moneyDivs[i]);
        var text = moneyDivs[i].innerHTML;  //div's content
        // console.log(text);
        var startSpan = text.indexOf('$');  //first index of the monetary value

        //Start storing the value by slicing the string
        var textSlice = text.substring(startSpan, text.length);
        var index = 1;          //Because the $ is the first index, we'll start from 1, not 0
        var moneyValue = '';    //This will store the number found

        //add characters to the string:
        //if it is a number
        //if it is a dot
        //until the end of the original string
        while((!isNaN(textSlice[index]) || textSlice[index] == '.') && index < textSlice.length){
            moneyValue += textSlice[index]; //Concatenate
            index ++;
        }
        // console.log('string value: ' + moneyValue);
        moneyValue = parseFloat(moneyValue);
        // console.log('parsed value: ' + moneyValue);

        /*----- CONVERTING TO TIME VALUE -----*/
        var newValue = moneyValue * 10;
        newValue = Math.round(newValue * 100) / 100;
        
        //Storing the last index found while adding the numbers
        var endSpan = startSpan + index;

        //Creating a new string to replace the original
        var newText = text.substring(0, startSpan)
        newText += newValue + ' hours ';
        newText += text.substring(endSpan);

        // console.log('endSpan: ' + endSpan + ', last index: ' + text.length);
        // console.log(text.substring(endSpan));
        
        //Replace
        moneyDivs[i].innerHTML = newText;
    }
}