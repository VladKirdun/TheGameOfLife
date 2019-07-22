import React from 'react';
import './styles.css';

const Buttons = ({ startButton, stopButton, clearButton }) => (
  <div className="center">
    <button className="button" onClick={startButton}>Play</button>
    <button className="button" onClick={stopButton}>Pause</button>
    <button className="button" onClick={clearButton}>Clear</button>
  </div>
);

export default Buttons;
