import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  color: PropTypes.string,
};

const ColorBlock = ({ color }) =>
  <div
    className="radius-sm padding-x-2 padding-y-4 margin-y-2"
    style={{ backgroundColor: color }}>
  </div>

ColorBlock.propTypes = propTypes;
ColorBlock.defaultProps = {
  color: '#000000',
};
export default ColorBlock;
