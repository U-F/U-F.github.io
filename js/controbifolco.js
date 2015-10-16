rnd=Math.random();
if (rnd>0.499) {spamtype=1} else {spamtype=2}
mymsg=prompt("Insert message:");

sselect = function() {
rnd=Math.random();
//if (rnd>0.499) {firstcomm()} else {topcomm();}
// controlla perchè non funziona topcomm. 
if (rnd>0.499) {firstcomm()} else {firstcomm();}
}

firstcomm= function() {
//top level comment
document.querySelector(".usertext-edit textarea").value=mymsg;
document.querySelector(".usertext-buttons button").click()
}

topcomm=function() {
//top comment
document.querySelectorAll(".thing")[2]
document.querySelectorAll(".thing")[2].querySelector(".reply-button a").click()
document.querySelectorAll(".thing")[2].querySelectorAll("textarea")[1].value=mymsg;
document.querySelectorAll(".thing")[2].querySelectorAll(".usertext-buttons button")[2].click()
}

setInterval(sselect,1001*60*10)
