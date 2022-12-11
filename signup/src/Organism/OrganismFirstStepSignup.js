import { Text, MoleculeInput, CheckBox, Button } from "@easymo/designSystem";
import React from 'react'
import translator from '../lang/translator'
function OrganismFirstStepSignup(props) {
    const lang = translator('fr')

    return (
        <div className="w-100">
            <div className="flex item-center justify-center flex-direction-column">
                <Text text={lang.créer_compte} type="h2" className="mb-2 display-4" />
                <div className="flex mb-5">
                    <Text text={lang.deja_compte} className="already-have-account mb-0" type='h6' />
                    <Text text={lang.connectez_ici} className="mb-0 login-here pointer" onClick={props.redirectToLogin} />
                </div>
            </div>
            <MoleculeInput
                placeholder={lang.entrez_email}
                inputLabel={lang.votre_mail}
                labelTextType='h5'
                onchangeInput={props.onChangeEmail}
                inputValue={props.value}
                isValid={props.isValid}
                isInvalid={props.isInValid}
                inputError={props.emailError}
            />
            <div className="flex item-center mt-5 mb-5">
                <CheckBox
                    checked={props.isTermsChecked}
                    onClick={props.onCheckTerms}
                    isInvalid={props.isTermsInvalid} />
                <Text text={lang.accept_les} type='h6' className={`mb-0 terms-chckbox-label pointer ${props.isTermsInvalid && 'invalid'}`} onClick={props.onCheckTerms} />
                <Text text={lang.terms_conditions} type='h6' className={`mb-0 terms-and-conditions pointer ${props.isTermsInvalid && 'invalid'}`} onClick={props.onCheckTerms} />
            </div>
            <Button text={lang.inscription} type="connexion" icon='chevron_right' iconRight='true' onClick={props.onValidateFirstStep} />
        </div>
    )
}

export default OrganismFirstStepSignup
