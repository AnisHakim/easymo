import React from 'react'
import { Icon, Text } from '../../Atoms';
import propTypes from 'prop-types';

MoleculeHeader.propTypes = {
    navigation: propTypes.any,
    pageTitle: propTypes.string,
    text: propTypes.array,
};
MoleculeHeader.defaultProps = {
    navigation: null,
    text: [],
    pageTitle: null,
    onClick: null,
    firstIcon: null,
    textClassName: '',
    showLoading: false
};
function MoleculeHeader(props) {
    const textClassName = ['header-prop-text-item']
    if (props.textClassName) {
        textClassName.push(props.textClassName)
    }
    return (
        <div className='col-sm mb-2 mb-sm-0'>
            <div className='flex align-center w-max'>
                {props.text?.map((el, i) =>
                    <>
                        <span key={i}
                            onClick={() => el.link ? props.navigation(el.link) : props.onClick(el, i)}
                            className={`${textClassName.join(' ')} ${i !== props.text.length - 1 ? 'link' : 'active'} `} >
                            {props.firstIcon && i === 0 && <Icon icon={props.firstIcon} className="mr-1 document-home-icon pointer" />}
                            {el.text}
                            {i !== (props.text.length - 1) && <span className='mx-1'>{'>'}</span>}
                        </span>
                    </>
                )}
            </div>
            {props.pageTitle && <Text type='h1' showLoading={props.showLoading} text={props.pageTitle} className="my-2" />}
        </div>
    )
}

export default MoleculeHeader
