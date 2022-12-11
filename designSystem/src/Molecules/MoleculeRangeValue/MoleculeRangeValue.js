import React from 'react'
import propTypes from 'prop-types';
import { Text } from '../../Atoms';

MoleculeRangeValue.propTypes = {
    text: propTypes.string,
    textClassName: propTypes.string,
    containerClassName: propTypes.string,
};
MoleculeRangeValue.defaultProps = {
    text: '',
    textClassName: '',
    containerClassName: '',
};
function MoleculeRangeValue(props) {

    const textClassName = ['ruler-value absolute'];
    if (props.textClassName) {
        textClassName.push(props.textClassName)
    }
    const containerClassName = ['flex', 'item-center'];
    if (props.containerClassName) {
        containerClassName.push(props.containerClassName)
    }
    return (
        <div className='flex flex-direction-column '>
            <div className={containerClassName.join(' ')}>
                {props.data.map(el => <div className='relative' >
                    <div className='ruler-limiter'></div>
                    <Text type="h5" text={el} className={textClassName.join(' ')} />
                </div>)}
            </div>
        </div>
    )
}
export default MoleculeRangeValue
