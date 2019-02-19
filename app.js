(function() {
'use strict';

const video = document.querySelector('video');
const button = document.getElementById('button');
const canvas = document.getElementById('canvas');
canvas.width = 480;
canvas.height = 360;

button.addEventListener('click', () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
});

const constraints = {
  video: true,
  audio: false
};

function handleSuccess(stream) {
  window.stream = stream; // make stream available to browser console
  video.srcObject = stream;
}

function handleError(error) {
  console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}

navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);






/*
-----------------------------------
-- SERVICE WORKER -----------------
-----------------------------------
*/
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./sw.js')
    .then(function() { console.log('Service Worker Registered'); });
}

})();
