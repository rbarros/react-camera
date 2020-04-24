import React, { setState } from 'react';
import PropTypes from 'prop-types';

import './styles/imagePreview.css';

export const ImagePreview = ({ dataUri, isFullscreen, action }) => {
  let classNameFullscreen = isFullscreen ? 'demo-image-preview-fullscreen' : '';
  return (
    <div className={'demo-image-preview ' + classNameFullscreen}>
      <img src={dataUri} />

      <button onClick={action}>Tirar outra foto</button>
    </div>
  );
};

ImagePreview.propTypes = {
  dataUri: PropTypes.string,
  isFullscreen: PropTypes.bool,
  action: PropTypes.func
};

export default ImagePreview;