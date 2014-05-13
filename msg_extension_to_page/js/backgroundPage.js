//Check script loading
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log('Message received');
        console.log(sender.tab ?
                    "from a content script:" + sender.tab.url :
                    "from the extension");
        //Loading result from extension page...
        var result = request.result;
        var isActive = request.isActive;
        sendResponse({msg: 'money value received: ' + result + ', active: ' + isActive});
    }
);