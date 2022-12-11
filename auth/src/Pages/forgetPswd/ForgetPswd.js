import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import ForgetPswTemplate from "../../Templates/ForgetPswTemplate/ForgetPswTemplate"
import StandarAuth from "../../Templates/StandarAuth/StandarAuth"
import { isEmail } from "@easymo/designSystem";
import { forgetPassword } from "../../Api/ForgetPassword";
import translator from "../../lang/translator";
const lang = translator('fr');

function ForgetPswd(props) {
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [mail, setMail] = useState({
        value: "",
        isInvalid: false,
        isValid: false
    })
    const [isMailInVerification, setMailVerif] = useState(false)
    const onRedirectToLogin = () => {
        navigate('/login')
    }
    const onChangeMail = (e) => {
        setMail({
            value: e.target.value,
            isInvalid: !isEmail(e.target.value),
            isValid: isEmail(e.target.value),
        })

    }
    const onSendFpwdMail = async (type) => {
        const res = await forgetPassword(mail.value)
        if (type === 'firstSend') {
            if (res.statusCode === 200) {
                setMailVerif(true)
            } else {
                setMail({
                    value: mail.value,
                    isInvalid: true,
                    isValid: false,
                })
            }
        }
    }
    const onSendRequest = () => {
        if (mail.isValid) {
            onSendFpwdMail('firstSend')
        } else {
            setMail({ ...mail, isValid: false, isInvalid: true })
        }
    }
    const onHandleKeypress = (e) => {
        if (e.key === 'Enter') {
            onSendRequest()
        }
    }
    const svg = <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1921 273">
        <polygon fill="#fff" points="0,273 1921,273 1921,0 "></polygon>
    </svg>
    useEffect(() => {
        setTitle(lang.forgetPassword)
        document.title = title
    }, [title])

    return (
        <StandarAuth svg={svg} >
            <ForgetPswTemplate
                logo={props.logo}
                mail={mail}
                isMailInVerification={isMailInVerification}
                onSendRequest={onSendRequest}
                onChangeMail={onChangeMail}
                onRedirectToLogin={onRedirectToLogin}
                onSendFpwdMail={onSendFpwdMail}
                onKeyPress={onHandleKeypress}
            />
        </StandarAuth>
    )
}

export default ForgetPswd
