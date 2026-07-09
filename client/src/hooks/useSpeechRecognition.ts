import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

export function useSpeechRecognition(
  onResult: (text: string) => void,
) {
  const recognitionRef = useRef<any>(null);

  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (!window.webkitSpeechRecognition) return;

    const recognition =
      new window.webkitSpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      const text =
        event.results[0][0].transcript;

      onResult(text);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, [onResult]);

  const startListening = () => {
    recognitionRef.current?.start();
    setListening(true);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  return {
    listening,
    startListening,
    stopListening,
  };
}