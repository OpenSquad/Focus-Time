document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
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
      var s="";
      for(i in message.items[0])
      {s=s+message.items[0][i]+"\n";}
      if(message.items!==undefined){draw(message.items[0]);}
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
for(b in sorted)
{
    console.log("count : "+count(entry,sorted[b])+" | length : "+entry.length+" | resultat : "+count(entry,sorted[b])/entry.length);
    sou.innerHTML=sou.innerHTML+sorted[b]+
        "<div class=\"progress\">"+
                "<div class=\"determinate\" style=\"width: "+(count(entry,sorted[b])/entry.length)*100+"%\"></div>"+
            "</div>"
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

var myChart = new Chart(ctx, {
type: 'bar',
data: {
    labels: l1,
    datasets: [{
        label: '# Ratio of visits',
        data: l2,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]
},
options: {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    }
}
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