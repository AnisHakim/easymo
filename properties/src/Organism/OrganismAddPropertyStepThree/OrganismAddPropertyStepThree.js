import React from 'react'
import { MoleculeInput, Button, GoogleMaps } from "@easymo/designSystem";
import translator from '../../lang/translator';
import propTypes from 'prop-types';


const OrganismAddPropertyStepThree = (props) => {
    const lang = translator('fr');
    return (
        <div className="modal-container-step-three">
            <div className="row mb-4 gx-2">
                <div className="col-lg-6 mb-3">
                    <MoleculeInput
                        inputClassname='inputs-step-three'
                        labelClassname="text-modal-organism-step-one"
                        placeholder={lang.pontStreet}
                        inputLabel={lang.street}
                        labelTextType='h5'
                        onchangeInput={props.onChangeStreetName}
                        inputValue={props.street.value}
                        isValid={props.street.isValid}
                        isInvalid={props.street.isInValid}
                        inputError={props.street.errorMessage}
                        errorClassname='error-msg-inputs'
                    />
                </div>
                <div className="col-lg-2 mb-3">
                    <MoleculeInput
                        inputClassname='inputs-step-three'
                        labelClassname="text-modal-organism-step-one"
                        placeholder='74'
                        inputLabel={lang.number}
                        labelTextType='h5'
                        onchangeInput={props.onChangeStreetNumber}
                        inputValue={props.streetNumber.value}
                        isValid={props.streetNumber.isValid}
                        isInvalid={props.streetNumber.isInValid}
                        inputError={props.streetNumber.errorMessage}
                        errorClassname='error-msg-inputs'
                    />
                </div>
                <div className="col-lg-4 mb-3">
                    <MoleculeInput
                        inputClassname='inputs-step-three'
                        labelClassname="text-modal-organism-step-one"
                        placeholder='5000'
                        inputLabel={lang.code_postal}
                        labelTextType='h5'
                        onchangeInput={props.onChangeStreetPostal}
                        inputValue={props.postalCode.value}
                        isValid={props.postalCode.isValid}
                        isInvalid={props.postalCode.isInValid}
                        inputError={props.postalCode.errorMessage}
                        errorClassname='error-msg-inputs'
                    />
                </div>
            </div>
            <div className="row gx-2">
                <div className="col-lg-6 mb-3">
                    <MoleculeInput
                        inputClassname='inputs-step-three'
                        labelClassname="text-modal-organism-step-one"
                        placeholder={lang.namur}
                        inputLabel={lang.ville}
                        labelTextType='h5'
                        onchangeInput={props.onChangeCity}
                        inputValue={props.city.value}
                        isValid={props.city.isValid}
                        isInvalid={props.city.isInValid}
                        inputError={props.city.errorMessage}
                        errorClassname='error-msg-inputs'
                    />
                </div>
                <div className="col-lg-6 mb-3">
                    <MoleculeInput
                        inputClassname='inputs-step-three'
                        labelClassname="text-modal-organism-step-one"
                        placeholder={lang.belgium}
                        inputLabel={lang.country}
                        labelTextType='h5'
                        onchangeInput={props.onChangeCountry}
                        inputValue={props.country.value}
                        isValid={props.country.isValid}
                        isInvalid={props.country.isInValid}
                        inputError={props.country.errorMessage}
                        errorClassname='error-msg-inputs'
                    />
                </div>
            </div>
            <div className='w-100 mt-4'>
                <GoogleMaps setPositionGoogleMaps={props.setPositionGoogleMaps}
                    getPosition={props.getPosition}
                    address={{
                        postalCode: props.postalCode.value,
                        city: props.city.value,
                        country: props.country.value,
                        street: props.street.value,
                        streetNumber: props.streetNumber.value,
                    }}
                />
            </div>
            {props.isFooter && <div className='flex flex-direction-row justify-space-between item-center'>
                <Button text={lang.back} type='ghost'
                    className='button-next-modal-organism-stepone' icon='chevron_left' onClick={() => props.onChooseStep(props.index, 1)} />
                <div className='flex flex-direction-row'>
                    <Button text={lang.cancel} type='filter'
                        className='cancel-button-step-three mr-2' onClick={props.onHide} />
                    <Button text={lang.createProperty} type='primary' onClick={props.onValidateCreationProperty}
                        className='button-next-modal-organism-stepone' />
                </div>

            </div>}
        </div>
    )
}
OrganismAddPropertyStepThree.propTypes = {
    isFooter: propTypes.bool
};
OrganismAddPropertyStepThree.defaultProps = {
    isFooter: true
}
export default OrganismAddPropertyStepThree

