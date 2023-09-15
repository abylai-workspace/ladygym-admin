import React, { useState } from 'react';
import './style.css'
const RangeSlider = ({ min, max, step, value, onChange }) => {
  const [sliderValue, setSliderValue] = useState(value);

  const handleSliderChange = (event) => {
    const newValue = event.target.value;
    setSliderValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="range-slider">
      <input
        type="range"
        min={min}
        max={max}
        step={(max - min) / 2}
        value={sliderValue}
        onChange={handleSliderChange}
      />
      {/* <span className="slider-value">{sliderValue}</span> */}
    </div>
  );
};

export default RangeSlider;
