import React from 'react';

function CameraOverlay() {
    const [ width, height ] = [375, 667];
    const circleRadius = width / 2.5;
    const viewBox = `0 0 ${width} ${height}`;
    console.log(width, height);
    console.log(circleRadius);
    console.log(viewBox);
  
    return (
      <div style={{aspectRatio: 1}}>
        <svg
          height={height}
          viewBox={viewBox}>
            <defs>
              <mask id="mask">
                <rect height={height} width={width} fill="#fff" />
                <circle r={circleRadius} cx={width / 2} cy={height / 3} fill="#000" />
              </mask>
            </defs>
    
            <rect
              height={height}
              width={width}
              fill="#ffffff"
              mask="url(#mask)"
            />
        </svg>
      </div>
    );
  }
  
  export default CameraOverlay;
  