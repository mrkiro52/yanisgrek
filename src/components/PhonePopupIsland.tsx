import { useState, useEffect } from 'react';
import PhonePopup from './PhonePopup';

export default function PhonePopupIsland() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpenPopup = () => {
      setIsOpen(true);
    };

    window.addEventListener('openPhonePopup', handleOpenPopup);
    return () => window.removeEventListener('openPhonePopup', handleOpenPopup);
  }, []);

  return (
    <PhonePopup 
      isOpen={isOpen} 
      onClose={() => setIsOpen(false)} 
    />
  );
}
