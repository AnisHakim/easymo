
import { Img, Text, MoleculeInput, TextIcon, Button } from "@easymo/designSystem";
import translator from "../../lang/translator";
function ForgetPswTemplate(props) {
    const lang = translator('fr');
    return (
        <div className='flex item-center justify-center flex-direction-col'>
            <div className='mb-5'>
                <Img type="LOGO LARGE" className='pointer' src={props.logo} alt='' onClick={props.onRedirectToLogin} />
            </div>
            {
                !props.isMailInVerification
                    ?
                    <>
                        <Text text={lang.mdps_oubliée} type={"h1"} className="display-4" />
                        <p className="text-center" > {lang.fp_saisir_mail} </p>
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
                            onKeyPress={props.onKeyPress}
                        />
                        <Button text={lang.envoyer} type="connexion" icon='send' containerClassName="w-100" onClick={props.onSendRequest} />
                        <TextIcon
                            onClickContainer={props.onRedirectToLogin}
                            containerClassName='fpwd-back-txt mt-2'
                            text={lang.revenir_connexion}
                            type='h5'
                            iconStart='chevron_left'
                            iconStartClass='fpwd-back-icon'
                        />
                    </>
                    :
                    <>
                        <div className="fpwd-logo mb-6" >

                            <svg xmlns="http://www.w3.org/2000/svg" width="581.826" height="569.564" viewBox="0 0 581.826 569.564">
                                <g id="click" transform="translate(-0.049 -0.084)">
                                    <path id="BG" d="M581.3,230.3c-2.7-47.7-15.5-96-41.9-136.2A199.93,199.93,0,0,0,490.2,42c-21.5-15.7-46.6-26.2-72.4-32.4C390.2,2.9,361.5.6,333.2.2S276,.4,247.7,2.6c-30.1,2.4-60,7.7-87.6,20.4a186.065,186.065,0,0,0-53.9,38.2c8.8,3.6,16.9,7.6,20.4,14.1,3.8,6.9,1.2,17.8-6,36.8-6.5,17.2-15.6,40-26.4,74.6h0a7.484,7.484,0,0,1,2.6.1c10.8,2.8-3.1,49.8-9.8,67.9-4.5,12.4-11,21.1-13.3,33.4-1.5,8-2.9,19.1-3.2,21.5.6.1,1.3.2,1.9.3a231.914,231.914,0,0,1,6.2,31.8c9.3,1.3,19.6,20.6,23.4,30.1,6.8,17.1,12.3,34.6,19.3,51.7,9.5,23.1,22.4,52.8,49.5,54.6a58.288,58.288,0,0,0,27-4.7c-3.7-13.5-3.5-26.3,7.4-34.5-7.9-7.5-11.4-21.8-10.9-32.7.5-9.6,4.8-21,14-24.9-.5-12.6.3-29.2.3-42.1,1.2,0,2.3.1,3.5.1l-.4-1.9-2.3-25.1-.1-.2a16.3,16.3,0,0,1-9.8-5.2l-1.9.6c-7.1-.3-11.9,1.4-18.5-3.8-4.7-3.6-8.5-10.9-9.8-17.7l-2.2-1.2c-10.9-7.3-16.1-36.5,1.5-37.6l2.7-1.2c-3.1-14.6,2.2-22.5,16-27.5,3-1.1,6.3-2.3,9.8-3.3-8.6-4-19.1-9-27.1-14.3-7.5-4.9-15.6-10.9-20.8-18-4.6-6.4-10.5-17.9-2.1-24.1,9.3-7,18.6,2.3,24.9,7.6,9.4,7.9,20.8,13.5,31.7,19.8,10.1,5.9,22.9,11.3,33.8,17.3,21,11.4,38.7,17.8,36.5,45.4-1.8,22.8-13,46.8-10.1,73.3v.4c1.2-.9,2.5-1.9,3.8-2.9,2.2,9.9,3.8,32.2,3.8,32.2,12.7-3.6,17.6,13.2,22.5,29.9l.3-.2c5.2-6.5,10.5-13,16-19.2,20-22.6,43-50,56-62.6.5.7,1,1.5,1.5,2.2,4.5-10.9,14.6-35.2,20.3-46.5,7.1-14.2,18.1-34,27.4-47.8-7.8-6.5-37.5-23.5-45-29.2,26.5-11.3,51.5-18.6,77.2-21.7,1.5-.2,3-.3,4.5-.5a37.918,37.918,0,0,1-8-11.8c-1.1-2.5,1.6-5.5,4.1-3.8,10.1,7,23,2.8,34.3,5.1,9,1.8,17.7,8.8,17.3,18.6.2.1.3.1.5.2a17.26,17.26,0,0,1,2.8,1.9c17.1,9.6,16,36.4,10.4,52.4-.5,1.5-1.1,3-1.7,4.5h0c9.7,2.5,17.4,8.3,15.8,19.6-2.2,16-23,17.3-38.7,14.7l.3.1a39.84,39.84,0,0,1-13.2,9.4,4.271,4.271,0,0,1-3.5,0c-3.1,11.4-7.2,27.4-8.3,35-2.1,14.3-5.1,37.5-5.1,37.5l-.3,1.3c.5-.1,1.1-.2,1.6-.3,0,0-.9,18.7,2.4,22.6s16.6,14.6,22.6,20.6c7.6,7.7,14.8,18,21,29a156.483,156.483,0,0,0,35.3-30.1C576.9,341.5,584.2,282.4,581.3,230.3Z" fill="#f4f6f9" />
                                    <path id="Tracé_9" data-name="Tracé 9" d="M271.5,351.7s-1.6-22.3-3.8-32.2c-8.6,6.6-14.2,10.9-23.9,14.9-11,4.5-22.5,5.2-35,4.7,0,13-.8,29.5-.3,42.1a87.155,87.155,0,0,0,36.2-8.3C255.7,367.7,268.7,359.7,271.5,351.7Z" fill="none" stroke="#132144" stroke-linecap="round" stroke-linejoin="round" stroke-width="7" />
                                    <path id="Tracé_10" data-name="Tracé 10" d="M350.1,330c-1.2,6.8-6.1,30.5,6.6,23.1,9.6-5.5,15.7-17.9,24.1-24.6,1.1,14.3-8.2,32.3-.5,46.7,7.1,13.5,28.2,5.3,39.6.9,8-3.1,22.8-8.8,30.8-10.2" fill="none" stroke="#132144" stroke-linecap="round" stroke-linejoin="round" stroke-width="7" />
                                    <path id="Tracé_11" data-name="Tracé 11" d="M368.2,300.5s12.5-30.5,20-45.4c7.1-14.2,18.1-34,27.4-47.8-7.8-6.5-37.5-23.5-45-29.2,26.5-11.3,51.5-18.6,77.2-21.7,22.1-2.6,57.4-2.1,52.6,30.3-1.8,12.2-8.2,25.5-15,36,13.3-3.1,45.4-2.1,42.4,20-2.9,21.1-38.5,16.6-51.5,11.3,0,0-10.1,35.4-11.9,47.9-2.1,14.3-5.1,37.5-5.1,37.5" fill="none" stroke="#132144" stroke-linecap="round" stroke-linejoin="round" stroke-width="7" />
                                    <path id="Tracé_12" data-name="Tracé 12" d="M432.8,225.1c2.9,2.9,11.1,3.4,15,2" fill="none" stroke="#132144" stroke-linecap="round" stroke-linejoin="round" stroke-width="7" />
                                    <path id="Tracé_13" data-name="Tracé 13" d="M439.4,192c-1.2,2.5-3.2,6.6-3.2,6.6" fill="none" stroke="#132144" stroke-linecap="round" stroke-linejoin="round" stroke-width="7" />
                                    <path id="Tracé_14" data-name="Tracé 14" d="M453.1,196.3c-1.2,2.5-3.2,6.6-3.2,6.6" fill="none" stroke="#132144" stroke-linecap="round" stroke-linejoin="round" stroke-width="7" />
                                    <path id="Tracé_15" data-name="Tracé 15" d="M208.5,381.2c-9.1,3.9-13.5,15.3-14,24.9-.5,10.9,2.9,25.2,10.9,32.7-13.8,10.5-10.5,28.2-3.8,45.4s20.6,45.6,20.6,55.1" fill="none" stroke="#132144" stroke-linecap="round" stroke-linejoin="round" stroke-width="7" />
                                    <path id="Tracé_16" data-name="Tracé 16" d="M271.5,351.7c13.9-4,18.5,16.8,24,34.8s16.8,41.1,28.7,61.3c15.8,26.8,44,78,84.8,77.9,24.9,0,28.1-14.9,22.9-22.8s-19.8-1.7-11.6,7.7,29.5-8.2,35.9-28.1" fill="none" stroke="#132144" stroke-linecap="round" stroke-linejoin="round" stroke-width="7" />
                                    <path id="Tracé_17" data-name="Tracé 17" d="M294.3,381.3c5.2-6.5,10.5-13,16-19.2,20-22.6,43-50,56-62.6,5.4,8.1,15.3,17.4,32,27.1s43,18.3,62.3,13.8c0,0-.9,18.7,2.4,22.6s16.6,14.6,22.6,20.6c15.8,15.9,29.5,42.9,36.6,64.2,3.8,11.5,7.9,31.2,9.5,42.8" fill="none" stroke="#132144" stroke-linecap="round" stroke-linejoin="round" stroke-width="7" />
                                    <path id="Tracé_18" data-name="Tracé 18" d="M21.8,355.5s-5.7-36.4-6.5-44.9a193.083,193.083,0,0,1,57.3-.8,231.914,231.914,0,0,1,6.2,31.8c9.3,1.3,19.6,20.6,23.4,30.1,6.8,17.1,12.3,34.6,19.3,51.7,9.5,23.1,22.4,52.8,49.5,54.6a58.288,58.288,0,0,0,27-4.7" fill="none" stroke="#132144" stroke-linecap="round" stroke-linejoin="round" stroke-width="7" />
                                    <path id="Tracé_19" data-name="Tracé 19" d="M78.8,341.6c-18.7,0-54.8,7.9-63.5,19.8s1.3,55.1,5.2,69.3c7.4,26.9,13.3,56.2,24.3,81.7,6.6,15.1,11.1,40.9,22.9,52.3" fill="none" stroke="#132144" stroke-linecap="round" stroke-linejoin="round" stroke-width="7" />
                                    <path id="Tracé_20" data-name="Tracé 20" d="M41.7,252.6c3.7-13.2,17.7-19.2,30.6-26.8,7-18,13.7-41.7,24.5-39s-3.1,49.8-9.8,67.9c-4.5,12.4-11,21.1-13.3,33.4-1.7,9.1-3.2,22-3.2,22" fill="none" stroke="#132144" stroke-linecap="round" stroke-linejoin="round" stroke-width="7" />
                                    <line id="Ligne_1" data-name="Ligne 1" x1="2.3" y1="25.1" transform="translate(209.6 312.1)" fill="none" stroke="#132144" stroke-linecap="round" stroke-linejoin="round" stroke-width="7" />
                                    <path id="Tracé_21" data-name="Tracé 21" d="M214.4,311.4c-13.3,4.2-27.1-16.4-14.2-24.3" fill="none" stroke="#132144" stroke-linecap="round" stroke-linejoin="round" stroke-width="7" />
                                    <path id="Tracé_22" data-name="Tracé 22" d="M44.4,245.9s-13.1-3.4-19.2-8c-8.9-6.7-5.6-19.8-4.8-29.6C24,167,34.7,131.5,50.7,93.8c4.6-10.9,10.5-24.9,17.9-34,7.6-9.4,18.2-6.3,29.6-1.7S122,67,126.6,75.3c3.8,6.9,1.2,17.8-6,36.8-6.5,17.2-15.6,40-26.4,74.6" fill="#377dff" stroke="#377dff" stroke-linecap="round" stroke-linejoin="round" stroke-width="7" />
                                    <path id="Tracé_23" data-name="Tracé 23" d="M197.8,307.2c-7.1-.3-11.9,1.4-18.5-3.8-6.1-4.7-10.9-15.8-10.2-23.8.9-10.9,31.8-32.3,37.8-24.5" fill="none" stroke="#132144" stroke-linecap="round" stroke-linejoin="round" stroke-width="7" />
                                    <path id="Tracé_24" data-name="Tracé 24" d="M16.4,307.4c-5.1-22.8-1.1-44.8-6-66.8-4.3-19.5-10.6-44.1-4-63.1,3.6-10.2,11-13,18.7-7.3" fill="none" stroke="#132144" stroke-linecap="round" stroke-linejoin="round" stroke-width="7" />
                                    <path id="Tracé_25" data-name="Tracé 25" d="M170.8,274c-3.4-15.4-2.9-23.2,10.3-31.9,7.7-5.1,25.1-14.1,32.9-12" fill="none" stroke="#132144" stroke-linecap="round" stroke-linejoin="round" stroke-width="7" />
                                    <path id="Tracé_26" data-name="Tracé 26" d="M12.7,166.9c-3-3.2-1.9-14.8.6-19.2,3.2-5.6,14.2-13.1,20.8-8.8" fill="none" stroke="#132144" stroke-linecap="round" stroke-linejoin="round" stroke-width="7" />
                                    <path id="Tracé_27" data-name="Tracé 27" d="M171.8,247.3c-3.9-15.5,1.4-23.8,15.6-29,12.2-4.4,29-9.8,40.8-4.1" fill="none" stroke="#132144" stroke-linecap="round" stroke-linejoin="round" stroke-width="7" />
                                    <path id="Tracé_28" data-name="Tracé 28" d="M19.8,141.8c-3.4-11.6,5.3-25.8,20-24.1" fill="none" stroke="#132144" stroke-linecap="round" stroke-linejoin="round" stroke-width="7" />
                                    <path id="Tracé_29" data-name="Tracé 29" d="M167.3,284.6c-10.9-7.3-16.1-36.5,1.5-37.6" fill="none" stroke="#132144" stroke-linecap="round" stroke-linejoin="round" stroke-width="7" />
                                    <path id="Tracé_30" data-name="Tracé 30" d="M26.4,120.3c0-12.9,11.9-38.4,25-30.6" fill="none" stroke="#132144" stroke-linecap="round" stroke-linejoin="round" stroke-width="7" />
                                    <path id="Tracé_31" data-name="Tracé 31" d="M197.4,215.1c-8.7-4-19.2-9.1-27.4-14.5-7.5-4.9-15.6-10.9-20.8-18-4.6-6.4-10.5-17.9-2.1-24.1,9.3-7,18.6,2.3,24.9,7.6,9.4,7.9,20.8,13.5,31.7,19.8,10.1,5.9,22.9,11.3,33.8,17.3,21,11.4,38.7,17.8,36.5,45.4-1.8,22.8-13,46.8-10.1,73.3" fill="none" stroke="#132144" stroke-linecap="round" stroke-linejoin="round" stroke-width="7" />
                                    <path id="Tracé_32" data-name="Tracé 32" d="M35,227.7c4.5-47.3,17.8-83.9,32.7-128.9,2.8-8.4,10.7-26.3,17.6-32.1" fill="none" stroke="#132144" stroke-linecap="round" stroke-linejoin="round" stroke-width="7" />
                                    <path id="Tracé_33" data-name="Tracé 33" d="M498.9,240.9c1.5-1.1,9.5-1.2,9.5-1.2" fill="none" stroke="#132144" stroke-linecap="round" stroke-linejoin="round" stroke-width="7" />
                                    <path id="Tracé_34" data-name="Tracé 34" d="M472.7,266.9a4.271,4.271,0,0,0,3.5,0,39.841,39.841,0,0,0,13.2-9.4,64.686,64.686,0,0,1-13.1-3.4C476.4,254.1,474.8,259.5,472.7,266.9Z" fill="#333" />
                                    <path id="Tracé_35" data-name="Tracé 35" d="M503.3,166.3a27.5,27.5,0,0,0-2.8-1.9c-.2-.1-.3-.2-.5-.2.5-9.9-8.2-16.8-17.3-18.6-11.3-2.3-24.2,1.9-34.3-5.1-2.5-1.8-5.2,1.3-4.1,3.8,8.2,18.8,27.9,25.6,47,27.1-4.6,5.3-6.3,12.8-6.4,19.9-.1,11.5,3.7,26-6.4,34.6-2.5,2.1.5,6.4,3.3,4.6a62.484,62.484,0,0,0,11-8.8,58.364,58.364,0,0,1,19.1,1.4c.6-1.5,1.2-3,1.7-4.5C519.3,202.7,520.4,175.9,503.3,166.3Z" fill="#132144" />
                                </g>
                            </svg>
                        </div>
                        <Text text={lang.vérifiez_emails} type={"h1"} className="display-4" />
                        <p className="mb-1" > {lang.lien_envoyé} </p>
                        <Text text={props.mail.value} type={"h5"} className='fpwd-mail mb-1' />
                        <p className="mb-0" > {lang.suivre_instruction} </p>
                        <Button text="Me connecter" type="connexion" icon='sign_in' containerClassName=" mt-4 mb-3 fpwd-btn" onClick={props.onRedirectToLogin} />
                        <p > {lang.mail_non_reçu} <span onClick={props.onSendFpwdMail} className="pointer fpwd-resend" > {lang.renvoyer} </span> </p>


                    </>
            }
        </div >
    )
}

export default ForgetPswTemplate
