import React from 'react'
import { Img, Text, Button, Input, OnHoverButtonBlueBorder, viewError } from "@easymo/designSystem";
import unlock from "../../Images/unlock.png"
import translator from "../../lang/translator";

const DoubleAuthTemplate = (props) => {
    const lang = translator('fr');
    function renderError() {
        if (props.code.errorMsg && props.code.isInvalid) {
            return viewError({ text: props.code.errorMsg, className: 'double-auth-error-message ' })
        }
    }
    function renderSuccess() {
        if (props.resendCodeMsg.isValid && props.resendCodeMsg.msgValue) {
            return <div className='double-auth-success-message mt-2'>
                {props.resendCodeMsg.msgValue}
            </div>
        }
    }
    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            props.submit()
        }
    }
    return (
        <div className='flex item-center justify-center flex-direction-col align-items-center'>
            <div className='mb-5'>
                <Img type="LOGO LARGE" src={props.logo} alt='' onClick={props.goToLogin} className="pointer" />
            </div>
            <div className='mb-6'>
                <Img type="LOGO LARGE" src={unlock} alt='' className='avatar-xxl avatar-4by3' />
            </div>
            <div className='mb-5' style={{ textAlign: 'center' }}>
                <Text text={lang.double_auth} type={"h1"} className="display-4 mb-3" />
                <p className='mb-0 pt-3'> {lang.da_mail_envoyé} </p>
                <p className='mb-0 pb-3' > {lang.entrez_code} </p>
            </div>

            <div className="row gx-2 gx-sm-3">
                <div className="col">
                    <div className='form-group'>
                        <Input type="text"
                            value={props.code.value[0]}
                            className="form-ctr form-control-single-number px-0"
                            placeholder=""
                            onChange={(e) => props.onChangeCode(e, 0)}
                            isInvalid={props.code.isInvalid}
                            id='code0'
                            onKeyPress={onKeyPress}
                        />
                    </div>

                </div>
                <div className="col">

                    <div className='form-group'>
                        <Input type="text"
                            value={props.code.value[1]}
                            className="form-ctr form-control-single-number px-0"
                            placeholder=""
                            onChange={(e) => props.onChangeCode(e, 1)}
                            isInvalid={props.code.isInvalid}
                            id='code1'
                            onKeyPress={onKeyPress}
                        />
                    </div>

                </div>
                <div className="col">

                    <div className='form-group'>
                        <Input type="text"
                            value={props.code.value[2]}
                            className="form-ctr form-control-single-number px-0"
                            placeholder=""
                            onChange={(e) => props.onChangeCode(e, 2)}
                            isInvalid={props.code.isInvalid}
                            id='code2'
                            onKeyPress={onKeyPress}
                        />
                    </div>

                </div>

                <div className="col px-0">
                    <div className='form-group'>
                        <p className='pClass'>-
                        </p>
                    </div>

                </div>

                <div className="col">

                    <div className='form-group'>
                        <Input type="text"
                            value={props.code.value[3]}
                            className="form-ctr form-control-single-number px-0"
                            placeholder=""
                            onChange={(e) => props.onChangeCode(e, 3)}
                            isInvalid={props.code.isInvalid}
                            id='code3'
                            onKeyPress={onKeyPress}
                        />
                    </div>

                </div>
                <div className="col">

                    <div className='form-group'>
                        <Input type="text"
                            value={props.code.value[4]}
                            className="form-ctr form-control-single-number px-0"
                            placeholder=""
                            onChange={(e) => props.onChangeCode(e, 4)}
                            isInvalid={props.code.isInvalid}
                            id='code4'
                            onKeyPress={onKeyPress}
                        />
                    </div>

                </div>
                <div className="col">

                    <div className='form-group'>
                        <Input type="text"
                            value={props.code.value[5]}
                            className="form-ctr form-control-single-number px-0"
                            placeholder=""
                            onChange={(e) => props.onChangeCode(e, 5)}
                            isInvalid={props.code.isInvalid}
                            id='code5'
                            onKeyPress={onKeyPress}

                        />
                    </div>

                </div>

            </div>
            <div className='w-100'>
                {renderError()}

            </div>
            <Button withLoader loading={props.loading} text={lang.vérifier_compte} type="connexion" icon='checkmark_circle' containerClassName={props.code.isInvalid ? "w-100" : "button-double-auth w-100"}
                onClick={props.submit}
            />
            <div className='mt-3'>
                <div className='text-decoration'> {lang.rien_reçu + " "}
                    <span className='pointer' style={{ color: OnHoverButtonBlueBorder }} onClick={props.resendCode}>
                        {lang.renvoyer_code}
                    </span>
                </div>
            </div>
            {renderSuccess()}
        </div>
    )
}

export default DoubleAuthTemplate
