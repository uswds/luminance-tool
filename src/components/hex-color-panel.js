import React from 'react';
import PropTypes from 'prop-types';
import ColorPanel from './color-panel';
import HexInput from './input/hex-input';
import ColorOutput from './color-output';

const propTypes = {
  color: PropTypes.object,
  handleUpdate: PropTypes.func,
  heading: PropTypes.string,
  target: PropTypes.string.isRequired,
  hexValue: PropTypes.string.isRequired
};

class HexColorPanel extends React.Component {
  constructor(props) {
    super(props);

    this.onUpdate = this.onUpdate.bind(this);
  }

  onUpdate(hexCode) {
    const { handleUpdate, target } = this.props;
    
    handleUpdate(target, hexCode);
  }

  render() {
    const { color, hexValue, heading, handleUpdate, hslParams } = this.props;

    return (
      <ColorPanel heading={heading} hexColor={color.hex()}>
        <div className="margin-top-4">
          <HexInput
            className="desktop:grid-col-8 usa-input"
            labelText="hex value:"
            labelClassName="desktop:grid-col-4"
            name="originalHex"
            value={hexValue}
            handleChange={this.onUpdate} />
        </div>
        <ColorOutput color={color} luminance />
      </ColorPanel>
    )
  }
}

HexColorPanel.propTypes = propTypes;

export default HexColorPanel;
