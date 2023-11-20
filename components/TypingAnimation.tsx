import { useState, useEffect } from 'react';


const TypingAnimation = ({ text }:{text:string}) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      setDisplayedText((prevText) => prevText + text[currentIndex]);
      currentIndex++;

      if (currentIndex === text.length) {
        clearInterval(intervalId);
      }
    }, 100); // Adjust the interval as needed

    return () => clearInterval(intervalId);
  }, [text]);

  return <span>{displayedText}</span>;
};

export default TypingAnimation;