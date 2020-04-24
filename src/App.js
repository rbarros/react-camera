import React, { useState } from 'react';
import Camera, { IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import * as watermark from 'watermarkjs';
// import logo from './logo.png';
import ImagePreview from './ImagePreview';
import molduraChaves from './moldura-chaves.png';

function dataURItoBlob (dataURI) {
  let byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  let ab = new ArrayBuffer(byteString.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  let blob = new Blob([ab], {type: mimeString});
  return blob;
}

function padWithZeroNumber (number, width) {
  number = number + '';
  return number.length >= width
    ? number
    : new Array(width - number.length + 1).join('0') + number;
}

function getFileExtention (blobType) {
  // by default the extention is .png
  let extention = IMAGE_TYPES.PNG;

  if (blobType === 'image/jpeg') {
    extention = IMAGE_TYPES.JPG;
  }
  return extention;
}

function getFileName (imageNumber, blobType) {
  const prefix = 'photo';
  const photoNumber = padWithZeroNumber(imageNumber, 4);
  const extention = getFileExtention(blobType);

  return `${prefix}-${photoNumber}.${extention}`;
}

function downloadImageFileFomBlob (blob, imageNumber) {
  window.URL = window.webkitURL || window.URL;

  let anchor = document.createElement('a');
  anchor.download = getFileName(imageNumber, blob.type);
  anchor.href = window.URL.createObjectURL(blob);
  let mouseEvent = document.createEvent('MouseEvents');
  mouseEvent.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
  anchor.dispatchEvent(mouseEvent);
}

function App (props) {
  const [imageNumber, setImageNumber] = useState(0);
  const [dataUri, setDataUri] = useState('');

  function downloadImageFile (dataUri, imageNumber) {
    let blob = dataURItoBlob(dataUri);
    watermark([blob, molduraChaves])
    .image(watermark.image.center())
    .then(img => {
      let blob = dataURItoBlob(img.src);
      setDataUri(img.src);
      downloadImageFileFomBlob(blob, imageNumber);
    });
  }

  // function handleTakePhoto (dataUri) {
  //   downloadImageFile(dataUri, imageNumber);
  //   setImageNumber(imageNumber + 1);
  // }
  function handleTakePhotoAnimationDone (dataUri) {
    console.log('takePhoto');
    downloadImageFile(dataUri, imageNumber);
    setImageNumber(imageNumber + 1);
  }

  function handlerActionButton() {
    setDataUri('');
}

  const isFullscreen = false;
  return (
    <div>
      {
        (dataUri)
          ? <ImagePreview dataUri={dataUri}
              isFullscreen={isFullscreen}
              action={handlerActionButton}
            />
          : <div>
              <Camera
                // onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
                onTakePhotoAnimationDone = { (dataUri) => { handleTakePhotoAnimationDone(dataUri); } }
                idealResolution = {{width: 640, height: 480}}
                imageType={IMAGE_TYPES.PNG}
                isFullscreen={isFullscreen}
              />
              <div style={{position: 'absolute', left: '21.6%', top: '3%'}}>
                <img src={molduraChaves} style={{width: '770px'}} />
              </div>
            </div>
      }
    </div>
  );
}

export default App;
