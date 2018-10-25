document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.AutoInit();
    var collapses=document.querySelectorAll(".collapsible-body");
    var titles=document.querySelectorAll(".collapsible-header")
    for(i in collapses)
    {
        collapses[i].innerHTML=titles[i].textContent;
    }
  });
