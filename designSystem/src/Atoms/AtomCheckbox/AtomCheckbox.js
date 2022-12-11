import React from 'react';
import { Form } from 'react-bootstrap';
import propTypes from 'prop-types';
AtomCheckbox.propTypes = {
  disabled: propTypes.bool,
  isInvalid: propTypes.bool,
  isValid: propTypes.bool,
  className: propTypes.string,
  bsPrefix: propTypes.string,
  id: propTypes.any,
  onClick: propTypes.any,
  checked: propTypes.bool,
  feedback: propTypes.any,
  feedbackTooltip: propTypes.any,
  type: propTypes.string,
  label: propTypes.string,
  containerClassName: propTypes.string,
  checkInput: propTypes.bool,
};
AtomCheckbox.defaultProps = {
  disabled: false,
  isInvalid: false,
  isValid: false,
  className: '',
  bsPrefix: null,
  id: null,
  onClick: null,
  checked: false,
  feedback: null,
  feedbackTooltip: null,
  type: 'checkbox',
  label: '',
  containerClassName: null,
  checkInput: true
};
export default function AtomCheckbox(props) {
  const className = ["default-check"];
  const containerClassName = ["container-check", "relative", "flex", "item-center", "justify-center"];
  if (props.isInvalid === true) {
    className.push('invalid-check');
  }
  if (props.className) {
    className.push(props.className)
  }
  if (props.containerClassName) {
    className.push(props.containerClassName)
  }
  return (
    <div className={containerClassName.join(' ')} onClick={props.onClick}>
      <Form.Check
        isInvalid={props.isInvalid}
        isValid={props.isValid}
        className={className.join(' ')}
        as='input'
        disabled={props.disabled}
        checked={props.checked}
        bsPrefix={props.bsPrefix}
        id={props.id}
        feedback={props.feedback}
        feedbackTooltip={props.feedbackTooltip}
        label={props.label}
        type={props.type}
        custom
        ref={props.ref}
        onChange={props.checkInput && props.onClick}
      />
    </div>
  );
}
