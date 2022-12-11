import React, { useEffect, useState } from 'react';
import { Switch, Icon, Img } from '../../Atoms';
import { MoleculeInput } from '..';
import translator from '../../lang/translator';
import { isNumber } from '../../Validation';
import propTypes from 'prop-types';
const lang = translator('fr')
const MoleculeInputSwitch = (props) => {
    const [width, setWidth] = useState(window.innerWidth)
    const [state, setState] = useState({
        openSwitch: props?.value?.checked ? props.value.checked : false,
        inputText: props?.value?.description ? props.value.description : props.withCounter ? props.minValue : '',
        loading: false,
        localClick: false
    })
    const [isIncrement, setIncrement] = useState(null)
    useEffect(() => {
        window.addEventListener('resize', (e) => setWidth(window.innerWidth));
    }, [])
    function setInputText(value, localClick = false) {
        setState({
            ...state,
            loading: true,
            inputText: value,
            localClick: localClick
        })
    }
    function setOpenSwitch(value) {
        setState({
            loading: true,
            inputText: props.withCounter ? props.minValue : "",
            openSwitch: value
        })
    }
    const onChange = (e) => {
        if (props.withCounter && isNumber(e.target.value)) {
            if (e.target.value >= props.minValue)
                setInputText(e.target.value)
        } else if (!props.withCounter) {
            setInputText(e.target.value);
        }
    }
    const changeNumber = (increment) => {
        const val = parseInt(state.inputText.toString())
        setInputText(increment ? val + 1 : val > props.minValue ? val - 1 : props.minValue, true);
        setIncrement(increment)

    }
    useEffect(() => {
        if (state.inputText !== props.value.description || state.openSwitch !== props.value.checked) {
            setState({
                inputText: props.value.description,
                openSwitch: props.value.checked,
                loading: true
            })
        }
    }, [props.value.checked, props.value.description])

    useEffect(() => {
        if (state.loading) {
            if (props.onChange) {
                if ((props.isSynchronise && state.localClick) || (!props.isSynchronise)) {
                    props.onChange({ checked: state.openSwitch, inputValue: state.inputText, isIncrement: isIncrement, localClick: state.localClick })
                    setState({ ...state, localClick: false, loading: false })
                }

            }
        }
    }, [state])
    const containerClassName = ['container-input-switch flex w-100']
    if (props.border) {
        containerClassName.push('border-bottom-input-switch')
    }
    if (props.containerClassName) {
        containerClassName.push(props.containerClassName)
    }
    const contentClassName = ['w-100 flex flex-wrap item-center justify-space-between']
    if (props.contentClassName) {
        contentClassName.push(props.contentClassName)
    }
    if (props.withCounter && width > 576) {
        contentClassName.push('no-wrap item-center')
    }
    const inputClassname = ['input-number-switch']
    if (props.inputClassname) {
        inputClassname.push(props.inputClassname)
    }
    return <div className={containerClassName.join(' ')}>
        <div className={contentClassName.join(' ')}>
            <div className='flex item-center' onClick={() => setOpenSwitch(!state.openSwitch)}>
                {props.isIcon ?
                    <Icon icon={props.icon} className={`${state.openSwitch ? "icon-input-switched" : 'icon-input-switch'} mr-3`} />
                    :
                    <Img src={props.img} className={`${state.openSwitch ? "icon-input-switched" : 'icon-input-switch'} mr-3`} />}
                <span className={`${state.openSwitch ? "text-input-switched" : 'text-input-switch'}`}>{props.text}</span>
            </div>
            <div className='flex' >
                {props.withCounter && width > 576 && state.openSwitch && <div className='w-93px'>
                    <MoleculeInput
                        placeholder={''}
                        inputLabel=''
                        inputValue={state.inputText}
                        inputClassname={inputClassname.join(' ')}
                        withCounter={props.withCounter}
                        onchangeInput={null}
                        increment={() => changeNumber(true)}
                        decrement={state.inputText > props.minValue ? () => changeNumber(false) : null}
                    />
                </div>}
                <Switch
                    onChange={props.isComposition ? (val) => {
                        props.changeSwitch(val)
                        setIncrement(null)
                    } : () => setOpenSwitch(!state.openSwitch)}
                    checked={props.isComposition ? props.openSwitch : state.openSwitch}
                    className={'ligne-switch mandat'}
                />
            </div>
            {((props.withCounter && width <= 576 && state.openSwitch) || (!props.withCounter && state.openSwitch)) && <div className='w-100 mt-3'>
                <MoleculeInput
                    placeholder={props.withCounter ? '' : lang.descriptionDetails}
                    inputLabel=''
                    inputValue={state.inputText}
                    inputClassname={inputClassname.join(' ')}
                    withCounter={props.withCounter}
                    onchangeInput={e => onChange(e)}
                    increment={() => changeNumber(true)}
                    decrement={() => changeNumber(false)}
                />
            </div>}
        </div>
    </div>;
};
MoleculeInputSwitch.propTypes = {
    icon: propTypes.string,
    text: propTypes.string,
    withCounter: propTypes.bool,
    onChange: propTypes.any,
    img: propTypes.string,
    isIcon: propTypes.bool,
    border: propTypes.bool,
    isComposition: propTypes.bool,
    openSwitch: propTypes.bool,
    containerClassName: propTypes.string,
    contentClassName: propTypes.string,
    inputClassname: propTypes.string,
    value: propTypes.object,
    minValue: propTypes.number,
    isSynchronise: propTypes.bool
}
MoleculeInputSwitch.defaultProps = {
    icon: null,
    text: null,
    withCounter: false,
    onChange: null,
    img: null,
    isIcon: true,
    border: false,
    containerClassName: null,
    contentClassName: null,
    inputClassname: null,
    value: { checked: false, description: "" },
    minValue: 0,
    isComposition: false,
    openSwitch: false,
    changeSwitch: null,
    isSynchronise: false
}
export default MoleculeInputSwitch;
