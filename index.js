function ScreenCapture(options={}) {
  let self = this;

  if(options.displayMediaOptions && typeof options.displayMediaOptions!=="object") console.warn("ScreenCapture expects options.displayMediaOptions to be an object")
  if(options.video && typeof options.video!=="object") console.warn("ScreenCapture expects options.video to be an object")

  self.canvas = document.createElement('canvas');
  self.ctx = self.canvas.getContext('2d');

  self.init = function() {
    return new Promise(async (resolve, reject) => {
      try {
        self.displayMediaOptions = options.displayMediaOptions || { audio: false };
        self.video  = self.video || options.video || document.createElement("video"); //use the existing video if it exists, else use the options video if it exists, else default to a new video element
        self.video.autoplay = true;
        self.video.srcObject = await navigator.mediaDevices.getDisplayMedia(self.displayMediaOptions);
        self.video.addEventListener('loadedmetadata', function() {
          //important, otherwise the canvas size won't match the video
          self.canvas.width = self.video.videoWidth;
          self.canvas.height = self.video.videoHeight;

          resolve();
        }, false);
      } catch(err) {
        reject(err);
      }
    });
  }

  self.stop = function() {
    let tracks = self.video.srcObject.getTracks();
    tracks.forEach(track => track.stop());
    self.video.srcObject = null;
  }

  self.capture = function(options={}) {
    return new Promise((resolve, reject) => {
      try {
        const sx = options.sx || 0;
        const sy = options.sy || 0;
        const sWidth = options.sWidth || self.video.videoWidth;
        const sHeight = options.sHeight || self.video.videoHeight;
        const dx = options.dx || 0;
        const dy = options.dx || 0;
        const dWidth = options.dWidth || self.canvas.width;
        const dHeight = options.dHeight || self.canvas.height;

        self.ctx.drawImage(self.video, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        const dataURL = self.canvas.toDataURL('image/jpeg');

        resolve(dataURL);
      } catch(err) {
        reject(err);
      }
    });
  }
}

if(typeof module !== "undefined") {
  module.exports = ScreenCapture;
}
