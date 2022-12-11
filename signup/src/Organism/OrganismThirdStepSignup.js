import { Text, MoleculeInput, Button, MoleculeProgressBar, InputPhoneNumber } from "@easymo/designSystem";
import React from 'react'
import translator from '../lang/translator'
function OrganismThirdStepSignUp(props) {
    const lang = translator('fr')

    return (
        <div className="mw-25 w-100">
            <div className="mb-5 flex justify-center">
                <Text text={lang.compte_info} type="h2" className="mb-0" />
            </div>
            <div className="input-label mb-2"> {lang.prenom_nom} </div>
            <div className="row gx-2 street-adress-container ">
                <div className="col-lg-6 mb-5 street-adress-container-col">
                    <MoleculeInput
                        placeholder={lang.thomas}
                        onchangeInput={props.onChangeFirstName}
                        inputValue={props.firstName.value}
                        isValid={props.firstName.isValid}
                        isInvalid={props.firstName.isInValid}
                        inputError={props.firstName.errorMessage}
                    />
                </div>
                <div className="col-lg-6 mb-5 street-code-container-col">
                    <MoleculeInput
                        placeholder={lang.dupont}
                        onchangeInput={props.onChangeLastName}
                        inputValue={props.lastName.value}
                        isValid={props.lastName.isValid}
                        isInvalid={props.lastName.isInValid}
                        inputError={props.lastName.errorMessage}
                    />
                </div>
            </div>
            <div className="mb-5">
                <MoleculeInput
                    placeholder={lang.gestionnaire_agence}
                    inputLabel={lang.fonction}
                    labelTextType='h5'
                    onchangeInput={props.onChangeFunction}
                    inputValue={props.function.value}
                    isValid={props.function.isValid}
                    isInvalid={props.function.isInValid}
                    inputError={props.function.errorMessage}
                />
            </div>
            <div className="mb-5">
                <InputPhoneNumber
                    labelClassname="mb-2 pointer"
                    inputLabel={lang.numero_phone}
                    onChange={props.onChangePhoneNumber}
                    inputValue={props.phoneNumber.value}
                    isValid={props.phoneNumber.isValid}
                    isInvalid={props.phoneNumber.isInValid}
                    inputError={props.phoneNumber.errorMessage}
                    defaultPays={props.country.value}
                />
            </div>
            <div className="mb-5">
                <MoleculeInput
                    placeholder={lang.indiquez_mdps}
                    inputLabel={lang.mot_de_passe}
                    labelTextType='h5'
                    type="password"
                    onchangeInput={props.onChangePassword}
                    inputValue={props.password.value}
                    isValid={props.password.isValid}
                    isInvalid={props.password.isInValid}
                    inputError={props.password.errorMessage}
                />
                <MoleculeProgressBar
                    progressLabel={props.passwordStrength.label}
                    percent={props.passwordStrength.percent}
                    progressColor={props.passwordStrength.color}
                    progressLabelClassName='pswd-strength-label'
                />
                <Text text={lang.mdps_regles}
                    type="h6"
                    className="progress-bar-text mt-1" />
            </div>
            <div className="mb-5">
                <MoleculeInput
                    placeholder={lang.confirm_mdps}
                    inputLabel={lang.confirmation_mdps}
                    labelTextType='h5'
                    type="password"
                    onchangeInput={props.onChangeConfirmPassword}
                    inputValue={props.confirmPassword.value}
                    isValid={props.confirmPassword.isValid}
                    isInvalid={props.confirmPassword.isInValid}
                    inputError={props.confirmPassword.errorMessage}
                />
            </div>
            <div className="flex justify-space-between">
                <Button text={lang.retour} icon='chevron_left' type="ghost" onClick={props.onBackSecondStep} />
                <Button text={lang.suivant} icon='chevron_right' iconRight='true' onClick={props.onValidateThirdStep} />
            </div>

        </div >
    )
}

export default OrganismThirdStepSignUp
