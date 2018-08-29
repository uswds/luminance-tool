import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  labelText: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  validator: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
};

class BaseInput extends React.Component {
  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const { value } = event.target;

    this.props.handleChange(this.props.name, value);
  }

  render() {
    const {
      className,
      name,
      labelText,
      type,
      value,
      children,
      labelClassName,
      ...rest
    } = this.props;

    return (
      <React.Fragment>
        <label htmlFor={name} className={labelClassName}>
          <b>{labelText}</b>
        </label>
        <input
          {...rest}
          className={`${className}`}
          type={type}
          name={name}
          value={value}
          onChange={this.onChange}
          onBlur={this.props.handleBlur}
        />
        <span className="desktop:grid-col-1">
          { children }
        </span>
      </React.Fragment>
    )
  }
}


BaseInput.propTypes = propTypes;
BaseInput.defaultProps = {
  className: '',
  labelText: 'form element',
  type: 'text',
  handleBlur: () => ({}),
}

export default BaseInput;
