import { useState } from 'react';

export function useToast() {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');

  const showToast = (msg: string) => {
    setMessage(msg);
    setIsVisible(true);
    setTimeout(() => setIsVisible(false), 3000); // Hide toast after 3 seconds
  };

  return {
    isVisible,
    message,
    showToast
  };
}
