import { useState, useEffect, useRef } from 'react';

let recognition;
if (window.SpeechRecognition || window.webkitSpeechRecognition) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
}

export const useSpeechRecognition = ({ language = 'en-US' }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);
  const langRef = useRef(language);
  langRef.current = language;

  const startListening = () => {
    if (!recognition) {
      setError("Speech recognition not supported in this browser.");
      return;
    }
    setTranscript('');
    setError(null);
    setIsListening(true);
    recognition.lang = langRef.current;
    recognition.start();
  };
  
  useEffect(() => {
    if (!recognition) return;
    const handleResult = (event) => {
      const currentTranscript = event.results[0][0].transcript;
      setTranscript(currentTranscript);
      setIsListening(false);
    };
    const handleError = (event) => {
      setError(event.error);
      setIsListening(false);
    };
    const handleEnd = () => {
      setIsListening(false);
    };
    recognition.addEventListener('result', handleResult);
    recognition.addEventListener('error', handleError);
    recognition.addEventListener('end', handleEnd);
    return () => {
      recognition.removeEventListener('result', handleResult);
      recognition.removeEventListener('error', handleError);
      recognition.removeEventListener('end', handleEnd);
    };
  }, []);

  return { isListening, transcript, error, startListening };
};