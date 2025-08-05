// client/src/components/AnimatedBow.jsx
import React from 'react';

const AnimatedBow = (props) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M50 0L20 40H80L50 0Z" fill="#FFC0CB"/>
    <path d="M20 40C20 40 10 50 0 60L50 100L100 60C90 50 80 40 80 40H20Z" fill="#FFC0CB"/>
    <path d="M50 100L30 60H70L50 100Z" fill="#FF1493"/>
    <path d="M50 40L20 60L50 80L80 60L50 40Z" fill="#FF1493"/>
  </svg>
);

export default AnimatedBow;