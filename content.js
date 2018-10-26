//alert("Tab : "+location.href);

    chrome.storage.sync.get(['count'], function(result) {
        saveChanges(2);     
        chrome.runtime.sendMessage({closeThis: location.href});
      });

/*
chrome.history.search({ text: "", startTime: 0, maxResults: 0 }, 
    items => console.log(items));
*/

function saveChanges(val) {
    // Get a value saved in a form.
    var theValue = val;
    // Check that there's some code there.
    if (!theValue) {
      alert('Error: No value specified');
    }
    // Save it using the Chrome extension storage API.
    chrome.storage.sync.set({'value': theValue}, function() {
      // Notify that we saved.
      alert('Settings saved');
    });
  }