import React from 'react'
import PropTypes from 'prop-types';
import OutputBox from './output-box';

const propTypes = {
  luminance: PropTypes.bool,
  hexValue: PropTypes.bool,
  color: PropTypes.object,
};

const ColorOutput = ({ luminance, hexValue, color }) => {
  const outputs = [];

  if (luminance) {
    outputs.push(
      <OutputBox
        key="luminance"
        name="luminance"
        value={(color.luminance() * 100).toFixed(4) }
      />
    );
  }

  if (hexValue) {
    outputs.push(
      <OutputBox key="hex" name="hex" value={color.hex()} />
    );
  }
  
  return (
    <div className="grid-row grid-gap margin-top-4">
      {outputs}
    </div>
  );
};

ColorOutput.propTypes = propTypes;

export default ColorOutput;
