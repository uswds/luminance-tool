import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

class OutputBox extends React.Component {
  render() {
    const { name, value } = this.props;

    return (
      <div className="grid-col-6">
        <div className="radius-lg padding-x-2 padding-bottom-2 margin-y-05 border">
          <p>{ name }</p>
          <b>{ value }</b>
        </div>
      </div>
    );
  }
}

OutputBox.propTypes = propTypes;

export default OutputBox;
