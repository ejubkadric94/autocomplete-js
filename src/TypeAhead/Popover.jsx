import React, { useEffect } from 'react';

const Popover = ({ parentRef, hide, onHide, children }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !hide) {
        onHide();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [hide, onHide]);

  if (hide) {
    return null;
  }

  const parentRect = parentRef.current?.getBoundingClientRect();

  const popoverStyle = {
    position: 'absolute',
    top: parentRect ? parentRect.bottom : 0,
    left: parentRect ? parentRect.left : 0,
    width: parentRect ? parentRect.width : 0,
    background: 'white',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    display: 'block',
  };

  return (
    <div style={popoverStyle}>
      {children}
    </div>
  );
};

export default Popover;
