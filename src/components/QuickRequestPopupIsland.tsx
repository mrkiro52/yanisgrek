import { useState, useEffect } from 'react';
import QuickRequestPopup from './QuickRequestPopup';

export default function QuickRequestPopupIsland() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpenRequest = () => {
      setIsOpen(true);
    };

    window.addEventListener('openQuickRequest', handleOpenRequest);
    
    return () => {
      window.removeEventListener('openQuickRequest', handleOpenRequest);
    };
  }, []);

  return (
    <QuickRequestPopup 
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    />
  );
}
