sheetupdate = function() {
    magicsheetwin.postMessage({hello:121},"*");
    
    
}

magicsheetwin=window.open("http://s-ec.github.com");
globint = setInterval(sheetupdate,10000);

console.log("bkm loaded");