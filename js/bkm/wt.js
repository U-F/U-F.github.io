if (localStorage.getItem("wt_integration_sheet_url")==null)  localStorage.setItem("wt_integration_sheet_url","http://s-ec.github.io");

sheetupdate = function() {
    its=document.querySelectorAll(".item");
    var pkt={};
    for (ea in its) {
        if (its[ea]){
        console.log(its[ea]);
        try{
            
        pkt[its[ea].querySelector(".name").innerText.replace(" ","")]={ask:its[ea].querySelector(".ask").innerText,bid:its[ea].querySelector(".bid").innerText}; } catch(e) {}
        }
    }
    magicsheetwin.postMessage(pkt,"*"); // we could really be sending commands instead... will update once an API is ready
}

magicsheetwin=window.open(localStorage.getItem("wt_integration_sheet_url"),"_blank");
globint = setInterval(sheetupdate,10000);

console.log("wt part2 loaded");