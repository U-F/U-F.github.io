if (localStorage.getItem("wt_integration_sheet_url")==null)  localStorage.setItem("wt_integration_sheet_url","http://s-ec.github.io");

sheetupdate = function() {
    magicsheetwin.postMessage({hello:121},"*");
}

magicsheetwin=window.open(localStorage.getItem("wt_integration_sheet_url"),"_blank");
globint = setInterval(sheetupdate,10000);

console.log("wt part2 loaded");