//Listens to extension's message
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log('Message received');
        console.log(sender.tab ?
                    "from a content script:" + sender.tab.url :
                    "from the extension");

        if(sender.tab){
            if(localStorage['isActive'] == 'true'){
                sendResponse({msg: 'Value requested!' + localStorage['result'], data: localStorage['result']});    
            }
        }else{
            //Loading results from extension page...
            localStorage['result'] = request.result;
            localStorage['isActive'] = request.isActive;
            sendResponse({msg: 'money value received: ' + localStorage['result'] + ', active: ' + localStorage['isActive']});
            // sendToTab();
        }
    }
);