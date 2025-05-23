import React from 'react';
import './Countdown.css';

const Countdown = ({ seconds }) => {
  return (
    <div className="countdown-container">
      <div className="countdown-value">{seconds}</div>
    </div>
  );
};

export default Countdown;