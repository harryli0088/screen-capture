# Screen Capture

capture your screen with pure JavaScript

## Usage
First instantiate ScreenCapture then call the init() function with a callback which will prompt the user for permission. Once the user gives permission, the callback will be fired and you can begin getting screen captures

### HTML
```html
<video id="video"></video>
</body>
<script src="./ScreenCapture.js"></script>
<script>
const capture = new ScreenCapture({
  video: document.getElementById("video")
});

capture.init(function() {
  capture.capture(function(dataURL) {
    //do something with the dataURL here
  });

  //you can set up an interval here to periodically get screen captures
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

capture.init(function() {
  capture.capture(function(dataURL) {
    //do something with the dataURL here
  });

  //you can set up an interval here to periodically get screen captures
})
```

## Example
[/example/index.html](/example/index.html)


## new ScreenCapture([options])
- `options` {Object}
  - `displayMediaOptions` {Object} optional display media options for video
  - `video` {Object} optional DOM video element, otherwise an invisible video element will be created
