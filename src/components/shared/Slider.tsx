import Slider from 'rc-slider';
import React from 'react';

interface ControlledRangeProps {
  value: number[];
  onChange: (value: number | number[]) => void;
  step?: number;
  min?: number;
  max?: number;
  marks?: Record<number, string>;
  allowCross?: boolean;
  pushable?: boolean;
  draggableTrack?: boolean;
}

const ControlledRange: React.FC<ControlledRangeProps> = ({
  value,
  onChange,
  step = null,
  min,
  max,
  marks,
  allowCross,
  pushable,
  draggableTrack,
}) => {
  return (
    <Slider
      range
      min={min}
      max={max}
      marks={marks}
      step={step}
      onChange={onChange}
      defaultValue={value}
      allowCross={allowCross}
      pushable={pushable}
      draggableTrack={draggableTrack}
    />
  );
};

export default ControlledRange;
