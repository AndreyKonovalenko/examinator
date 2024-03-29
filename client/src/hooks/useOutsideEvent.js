import { useEffect } from 'react';

export const useOutsideEvent = (ref, func) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        func();
      }
    };
    const handleHideDropdown = (event) => {
      if (event.key === 'Escape') {
        func();
      }
    };

    // Bind the event listener
    document.addEventListener('keydown', handleHideDropdown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('keydown', handleHideDropdown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, func]);
};
