var displayed=false;
document.addEventListener('DOMContentLoaded', function() {
    var test=document.getElementById("test");
    insertAllSessions();
    insertAllBookmarks();
    // NEW SESSION
    var n=document.getElementById("button-new-session");
    var m=document.getElementById("save-bookmark");
    n.onclick=function(){
        var namesession=document.getElementById("name-session").value;
        var whitelistsession=document.getElementById("whitelist-session").value;
        var blacklistsession=document.getElementById("blacklist-session").value;
         var timersession=document.getElementById("timer-session").value;
    alert(namesession+"\n"+whitelistsession+"\n"+blacklistsession+"\n"+timersession);
    chrome.runtime.sendMessage({session:{'name':namesession,'whitelist':whitelistsession,'blacklist':blacklistsession,'timer':timersession}});
        }



        m.onclick=function(){

            var namebookmark=document.getElementById("name-bookmark").value;
            var whitelistbookmark=document.getElementById("whitelist-bookmark").value;
            var blacklistbookmark=document.getElementById("blacklist-bookmark").value;
            var concernedbookmark=document.getElementById("concerned-bookmark").value;
             var timerbookmark=document.getElementById("timer-bookmark").value;
        chrome.runtime.sendMessage({bookmark:{'name':namebookmark,'whitelist':whitelistbookmark,'blacklist':blacklistbookmark,'timer':timerbookmark,'concerned':concernedbookmark}});
            }
    // 

    var elems = document.querySelectorAll('.sidenav');
    var sem=document.getElementsByClassName("hid");
    var activator=document.getElementById("more");

    activator.onclick=function(activator){var activator=document.getElementById("more");alert("activator : "+activator.textContent);for(var i in sem){sem[i].style.display=(activator.textContent.includes("Show More"))?"initial":"none";}if(activator.textContent.includes("Show More")){activator.textContent="Show Less";}else{activator.textContent="Show More"}}
    var instances = M.AutoInit();
    chrome.runtime.sendMessage({historic: true});
    var collapses=document.querySelectorAll(".collapsible-body-bookmark");
    var titles=document.querySelectorAll(".collapsible-header-bookmark")
    
  });




  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(message.items!==undefined)
    {  
    var s="";
      for(i in message.items[0])
      {s=s+message.items[0][i]+"\n";}
      if(message.items!==undefined){draw(message.items[0]);}
      if(message.key!==undefined){alert("key : "+message.key);}
    }
    if(message.sessions!==undefined){
        for(var i in message.sessions)
        {
            insertSession(message.sessions[i]);
        }
    }
    if(message.bookmarks!==undefined){
        for(var i in message.bookmarks)
        {
            insertBookmark(message.bookmarks[i]);
        }
    }
    if(message.key!==undefined)
    {
        alert("KEY : "+message.key);
    }
  });


  

  function draw(entry){

sou=document.getElementById("bars");
var arr = entry;
var cnts = arr.reduce( function (obj, val) {
    obj[val] = (obj[val] || 0) + 1;
    return obj;
}, {} );
var sorted = Object.keys(cnts).sort( function(a,b) {
    return cnts[b] - cnts[a];
});
var b;
var coum=0;
for(b in sorted)
{
    
    if(b<7){
        console.log("position : "+b+" name : "+sorted[b]);
    sou.innerHTML=sou.innerHTML+sorted[b]+
        "<div class=\"progress\">"+
                "<div class=\"determinate\" style=\"width: "+(count(entry,sorted[b])/entry.length)*100+"%\"></div>"+
            "</div>"
    }
    else{
        sou.innerHTML=sou.innerHTML+"<div class=\"hid\" style=\"display:none;\">"+sorted[b]+
        "<div class=\"progress\">"+
                "<div class=\"determinate\" style=\"width: "+(count(entry,sorted[b])/entry.length)*100+"%\"></div>"+
            "</div></div>"
    }
coum++;
            
}

var ctx = document.getElementById("cherry").getContext('2d');
var l1=[];
l1=sorted;
var l2=[];
var x=0;
for(x=0;x<l1.length;x++)
{
    l2.push(count(entry,l1[x]));
}

var colors=[];
 for (var i in l2) {
     console.log(getRandomColor());
    colors.push(getRandomColor());
 }
data = {
    datasets: [{
        data: l2.slice(0,6),
        backgroundColor:colors.slice(0,6)
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels:l1.slice(0,6),

};
var myChart =  new Chart(ctx, {
    type: 'doughnut',
    data: data
});




  }

  function count(array,el){
    var count = 0;
    for(var i = 0; i < array.length; ++i){
        if(array[i] == el)
            count++;
    }
    return count;
  }
  function uniq(a) {
    return Array.from(new Set(a));
 }

 function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function insertAllSessions()
{
    chrome.runtime.sendMessage({getsessions:true});
}
function insertSession(session){
    var main=document.getElementById("collapse-sessions");
    var html="<li>"+
    "<div class=\"collapsible-header collapsible-header-session\" style=\"justify-content:space-between;\">"+session.name+"<a href=\"#!\" class=\"right secondary-content\"><i\ class=\"material-icons\">grade</i></a></div>\
    <div class=\"collapsible-body collapsible-body-session\"> \
 <form><div class=\"input-field col s12\">\
<i class=\"material-icons prefix\">textsms</i>\
        <input type=\"text\" id=\"autocomplete-input\" class=\"autocomplete\" value=\""+session.name+"\">\
        <label for=\"autocomplete-input\">Name</label>\
        <div class=\"input-field col s12\">\
                  <textarea id=\"textarea1\" class=\"materialize-textarea\"\ >"+session.whitelist+"</textarea>\
                <label for=\"textarea1\">White List</label>\
                </div>\
        <div class=\"input-field col s12\">\
          <textarea id=\"textarea1\" class=\"materialize-textarea\" >"+session.blacklist+"</textarea>\
          <label for=\"textarea1\">Black List</label>\
        </div>\
        Timer<br/>\
        <p class=\"range-field\">\
        <input type=\"range\" id=\"test5\" min=\"0\" max=\"100\" value=\""+session.timer+"\"/>\
      </p>\
      </div><a class=\"waves-effect waves-light btn\">button</a></form></div>\
      </div>\
      </li>";
      main.innerHTML=main.innerHTML+html;
}




function insertAllBookmarks()
{
    alert("AllBookmarks");
    chrome.runtime.sendMessage({getbookmarks:true});
}
function insertBookmark(bookmark){
    alert("Insert Bookmark");
    var main=document.getElementById("collapsible-bookmarks");
 
    var html="<li>"+
    "<div class=\"collapsible-header collapsible-header-session\" style=\"justify-content:space-between;\">"+bookmark.name+"\
    <a class=\"waves-effect waves-light btn\">Open</a>\
    <div class=\"collapsible-body collapsible-body-session\"> \
 <form><div class=\"input-field col s12\">\
<i class=\"material-icons prefix\">textsms</i>\
        <input type=\"text\" id=\"autocomplete-input\" class=\"autocomplete\" value=\""+bookmark.name+"\">\
        <label for=\"autocomplete-input\">Name</label>\
        <div class=\"input-field col s12\">\
                  <textarea id=\"textarea1\" class=\"materialize-textarea\"\ >"+bookmark.whitelist+"</textarea>\
                <label for=\"textarea1\">White List</label>\
                </div>\
        <div class=\"input-field col s12\">\
          <textarea id=\"textarea1\" class=\"materialize-textarea\" >"+bookmark.blacklist+"</textarea>\
          <label for=\"textarea1\">Black List</label>\
        </div>\
        Timer<br/>\
        <p class=\"range-field\">\
        <input type=\"range\" id=\"test5\" min=\"0\" max=\"100\" value=\""+bookmark.timer+"\"/>\
      </p>\
      </div><a class=\"waves-effect waves-light btn\">button</a></form></div>\
      </div>\
      </li>";
      main.innerHTML=main.innerHTML+html;
}