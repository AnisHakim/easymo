import React from 'react';
import propTypes from 'prop-types';
import { Placeholder } from 'react-bootstrap'

const AtomText = (props) => {
  const className = [];
  if (props.type.toUpperCase() === 'H1') {
    className.push('text-h1');
  }
  if (props.type.toUpperCase() === 'H2') {
    className.push('text-h2')
  }
  if (props.type.toUpperCase() === 'H3') {
    className.push('text-h3')
  }
  if (props.type.toUpperCase() === 'H4') {
    className.push('text-h4')
  }
  if (props.type.toUpperCase() === 'H5') {
    className.push('text-h5')
  }
  if (props.type.toUpperCase() === 'H6') {
    className.push('text-h6')
  }
  if (props.className) {
    className.push(props.className)
  }
  function renderText() {
    if ((!props.text || props.text === '') && props.showLoading) {
      return <Placeholder as="p" animation="glow" className='placeholder-loading' >
        <Placeholder xs={12} />
      </Placeholder>
    } else {
      return <p
        className={className.join(' ')}
        style={props.style}
        onClick={props.onClick}
      >
        {props.text}
      </p>
    }

  }
  return renderText();
}
AtomText.propTypes = {
  text: propTypes.string,
  className: propTypes.string,
  onClick: propTypes.any,
  style: propTypes.object,
  type: propTypes.oneOf(['', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  filter: propTypes.bool,
  showLoading: propTypes.bool,
  filterText: propTypes.string,

};
AtomText.defaultProps = {
  text: '',
  className: null,
  onClick: null,
  style: null,
  type: 'h1',
  filter: false,
  filterText: "",
  showLoading: false,
};
export default AtomText