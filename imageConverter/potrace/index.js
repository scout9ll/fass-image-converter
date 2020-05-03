var potrace = require("potrace");

// Tracing

var trace = new potrace.Potrace();

// You can also pass configuration object to the constructor
trace.setParameters({
  threshold: 128,
  color: "#880000",
});

function potraceImage(localfile) {
  return new Promise((resolve,reject) => {
    trace.loadImage(localfile, async (err) => {
      if (err) reject(err);
      resolve(Buffer.from(trace.getSVG())); // returns SVG document contents
      // trace.getPathTag(); // will return just <path> tag
      // trace.getSymbol('traced-image'); // will return <symbol> tag with given ID
    });
  })
}

// potraceImage('./test.jpg');
module.exports = { potraceImage };
// Posterization

// var posterizer = new potrace.Posterize();

// posterizer.loadImage('path/to/image.png', function(err) {
//   if (err) throw err;

//   posterizer.setParameter({
//     color: '#ccc',
//     background: '#222',
//     steps: 3,
//     threshold: 200,
//     fillStrategy: potrace.Posterize.FILL_MEAN

//   });

//   posterizer.getSVG();
//   // or
//   posterizer.getSymbol('posterized-image');
// });
