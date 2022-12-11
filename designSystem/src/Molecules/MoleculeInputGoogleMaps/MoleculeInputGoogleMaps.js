import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { Icon } from '../../Atoms'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import AtomInput from '../../Atoms/AtomInput/AtomInput';
function MoleculeInputGoogleMaps(props) {
    const [address, setAddress] = useState('')
    const handleChange = address => {
        setAddress(address)
    };
    const handleSelect = address => {
        setAddress(address)
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => props.getAdress && props.getAdress(latLng))
            .catch();

    };
    useEffect(() => {
        props.getTextAddress && props.getTextAddress(address)
    }, [address])

    const inputClassname = ['input-search-proximity w-100']
    if (props.inputClassname) {
        inputClassname.push(props.inputClassname)
    }
    const containerClassName = ['']
    if (props.withIconStart) {
        containerClassName.push('relative')
    }
    if (props.containerClassName) {
        containerClassName.push(props.containerClassName)
    }
    function renderError() {
        if (props.inputError && props.isInvalid) {
            return viewError({ text: props.inputError, className: props.errorClassname })
        }
    }
    return (
        <div className={containerClassName.join(' ')}>
            <PlacesAutocomplete
                className='input-add-equipement'
                value={address}
                onChange={handleChange}
                onSelect={handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div className='w-100 relative'>
                        {props.withIconStart && <Icon icon={props.startIcon} className={props.startIconClass} style={{ top: "14px" }} />}
                        <AtomInput
                            className={inputClassname.join(' ')}
                            placeholder={props.placeholder}
                            {...getInputProps({
                            })}
                        />
                        <div className={suggestions.length > 0 ? 'shadowContainer bg-white p-4 absolute w-100 z-index-2' : ''}>
                            {suggestions.map(suggestion => {
                                const className = 'suggestion-googlemaps-item'
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                        })}
                                    >
                                        <span className='description-autocomplete-googlemaps'>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
            {renderError()}
        </div>
    )
}
MoleculeInputGoogleMaps.propTypes = {
    inputLabel: PropTypes.string,
    errorClassname: PropTypes.string,
    containerClassName: PropTypes.string,
    startIconClass: PropTypes.string,
    withIconStart: PropTypes.bool,
    placeholder: PropTypes.bool,
    inputError: PropTypes.string,
    isInvalid: PropTypes.bool,
    isValid: PropTypes.bool,
    onchangeInput: PropTypes.any,
    inputValue: PropTypes.any,
    getAdress: PropTypes.any,
    getTextAddress: PropTypes.any,
}
MoleculeInputGoogleMaps.defaultProps = {
    inputLabel: null,
    errorClassname: '',
    inputError: '',
    placeholder: '',
    withIconStart: false,
    containerClassName: null,
    startIconClass: 'absolute input-start-icon',
    isInvalid: false,
    isValid: false,
    onchangeInput: null,
    inputValue: null,
    getAdress: null,
    getTextAddress: null,
}
export default MoleculeInputGoogleMaps