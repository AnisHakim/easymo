import React, { useState } from 'react'
import { Input, Text, Icon } from '../../Atoms'
import propTypes from 'prop-types';
import { DarkGrey, Grey } from '../../Colors';
import { viewError, viewLabel } from '../../common';



MoleculeInput.propTypes = {
    inputLabel: propTypes.string,
    errorClassname: propTypes.string,
    labelClassname: propTypes.string,
    labelIcon: propTypes.string,
    inputError: propTypes.string,
    placeholder: propTypes.string,
    inputClassname: propTypes.string,
    isInvalid: propTypes.bool,
    isValid: propTypes.bool,
    inputSize: propTypes.string,
    isPassword: propTypes.bool,
    leftLabelIcon: propTypes.string,
    rightLabelIcon: propTypes.string,
    isForgotPasswordLabel: propTypes.bool,
    onClickForgotPassword: propTypes.any,
    onchangeInput: propTypes.any,
    isSearch: propTypes.bool,
    onClearSearchInput: propTypes.any,
    containerClassName: propTypes.string,
    startIconClass: propTypes.string,
    as: propTypes.string,
    startIcon: propTypes.string,
    withIcon: propTypes.bool,
    withIconStart: propTypes.bool,
    withCounter: propTypes.bool,
    onKeyPress: propTypes.any,
    increment: propTypes.any,
    decrement: propTypes.any,
    listIcons: propTypes.array,
    rows: propTypes.number,
    disabled: propTypes.bool,
};
MoleculeInput.defaultProps = {
    inputLabel: null,
    errorClassname: '',
    labelClassname: '',
    labelIcon: '',
    inputError: '',
    placeholder: '',
    inputClassname: '',
    isInvalid: false,
    isValid: false,
    inputSize: '',
    isPassword: false,
    leftLabelIcon: '',
    rightLabelIcon: '',
    isForgotPasswordLabel: false,
    onClickForgotPassword: null,
    onchangeInput: null,
    isSearch: false,
    onClearSearchInput: null,
    containerClassName: null,
    withIcon: true,
    withIconStart: false,
    onKeyPress: null,
    startIcon: 'user_outlined',
    startIconClass: 'absolute input-start-icon',
    listIcons: null,
    decrement: null,
    increment: null,
    as: 'input',
    rows: 2,
    withCounter: false,
    disabled: false,
};

export default function MoleculeInput(props) {
    const [isInputPassword, setIsInputPassword] = useState(true)
    function renderCounter() {
        return <div className='absolute counter-container' >
            <div onClick={props.decrement} className='counter-input-icon mr-1'>
                <Icon icon='remove' />
            </div>
            <div onClick={props.increment} className='counter-input-icon'>
                <Icon icon='add' />
            </div>
        </div>
    }
    function renderLabel() {
        if (props.inputLabel) {
            return viewLabel({
                label: props.inputLabel,
                labelClass: props.labelClassname,
                leftIconClass: props.leftIconClassname,
                leftLabelIcon: props.leftLabelIcon,
                rightLabelIcon: props.rightLabelIcon,
                isForgotPasswordLabel: props.isForgotPasswordLabel,
                listIcons: props.listIcons,
                containerIconClassName: props.containerIconClassName,
                onClickForgotPassword: props.onClickForgotPassword
            })
        }
        return null
    }
    function renderError() {
        if (props.inputError && props.isInvalid) {
            return viewError({ text: props.inputError, className: props.errorClassname })
        }
    }
    function renderInput() {
        const inputClassname = ['']
        if (props.inputClassname) {
            inputClassname.push(props.inputClassname)
        }
        if (props.withIconStart) {
            inputClassname.push('input-with-icon')
        }
        if (props.withCounter) {
            inputClassname.push('input-with-counter')
        }
        let type = ''
        if (props.type === "password" && isInputPassword) {
            type = 'password'
        }
        if (props.type === "password" && !isInputPassword) {
            type = 'text'
        }
        return <div className='relative'>
            <Input placeholder={props.placeholder}
                className={inputClassname.join(' ')}
                isInvalid={props.isInvalid}
                isValid={props.isValid}
                size={props.inputSize}
                type={type}
                onChange={props.onchangeInput}
                value={props.inputValue}
                onKeyPress={props.onKeyPress}
                as={props.as}
                rows={props.rows}
                maxLength={props.maxLength}
                disabled={props.disabled}
            />
            {props.type === "password" && props.withIcon && <div className='pswd-icon-container absolute' >
                <Icon
                    className='password-icon-eyes'
                    onClick={() => setIsInputPassword(!isInputPassword)}
                    icon={isInputPassword ? 'hidden_outlined' : 'visible_outlined'}
                    size={'1.125rem'} color={DarkGrey} />
            </div>}
        </div>
    }

    function renderInputSearch() {
        const inputClassname = props.withBorder ? ['search-Input-with-border'] : ['search-input']
        const iconSearchClassName = ['absolute', "search-icon"]
        const iconClearClassName = ['absolute', "password-icon"]
        if (props.inputClassname) {
            inputClassname.push(props.inputClassname)
        }
        if (props.iconSearchClassName) {
            iconSearchClassName.push(props.iconSearchClassName)
        }
        if (props.iconClearClassName) {
            iconClearClassName.push(props.iconClearClassName)
        }
        return (
            <div className='relative'>
                <Icon icon={'search'} size={'1.125rem'} className={iconSearchClassName.join(' ')} color={DarkGrey} />
                <Input placeholder={props.placeholder}
                    className={inputClassname.join(' ')}
                    size={props.inputSize}
                    onChange={props.onchangeInput}
                    value={props.inputValue}
                    onKeyPress={props.onKeyPress}
                    disabled={props.disabled}
                />
                {props.inputValue && <Icon icon={'clear'} size={'1.125rem'} className={iconClearClassName.join(' ')} color={DarkGrey} onClick={props.onClearSearchInput} />}
            </div>

        )
    }
    return (

        <div className={`${props.containerClassName}  ${props.withIconStart || props.withCounter ? 'relative' : ''}`}>
            {renderLabel()}
            {props.withIconStart && <Icon icon={props.startIcon} className={props.startIconClass} />}
            {props.isSearch ? renderInputSearch() : renderInput()}
            {props.withCounter && renderCounter()}
            {renderError()}
        </div>
    )
}
