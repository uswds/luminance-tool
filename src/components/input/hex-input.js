import React from 'react';
import BaseInput from './base-input';

const HEX_REGEXP = new RegExp('^#?([0-9A-F\s]){0,6}', 'i');

const HexInput = (Component) => {
  return class extends React.Component {
    constructor() {
      super();

      this.onChange = this.onChange.bind(this);
      this.checkHexLength = this.checkHexLength.bind(this);
    }

    checkHexLength(event) {
      const { value } = event.target;
      const sanitized = this.sanitize(value);

      if (sanitized.length % 3 === 0) {
        this.props.handleBlur(sanitized);
      }
    }

    onChange(name, value) {
      const truncatedValue = this.sanitize(value);

      if (this.validate(truncatedValue)) {
        this.props.handleChange(`#${truncatedValue}`);
      }
    }
    
    sanitize(value) {
      return value.slice(0, 6).replace(/[^0-9A-F]+/ig, '');
    }

    validate(value) {
      return HEX_REGEXP.test(value);
    }

    render() {
      return (
        <Component
          { ...this.props }
          handleChange={this.onChange}
          handleBlur={this.checkHexLength}
        />
      )
    }
  }
};

export default HexInput(BaseInput);