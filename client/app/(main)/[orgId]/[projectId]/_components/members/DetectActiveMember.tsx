'use client'
import React, { useEffect, useState } from "react";

const DetectActiveMember = ({ children }:{children:React.ReactNode}) => {
  const [isActive, setIsActive] = useState(document.visibilityState === 'visible'); // Initial state based on visibility
  const [lastSeen, setLastSeen] = useState(new Date()); // Initial lastSeen


  useEffect(() => {
    const handleVisibilityChange = () => {
        setIsActive(document.visibilityState === 'visible')
        console.log(isActive)
    };
    const handleFocus = () => {
        setLastSeen(new Date())
        console.log(lastSeen)
    };

    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('focus', handleFocus); // Prevent accidental removal
    };
  }, []);

  return (
    <div>
      {children}
    </div>
  );
};

export default DetectActiveMember;
