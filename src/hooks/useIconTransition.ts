import { useState, useEffect } from 'react';
import L from 'leaflet';

const useIconTransition = (
  quantity: number | 'N/A',
  prevQuantity: number | 'N/A',
  unitName: string,
  originalIcon: L.Icon,
  greenIcon: L.Icon
) => {
  const [icon, setIcon] = useState<L.Icon>(originalIcon);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const [fadeClass, setFadeClass] = useState('fade show');

  useEffect(() => {
    if (quantity !== 'N/A' && prevQuantity !== 'N/A' && quantity > prevQuantity) {
      console.log(`Quantity increased for ${unitName}: ${prevQuantity} -> ${quantity}`);
      setFadeClass('fade'); // Start fade-out
      setTimeout(() => {
        setIcon(greenIcon); // Change icon after fade-out
        setFadeClass('fade show'); // Start fade-in
      }, 500); // Duration of the fade-out
      const id = window.setTimeout(() => {
        console.log(`Reverting icon color for ${unitName}`);
        setFadeClass('fade'); // Start fade-out
        setTimeout(() => {
          setIcon(originalIcon); // Change icon after fade-out
          setFadeClass('fade show'); // Start fade-in
        }, 500); // Duration of the fade-out
      }, 5000); // Revert back to original color after 5 seconds
      setTimeoutId(id);
    }
  }, [quantity, prevQuantity, unitName, originalIcon, greenIcon]);

  useEffect(() => {
    return () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        console.log(`Cleared timeout for ${unitName}`);
      }
    };
  }, [timeoutId, unitName]);

  return { icon, fadeClass };
};

export default useIconTransition;
