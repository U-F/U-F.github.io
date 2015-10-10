p5loaded=function(){
displayMsg("
// Try this, wont work in external window for now
stoca= opendivwin('contents','wintitle',612,612);

var sketch = function( p ) {

  var x = 100; 
  var y = 100;

  p.setup = function() {
    p.createCanvas(600, 600);
  };

  p.draw = function() {
    p.background(0);
    p.fill(255*Math.random(),128,128,Math.random()*128);
    p.rect(x,y,50,50);
  };
};

myp5 = new p5(sketch,stoca);

	")

}

loadScript("http://cdnjs.cloudflare.com/ajax/libs/p5.js/0.4.15/p5.js",p5loaded)

