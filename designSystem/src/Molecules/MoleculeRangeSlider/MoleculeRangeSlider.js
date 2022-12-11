import React, { useEffect, useState } from 'react'
import { Range, getTrackBackground } from "react-range";
import { FilterOnHoverBlue, PricefilterGrey } from '../../Colors';
import propTypes from 'prop-types';
import { formatNumber } from '../../common';
import { AuthStore } from "@easymo/auth"

// const MIN = 0;
// const MAX = 2000000;

MoleculeRangeSlider.propTypes = {
    text: propTypes.string,
    textClassName: propTypes.string,
    containerClassName: propTypes.string,
    values: propTypes.array,
    minPropertyPrice: propTypes.number,
    maxPropertyPrice: propTypes.number,
    step: propTypes.number,
    local: propTypes.string,
};
MoleculeRangeSlider.defaultProps = {
    text: '',
    textClassName: '',
    containerClassName: '',
    values: [],
    minPropertyPrice: 0,
    maxPropertyPrice: 0,
    step: 0,
    local: 'fr-FR',
};
function MoleculeRangeSlider(props) {
    const { local } = props
    const MIN = props.minPropertyPrice;
    const MAX = props.maxPropertyPrice;
    const [values, setValues] = useState(props.values);
    const handleChange = (values) => {
        setValues(values)
        props.onChange && props.onChange(values)
    };
    const Devise = AuthStore.getState().auth?.user?.devise
    return (
        <div className='flex justify-center flex-wrap'>
            <Range
                values={values}
                step={props.step}
                min={props.minPropertyPrice}
                max={props.maxPropertyPrice}
                onChange={(values) => handleChange(values)}
                renderTrack={({ props, children }) => (
                    <div
                        onMouseDown={props.onMouseDown}
                        onTouchStart={props.onTouchStart}
                        className='range-slider-container'
                        style={{
                            ...props.style,
                        }}
                    >
                        <div
                            ref={props.ref}
                            className='slider'
                            style={{
                                background: getTrackBackground({
                                    values,
                                    colors: [PricefilterGrey, FilterOnHoverBlue, PricefilterGrey],
                                    min: MIN,
                                    max: MAX,
                                }),
                            }}
                        >
                            {children}
                        </div>
                    </div>
                )}
                renderThumb={({ index, props, isDragged }) => (
                    <div {...props}
                        style={{
                            ...props.style,
                        }}>
                        <div className='range-pointer flex justify-center item-center pointer'>
                            <div className='range-tooltip absolute'>
                                {`${Devise}${formatNumber(values[index], null, local, true)}`}
                            </div>
                            <div className='arrow-down absolute'></div>
                        </div>

                    </div>
                )}
            />

        </div>
    );

}
export default MoleculeRangeSlider
