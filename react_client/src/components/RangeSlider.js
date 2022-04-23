import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


function valueLabelFormat(value) {
  
    let scaledValue = value;

    switch(true)
    {
        case (scaledValue < 20): return `${0}`;
        case (scaledValue >= 20 && scaledValue < 40): return `${1}`;
        case (scaledValue >= 40 && scaledValue < 60): return `${2}`;
        case (scaledValue >= 60 && scaledValue < 80): return `${3}`;
        case (scaledValue >= 80 && scaledValue < 100): return `${4}`;
        case (scaledValue == 100): return `${5}`;
    }
  
}

function getAriaValueText(value) {
  
    return value;
  
}

export default function RangeSlider(props) {


  return (
    <Box sx={{ width: '100%' }}>
      <Slider
        getAriaLabel={() => 'Rating'}
        value={props.currentRate}
        onChange={props.updateData}
        valueLabelDisplay="auto"
        getAriaValueText={getAriaValueText}
        valueLabelFormat={valueLabelFormat}
        step={20}

      />
    </Box>
  );
}