import React, { useState, useEffect, useRef } from 'react';

const VideoPlayer: React.FC = () => {
  const [playRequested, setPlayRequested] = useState(false);
  const [audioIndex, setAudioIndex] = useState<number | null>(null);
  const [bonusFeature, setBonusFeature] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a', 'Enter'
  ];
  const [keySequence, setKeySequence] = useState<string[]>([]);

  const handlePlayRequest = () => {
    setPlayRequested(true);
  };

  const getRandomAudioIndex = () => {
    return Math.floor(Math.random() * audioFiles.length);
  };

  useEffect(() => {
    if (playRequested && audioIndex === null) {
      setAudioIndex(getRandomAudioIndex());
    }
  }, [playRequested]);

  const handleDoubleClick = () => {
    setAudioIndex(getRandomAudioIndex());
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    const newKeySequence = [...keySequence, event.key].slice(-konamiCode.length);

    if (newKeySequence.join('') === konamiCode.join('')) {
      setBonusFeature(true);
    }

    setKeySequence(newKeySequence);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [keySequence]);

  const audioFiles = [
    'getlucky.mp3',
    'whatislove.mp3',
    'heyya.mp3',
    'partyrock.mp3',
    'rasputin.mp3',
    'shboom.mp3',
    'uptownfunk.mp3',
    'virtualinsanity.mp3',
    'wakemeup.mp3',
    'wiisports.mp3',
    'afterparty.mp3',
    'allmyfellas.mp3',
    'summer.mp3',
    'onemoretime.mp3',
    'entersandman.mp3',
    'feelgoodinc.mp3',
    'funkytown.mp3',
    'happytogether.mp3',
    'saudianthem.mp3',
    'hotlinebling.mp3',
    'low.mp3',
    'september.mp3',
    'subwaysurfers.mp3',
    'thriller.mp3',
    'americanidiot.mp3',
    'billiejean.mp3',
    'jumpintheline.mp3',
  ];

  const getCurrentAudioFile = () => {
    if (bonusFeature) {
      return 'bonusfeature.mp3';
    }
    return audioFiles[audioIndex ?? 0];
  };

  const handleAudioEnd = () => {
    setAudioIndex(getRandomAudioIndex());
    audioRef.current?.play();
  };

  return (
    <div 
      style={{ 
        width: '100%', 
        height: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#000', 
        position: 'relative',
        cursor: 'pointer'
      }}
      onClick={handlePlayRequest}
      onDoubleClick={handleDoubleClick}
    >
      {!playRequested && (
        <div style={{ position: 'absolute', zIndex: 1 }}>
          <h1 style={{ color: '#fff', fontSize: '24px' }}>
            Click to Play <br></br>(please note that some audios are VERY loud)
          </h1>
        </div>
      )}
      {playRequested && audioIndex !== null && (
        <React.Fragment>
          <video style={{ width: '100%', height: 'auto' }} autoPlay loop muted>
            <source src="/raccoon.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <audio 
            ref={audioRef} // Reference to the audio element
            src={`/audio/${getCurrentAudioFile()}`} 
            autoPlay 
            onEnded={handleAudioEnd} // Trigger when the song ends
          />
        </React.Fragment>
      )}
    </div>
  );
};

export default VideoPlayer;
