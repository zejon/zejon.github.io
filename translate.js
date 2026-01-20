window.onload = function() {
  // Get the video element from the DOM
  const video = document.getElementById('videoElement');
  const errorMessage = document.getElementById('errorMessage');

  // Checks if the browser supports getUserMedia
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Define the constraints for the media stream, requesting video
    const constraints = { video: true };

    // Request access to the user's camera
    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        // If works, the camera connects to the video element
        video.srcObject = stream;
        video.style.display = 'block'; // Ensure video is visible
        errorMessage.style.display = 'none'; // Hide error message
      })
      .catch((err) => {
        // if it does not work, hide the video element and display an error message
        console.error('An error occurred: ' + err);
        video.style.display = 'none'; 
        errorMessage.style.display = 'block'; 
        
        // if error message will be displayed
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          errorMessage.textContent = 'Camera access was denied. Please allow camera access in your browser settings to use this feature.';
        } else if (err.name === 'NotFoundError') {
          errorMessage.textContent = 'No camera found on this device.';
        } else {
          errorMessage.textContent = 'An error occurred while accessing the camera.';
        }
      });
  } else {
    // If getUserMedia is not supported, show this message
    video.style.display = 'none';
    errorMessage.style.display = 'block';
    errorMessage.textContent = 'Your browser does not support camera access. Please try a different browser.';
  }
};