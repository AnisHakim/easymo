import React from 'react'
import { Img, Text, MoleculeInput, CheckBox, Button } from "@easymo/designSystem";
import { Link } from 'react-router-dom';
import translator from "../../lang/translator";
const LoginTemplate = (props) => {
    const lang = translator('fr');

    return (

        <div className='flex item-center justify-center flex-direction-col'>
            <div className='mb-4'>
                <Img type="LOGO LARGE" src={props.logo} alt='' />
            </div>
            <Text text={lang.connexion} type={"h1"} className="display-4 pt-2" />
            <p>{lang.pas_compte} <Link className='text-decoration' to="/signup"> {lang.inscrivez_vous} </Link></p>
            <MoleculeInput
                placeholder={lang.entrez_email}
                inputLabel={lang.votre_mail}
                labelTextType='h5'
                inputError={lang.invalid_mail_error}
                inputClassname='w-100'
                labelIcon={'visible_outlined'}
                containerClassName="w-100 mb-5 pt-3"
                inputValue={props.mail.value}
                onchangeInput={props.onChangeMail}
                isInvalid={props.mail.isInvalid}
                isValid={props.mail.isValid}
                onKeyPress={props.handleKeyPress}
            />
            <MoleculeInput
                placeholder={lang.votre_mdps}
                inputLabel={lang.mot_de_passe}
                labelTextType='h5'
                inputError={lang.invalid_mdps_error}
                inputClassname='w-100'
                labelIcon={'visible_outlined'}
                icon="hidden_outlined"
                isInputPassword
                onClickForgotPassword={props.onClickForgotPassword}
                type='password'
                containerClassName="w-100 mb-5"
                isForgotPasswordLabel
                inputValue={props.password.value}
                onchangeInput={props.onChangePassword}
                isInvalid={props.password.isInvalid}
                isValid={props.password.isValid}
                onKeyPress={props.handleKeyPress}
            />

            <div className='w-100 flex justify-flex-start mb-5'>
                <CheckBox
                    checked={props.isTermsChecked}
                    onClick={props.onCheckTerms}
                    label={lang.souvenir_moi}
                />
            </div>
            <Button withLoader loading={props.loading} text={lang.connexion} type="connexion" icon='sign_in' containerClassName="w-100 mb-2" onClick={props.submit} />
        </div>
    )
}

export default LoginTemplate
