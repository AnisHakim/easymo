import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import { Text } from '../../Atoms'
import { country } from './countryData'
import PropTypes from 'prop-types';
function MoleculeInputPhoneNumber(props) {
    function renderLabel() {
        const labelClassname = ['input-label']
        if (props.inputLabel) {
            if (props.labelClassname) {
                labelClassname.push(props.labelClassname)
            }
            return (<Text text={props.inputLabel} type='' className={labelClassname.join(' ')} />)
        }
        return null
    }
    function renderError() {
        if (props.inputError && props.isInvalid) {
            const errorClassname = ['input-error-message']
            if (props.errorClassname) {
                errorClassname.push(props.errorClassname)
            }
            return <Text text={props.inputError} type='' className={errorClassname.join(' ')} />
        }
        return null
    }
    const className = ['default-input'];
    if (props.isInvalid === true) {
        className.push('invalid-input');
    }
    if (props.isValid === true) {
        className.push('valid-input');
    }
    if (props.className) {
        className.push(props.className)
    }
    const displayDefaultCountry = (countrys) => {
        if (countrys) {
            const index = country.findIndex(item => { return item.name.toUpperCase() === countrys.toUpperCase() })
            if (index >= 0) {
                return country[index].code
            } else {
                return "BE"
            }
        }
    }
    return (
        <div className=''>
            {renderLabel()}
            <PhoneInput
                className={className.join(' ')}
                countryCallingCodeEditable={false}
                international
                defaultCountry={displayDefaultCountry(props.defaultPays)}
                value={props.value}
                onChange={(e) => props.onChange(e ? e : "", isValidPhoneNumber(e ? e : ""))}
            />
            {renderError()}
        </div>
    )
}

export default MoleculeInputPhoneNumber
MoleculeInputPhoneNumber.propTypes = {
    defaultPays: PropTypes.string
};
MoleculeInputPhoneNumber.defaultProps = {
    defaultPays: 'Belgique'
};
