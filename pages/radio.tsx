import React, { useState } from 'react';

const VideoPlayer: React.FC = () => {
  const [playRequested, setPlayRequested] = useState(false);

  const handlePlayRequest = () => {
    setPlayRequested(true);
  };

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000', position: 'relative' }}>
      {!playRequested && (
        <div style={{ position: 'absolute', zIndex: 1, cursor: 'pointer' }} onClick={handlePlayRequest}>
          <h1 style={{ color: '#fff', fontSize: '24px' }}>Click to Play</h1>
        </div>
      )}
      {playRequested && (
        <video style={{ width: '100%', height: 'auto' }} autoPlay loop>
          <source src="/raccoon.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default VideoPlayer;
