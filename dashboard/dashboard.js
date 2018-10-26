var displayed=false;
document.addEventListener('DOMContentLoaded', function() {
    var test=document.getElementById("test");
    test.onclick=function(){alert("HI");chrome.runtime.sendMessage({storage: true});}
    var elems = document.querySelectorAll('.sidenav');
    var sem=document.getElementsByClassName("hid");
    var activator=document.getElementById("more");

    activator.onclick=function(activator){var activator=document.getElementById("more");alert("activator : "+activator.textContent);for(var i in sem){sem[i].style.display=(activator.textContent.includes("Show More"))?"initial":"none";}if(activator.textContent.includes("Show More")){activator.textContent="Show Less";}else{activator.textContent="Show More"}}
    var instances = M.AutoInit();
    chrome.runtime.sendMessage({historic: true});
    var collapses=document.querySelectorAll(".collapsible-body-bookmark");
    var titles=document.querySelectorAll(".collapsible-header-bookmark")
    for(i in collapses)
    {
        var html="<form><div class=\"input-field col s12\">"+
"<i class=\"material-icons prefix\">textsms</i>"+
        "<input type=\"text\" id=\"autocomplete-input\" class=\"autocomplete\" value=\""+titles[i].textContent+"\">"+
        "<label for=\"autocomplete-input\">Name</label>"+
        "<div>"+
        
        "</div>"+
"<div class=\"input-field col s12\">"+
          "<textarea id=\"textarea1\" class=\"materialize-textarea\"></textarea>"+
          "<label for=\"textarea1\">Concrened websites</label>"+
        "</div>"+
        "</div>"+
        "<div class=\"input-field col s12\">"+
                  "<textarea id=\"textarea1\" class=\"materialize-textarea\"></textarea>"+
                  "<label for=\"textarea1\">White List</label>"+
                "</div>"+
        "<div class=\"input-field col s12\">"+
          "<textarea id=\"textarea1\" class=\"materialize-textarea\"></textarea>"+
          "<label for=\"textarea1\">Black List</label>"+
        "</div>"+
        "Timer<br/>"+
        "<p class=\"range-field\">"+
        "<input type=\"range\" id=\"test5\" min=\"0\" max=\"100\" />"+
      "</p>"+
      "</div><a class=\"waves-effect waves-light btn\">button</a></form>";
        collapses[i].innerHTML=html;
    }

    var collapses=document.querySelectorAll(".collapsible-body-session");
    var titles=document.querySelectorAll(".collapsible-header-session")
    for(i in collapses)
    {
        var html="<form><div class=\"input-field col s12\">"+
"<i class=\"material-icons prefix\">textsms</i>"+
        "<input type=\"text\" id=\"autocomplete-input\" class=\"autocomplete\" value=\""+titles[i].textContent+"\">"+
        "<label for=\"autocomplete-input\">Name</label>"+
        "<div>"+
        
        "</div>"+
"<div class=\"input-field col s12\">"+
          "<textarea id=\"textarea1\" class=\"materialize-textarea\"></textarea>"+
          "<label for=\"textarea1\">Concrened websites</label>"+
        "</div>"+
        "</div>"+
        "<div class=\"input-field col s12\">"+
                  "<textarea id=\"textarea1\" class=\"materialize-textarea\"></textarea>"+
                  "<label for=\"textarea1\">White List</label>"+
                "</div>"+
        "<div class=\"input-field col s12\">"+
          "<textarea id=\"textarea1\" class=\"materialize-textarea\"></textarea>"+
          "<label for=\"textarea1\">Black List</label>"+
        "</div>"+
        "Timer<br/>"+
        "<p class=\"range-field\">"+
        "<input type=\"range\" id=\"test5\" min=\"0\" max=\"100\" />"+
      "</p><br/>TO DO LIST<br/>"+
      "</div><a class=\"waves-effect waves-light btn\">button</a></form>";
        collapses[i].innerHTML=html;
    }
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
