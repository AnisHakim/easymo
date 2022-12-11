import { Img, Stepper, isEmpty } from "@easymo/designSystem";
import React from 'react'
import OrganismDiscription from "../../Organism/OrganismDiscription";
import OrganismFirstStepSignup from "../../Organism/OrganismFirstStepSignup";
import logo from '../../assets/images/logo.png'
import OrganismSecondStepsignUp from "../../Organism/OrganismSecondStepsignUp";
import OrganismThirdStepSignUp from "../../Organism/OrganismThirdStepSignup"
import OrganismFinalStepSignUp from "../../Organism/OrganismFinalStepSignUp"
function TemplateSignUp(props) {
    function renderStep() {
        switch (props.stepIndex) {
            case 0:
                return <OrganismFirstStepSignup
                    isTermsChecked={props.isTermsChecked}
                    isTermsInvalid={props.isTermsInvalid}
                    onCheckTerms={props.onCheckTerms}
                    onChangeEmail={props.onChangeEmail}
                    isValid={props.mail.isValid}
                    isInValid={props.mail.isInValid}
                    emailError={props.mail.errorMessage}
                    value={props.mail.value}
                    onValidateFirstStep={props.onValidateFirstStep}
                    redirectToLogin={props.redirectToLogin}
                />
            case 1:
                return <OrganismSecondStepsignUp
                    onChangeAgencyName={props.onChangeAgencyName}
                    agency={props.agency}
                    onChangeStreetName={props.onChangeStreetName}
                    street={props.street}
                    onChangeStreetNumber={props.onChangeStreetNumber}
                    streetNumber={props.streetNumber}
                    onChangeStreetPostal={props.onChangeStreetPostal}
                    postalCode={props.postalCode}
                    onChangeCity={props.onChangeCity}
                    city={props.city}
                    onChangeCountry={props.onChangeCountry}
                    country={props.country}
                    employees={props.employees}
                    onSelectEmployeesNumber={props.onSelectEmployeesNumber}
                    employeesList={props.employeesList}
                    onValidateSecondStep={props.onValidateSecondStep}
                    onBackFristStep={props.onBackFristStep}
                />
            case 2:
                return <OrganismThirdStepSignUp
                    onChangeFirstName={props.onChangeFirstName}
                    firstName={props.firstName}
                    onChangeLastName={props.onChangeLastName}
                    lastName={props.lastName}
                    onChangeFunction={props.onChangeFunction}
                    function={props.function}
                    onChangePhoneNumber={props.onChangePhoneNumber}
                    phoneNumber={props.phoneNumber}
                    onChangePassword={props.onChangePassword}
                    password={props.password}
                    onChangeConfirmPassword={props.onChangeConfirmPassword}
                    confirmPassword={props.confirmPassword}
                    onValidateThirdStep={props.onValidateThirdStep}
                    country={props.country}
                    onBackSecondStep={props.onBackSecondStep}
                    passwordStrength={props.passwordStrength} />
            case 3:
                return <OrganismFinalStepSignUp signupSuccess={props.signupSuccess}/>
            default:
                return null;
        }
    }
    return (
        <div className="container-fluid px-3">
            <div className="row relative ">
                <Img src={props.logo} alt='Easymo' type="logo large" className="absolute signup-logo pl-0 pointer" onClick={props.redirectToLogin} />
                <div className="col-lg-6 col-description-sing-up item-center justify-center grey-background min-vh-100 px-0">
                    <OrganismDiscription signup={props.signup}/>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-6 min-vh-100 flex item-center justify-center flex-direction-column">
                    <div className="stepper-container pb-7 mw-25 w-100">
                        <div className="mb-7 signup-stepper">
                            <Stepper stepprType='signUp' isStepperRegister={true} index={props.stepIndex} onClick={props.onChooseStep} />
                        </div>
                        {renderStep()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TemplateSignUp
