import React from 'react'
import { TemplateSignUp } from "../../Templates";
import { isEmail, isEmpty, isNumber, formValidation, isNotEmpty, hasSpecialCaracter, verifPasswordStrength, antiSlashNotAutorized, caracterNotAutorized } from "@easymo/designSystem";
import translator from '../../lang/translator'
import { signup } from '../../Api/Signup';
class Signup extends React.Component {

    constructor(props) {
        super(props)
        this.lang = translator('fr');
        this.state = {
            stepIndex: 0,
            mail: {
                value: "",
                isValid: false,
                isInValid: false,
                errorMessage: '',
            },
            isTermsChecked: false,
            isTermsInvalid: false,
            agency: {
                value: "",
                isValid: false,
                isInValid: false,
                errorMessage: '',
            },
            employees: {
                value: "",
                isValid: false,
                isInValid: false,
                errorMessage: '',
            },
            street: {
                value: "",
                isValid: false,
                isInValid: false,
            },
            streetNumber: {
                value: "",
                isValid: false,
                isInValid: false,
            },
            postalCode: {
                value: "",
                isValid: false,
                isInValid: false,
            },
            city: {
                value: "",
                isValid: false,
                isInValid: false,
            },
            country: {
                value: "",
                isValid: false,
                isInValid: false,
            },
            employeesList: [
                { value: 'Moi uniquement', label: this.lang.moi_uniquement },
                { value: '2-5', label: '2-5' },
                { value: '6-10', label: '6-10' },
                { value: 'Plus de 10', label: this.lang.plus_de_10 }
            ],
            firstName: {
                value: "",
                isValid: false,
                isInValid: false,
                errorMessage: '',
            },
            lastName: {
                value: "",
                isValid: false,
                isInValid: false,
                errorMessage: '',
            },
            function: {
                value: "",
                isValid: false,
                isInValid: false,
                errorMessage: '',
            },
            phoneNumber: {
                value: "",
                isValid: false,
                isInValid: false,
                errorMessage: '',
            },
            password: {
                value: "",
                isValid: false,
                isInValid: false,
                errorMessage: '',
            },
            confirmPassword: {
                value: "",
                isValid: false,
                isInValid: false,
                errorMessage: '',
            },
            passwordStrength: {
                color: '',
                percent: '',
                label: ''
            }
        }

    }
    onVerifPasswordStrength = () => {
        this.setState({
            passwordStrength: verifPasswordStrength(this.state.password.value)
        })
    }
    onChooseStep = (value, index) => {
        if (this.state.stepIndex !== 3) {
            if (this.state.stepIndex === 0 && index > this.state.stepIndex) {
                return this.onValidateFirstStep()
            } else if (this.state.stepIndex === 1 && index > this.state.stepIndex) {
                return this.onValidateSecondStep()
            }
            else if (this.state.stepIndex === 2 && index > this.state.stepIndex) {
                return this.onValidateThirdStep()
            } else {
                this.setState({ stepIndex: index })
            }
        }
    }
    onCheckTerms = () => {
        this.setState({
            isTermsChecked: !this.state.isTermsChecked,
            isTermsInvalid: false
        })
    }
    onChangeEmail = (e) => {
        this.setState({
            mail: {
                value: e.target.value,
                isValid: isEmail(e.target.value),
                isInValid: !isEmail(e.target.value),
                errorMessage: !isEmail(e.target.value) && this.lang.invalid_mail_error
            }
        })
    }
    onValidateFirstStep = () => {
        if (this.state.mail.isValid && this.state.isTermsChecked) {
            this.setState({ stepIndex: 1 })
        } else {
            if (!this.state.isTermsChecked) {
                this.setState({
                    isTermsInvalid: true
                })
            }
            if (!this.state.mail.isValid)
                this.setState({
                    mail: {
                        ...this.state.mail,
                        isInValid: true,
                        errorMessage: this.lang.invalid_mail_error
                    }
                })
        }
    }
    onChangeAgencyName = (e) => {
        this.setState({
            agency: {
                value: e.target.value,
                isValid: !isEmpty(e.target.value),
                isInValid: isEmpty(e.target.value),
                errorMessage: isEmpty(e.target.value) && this.lang.agence_name_error
            }
        })
    }
    onChangeStreetName = (e) => {
        this.setState({
            street: {
                value: e.target.value,
                isInValid: isEmpty(e.target.value),
                isValid: !isEmpty(e.target.value),
            }
        })
    }
    onChangeStreetNumber = (e) => {
        if (!hasSpecialCaracter(e.target.value)) {
            this.setState({
                streetNumber: {
                    value: e.target.value,
                    isInValid: hasSpecialCaracter(e.target.value) || isEmpty(e.target.value),
                    isValid: !hasSpecialCaracter(e.target.value) && !isEmpty(e.target.value),
                }
            })
        }
    }
    onChangeStreetPostal = (e) => {
        this.setState({
            postalCode: {
                value: e.target.value,
                isInValid: hasSpecialCaracter(e.target.value) || isEmpty(e.target.value),
                isValid: !hasSpecialCaracter(e.target.value) && !isEmpty(e.target.value),
            }
        })
    }
    onChangeCity = (e) => {
        this.setState({
            city: {
                value: e.target.value,
                isInValid: isEmpty(e.target.value),
                isValid: !isEmpty(e.target.value),
            }
        })
    }
    onChangeCountry = (e) => {
        this.setState({
            country: {
                value: e.target.value,
                isInValid: isEmpty(e.target.value),
                isValid: !isEmpty(e.target.value),
            }
        })
    }
    onSelectEmployeesNumber = (element) => {
        this.setState({
            employees: {
                value: element.value,
                isInValid: isEmpty(element.value),
                isValid: !isEmpty(element.value),
                errorMessage: isEmpty(element.value) && this.lang.employé_nbr_error
            }
        })
    }
    onValidateSecondStep = () => {
        const validation = [
            { value: "agency", validation: [{ error: this.lang.agence_name_error, type: 'isNotEmpty' }] },
            { value: "employees", validation: [{ error: this.lang.employé_nbr_error, type: 'isNotEmpty' }] },
            { value: "street", validation: [{ error: "", type: 'isNotEmpty' }] },
            { value: "streetNumber", validation: [{ error: "", type: 'notHasSpecialCaracter' }, { error: "", type: 'isNotEmpty' }] },
            { value: "postalCode", validation: [{ error: "", type: 'isNotEmpty' }] },
            { value: "city", validation: [{ error: "", type: 'isNotEmpty' }] },
            { value: "country", validation: [{ error: "", type: 'isNotEmpty' }] },
        ]
        const { res, verif } = formValidation(validation, this.state)
        if (!verif) {
            this.setState({
                ...this.state,
                ...res
            })
        } else {
            this.setState({ stepIndex: 2 })
        }
    }
    onChangeFirstName = (e) => {
        this.setState({
            firstName: {
                value: e.target.value,
                isInValid: !isNotEmpty(e.target.value),
                isValid: isNotEmpty(e.target.value),
                errorMessage: this.lang.prenom_error
            }
        })
    }
    onChangeLastName = (e) => {
        this.setState({
            lastName: {
                value: e.target.value,
                isInValid: !isNotEmpty(e.target.value),
                isValid: isNotEmpty(e.target.value),
                errorMessage: this.lang.nom_error
            }
        })
    }
    onChangeFunction = (e) => {
        this.setState({
            function: {
                value: e.target.value,
                isInValid: !isNotEmpty(e.target.value),
                isValid: isNotEmpty(e.target.value),
                errorMessage: this.lang.fonction_error
            }
        })
    }
    onChangePhoneNumber = (value, valid) => {
        this.setState({
            phoneNumber: {
                value: value,
                isInValid: !valid,
                isValid: valid,
                errorMessage: this.lang.numero_error
            }
        })
    }
    onChangePassword = (e) => {
        const validation = [
            { value: "password", validation: [{ type: 'hasUperCase' }, { type: 'hasNumber' }, { type: 'hasLowerCase' }, { type: 'hasSpecialCaracter' }, { type: 'isLength8' }, { type: 'caracterNotAutorized', error: this.lang.doubleCoteNotAutorized }, { type: 'antiSlashNotAutorized', error: this.lang.antiSlashNotAutorized }] }
        ]
        const { res } = formValidation(validation, { password: { ...this.state.password, value: e.target.value } })
        this.setState({
            password: res.password
        })
    }
    onChangeConfirmPassword = (e) => {
        this.setState({
            confirmPassword: {
                value: e.target.value,
                isInValid: e.target.value !== this.state.password.value,
                isValid: e.target.value === this.state.password.value,
                errorMessage: this.lang.mdps_error_ressayer
            }
        })
    }
    onSubmitSignup = async () => {
        const body = JSON.stringify({
            mail: this.state.mail.value,
            agencyName: this.state.agency.value,
            numberOfEmployee: this.state.employees.value,
            address: {
                postalCode: this.state.postalCode.value,
                country: this.state.country.value,
                city: this.state.city.value,
                street: this.state.street.value,
                number: this.state.streetNumber.value
            },
            firstName: this.state.firstName.value,
            lastName: this.state.lastName.value,
            function: this.state.function.value,
            phoneNumber: this.state.phoneNumber.value,
            password: this.state.password.value
        })
        const res = await signup(body)
        if (res.statusCode === 200) {
            this.setState({ stepIndex: 3 })
        } else {
            if (res.error.message === "mail should be unique!") {
                this.setState({
                    stepIndex: 0,
                    mail: {
                        ...this.state.mail,
                        isInValid: true,
                        isValid: false,
                        errorMessage: this.lang.invalid_mail_error
                    }
                })
            } else if (res.error.message === "phoneNumber should be unique!") {
                this.setState({
                    stepIndex: 2,
                    phoneNumber: {
                        ...this.state.phoneNumber,
                        isInValid: true,
                        isValid: false,
                        errorMessage: this.lang.numero_error
                    }
                })
            }
        }
    }
    onValidateThirdStep = () => {
        const validation = [
            { value: "firstName", validation: [{ error: this.lang.prenom_error, type: 'isNotEmpty' }] },
            { value: "lastName", validation: [{ error: this.lang.nom_error, type: 'isNotEmpty' }] },
            { value: "function", validation: [{ error: this.lang.fonction_error, type: 'isNotEmpty' }] },
            { value: "password", validation: [{ type: 'hasUperCase' }, { type: 'hasNumber' }, { type: 'hasLowerCase' }, { type: 'hasSpecialCaracter' }, { type: 'isLength8' }] },
        ]
        const { res, verif } = formValidation(validation, this.state)
        if (verif && this.state.password.value === this.state.confirmPassword.value && this.state.phoneNumber.isValid) {
            this.onSubmitSignup()
        }
        else {
            if (this.state.phoneNumber.value === "") {
                this.setState({
                    ...res,
                    phoneNumber: {
                        value: '',
                        isInValid: true,
                        isValid: false,
                        errorMessage: this.lang.numero_error
                    }
                })
            }

            else if (this.state.password.value !== this.state.confirmPassword.value) {
                this.setState({
                    ...res,
                    confirmPassword: {
                        value: this.state.confirmPassword.value,
                        isInValid: true,
                        isValid: false,
                        errorMessage: this.lang.mdps_error_ressayer
                    }
                })
            } else {
                this.setState({
                    ...res
                })
            }
        }

    }
    onBackFristStep = () => {
        this.setState({ stepIndex: 0 })
    }
    onBackSecondStep = () => {
        this.setState({ stepIndex: 1 })
    }
    onBackThirdStep = () => {
        this.setState({ stepIndex: 2 })
    }
    redirectToLogin = () => {
        this.props.navigation('/login')
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.password.value !== this.state.password.value) {
            this.onVerifPasswordStrength()
        }
    }
    componentDidMount() {
        document.title = this.lang.singup
    }
    render() {
        return (
            <TemplateSignUp
                onChooseStep={(value, index) => this.onChooseStep(value, index)}
                onCheckTerms={this.onCheckTerms}
                onChangeEmail={(e) => this.onChangeEmail(e)}
                onValidateFirstStep={this.onValidateFirstStep}
                onChangeAgencyName={(e) => this.onChangeAgencyName(e)}
                onChangeStreetName={(e => this.onChangeStreetName(e))}
                onChangeStreetNumber={(e) => this.onChangeStreetNumber(e)}
                onChangeStreetPostal={(e) => this.onChangeStreetPostal(e)}
                onChangeCity={(e) => this.onChangeCity(e)}
                onChangeCountry={(e) => this.onChangeCountry(e)}
                onSelectEmployeesNumber={(element) => this.onSelectEmployeesNumber(element)}
                onValidateSecondStep={this.onValidateSecondStep}
                onChangeFirstName={(e) => this.onChangeFirstName(e)}
                onChangeLastName={(e) => this.onChangeLastName(e)}
                onChangeFunction={(e) => this.onChangeFunction(e)}
                onChangePhoneNumber={(value, valid) => this.onChangePhoneNumber(value, valid)}
                onChangePassword={(e) => this.onChangePassword(e)}
                onChangeConfirmPassword={(e) => this.onChangeConfirmPassword(e)}
                onValidateThirdStep={this.onValidateThirdStep}
                onBackFristStep={this.onBackFristStep}
                onBackSecondStep={this.onBackSecondStep}
                onBackThirdStep={this.onBackThirdStep}
                redirectToLogin={this.redirectToLogin}
                logo={this.props.logo}
                signup={this.props.signup}
                signupSuccess={this.props.signupSuccess}
                {...this.state}
            />
        )
    }
}

export default Signup
