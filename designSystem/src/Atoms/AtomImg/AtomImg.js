import React from 'react';
import propTypes from 'prop-types';
AtomImg.propTypes = {
  src: propTypes.string,
  alt: propTypes.string,
  onClick: propTypes.any,
  className: propTypes.string,
  type: propTypes.string,
  style: propTypes.object,
};

AtomImg.defaultProps = {
  src: '',
  alt: 'img',
  onClick: null,
  className: 'default-img',
  type: 'avatar',
  style: null
};

export default function AtomImg(props) {

  const className = [];
  if (props.type.toUpperCase() === 'AVATAR') {
    className.push('avatar-img');
  }
  if (props.type.toUpperCase() === 'SMALL SQUARE') {
    className.push('small-square-img');
  }
  if (props.type.toUpperCase() === 'SMALL SQUARE') {
    className.push('small-square-img');
  }
  if (props.type.toUpperCase() === 'MODAL IMG') {
    className.push('modal-add-property-img');
  }
  if (props.type.toUpperCase() === 'LOGO MEDIUM') {
    className.push('medium-logo-img');
  }
  if (props.type.toUpperCase() === 'LOGO LARGE') {
    className.push('larg-logo-img');
  }
  if (props.type.toUpperCase() === 'FULL') {
    className.push('full-img');
  }
  if (props.className) {
    className.push(props.className)
  }
  return (
    <img
      src={props.src}
      alt={props.alt}
      onClick={props.onClick}
      className={className.join(' ')}
      type={props.type}
      style={props.style}
    />
  );
}
