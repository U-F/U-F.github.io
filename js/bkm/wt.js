if (localStorage.getItem("wt_integration_sheet_url")==null)  localStorage.setItem("wt_integration_sheet_url","http://s-ec.github.io");

sheetupdate = function() {
    its=document.querySelectorAll(".item");
    var pkt=[];
    for (ea in its) {
        console.log(its[ea]);
        pkt.push({nam:its[ea].querySelector(".name").innerText,ask:its[ea].querySelector(".ask").innerText,bid:its[ea].querySelector(".bid").innerText}); 
        
    }


    magicsheetwin.postMessage(pkt,"*"); // we could really be sending commands instead... will update once an API is ready
}

magicsheetwin=window.open(localStorage.getItem("wt_integration_sheet_url"),"_blank");
globint = setInterval(sheetupdate,10000);

console.log("wt part2 loaded");