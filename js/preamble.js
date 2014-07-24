function array2heapPtr(arr) {
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

var Module = {    'noInitialRun': true,    'noExitRuntime': true};
calcola = Module.cwrap("calcola","number",["number"]);
BO=loadScript("https://u-f.github.io/js/wrap1test_opt.js")

timando=array2heapPtr([4.1,4.0,3.9,3.9,3.9,3.9,3.9,3.9,3.9,3.9,3.9,3.9,3.9,3.9])
calcola(timando.byteOffset)
