import React from 'react';
import propTypes from 'prop-types';
AtomIframe.propTypes = {
    src: propTypes.string,
    className: propTypes.string,
};
AtomIframe.defaultProps = {
    src: null,
    className: null,
};
export default function AtomIframe(props)  {
  return <iframe src={props.src} className={props.className}></iframe>;
};
