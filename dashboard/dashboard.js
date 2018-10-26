document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.AutoInit();
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
