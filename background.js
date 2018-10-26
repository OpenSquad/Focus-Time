
  // Called when the user clicks on the browser action.


  // chrome.tabs.create({ url: chrome.runtime.getURL("dashboard/dashboard.html") });


  function saveData(data,callback)
  {
      chrome.storage.sync.set({stock: data}, function() {callback();});
  }
  function getData(key,callback)
  {
      chrome.storage.sync.get([key], function(result) {callback(result);});
  }
  




chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(message.historic)
    {
         getMoreHistory(function(hist){chrome.runtime.sendMessage({items: hist});});

    }
    if(message.storage)
    {
        saveData('key',3,function(){
            getData('key',function(result){chrome.runtime.sendMessage({key:result.key})})
        })
    }
    
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


function move() {
    var elem = document.getElementById("loadulation"); 
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++; 
            elem.style.width = width + '%'; 
        }
    }
}


var nextEndTimeToUse = 0;

var allItems = [];
var itemIdToIndex = {};

function getMoreHistory(callback) {
  var params = {text:"", maxResults:500};
  params.startTime = 0;
  if (nextEndTimeToUse > 0)
    params.endTime = nextEndTimeToUse;

  chrome.history.search(params, function(items) {
    var counts=[];
    var names=[];
        for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var url = new URL(item.url);
      var r=item.visitCount;
      var j=0;
      for(j=0;j<r;j++)
{            if(ValidURL(url.host)) names.push(url.host);}
    }

    callback([names,counts]);
  });
}

document.addEventListener('DOMContentLoaded', function() {
    var link= document.getElementById('clickr');
    //onclick
    link.addEventListener('click',move);
});

function ValidURL(str) {
return str.includes('.');
  }
// *****************************************\\