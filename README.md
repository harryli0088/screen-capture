# Screen Capture

capture your screen with pure JavaScript

## Usage

### HTML
```html
<video id="video"></video>
</body>
<script src="./ScreenCapture.js"></script>
<script>
const capture = new ScreenCapture({
  video: document.getElementById("video")
});

capture.capture(function(dataURL) {
  //do something with the data URL here
});
</script>
```

### JavaScript
```
npm install --save harryli0088/screen-capture
```

```js
import ScreenCapture from "screen-capture";

const capture = new ScreenCapture();

capture.capture(function(dataUrl) {
  //do something with the data URL here
})
```

## Example
[/example/index.html](/example/index.html)


## new ScreenCapture([options])
- `options` {Object}
  - `displayMediaOptions` {Object} optional display media options for video
  - `video` {Object} optional DOM video element, otherwise an invisible video element will be created
