
import { Img, Text, MoleculeInput, Button, MoleculeProgressBar } from "@easymo/designSystem";
import translator from "../../lang/translator";
function NewPswdTemplate(props) {
    const lang = translator('fr');
    return (
        <div className='flex item-center justify-center flex-direction-col'>
            <div className='mb-5'>
                <Img className='pointer' onClick={props.onRedirectToLogin} type="LOGO LARGE" src={props.logo} alt='' />
            </div>
            <Text text={lang.réinitialisez_mdps} type={"h1"} className="display-4" />
            <p className="text-center mb-5" >
                {lang.conseil_mdps}
            </p>
            <div className="mb-3 w-100">
                <MoleculeInput
                    placeholder={lang.indiquez_mdps}
                    inputLabel={lang.mot_de_passe}
                    labelTextType='h5'
                    type="password"
                    onchangeInput={props.onChangePassword}
                    inputValue={props.password.value}
                    isValid={props.password.isValid}
                    isInvalid={props.password.isInValid}
                />
                <div className="mb-3" >
                    <MoleculeProgressBar progressLabelClassName='mt-1 label-progress-mb' isReset={true}
                        progressLabel={props.passwordStrength.label}
                        percent={props.passwordStrength.percent}
                        progressColor={props.passwordStrength.color}
                    />
                </div>
                <p className="font-size-sm fw-600 mb-2" > {lang.exigence_mdps} </p>
                <p class="font-size-sm mb-2"> {lang.conditions_reunies} </p>

                <Text text={lang.mdps_regles}
                    type="h6"
                    className="progress-bar-text mt-1 mb-0" />
            </div>
            <div className="mb-5 w-100">
                <MoleculeInput
                    placeholder={lang.confirm_mdps}
                    inputLabel={lang.confirmation_mdps}
                    labelTextType='h5'
                    type="password"
                    onchangeInput={props.onChangeConfirmPassword}
                    inputValue={props.confirmPassword.value}
                    isValid={props.confirmPassword.isValid}
                    isInvalid={props.confirmPassword.isInvalid}
                    inputError={props.confirmPassword.errorMessage}
                />
            </div>
            <Button onClick={props.onSendRequest} text={lang.valider} type="connexion" iconRight icon='chevron_right' containerClassName="w-100" />
        </div>
    )
}

export default NewPswdTemplate
