import { Img, Icon, Text } from "@easymo/designSystem";
import React from 'react'
import finalStep from '../assets/images/finalSignup.png'
import translator from '../lang/translator'

function OrganismFinalStepSignUp(props) {
    const lang = translator('fr')

    return (
        <div className="flex justify-center item-center flex-direction-column">
            <div className="mb-5">
                <Img src={props.signupSuccess} alt='Easymo' type="logo large" className="final-step-image" />
            </div>
            <Text text={lang.inscription_terminée} className="mb-3 text-center" type='h2' />
            <div className="final-step-icon-text-container">
                <Text text={lang.validez_mail_continuer}
                    className="final-step-text mb-0"
                    type='h5' />
                <Icon icon="launch_outlined" className="final-step-icon" />
            </div>
        </div>
    )
}

export default OrganismFinalStepSignUp
