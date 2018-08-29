import React from 'react';
import BaseInput from './base-input';

const NUM_REGEXP = new RegExp('d+');

const NumberInput = (Component) => {
  return class extends React.Component {
    constructor() {
      super();

      this.state = {
        dirty: false,
        pristine: true,
        valid: false,
      };
      
      this.onChange = this.onChange.bind(this);
    }

    validate(value) {
      return NUM_REGEXP.test(value);
    }

    onChange(name, value) {
      const { handleChange } = this.props;

      handleChange(name, Number(value))
    }

    render() {
      return (
        <div className="grid-row grid-gap margin-y-1">
          <Component
            { ...this.props }
            type='number'
            handleChange={this.onChange}
          />
        </div>
      )
    }
  }
};

export default NumberInput(BaseInput);