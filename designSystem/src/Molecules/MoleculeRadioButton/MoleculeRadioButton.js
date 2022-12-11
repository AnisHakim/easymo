import propTypes from 'prop-types';
import { Icon } from '../../Atoms';
MoleculeRadioButton.propTypes = {
    radioLabel: propTypes.string,
    radioClassName: propTypes.string,
    labelClassname: propTypes.string,
    isChecked: propTypes.bool,
    name: propTypes.string,
    id: propTypes.string,
    radioContainer: propTypes.string,
    icon: propTypes.string,
    classIcon: propTypes.string,
};
MoleculeRadioButton.defaultProps = {
    radioLabel: '',
    radioClassName: '',
    labelClassname: '',
    isChecked: false,
    name: "",
    id: '',
    radioContainer: '',
    icon: 'key',
    classIcon: 'radio-icon'
};

function MoleculeRadioButton(props) {
    const radioClassName = ['radio-container'];
    const labelClassname = ['default-radio-label'];
    if (props.radioClassName) {
        radioClassName.push(props.radioClassName)
    }
    if (props.labelClassname) {
        radioClassName.push(props.labelClassname)
    }
    return (
        <div className={props.radioContainer} id={props.id} >
            {props.reverse && <div id={props.id} className='flex item-center' >
                <Icon icon={props.icon} id={props.id} className={'mr-2 ' + props.classIcon} />  <label id={props.id} className={radioClassName.join(' ')} >  {props.radioText} </label>
            </div>}
            <label className={radioClassName.join(' ')} > {!props.reverse && props.radioText}
                <input type="radio" checked={props.isChecked} id={props.id} name={props.name} onChange={props.onCheck} />
                <span className="checkmark"></span>
            </label>
        </div>
    )
}

export default MoleculeRadioButton
