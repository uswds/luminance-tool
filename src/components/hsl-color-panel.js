import React from 'react';
import PropTypes from 'prop-types';
import ColorPanel from './color-panel';
import HSLForm from './hsl-form';
import ColorOutput from './color-output';

const propTypes = {
  color: PropTypes.object,
  handleUpdate: PropTypes.func,
  heading: PropTypes.string,
  hslParams: PropTypes.shape({
    h: PropTypes.number,
    s: PropTypes.number,
    l: PropTypes.number,
    lum: PropTypes.number,
  }),
};

class HSLColorPanel extends React.Component {
  render() {
    const { color, heading, handleUpdate, hslParams } = this.props;

    return (
      <ColorPanel heading={heading} hexColor={color.hex()}>
        <HSLForm hslParams={hslParams} handleUpdate={handleUpdate} />
        <ColorOutput color={color} luminance hexValue />
      </ColorPanel>
    )
  }
}

HSLColorPanel.propTypes = propTypes;

export default HSLColorPanel;
