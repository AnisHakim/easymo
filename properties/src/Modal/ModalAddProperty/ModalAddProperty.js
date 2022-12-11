import React from 'react'
import translator from '../../lang/translator'
import { building, house, field, flat, office, store, misc, parking, rent, sale } from '../svg/svg'
import { isEmpty, hasSpecialCaracter, formValidation, formatInputNumber } from "@easymo/designSystem"
import { AuthStore } from "@easymo/auth"
import { TemplateModalAddProperties } from '../../Template'
import lang from '../../lang/fr';
import { apiCreateProperty, apiListContacts } from "../../Api/Properties/properties";
import { connect } from 'react-redux'
import { getAgentList } from '../../Api/Agent';
const initialState = {
    getPosition: false,
    type: {
        type: "",
        transaction: "",
        quantity: ""
    },
    isInValidType: {
        type: false,
        transaction: false,
        quantity: false
    },
    name: {
        value: "",
        isValid: false,
        isInValid: false,
        errorMessage: '',
    },
    status: {
        value: "",
        isValid: false,
        isInValid: false,
        errorMessage: '',
    },
    agent: {
        value: [],
        isValid: false,
        isInValid: false,
        errorMessage: '',
    },
    owner: {
        value: [],
        isValid: false,
        isInValid: false,
        errorMessage: '',
    },
    street: {
        value: "",
        isValid: false,
        isInValid: false,
        errorMessage: '',
    },
    streetNumber: {
        value: "",
        isValid: false,
        isInValid: false,
        errorMessage: '',
    },
    postalCode: {
        value: "",
        isValid: false,
        isInValid: false,
        errorMessage: '',
    },
    city: {
        value: "",
        isValid: false,
        isInValid: false,
        errorMessage: '',
    },
    country: {
        value: "",
        isValid: false,
        isInValid: false,
        errorMessage: '',
    },
    data: [
        {
            key: "type",
            label: lang.propertyType,
            list: [
                { id: 'house', type: lang.maison, src: house },
                { id: 'apartment', type: lang.appartement, src: flat },
                { id: 'ground', type: lang.terrain, src: field },
                { id: 'office', type: lang.bureau, src: office },
                { id: 'trade', type: lang.commerce, src: store },
                { id: 'building', type: lang.immeuble, src: building },
                { id: 'parking', type: lang.parking_garage, src: parking },
                { id: 'various', type: lang.divers, src: misc }
            ],
            errorMessage: lang.errorMsgPropertyType
        },
        {
            key: "transaction",
            label: lang.transaction,
            list: [
                { id: "true", type: lang.aVendre, src: sale },
                { id: "false", type: lang.aLouer, src: rent },
            ],
            errorMessage: lang.errorMsgPropertyTransaction
        },
        {
            key: "quantity",
            label: lang.quantity,
            list: [
                { id: "true", type: lang.independantProperty, src: house },
                { id: "false", type: lang.setOfProperties, src: building }
            ],
            errorMessage: lang.errorMsgPropertyQuantity
        }
    ],
    index: 0,
    lat: "",
    lng: ""
}
class ModalAddProperty extends React.Component {
    constructor(props) {
        super(props)
        const lang = translator('fr')
        this.state = { ...initialState }

    }
    setPositionGoogleMaps = (lat, lng) => {
        this.setState({
            lat: lat,
            lng: lng
        })
    }
    onChangeAgent = (e) => {
        this.setState({
            agent: { ...this.state.agent, value: e, isValid: e.length > 0, isInvalid: e.length === 0, errorMessage: e.length > 0 ? '' : lang.selectAgentMsgError }
        })
    }
    onChangeOwner = (e) => {
        this.setState({
            owner: { ...this.state.owner, value: e, isValid: e.length > 0, isInvalid: e.length === 0, errorMessage: e.length > 0 ? '' : lang.selectOwnerMsgError }
        })
    }
    onChangeName = (e) => {
        this.setState({
            name: {
                value: e.target.value,
                isInValid: isEmpty(e.target.value),
                isValid: !isEmpty(e.target.value),
                errorMessage: isEmpty(e.target.value) && lang.internIdentificationError
            }
        })
    }
    onChangeStatus = (e) => {
        this.setState({
            status: {
                value: e.value,
                isInValid: isEmpty(e.value),
                isValid: !isEmpty(e.value),
                errorMessage: isEmpty(e.value) && lang.statusMandatCreatePropertyError
            }
        })
    }
    onChangeStreetName = (e) => {
        this.setState({
            street: {
                ...this.state.street,
                value: e.target.value,
                isValid: !isEmpty(e.target.value)
            }
        })
    }
    onChangeStreetNumber = (e) => {
        if (!hasSpecialCaracter(e.target.value)) {
            if (e.target.value !== '') {
                this.setState({
                    streetNumber: {
                        value: formatInputNumber(e.target.value, lang.localNumber),
                        isInValid: hasSpecialCaracter(e.target.value),
                        isValid: !hasSpecialCaracter(e.target.value),
                        errorMessage: hasSpecialCaracter(e.target.value) && lang.numberError
                    }
                })
            } else {
                this.setState({
                    streetNumber: {
                        value: e.target.value,
                        isInValid: hasSpecialCaracter(e.target.value),
                        isValid: !hasSpecialCaracter(e.target.value),
                        errorMessage: hasSpecialCaracter(e.target.value) && lang.numberError
                    }
                })
            }
        }
    }
    onChangeStreetPostal = (e) => {
        if (e.target.value !== '') {
            this.setState({
                postalCode: {
                    value: e.target.value,
                    isInValid: hasSpecialCaracter(e.target.value) || isEmpty(e.target.value),
                    isValid: !hasSpecialCaracter(e.target.value) && !isEmpty(e.target.value),
                    errorMessage: (hasSpecialCaracter(e.target.value) || isEmpty(e.target.value)) && lang.postalcodeError
                }
            })
        } else {
            this.setState({
                postalCode: {
                    value: e.target.value,
                    isInValid: hasSpecialCaracter(e.target.value) || isEmpty(e.target.value),
                    isValid: !hasSpecialCaracter(e.target.value) && !isEmpty(e.target.value),
                    errorMessage: (hasSpecialCaracter(e.target.value) || isEmpty(e.target.value)) && lang.postalcodeError
                }
            })
        }
    }
    onChangeCity = (e) => {
        this.setState({
            city: {
                value: e.target.value,
                isInValid: isEmpty(e.target.value),
                isValid: !isEmpty(e.target.value),
                errorMessage: isEmpty(e.target.value) && lang.cityError
            }
        })
    }
    onChangeCountry = (e) => {
        this.setState({
            country: {
                value: e.target.value,
                isInValid: isEmpty(e.target.value),
                isValid: !isEmpty(e.target.value),
                errorMessage: isEmpty(e.target.value) && lang.countryError
            }
        })
    }
    handleClickStepOne = (key, value) => {
        this.setState({
            type: { ...this.state.type, [key]: value },
            isInValidType: { ...this.state.isInValidType, [key]: false },
        })
    }
    onChooseStep = (index, nextIndex) => {
        if (index === 0) {
            const isInvalid = {
                type: false,
                transaction: false,
                quantity: false
            }
            let verif = true
            Object.keys(this.state.type).map(el => {
                if (this.state.type[el] === "") {
                    isInvalid[el] = true
                    verif = false
                }
            })
            this.setState({
                isInValidType: isInvalid,
                index: verif && nextIndex !== 2 ? nextIndex : index
            })
        }
        if (index === 1 && nextIndex === 2) {
            const validation = [
                { value: "name", validation: [{ error: lang.internIdentificationError, type: 'isNotEmpty' }] },
                { value: "status", validation: [{ error: lang.statusMandatCreatePropertyError, type: 'isNotEmpty' }] },
            ]
            let { res, verif } = formValidation(validation, this.state)
            const agent = { ...this.state.agent }
            const owner = { ...this.state.owner }
            if (agent.value.length === 0) {
                agent.isInValid = true
                agent.isValid = false
                verif = false
                agent.errorMessage = lang.selectAgentMsgError
            }
            if (!verif) {
                this.setState({
                    ...this.state,
                    ...res,
                    agent: agent,
                    owner: owner
                })
            } else {
                this.setState({ index: nextIndex })
            }
        }
        if (index === 2 || (index === 1 && nextIndex === 0)) {
            this.setState({ index: nextIndex })
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if ((prevState.postalCode.value !== this.state.postalCode.value ||
            prevState.country.value !== this.state.country.value ||
            prevState.city.value !== this.state.city.value ||
            prevState.street.value !== this.state.street.value ||
            prevState.streetNumber.value !== this.state.streetNumber.value
        )) {
            this.setState({ getPosition: !this.state.getPosition })
        }
        if (this.props.show !== prevProps.show && !this.props.show) {
            this.setState({
                ...initialState
            })
        }
    }
    getListContact = async () => {
        const response = await apiListContacts();
        if (response.statusCode === 200) {
            this.props.dispatch({ type: "SET_CONTACTS", payload: response.data })
        }
    }
    componentDidMount() {
        this.setState({
            agent: {
                ...this.state.agent,
                value: [{
                    value: AuthStore.getState().auth?.user?._id
                    , label: AuthStore.getState().auth?.user?.firstName + ' ' + AuthStore.getState().auth?.user?.lastName
                }]
            }
        })
        this.getListContact()
        this.getListAgent()
    }
    getListAgent = async () => {
        const response = await getAgentList()
        if (response.statusCode === 200) {
            this.props.dispatch({ type: "SET_AGENTS", payload: response.data })
        }
    }
    onValidateCreationProperty = async () => {
        const validation = [
            { value: "postalCode", validation: [{ error: lang.postalcodeError, type: 'isNotEmpty' }] },
            { value: "city", validation: [{ error: lang.cityError, type: 'isNotEmpty' }] },
            { value: "country", validation: [{ error: lang.countryError, type: 'isNotEmpty' }] },
        ]
        const { res, verif } = formValidation(validation, this.state)
        if (!verif) {
            this.setState({
                ...this.state,
                ...res
            })
        } else {
            const data = {
                "type": this.state.type.type,
                "name": this.state.name.value,
                "forSale": this.state.type.transaction === "true",
                "quite_independent": this.state.type.quantity === "true",
                "status": this.state.status.value,
                "speakers": {
                    "agent": this.state.agent.value.map(el => el.value),
                    "owner": this.state.owner.value.map(el => el.value)
                },
                "identification": {
                    "postalCode": this.state.postalCode.value,
                    "country": this.state.country.value,
                    "city": this.state.city.value,
                    "street": this.state.street.value,
                    "number": this.state.streetNumber.value.replaceAll(lang.localeSeparateur, ''),
                    "lat": this.state.lat,
                    "lng": this.state.lng
                }
            }
            const response = await apiCreateProperty(JSON.stringify(data));
            if (response.statusCode === 200) {
                this.props.getNewPropertieData && this.props.getNewPropertieData(response.data)
                this.props.onHideOnly && this.props.onHideOnly()
            } else {
                if (response.err && response.err.message === "numbre max of properties!") {
                    this.setState({
                        showModalInfo: true,
                        msgInfo: lang.maxNumberOfProperties
                    })
                }
                if (response.err && response.err.message === "check list of owners!") {
                    this.setState({
                        index: 1,
                        owner: { ...this.state.owner, isValid: false, isInvalid: true }
                    })
                }
                if (response.err && response.err.message === "check list of agents!") {
                    this.setState({
                        index: 1,
                        agent: { ...this.state.agent, isValid: false, isInvalid: true }
                    })
                }
            }
        }

    }
    render() {
        return (
            <TemplateModalAddProperties
                show={this.props.show}
                onHide={this.props.onHide}
                onChooseStep={this.onChooseStep}
                handleClickStepOne={this.handleClickStepOne}
                onChangeStreetName={this.onChangeStreetName}
                onChangeStreetNumber={this.onChangeStreetNumber}
                onChangeStreetPostal={this.onChangeStreetPostal}
                onChangeCity={this.onChangeCity}
                onChangeCountry={this.onChangeCountry}
                onValidateCreationProperty={this.onValidateCreationProperty}
                onChangeName={this.onChangeName}
                onChangeStatus={this.onChangeStatus}
                onChangeAgent={this.onChangeAgent}
                onChangeOwner={this.onChangeOwner}
                setPositionGoogleMaps={this.setPositionGoogleMaps}
                onHideModalInfo={() => this.setState({ showModalInfo: false, msgInfo: null })}
                {...this.state}
            />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => {
            dispatch(action);
        },
    };
};


export default connect(null, mapDispatchToProps)(ModalAddProperty)