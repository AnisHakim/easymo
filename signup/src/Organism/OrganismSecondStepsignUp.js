import { Text, MoleculeInput, Select, Button } from "@easymo/designSystem";
import React from 'react'
import translator from '../lang/translator'
function OrganismSecondStepsignUp(props) {
    const lang = translator('fr')

    return (
        <div className="mw-25 w-100">
            <div className="mb-5 flex justify-center">
                <Text text={lang.agence_info} type="h2" className="mb-0" />
            </div>
            <div className="mb-5">
                <MoleculeInput
                    placeholder={lang.agence_immo}
                    inputLabel={lang.nom_agence}
                    labelTextType='h5'
                    onchangeInput={props.onChangeAgencyName}
                    inputValue={props.agency.value}
                    isValid={props.agency.isValid}
                    isInvalid={props.agency.isInValid}
                    inputError={props.agency.errorMessage}
                />
            </div>
            <div className="mb-5">
                <Select
                    inputLabel={lang.nombre_employé}
                    placeholder={lang.select_valeur}
                    className="select-employees"
                    onChange={props.onSelectEmployeesNumber}
                    inputError={props.employees.errorMessage}
                    isValid={props.employees.isValid}
                    isInvalid={props.employees.isInValid}
                    value={props.employees.value}
                    options={props.employeesList}
                />
            </div>
            <div className="input-label mb-2"> {lang.adress} </div>
            <div className="row mb-3 gx-2 street-adress-container">
                <div className="col-lg-6 street-adress-container-col mb-3">
                    <MoleculeInput
                        labelClassname="adress-input-label"
                        placeholder={lang.rue_pont}
                        inputLabel={lang.rue}
                        labelTextType='h5'
                        onchangeInput={props.onChangeStreetName}
                        inputValue={props.street.value}
                        isValid={props.street.isValid}
                        isInvalid={props.street.isInValid}
                    />
                </div>
                <div className="col-lg-2 mb-3 street-number-container-col">
                    <MoleculeInput
                        labelClassname="adress-input-label"
                        placeholder='74'
                        inputLabel={lang.numero}
                        labelTextType='h5'
                        onchangeInput={props.onChangeStreetNumber}
                        inputValue={props.streetNumber.value}
                        isValid={props.streetNumber.isValid}
                        isInvalid={props.streetNumber.isInValid}
                    />
                </div>
                <div className="col-lg-4 mb-3 street-code-container-col">
                    <MoleculeInput
                        labelClassname="adress-input-label"
                        placeholder='5000'
                        inputLabel={lang.code_postal}
                        labelTextType='h5'
                        onchangeInput={props.onChangeStreetPostal}
                        inputValue={props.postalCode.value}
                        isValid={props.postalCode.isValid}
                        isInvalid={props.postalCode.isInValid}
                    />
                </div>
            </div>
            <div className="row gx-2 street-adress-container">
                <div className="col-lg-6 mb-5 street-adress-container-col">
                    <MoleculeInput
                        labelClassname="adress-input-label"
                        placeholder={lang.namur}
                        inputLabel={lang.ville}
                        labelTextType='h5'
                        onchangeInput={props.onChangeCity}
                        inputValue={props.city.value}
                        isValid={props.city.isValid}
                        isInvalid={props.city.isInValid}
                    />
                </div>
                <div className="col-lg-6 mb-5 street-code-container-col">
                    <MoleculeInput
                        labelClassname="adress-input-label"
                        placeholder={lang.belgique}
                        inputLabel={lang.pays}
                        labelTextType='h5'
                        onchangeInput={props.onChangeCountry}
                        inputValue={props.country.value}
                        isValid={props.country.isValid}
                        isInvalid={props.country.isInValid}
                    />
                </div>
                <div className="flex justify-space-between">
                    <Button text={lang.retour} icon='chevron_left' type="ghost" onClick={props.onBackFristStep} />
                    <Button text={lang.créer_mon_compte} icon='chevron_right' iconRight='true' onClick={props.onValidateSecondStep} />
                </div>
            </div>

        </div >
    )
}

export default OrganismSecondStepsignUp
