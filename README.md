# Screen Capture

capture your screen with pure JavaScript

## Usage
First instantiate ScreenCapture, then call the init() function which returns a Promise. This will prompt the user for permission to share the screen. Once the user gives permission, the Promise is resolved and you can begin capturing the screen.

### HTML
```html
<video id="video"></video>
</body>
<script src="./ScreenCapture.js"></script>
<script>
const capture = new ScreenCapture({
  video: document.getElementById("video")
});

capture.init().then(function() {
  capture.capture().then(function(dataURL) {
    //do something with the dataURL here
  });

  //you can set an interval here to periodically get screen captures
}).catch(function(err) {
  console.log(err); //the user probably denied permission to screen capture
})
</script>
```

### JavaScript
```
npm install --save harryli0088/screen-capture
```

```js
import ScreenCapture from "screen-capture";

const capture = new ScreenCapture();

capture.init().then(function() {
  capture.capture().then(function(dataURL) {
    //do something with the dataURL here
  });

  //you can set an interval here to periodically get screen captures
}).catch(function(err) {
  console.log(err); //the user probably denied permission to screen capture
})
```


## new ScreenCapture([options])
- `options` {Object}
  - `displayMediaOptions` {Object} optional display media options for video
  - `video` {Object} optional DOM video element, otherwise an invisible video element will be created

### ScreenCapture.init()
Returns a Promise that, when resolved, indicates you can begin capturing.

```js
capture.init().then(function() {
  //you can begin capturing
}).catch(function(err) {
  console.log(err); //the user probably denied permission to screen capture
})
```

### ScreenCapture.capture([options])
Returns a Promise that, when resolved, passes the dataURL of the screen capture

```js
capture.capture(options).then(function(dataURL) {
  //do something with the dataURL here
});
```

All function parameters are optional and follow the cxt.drawImage() parameters shown here: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
- `options` {Object}
  - `sx` {Number} optional source image x offset (defaults to 0)
  - `sy` {Number} optional source image y offset (defaults to 0)
  - `sWidth` {Number} optional width of sub-rectangle of source image to draw (defaults to video width)
  - `sHeight` {Number} optional height of sub-rectangle of source image to draw (defaults to video height)
  - `dx` {Number} optional destination canvas x offset (defaults to 0)
  - `dy` {Number} optional destination canvas y offset (defaults to 0)
  - `dWidth` {Number} optional width to draw on destination canvas (defaults to video width)
  - `dHeight` {Number} optional height to draw on destination canvas (defaults to video height)

### ScreenCapture.stop()
Stops screen sharing


## Example
[/example/index.html](/example/index.html)

## Acknowledgements
This was created using the examples found here:
- MDN - https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API/Using_Screen_Capture
- Kaiido - https://stackoverflow.com/a/32708998

## License
MIT
