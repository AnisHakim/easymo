import Switch from "react-switch";
import propTypes from 'prop-types';
import { FilterOnHoverBlue, InputFilterBorder, WhiteColor } from "../../Colors";

AtomSwitch.propTypes = {
    className: propTypes.string,
    checked: propTypes.bool,
    disabled: propTypes.bool,
    onChange: propTypes.any,
    offColor: propTypes.string,
    onColor: propTypes.string,
    offHandleColor: propTypes.string,
    onHandleColor: propTypes.string,
    handleDiameter: propTypes.number,
    uncheckedIcon: propTypes.any,
    checkedIcon: propTypes.any,
    uncheckedHandleIcon: propTypes.any,
    checkedHandleIcon: propTypes.any,
    boxShadow: propTypes.string,
    activeBoxShadow: propTypes.string,
    height: propTypes.number,
    width: propTypes.number,
};
AtomSwitch.defaultProps = {
    className: '',
    checked: false,
    disabled: false,
    onChange: null,
    offColor: InputFilterBorder,
    onColor: FilterOnHoverBlue,
    offHandleColor: WhiteColor,
    onHandleColor: WhiteColor,
    handleDiameter: 19.35,
    uncheckedIcon: false,
    checkedIcon: false,
    uncheckedHandleIcon: null,
    checkedHandleIcon: null,
    boxShadow: '',
    activeBoxShadow: '',
    height: 23,
    width: 38,
}
function AtomSwitch(props) {

    return (
        <Switch
            onChange={props.onChange}
            checked={props.checked}
            className={props.className}
            disabled={props.disabled}
            offColor={props.offColor}
            onColor={props.onColor}
            offHandleColor={props.offHandleColor}
            onHandleColor={props.onHandleColor}
            handleDiameter={props.handleDiameter}
            uncheckedIcon={props.uncheckedIcon}
            checkedIcon={props.checkedIcon}
            uncheckedHandleIcon={props.uncheckedHandleIcon}
            checkedHandleIcon={props.checkedHandleIcon}
            boxShadow={props.boxShadow}
            activeBoxShadow={props.activeBoxShadow}
            height={props.height}
            width={props.width}
            id={props.id}
        />
    )
}

export default AtomSwitch
