import React, { useState } from "react";
import reactCSS from 'reactcss'
import { SketchPicker, CustomPicker } from 'react-color'

const ColorPicker = ({ hex, onChange, onChangeComplete, style }) => {
  const [colorState, setColorState] = useState({ hex, ready: false });

  const handleClick = () => {
    setColorState({ ...colorState, ready: !colorState.ready });
  };

  const handleClose = () => {
    setColorState({ ...colorState, ready: false });
  };

  const handleChange = (input) => {
    setColorState({ ...colorState, hex: input.hex });

    if (onChange)
      onChange(input);
  }

  const handleChangeComplete = (input) => {
    if (onChangeComplete)
      onChangeComplete(input);
  }

  const defaultStyles = reactCSS({
    'default': {
      colorWrapper: {
        display: 'inline-block',
        cursor: 'pointer',
      },
      color: {
        width: '30px',
        height: '25px',
        background: `${colorState.hex}`,
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    },
  });

  const customStyle = {
    ...defaultStyles,
    colorWrapper: style && style.colorWrapper || defaultStyles.colorWrapper,
    color: style && style.color || defaultStyles.color,
  };

  return (
    <div>
      <div style={customStyle.colorWrapper} onClick={handleClick}>
        <div style={customStyle.color} />
      </div>
      {
        colorState.ready &&
        <div style={defaultStyles.popover}>
          <div style={defaultStyles.cover} onClick={handleClose} />
          <SketchPicker
            color={colorState.hex}
            onChange={handleChange}
            onChangeComplete={handleChangeComplete}
            disableAlpha={true}
            presetColors={[]} />
        </div>
      }
    </div>
  );
};

export default CustomPicker(ColorPicker);
