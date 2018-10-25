
  // Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
    // No tabs or host permissions needed!
alert("Site : "+tab.url);

  });

  document.addEventListener("DOMContentLoaded", function(){  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    alert(tabs[0].url); 
    chrome.tabs.executeScript({
        code: 'alert("Tab : "+tab.url)'
      });
});})


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(message.closeThis) 
    {
        chrome.tabs.remove(sender.tab.id);
        chrome.storage.sync.get(['count'], function(result) {
            if(result.key==0 || result.key==undefined)
            {
            chrome.storage.sync.set({'count': 0});
            }
            else
            {
                chrome.storage.sync.set({'count': result.key+1});                
            }
        });
        
    }
  });