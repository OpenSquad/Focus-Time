class session{
    constructor(name,timer,blacklist,whitelist)
    {
        this.name=name;
        this.timer=timer;
        this.blacklist=blacklist;
        this.whitelist=whitelist;
    }
    permited(site)
    {
        var i=0;
        if(this.whitelist.length>0)
        {
            for(i in this.whitelist)
            {
                if(this.whitelist[i].includes(site)) return true;
            }
        }
        if(this.blacklist.length>0)
        {
            for(i in this.blacklist)
            {
                if(this.blacklist[i].includes(site)) return false;
            }
        }
        if(this.blacklist.length>0) return true;
        if(this.whitelist.length>0) return false;
    }
}


class bookmark{
    constructor(name,timer,blacklist,whitelist,concerned)
    {
        this.name=name;
        this.timer=timer;
        this.blacklist=blacklist;
        this.whitelist=whitelist;
        this.concerned=concerned;
    }
    permited(site)
    {
        var i=0;
        if(this.whitelist.length>0)
        {
            for(i in this.whitelist)
            {
                if(this.whitelist[i].includes(site)) return true;
            }
        }
        if(this.blacklist.length>0)
        {
            for(i in this.blacklist)
            {
                if(this.blacklist[i].includes(site)) return false;
            }
        }
        if(this.blacklist.length>0) return true;
        if(this.whitelist.length>0) return false;
    }
}

  // Called when the user clicks on the browser action.

var sessions = [];
var bookmarks = [];
var activesession;
var activebookmark;
var warnings=[];
function Permited(site)
{
    return (activesession.permited(site)&&activebookmark.permited(site));
}
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
    if(message.session)
    {
        sessions.push(new session(message.session.name,message.session.timer,message.session.blacklist,message.session.whitelist))
    }
    if(message.bookmark)
    {
        bookmarks.push(new bookmark(message.bookmark.name,message.bookmark.timer,message.bookmark.blacklist,message.bookmark.whitelist,message.bookmark.concerned))
    }
    if(message.getsessions)
    {
        chrome.runtime.sendMessage({sessions:sessions});
    }
    if(message.getbookmarks)
    {
        chrome.runtime.sendMessage({bookmarks:bookmarks});
    }
    if(message.storage)
    {
        saveData('key',3,function(){
            getData('key',function(result){chrome.runtime.sendMessage({key:result.key})})
        })
    }
    
    if(message.closeThis!==undefined) 
    {
        if(Permited(message.closeThis)==false)
        {
        chrome.tabs.remove(sender.tab.id);
    }
        
    }
  });



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


function ValidURL(str) {
return str.includes('.');
  }
// *****************************************\\