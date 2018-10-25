window.onload = function () {
  s=document.getElementById("toclick");
  // Called when the user clicks on the browser action.
  chrome.browserAction.onClicked.addListener(function(tab) {
    // No tabs or host permissions needed!
alert("Site : "+tab.url);
    chrome.tabs.executeScript({
      code: 'alert("Tab : "+tab.url)'
    });
  });

};
