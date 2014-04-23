$( "div:contains('$')" ).css( "text-decoration", "underline" );

var moneyDivs = $("div:contains('$')");
for(var i = 0; i < moneyDivs.length; i++){
    // console.log(money[i]);
    var text = moneyDivs[i].innerHTML;
    // console.log(text);
    
    var textSlice = text.substring(text.indexOf('$'), text.length);
    var index = 1;
    var moneyValue = '';

    //add characters to the string:
    //if it is a number
    //if it is a dot
    //until the end of the original string
    while((!isNaN(textSlice[index]) || textSlice[index] == '.') && index < textSlice.length){
        moneyValue += textSlice[index];
        index ++;
    }
    moneyValue = parseFloat(moneyValue);
    console.log(moneyValue);
    // console.log(moneyValue);
}