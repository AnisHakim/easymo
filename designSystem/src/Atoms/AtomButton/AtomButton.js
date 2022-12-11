import React from 'react'
import { Button } from 'react-bootstrap';
import { Icon, Spinner } from '../';
import propTypes from 'prop-types';

AtomButton.propTypes = {
    text: propTypes.string,
    bsPrefix: propTypes.string,
    className: propTypes.string,
    disabled: propTypes.bool,
    onClick: propTypes.any,
    type: propTypes.string,
    icon: propTypes.string,
    iconRight: propTypes.bool,
    statusBtn: propTypes.bool,
    linkBtn: propTypes.bool,
    multiple: propTypes.bool,
    statusBtnText: propTypes.string,
    withNotif: propTypes.bool,
    notifNumber: propTypes.string,
    containerClassName: propTypes.string,
    onClickIcon: propTypes.any,
    valueUpload: propTypes.any,
    loading: propTypes.bool,
    withLoader: propTypes.bool,
    accept: propTypes.string,
};
AtomButton.defaultProps = {
    text: null,
    bsPrefix: 'default-btn flex item-center justify-center',
    className: null,
    disabled: false,
    onClick: null,
    type: 'primary',
    icon: null,
    iconRight: false,
    statusBtn: false,
    linkBtn: false,
    multiple: false,
    statusBtnText: null,
    containerClassName: null,
    onClickIcon: null,
    valueUpload: null,
    notifNumber: '8',
    withNotif: false,
    loading: false,
    withLoader: false,
    spinnerClassname: "white-small-spinner mr-2",
    accept: '/*'
};

function AtomButton(props) {
    const className = ['default-btn', "flex", "item-center", "justify-center"];
    switch (props.type) {
        case 'connexion':
            {
                className.push('btn-connexion');
                break;
            }
        case 'primary':
            {
                className.push('btn-primary');
                break;
            }
        case 'secondary':
            {
                className.push('btn-secondary');
                break;
            }
        case 'ghost':
            {
                className.push('btn-ghost');
                break;
            }
        case 'third':
            {
                className.push('btn-third');
                break;
            }
        case 'delete':
            {
                className.push('btn-delete');
                break;
            }
        case 'archive':
            {
                className.push('btn-archive');
                break;
            }
        case 'danger':
            {
                className.push('btn-danger');
                break;
            }
        case 'inprogress':
            {
                className.push('btn-inprogress');
                break;
            }
        case 'success':
            {
                className.push('btn-success');
                break;
            }
        case 'outline':
            {
                className.push('btn-outline');
                break;
            }
        case 'filter':
            {
                className.push('btn-filter');
                break;
            }
        case 'upload':
            {
                className.push('btn-filter btn-upload relative');
            }
        default:
            break;
    }
    if (props.className) {
        className.push(props.className);
    }
    function viewIcon() {
        if (props.icon !== null) {
            const iconClassName = ['default-icon-btn'];
            switch (props.type) {
                case 'connexion':
                    {
                        iconClassName.push('icon-connexion');
                        break;
                    }
                case 'secondary':
                    {
                        iconClassName.push('icon-secondary');
                        break;
                    }
                case 'ghost':
                    {
                        iconClassName.push('icon-ghost');
                        break;
                    }
                case 'third':
                    {
                        iconClassName.push('icon-third');
                        break;
                    }
                case 'delete':
                    {
                        iconClassName.push('icon-delete');
                        break;
                    }
                case 'archive':
                    {
                        iconClassName.push('icon-archive');
                        break;
                    }
                case 'danger':
                    {
                        iconClassName.push('icon-danger');
                        break;
                    }
                case 'inprogress':
                    {
                        iconClassName.push('icon-inprogress');
                        break;
                    }
                case 'success':
                    {
                        iconClassName.push('icon-success');
                        break;
                    }
                case 'outline':
                    {
                        iconClassName.push('icon-outline');
                        break;
                    }
                case 'filter':
                    {
                        iconClassName.push('icon-filter mr-1');
                        break;
                    }
                case 'upload':
                    {
                        iconClassName.push('icon-filter icon-upload mr-1');
                        break;
                    }
                default: break;
            }
            if (props.iconRight) {
                iconClassName.push('icon-primary-right');
            }
            if (props.iconClassName) {
                iconClassName.push(props.iconClassName)
            }
            return (
                <Icon
                    onClick={props.onClickIcon}
                    icon={props.icon}
                    size={'1.125em'}
                    className={iconClassName.join(' ')}
                    color={props.iconColor}
                />
            );
        }
        return null;
    }
    function statusBtn() {
        return <span className='btn-status absolute item-center justify-center'>
            {props.statusBtnText}
        </span>
    }
    const onChangeFile = (e) => {
        props.onChangeFile && props.onChangeFile(e)
    }
    return (
        <div className={props.containerClassName + `${props.withNotif ? ' relative inline-block ' : ''}`}>
            {
                props.withNotif &&
                <span className="btn-notification" >
                    {props.notifNumber}
                </span>
            }
            <Button
                bsPrefix={props.bsPrefix}
                className={className.join(' ')}
                disabled={props.disabled}
                onClick={props.onClick}
            >
                {props.withLoader && props.loading ? <Spinner className={props.spinnerClassname} />
                    : !props.iconRight && viewIcon()}
                {
                    props.type === 'upload' && <input id={props.id} accept={props.accept} onChange={onChangeFile} multiple={props.multiple} value={props.valueUpload} className='input-upload-btn' type="file" />
                }
                {
                    props.type !== 'icon' ?
                        props.linkBtn ?
                            <a className={props.type} href={props.href}>{props.text}</a>
                            :
                            <span className={props.type}>{props.text}</span>
                        :
                        null
                }
                {props.iconRight && viewIcon()}
                {props.statusBtn && statusBtn()}
            </Button>
        </div>
    )

}
export default AtomButton