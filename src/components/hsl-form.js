import React from 'react';
import PropTypes from 'prop-types';
import chroma from 'chroma-js';
import NumberInput from './input/number-input';

const propTypes = {
  children: PropTypes.any,
  handleUpdate: PropTypes.func,
  hslParams: PropTypes.shape({
    h: PropTypes.number,
    s: PropTypes.number,
    l: PropTypes.number,
    lum: PropTypes.number,
  }),
};

class HSLForm extends React.Component {
  componentDidUpdate(prevProps) {
    const { seedHexColor: nextHexColor } = this.props;

    if (prevProps.seedHexColor === nextHexColor) {
      return;
    }

    const nextState = this.updateHSL(nextHexColor);
    this.setState(nextState);
  }

  updateHSL(hex) {
    const [ h, s, l ] = chroma(hex).hsl();
    return { h, s, l };
  }

  render() {
    const { props } = this;
    const { h, s, l } = props.hslParams;

    return (
      <div className="grid-row margin-top-4">
        <NumberInput
          className="desktop:grid-col-5"
          labelText="hue:"
          labelClassName="desktop:grid-col-4"
          max="360"
          min="0"
          name="h"
          step="0.01"
          handleChange={props.handleUpdate}
          value={h}
        />
        <NumberInput
          className="desktop:grid-col-5"
          labelText="saturation:"
          labelClassName="desktop:grid-col-4"
          max="1"
          min="0"
          name="s"
          step="0.01"
          handleChange={props.handleUpdate}
          value={s}
        />
        <NumberInput
          className="desktop:grid-col-5"
          labelText="lightness:"
          labelClassName="desktop:grid-col-4"
          max="1"
          min="0"
          name="l"
          step="0.01"
          handleChange={props.handleUpdate}
          value={l}
        />
        { props.children }
      </div>
    );
  }
}

HSLForm.propTypes = propTypes;

export default HSLForm;
