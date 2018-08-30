import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  labelText: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
};

class BaseInput extends React.Component {
  render() {
    const {
      name,
      labelText,
      children,
      labelClassName,
      handleChange,
      ...rest
    } = this.props;

    return (
      <React.Fragment>
        <label htmlFor={name} className={labelClassName}>
          <b>{labelText}</b>
        </label>
        <input
          {...rest}
          name={name}
          onChange={handleChange}
        />
      </React.Fragment>
    )
  }
}


BaseInput.propTypes = propTypes;
BaseInput.defaultProps = {
  className: '',
  labelText: 'form element',
  type: 'text',
};

export default BaseInput;
