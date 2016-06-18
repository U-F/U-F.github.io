filtra = function(s){
	if (typeof s == "undefined") return 0;
	if (typeof s.indexOf == "undefined") return 0;
	if (s.indexOf(".mp4")>-1) return 1;
	if (s.indexOf(".webm")>-1) return 1;
	if (s.indexOf(".mkv")>-1) return 1;
	if (s.indexOf(".flv")>-1) return 1;
	if (s.indexOf(".f4v")>-1) return 1;
	return 0;
	}


all=document.querySelectorAll("a");
linx=[];
for (e in all) {
if (filtra(all[e].href)) linx.push(all[e].href);	
}

	
localStorage.setItem("VIDS"+document.location.href,linx);
alert("ok");

	

