// NON HERE DONT MIND IDK

// // --- Configuration ---
// const VIDEO_FPS = 5; // Send 5 frames per second (predict every 200ms)
// let predictionInterval = null;

// // --- DOM Elements ---
// const video = document.getElementById('videoElement');
// const errorMessage = document.getElementById('errorMessage');
// // We are using your existing #subtitleBox as the prediction output
// const resultElement = document.getElementById('subtitleBox'); 
// const canvas = document.getElementById('canvasElement'); // The hidden canvas

// // --- Prediction Logic ---

// /**
//  * Sends the captured frame to the Flask server for prediction.
//  * @param {Blob} imageBlob The captured image data (Blob object).
//  */
// async function sendFrameToFlask(imageBlob) {
//     // -------------------------------------------------------------------
//     // This is the actual Fetch/AJAX code to communicate with Flask.
//     // Ensure your Flask server has the /predict_frame route set up.
//     // -------------------------------------------------------------------

//     const endpoint = '/predict_frame'; 
//     const formData = new FormData();
//     // 'image' must match the key in Flask: request.files.get('image')
//     formData.append('image', imageBlob, 'frame.jpeg'); 

//     try {
//         const response = await fetch(endpoint, {
//             method: 'POST',
//             body: formData
//         });

//         const result = await response.json();

//         if (response.ok) {
//             // SUCCESS: Update the subtitle box with the live prediction
//             if (result.prediction_label) {
//                 resultElement.textContent = result.prediction_label;
//             }
//         } else {
//             // ERROR: Show the error in the subtitle box or console
//             resultElement.textContent = `Error: ${result.error || 'Server processing failed'}`;
//             console.error('Prediction Error:', result.error);
//         }
//     } catch (error) {
//         // Network failure (server not running or connection lost)
//         // resultElement.textContent = 'Connection error.'; // Uncomment if you want to show connection errors
//         console.error('Network or Fetch Error:', error);
//     }
// }


// /**
//  * Sets up the timer to continuously grab frames from the video element.
//  */
// function startContinuousPrediction() {
//     const context = canvas.getContext('2d');
//     const FRAME_SIZE = 224; // Must match your model's input size (224, 224)
    
//     // Set canvas dimensions
//     canvas.width = FRAME_SIZE;
//     canvas.height = FRAME_SIZE;

//     // Clear any existing loop
//     if (predictionInterval) {
//         clearInterval(predictionInterval);
//     }

//     predictionInterval = setInterval(() => {
//         // 1. Draw the current video frame onto the canvas
//         // This captures the frame and scales/crops it to 224x224.
//         context.drawImage(video, 0, 0, FRAME_SIZE, FRAME_SIZE);

//         // 2. Convert the canvas content (the frame) to an image Blob
//         canvas.toBlob((blob) => {
//             if (blob) {
//                 sendFrameToFlask(blob);
//             }
//         }, 'image/jpeg', 0.8); // Use JPEG for smaller file size
        
//     }, 1000 / VIDEO_FPS); // Run every 200 milliseconds (5 FPS)
    
//     console.log(`[JS] Continuous prediction loop started at ${VIDEO_FPS} FPS.`);
// }


// // --- Initialization (Your original window.onload function) ---

// window.onload = function() {
//     // Initial message for the subtitle box
//     resultElement.textContent = 'Waiting for camera access...';

//     // Checks if the browser supports getUserMedia
//     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//         const constraints = { video: true };

//         // Request access to the user's camera
//         navigator.mediaDevices.getUserMedia(constraints)
//             .then((stream) => {
//                 // Success: connect the camera
//                 video.srcObject = stream;
//                 video.style.display = 'block'; // Make video visible
//                 errorMessage.style.display = 'none';
//                 resultElement.textContent = 'Camera active. Analyzing signs...';

//                 // 🔥 NEW INTEGRATION POINT 🔥
//                 // Start prediction loop after the video metadata is loaded and played
//                 video.onloadedmetadata = () => {
//                     video.play();
//                     startContinuousPrediction();
//                 };
//             })
//             .catch((err) => {
//                 // Failure: display error message
//                 console.error('An error occurred: ' + err);
//                 video.style.display = 'none';
//                 errorMessage.style.display = 'block';
//                 resultElement.textContent = 'CAMERA ERROR.';
                
//                 if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
//                     errorMessage.textContent = 'Camera access was denied. Please allow camera access.';
//                 } else if (err.name === 'NotFoundError') {
//                     errorMessage.textContent = 'No camera found on this device.';
//                 } else {
//                     errorMessage.textContent = 'An error occurred while accessing the camera.';
//                 }
//             });
//     } else {
//         // If getUserMedia is not supported
//         video.style.display = 'none';
//         errorMessage.style.display = 'block';
//         errorMessage.textContent = 'Your browser does not support camera access.';
//         resultElement.textContent = 'Browser not supported.';
//     }
// };