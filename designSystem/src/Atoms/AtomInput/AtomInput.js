import React from 'react';
import { Form } from 'react-bootstrap';
import propTypes from 'prop-types';
AtomInput.propTypes = {
    disabled: propTypes.bool,
    isInvalid: propTypes.bool,
    isValid: propTypes.bool,
    className: propTypes.string,
    onChange: propTypes.any,
    readOnly: propTypes.bool,
    value: propTypes.oneOfType(['string', 'number']),
    bsPrefix: propTypes.string,
    id: propTypes.any,
    placeholder: propTypes.string,
    type: propTypes.string,
    feedback: propTypes.any,
    feedbackTooltip: propTypes.any,
    isPassword: propTypes.bool,
    size: propTypes.string,
    as: propTypes.string,
    onKeyPress: propTypes.any,
    rows: propTypes.number,
    maxLength: propTypes.number,
};
AtomInput.defaultProps = {
    disabled: false,
    isInvalid: false,
    isValid: false,
    className: '',
    onChange: null,
    readOnly: false,
    value: '',
    bsPrefix: null,
    id: null,
    placeholder: 'Texte',
    feedback: null,
    feedbackTooltip: null,
    isPassword: false,
    size: 'meduim',
    type: 'text',
    onKeyPress: null,
    as: 'input',
    rows: 2,
    maxLength: null,
    autofocus: 'false'
};
function AtomInput(props) {
    const className = ['default-input'];
    if (props.isInvalid === true) {
        className.push('invalid-input');
    }
    if (props.isValid === true) {
        className.push('valid-input');
    }
    if (props.size === 'meduim') {
        className.push('defaul-meduim-input');
    }
    if (props.size === 'larg') {
        className.push('defaul-larg-input');
    }
    if (props.size === 'small') {
        className.push('defaul-small-input');
    }
    if (props.className) {
        className.push(props.className)
    }
    return (
        <Form.Control
            as={props.as}
            disabled={props.disabled}
            className={className.join(' ')}
            onChange={props.onChange}
            readOnly={props.readOnly}
            value={props.value}
            bsPrefix={props.bsPrefix}
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            onKeyPress={props.onKeyPress}
            ref={props.ref}
            rows={props.rows}
            maxLength={props.maxLength}
            autofocus={props.autofocus}
        />
    );
};

export default AtomInput;
