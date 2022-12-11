import React from "react";
import DoubleAuthTemplate from "../../Templates/DoubleAuthTemplate/DoubleAuthTemplate";
import StandarAuth from "../../Templates/StandarAuth/StandarAuth";
import { isNumber } from "@easymo/designSystem";
import { connect } from 'react-redux'
import { apiDoubleAuth, apiResendCode } from "../../Api/DoubleAuth";
import translator from "../../lang/translator";
import { Navigate } from "react-router-dom";
const lang = translator('fr');
const svg = <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1921 273">
    <polygon fill="#fff" points="0,273 1921,273 1921,0 "></polygon>
</svg>
class DoubleAuth extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            code: {
                value: ["", "", "", "", "", ""],
                isInvalid: false,
                isValid: false,
                errorMsg: '',
            },
            resendCodeMsg: {
                msgValue: '',
                isValid: false
            },
            loading: false
        }
    }

    onChangeCode = (e, index) => {
        if (e.target.value.length <= 1 && isNumber(e.target.value)) {
            const data = [...this.state.code.value]
            data[index] = e.target.value
            this.setState({
                resendCodeMsg: { msgValue: '', isValid: false },
                code: { ...this.state.code, value: data, errorMsg: '', isInvalid: false }
            })
            let length = document.getElementById("code" + index).value.length
            if (length) { document.getElementById("code" + (index + 1)).focus(); }
        }
        if (e.target.value.length === 6 && isNumber(e.target.value)) {
            this.setState({
                code: { ...this.state.code, value: [e.target.value[0], e.target.value[1], e.target.value[2], e.target.value[3], e.target.value[4], e.target.value[5]] }
            })
        }

    }
    goToLogin = () => {
        this.props.navigation('/login')
    }
    componentWillUnmount() {
        this.props.dispatch({ type: "SAVE_MAIL", payload: { mail: null } });
    }
    submit = async () => {
        this.setState({ resendCodeMsg: { isValid: false, msgValue: '' } })
        const verif = this.state.code.value.find(el => el == '')
        if (verif === undefined) {
            this.setState({ loading: true })
            const response = await apiDoubleAuth(JSON.stringify({
                "mail": this.props.mail,
                "code": this.state.code.value.join('')
            }))
            if (response.statusCode === 200) {
                this.props.dispatch({ type: "SAVE_USER", payload: { user: response.data.user, accessToken: response.data.accessToken, refreshToken: response.data.refreshToken } });
                this.props.navigation('/properties')
            } else {
                this.setState({
                    loading: false,
                    code: { ...this.state.code, isInvalid: true, isValid: false, errorMsg: lang.errorDoubleAuth },
                })
            }
        } else {
            this.setState({
                code: { ...this.state.code, isInvalid: true, isValid: false, errorMsg: lang.errorDoubleAuthCode },
            })
        }

    }
    resendCode = async () => {
        this.setState({ code: { ...this.state.code, value: ["", "", "", "", "", ""], isInvalid: false } })
        const response = await apiResendCode(JSON.stringify({
            mail: this.props.mail
        }))
        if (response.statusCode === 200) {
            this.setState({
                resendCodeMsg: { isValid: true, msgValue: lang.successResendCode }
            })
        }
    }
    componentDidMount() {
        document.title = lang.double_auth
    }
    render() {
        if (!this.props.mail || this.props.mail === "") {
            return <Navigate to="/login" replace />
        }
        return <StandarAuth svg={svg}>
            <DoubleAuthTemplate
                {...this.state}
                logo={this.props.logo}
                onChangeCode={this.onChangeCode}
                submit={this.submit}
                goToLogin={this.goToLogin}
                resendCode={this.resendCode}
            />
        </StandarAuth>
    }
}
const mapStateToProps = (state) => {
    return {
        mail: state.login.mail,
    };
};
export default connect(mapStateToProps, null)(DoubleAuth)