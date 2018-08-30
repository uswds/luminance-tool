import React, { Component } from 'react';
import chroma from 'chroma-js';
import '../node_modules/uswds/dist/css/uswds.css';
import HSLColorPanel from './components/hsl-color-panel';
import HexColorPanel from './components/hex-color-panel';

const getInitialValues = (adjusted = '#cc0f1d') => {
  const initialColor = chroma(adjusted);
  const [ hue, saturation, lightness ] = initialColor.hsl();

  return {
    adjustedColor: {
      hexColor: adjusted,
      hexValue: adjusted
    },
    originalColor: {
      hexColor: '#f1f1f1',
      hexValue: '#f1f1f1',
    },
    finalColor: {
      h: hue,
      s: saturation,
      l: lightness,
      lum: null,
    },
  };
};

class App extends Component {
  constructor() {
    super();

    this.state = getInitialValues();

    this.onUpdateFinalColor = this.onUpdateFinalColor.bind(this);
    this.onHexChange = this.onHexChange.bind(this);
    this.updateHSL = this.updateHSL.bind(this);
    this.reset = this.reset.bind(this);
  }

  hsl() {
    const { h, s, l } = this.state.finalColor;

    return chroma(h, s, l, 'hsl');
  }

  updateHSL(hex) {
    const [ hue, saturation, lightness ] = chroma(hex).hsl();
    
    return {
      h: hue,
      s: saturation,
      l: lightness,
    };
  }
  
  onHexChange(target, value) {
    let newColor;
    let nextState;

    try {
      newColor = chroma(value);
      nextState = {
        [target]: {
          hexColor: newColor.hex(),
          hexValue: value,
        },
      };

      if (target === 'adjustedColor') {
        debugger
        nextState = {
          ...nextState,
          finalColor: {
            ...this.state.finalColor,
            ...this.updateHSL(newColor.hex()),
          },
        };
      }
    } catch(e) {
      nextState = {
        [target]: {
          ...this.state[target],
          hexValue: value,
        },
      }
    }

    this.setState(nextState);
  }

  reset() {
    this.setState(getInitialValues());
  }

  onUpdateFinalColor(name, value) {
    this.setState({
      finalColor: { ...this.state.finalColor, [name]: value },
    });
  }

  render() {
    const { state } = this;

    return (
      <div className="grid-container">
        <div className="grid-row grid-gap">
          <HexColorPanel
            target="originalColor"
            heading="original color"
            color={chroma(state.originalColor.hexColor)}
            hexValue={state.originalColor.hexValue}
            handleUpdate={this.onHexChange}
          />
          <HSLColorPanel
            heading="final color"
            color={this.hsl()}
            hslParams={this.state.finalColor}
            handleUpdate={this.onUpdateFinalColor}
          />
          <HexColorPanel
            target="adjustedColor"
            heading="adjusted color"
            color={chroma(state.adjustedColor.hexColor)}
            hexValue={state.adjustedColor.hexValue}
            handleUpdate={this.onHexChange}
          />
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
