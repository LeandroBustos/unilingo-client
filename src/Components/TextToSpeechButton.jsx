import React from 'react';

const TextToSpeechButton = ({ text}) => {
  const handleButtonClick = () => {
    if ('speechSynthesis' in window) {
      const speechSynthesis = window.speechSynthesis;
      const speechText = new SpeechSynthesisUtterance(text);

      speechText.rate = 0.4;

      speechSynthesis.speak(speechText);
    } else {
      console.error('Tu navegador no soporta la API de Text-to-Speech.');
    }
  };

  return (
    <button onClick={handleButtonClick} style={{
        backgroundColor: '#282c34',
        color: 'white',
        padding: '10px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    }}>
      Start text to speech
    </button>
  );
};

export default TextToSpeechButton;