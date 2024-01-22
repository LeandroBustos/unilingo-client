import React, { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

const YoutubeAudioPlayer = ({ url  }) => {
  const [playing, setPlaying] = useState(false);
  const [shouldUnmount, setShouldUnmount] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const playerRef = useRef(null);

  const handleProgress = (event) => {
    const { playedSeconds } = event;

    // Check if the video has reached the end time (0:45)
    setCurrentTime(playedSeconds - 30);
    if (playedSeconds >= 45) {
      setShouldUnmount(true);
      setPlaying(false);
    }

    };

    
  const handleButtonClick = () => {
    setPlaying(!playing);
  };

  useEffect(() => {
    // Check if shouldUnmount is true, and unmount the component
    if (shouldUnmount) {
      setShouldUnmount(false);
      setCurrentTime(0); // Reset current time when unmounting
    }
  }, [shouldUnmount]);

  return (
    <div>
      {!shouldUnmount && (
        <div style={{ display: 'none' }}>
          {/* Hidden video element */}
          <ReactPlayer
            ref={playerRef}
            url={url}
            playing={playing}
            onProgress={handleProgress} // Handle the end of playback
            config={{
              youtube: {
                playerVars: {
                  start: 30,
                  end: 45.2,
                  autoplay: 0,
                  controls: 0, // Hide native controls
                  modestbranding: 1,
                  loop: 0,
                  fs: 0,
                  disablekb: 1,
                  iv_load_policy: 3,
                },
              },
            }}
            width="100%"
            height="100%"
          />
        </div>
      )}

          {/* Custom progress bar with time indicator */}
          <div style={{ marginTop: '10px', textAlign: 'center', fontSize: '18px' }}>
            {`${formatTime(currentTime)} / ${formatTime(15)}`}
          </div>
          <progress max={15} value={currentTime}></progress>

          {/* Custom button for playback control */}
          <button onClick={handleButtonClick} style={{
            backgroundColor: '#282c34',
            color: 'white',
            padding: '10px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}>{playing ? 'Pause' : 'Play'}</button>
    </div>
  );
};

export default YoutubeAudioPlayer;