array2heapPtr= function (arr) {
    // create and populate some data
    var floatData = new Float64Array(arr.length);
    for (i = 0; i < floatData.length; i++) floatData[i] = arr[i];
    // get the length of the data in bytes
    var numBytes = floatData.length * floatData.BYTES_PER_ELEMENT;
    // malloc enough space for the data
    var ptr = Module._malloc(numBytes);
    // get a bytes-wise view on the newly allocated buffer
    var heapBytes = new Uint8Array(Module.HEAPU8.buffer, ptr, numBytes);
    // copy data into heapBytes
    heapBytes.set(new Uint8Array(floatData.buffer));
    return heapBytes;
}
postload = function(){
calcKPSS = Module.cwrap("calcKPSS","number",["number","number","number"]);
calcADF = Module.cwrap("calcADF","number",["number","number","number"]);

console.log("Modloaded.")}
BO=loadScript("https://u-f.github.io/js/wrap1test_opt.js",postload);

grabba = function(mark,s){return s.split(mark)[1].split("\n")[0]}


KPSS_JS = function(INPUT,order) {
var timando=array2heapPtr(INPUT);
var ret=calcKPSS(timando.byteOffset,INPUT.length,order)

fi=FS.readFile("KPSS1.TXT")
resultfile=String.fromCharCode.apply(null, fi);
console.log(resultfile);
statistic=grabba("statistic = ",resultfile)
//pval=grabba("Interpolated p-value ",resultfile)
cvalues=grabba("Critical values: ",resultfile)
vals=cvalues.split("   ")

return {statistic:statistic,vals:vals,ret:ret}
}

ADF_JS = function(INPUT,order) {
var timando=array2heapPtr(INPUT);
var ret=calcADF(timando.byteOffset,INPUT.length,order)

fi=FS.readFile("ADF1.TXT")
resultfile=String.fromCharCode.apply(null, fi);
console.log(resultfile);
//statistic=grabba("statistic = ",resultfile)
//pval=grabba("Interpolated p-value ",resultfile)
//cvalues=grabba("Critical values: ",resultfile)
//vals=cvalues.split("   ")

return {ret:ret,res:resultfile}
}

