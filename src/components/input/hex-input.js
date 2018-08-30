import React from 'react';
import BaseInput from './base-input';

const HEX_REGEXP = new RegExp('^#?([0-9A-F\s]){0,6}', 'i');

const HexInput = (Component) => {
  return class extends React.Component {
    constructor() {
      super();

      this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
      const { value } = event.target;
      const sanitizedValue = this.sanitize(value);

      if (this.validate(sanitizedValue)) {
        this.props.handleChange(`#${sanitizedValue}`);
      }
    }
    
    sanitize(value) {
      return value.slice(0, 7).replace(/[^0-9A-F]+/ig, '');
    }

    validate(value) {
      return HEX_REGEXP.test(value);
    }

    render() {
      return (
        <Component
          { ...this.props }
          handleChange={this.onChange}
        />
      );
    }
  }
};

export default HexInput(BaseInput);