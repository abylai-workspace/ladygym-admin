import React, { useState } from 'react';
import './style.css'


interface IRadio{
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (newValue: number) => void;
  disabled?: boolean
}
const RangeSlider = ({ min, max, step, value, onChange,disabled }: IRadio) => {
  const [sliderValue, setSliderValue] = useState(value);

  const handleSliderChange = (event:any) => {
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
        disabled={disabled}
      />
      {/* <span className="slider-value">{sliderValue}</span> */}
    </div>
  );
};

export default RangeSlider;
