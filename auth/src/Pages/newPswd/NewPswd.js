import NewPswdTemplate from "../../Templates/NewPswdTemplate/NewPswdTemplate"
import StandarAuth from "../../Templates/StandarAuth/StandarAuth"
import { useNavigate, useParams } from "react-router-dom";
import { formValidation, verifPasswordStrength } from "@easymo/designSystem";
import { useEffect, useState } from "react";
import { forgetPassword, verifTokenPswd } from "../../Api/ResetPassword";
import translator from "../../lang/translator";
const lang = translator('fr');

function NewPswd(props) {
    let { token } = useParams();
    const svg = <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1921 273">
        <polygon fill="#fff" points="0,273 1921,273 1921,0 "></polygon>
    </svg>
    const navigate = useNavigate()
    const [isLoading, setLoader] = useState(true)
    const [password, setPassword] = useState({
        value: "",
        isInvalid: false,
        isValid: false,
        errorMessage: ''
    })
    const [confirmPassword, setNewPassword] = useState({
        value: "",
        isInvalid: false,
        isValid: false,
        errorMessage: ''
    })
    useEffect(async () => {
        let res = await verifTokenPswd(token)
        if (res.statusCode !== 200) {
            navigate('/login')
        } else {
            setLoader(false)
        }
    }, [])
    const [passwordStrength, setStrength] = useState({
        color: '',
        percent: '',
        label: ''
    })
    const onChangeConfirmPassword = (e) => {
        setNewPassword({
            value: e.target.value,
            isInvalid: e.target.value === password.value ? false : true,
            isValid: e.target.value === password.value,
            errorMessage: !(e.target.value === password.value) && "Votre mot de passe n'est pas valide. Veuillez réessayer."
        })
    }
    const onRedirectToLogin = () => {
        navigate('/login')
    }
    const onChangePassword = (e) => {
        const validation = [
            { value: "password", validation: [{ type: 'hasUperCase' }, { type: 'hasNumber' }, { type: 'hasLowerCase' }, { type: 'hasSpecialCaracter' }, { type: 'isLength8' }] }
        ]
        const { res } = formValidation(validation, { password: { ...password, value: e.target.value } })
        setPassword(res.password)
    }
    const onSendRequest = async () => {
        if (password.isValid && password.value === confirmPassword.value) {
            const res = await forgetPassword(token, password.value)
            if (res.statusCode === 200) {
                navigate('/login')
            }

        }
    }
    const onVerifPasswordStrength = () => {
        setStrength(verifPasswordStrength(password.value))
    }
    useEffect(() => {
        onVerifPasswordStrength()
        document.title = lang.forgetPassword
    }, [password.value])
    return (
        !isLoading &&
        <StandarAuth svg={svg} >
            <NewPswdTemplate
                logo={props.logo}
                password={password}
                confirmPassword={confirmPassword}
                onSendRequest={onSendRequest}
                onChangePassword={onChangePassword}
                onChangeConfirmPassword={onChangeConfirmPassword}
                onRedirectToLogin={onRedirectToLogin}
                passwordStrength={passwordStrength}
            />
        </StandarAuth>
    )
}

export default NewPswd
