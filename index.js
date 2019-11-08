function ScreenCapture(options={}) {
  let self = this;

  if(options.displayMediaOptions && typeof options.displayMediaOptions!=="object") console.warn("ScreenCapture expects options.displayMediaOptions to be an object")
  if(options.video && typeof options.video!=="object") console.warn("ScreenCapture expects options.video to be an object")

  self.canvas = document.createElement('canvas');
  self.ctx = self.canvas.getContext('2d');

  self.init = async function(callback) {
    self.displayMediaOptions = options.displayMediaOptions || { audio: false };
    self.video  = options.video || document.createElement("video");
    self.video.autoplay = true;
    
    try {
      self.video.srcObject = await navigator.mediaDevices.getDisplayMedia(self.displayMediaOptions);
      self.video.addEventListener('loadedmetadata', function() {
        //important, otherwise the canvas size won't match the video
        self.canvas.width = self.video.videoWidth;
        self.canvas.height = self.video.videoHeight;

        if(callback && typeof callback === "function") {
          callback(); //callback can be used to immediately get a capture
        }
      }, false);
    } catch(err) {
      console.error("ScreenCapture error: " + err);
    }
  }
  self.init();

  self.stop = function() {
    let tracks = self.video.srcObject.getTracks();
    tracks.forEach(track => track.stop());
    self.video.srcObject = null;
  }

  self.capture = function(callback) {
    self.ctx.drawImage(self.video,0,0);
    const dataURL = self.canvas.toDataURL('image/jpeg');

    if(callback && typeof callback === "function") {
      callback(dataURL); //send data url to provided callback
    }
  }
}

if(typeof modules !== "undefined") {
  modules.export = ScreenCapture;
}
