import { Img, Icon, Text, DoneIcon } from "@easymo/designSystem";
import React from 'react'
import signup from '../assets/images/sign-up.png'
import translator from '../lang/translator'

function OrganismDiscription(props) {
    const lang = translator('fr')
    return (
        <div style={{ maxWidth: "30rem" }}>
            <div className="flex justify-center mb-5">
                <Img src={props.signup} alt="easymo" type="full" className="signup-image" />
            </div>
            <div className="mb-5">
                <Text text={lang.gestion_facile} type="h2" className="signup-discription-bold-text mb-0" />
                <Text text={lang.easymo_} type="h2" className="signup-discription-bold-text mb-0" />
            </div>
            <div className="small-discription-container flex m-2">
                <Icon icon="tick" size={'1.25rem'} color={DoneIcon} className="mr-3" />
                <div>
                    <Text text={lang.compte_gratuit_fonc} className="signup-grey-bold-discription mb-1" />
                    <Text text={lang.fonct_gratuit} className="already-have-account mb-0" />
                    <Text text={lang.easymo_ss_limite} className="already-have-account mb-0" />
                </div>

            </div>
            <div className="small-discription-container flex m-2">
                <Icon icon="tick" size={'1.25rem'} color={DoneIcon} className="mr-3" />
                <div>
                    <Text text={lang.ou_soyez} className="signup-grey-bold-discription mb-1" />
                    <Text text={lang.ou_soyez_disc1} className="already-have-account mb-0" />
                    <Text text={lang.ou_soyez_disc2} className="already-have-account mb-0" />
                </div>
            </div>
            <div className="small-discription-container flex m-2">
                <Icon icon="tick" size={'1.25rem'} color={DoneIcon} className="mr-3" />
                <div>
                    <Text text={lang.boostez_productivité} className="signup-grey-bold-discription mb-1" />
                    <Text text={lang.economisez_1jr} className="already-have-account mb-0" />
                </div>
            </div >
        </div >
    )
}

export default OrganismDiscription
