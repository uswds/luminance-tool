import React from 'react';
import PropTypes from 'prop-types';
import ColorBlock from './color-block';

const propTypes = {
  children: PropTypes.any,
  heading: PropTypes.string.isRequired,
  hexColor: PropTypes.string.isRequired,
};

class ColorPanel extends React.Component {
  render() {
    const { heading, hexColor, children } = this.props;

    return (
      <div className="desktop:grid-col-4 display-flex flex-column flex-justify">
        <div>
          <h3>{heading}</h3>
          <ColorBlock color={hexColor} />
        </div>
        { children }
      </div>
    );
  }
}

ColorPanel.propTypes = propTypes;
ColorPanel.defaultProps = {
  children: null,
};

export default ColorPanel;
