import React, { Component } from 'react';
import chroma from 'chroma-js';
import '../node_modules/uswds/dist/css/uswds.css';
import HexInput from './components/input/hex-input';
import NumberInput from './components/input/number-input';
import ColorBlock from './components/color-block';

const getInitialValues = (hex = '#cc0f1d') => {
  const initialColor = chroma(hex);
  const [ hue, saturation, lightness ] = initialColor.hsl();

  return {
    hexColor: initialColor.hex(),
    hexValue: hex,
    hValue: hue,
    sValue: saturation,
    lValue: lightness,
    lumValue: null,
  };
};

class App extends Component {
  constructor() {
    super();

    this.state = getInitialValues();

    this.onInputChange = this.onInputChange.bind(this);
    this.onHexChange = this.onHexChange.bind(this);
    this.updateHSL = this.updateHSL.bind(this);
    this.reset = this.reset.bind(this);
  }

  hsl() {
    const { hValue, sValue, lValue } = this.state;

    return chroma(hValue, sValue, lValue, 'hsl');
  }

  hsl2CSS() {
    return this.hsl().css('hsla');
  }

  hex2CSS() {
    chroma(this.state.hexValue).css();
  }

  updateHSL(hex) {
    const [ hue, saturation, lightness ] = chroma(hex).hsl();
    
    const nextState = {
      hValue: hue,
      sValue: saturation,
      lValue: lightness,
    };

    this.setState(nextState);
  }

  onHexChange(value) {
    let newColor;
    let nextState;

    /**
     * get new hex value
     * is valid hex?
     *  if yes
     *    update hexvalue, hexColor
     *  if no
     *    update hexValue
     */

    try {
      newColor = chroma(value);
      nextState = {
        hexColor: newColor.hex(),
        hexValue: value,
      };
    } catch(e) {
      nextState = {
        hexValue: value,
      };
    }

    this.setState(nextState);
  }

  onInputChange(name, value) {
    this.setState({
      [name]: value
    });
  }

  reset() {
    this.setState(getInitialValues);
  }

  calculateLuminance() {
    return (chroma(this.hsl()).luminance() * 100).toFixed(4);
  }

  render() {
    const { state } = this;

    return (
      <div className="grid-container">
        <div className="grid-row grid-gap">
          <div className="desktop:grid-col-4">
            <ColorBlock color={this.state.hexColor} />
            <HexInput
              className="desktop:grid-col-8 usa-input"
              labelText="hex value:"
              labelClassName="desktop:grid-col-4"
              name="hexValue"
              handleBlur={this.updateHSL}
              handleChange={this.onHexChange}
              value={state.hexValue}
            />
          </div>
          <div className="desktop:grid-col-4">
            <ColorBlock color={this.hsl2CSS()} />
            <div>
              <NumberInput
                className="desktop:grid-col-5"
                labelText="hue:"
                labelClassName="desktop:grid-col-4"
                max="360"
                min="0"
                name="hValue"
                step="0.01"
                handleChange={this.onInputChange}
                value={state.hValue}
              />
              <NumberInput
                className="desktop:grid-col-5"
                labelText="saturation:"
                labelClassName="desktop:grid-col-4"
                max="1"
                min="0"
                name="sValue"
                step="0.01"
                handleChange={this.onInputChange}
                value={state.sValue}
              />
              <NumberInput
                className="desktop:grid-col-5"
                labelText="lightness:"
                labelClassName="desktop:grid-col-4"
                max="1"
                min="0"
                name="lValue"
                step="0.01"
                handleChange={this.onInputChange}
                value={state.lValue}
              />
            </div>
          </div>
        </div>
        <div className="grid-row margin-top-4">
          <div className="radius-lg padding-x-2 padding-bottom-2 margin-y-1 border">
            <p>Relative Luminance</p>
            <b>{ this.calculateLuminance() }</b>
          </div>
        </div>
        <button
          className="usa-button"
          type="button"
          onClick={this.reset}
        >
          Reset Values
        </button>
      </div>
    );
  }
}

export default App;
