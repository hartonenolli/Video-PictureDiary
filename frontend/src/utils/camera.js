const camera = {
  stream: null,

  startCamera: async function (videoElement, w = 680, h = 480) {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.stream = mediaStream;
      if (videoElement) {
        videoElement.width = w;
        videoElement.height = h;
        videoElement.srcObject = mediaStream;
        await videoElement.play();
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  },

  stopCamera: function (videoElement) {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    if (videoElement) {
      videoElement.srcObject = null;
    }
  },

  takeSnapshot: function (videoElement) {
    if (!videoElement) return null;
    const canvas = document.createElement("canvas");
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/png"); // palautetaan base64-kuva
  }
};

export default camera;