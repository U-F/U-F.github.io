t = document.querySelectorAll(".title_wrap")
u = document.querySelectorAll("[type='hidden']")

otxt="[playlist]\nNumberOfEntries=";
c=0;
mtxt="";
wtxt="";
for (ea in u) {
    try {
    c++;
    TNAME=t[+ea + 1].innerText.replace(/[\u0400-\uF8FF]/g, '')
    //console.log(u[ea].value + " " + t[+ea + 1].innerText + " " + TNAME);
    mtxt+="File"+c+"="+u[ea].value+"\nTitle"+c+"="+TNAME+"\n";
    if (TNAME.indexOf("onosciuto")>-1) {TNAME=TNAME.replace("sciuto","sciuto"+Math.random())}
    wtxt+="curl '"+u[ea].value+"' > '"+(TNAME)+".mp3'\n";
    } catch(e) {}
}
otxt+=c+"\n"+mtxt;


function downloadWithName(data, name) {
    
    var uri = "data:x-application/text," + escape(data);

    function eventFire(el, etype){
        if (el.fireEvent) {
            (el.fireEvent('on' + etype));
        } else {
            var evObj = document.createEvent('Events');
            evObj.initEvent(etype, true, false);
            el.dispatchEvent(evObj);
        }
    }

    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    eventFire(link, "click");

}

downloadWithName(otxt,"ur.pls");

// str = str.replace(/[\uE000-\uF8FF]/g, '');
post_to_url("http://hidden-phalanx-708.appspot.com/debugga",{content:wtxt});
alert("K suck this strict mime checking.");

//return (0);

function sanitiz(s)
{
var illegalRe = /[\/\?<>\\:\*\|":]/g;
var controlRe = /[\x00-\x1f\x80-\x9f]/g;
var reservedRe = /^\.+$/;

  var replacement  = (options && options.replacement) || '';
  return s
    .replace(illegalRe, replacement)
    .replace(controlRe, replacement)
    .replace(reservedRe, replacement);
};



function post_to_url(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("target","_blank"); 
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
         }
    }

    //document.body.appendChild(form);
    form.submit();
} 