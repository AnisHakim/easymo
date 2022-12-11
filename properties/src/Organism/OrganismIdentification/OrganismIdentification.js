import { MoleculeInput, Collapse, GoogleMaps, formatInputNumber, isNumber } from "@easymo/designSystem";
import translator from "../../lang/translator";
import React, { Component } from 'react'
import { renderIconTooltipObject, stateIdentification } from "../../data/data";
import { isEmpty } from "@easymo/designSystem";
import { apiUpdateIdentification } from "../../Api/Properties/properties";

const lang = translator('fr')

export default class OrganismIdentification extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stateIdentification: stateIdentification,
            defaultCenter: { lat: 48.8534, lng: 2.3488 }
        }
    }
    renderInputError = (key) => {
        let newIdentification = { ...this.state.stateIdentification[key] }
        if (key === "identificationInterne") {
            newIdentification = { ...newIdentification, errorMessage: lang.indentificationInterneError }
        }
        else if (key === "postalCode") {
            newIdentification = { ...newIdentification, errorMessage: lang.postalcodeError }
        }
        else if (key === "city") {
            newIdentification = { ...newIdentification, errorMessage: lang.cityError }
        }
        else if (key === "country") {
            newIdentification = { ...newIdentification, errorMessage: lang.countryError }
        }
        return newIdentification.errorMessage

    }
    onChangeIdentificationInput = (e, key) => {
        let newIdentification = { ...this.state.stateIdentification }
        if (key === 'postalCode') {
            newIdentification[key] = {
                ...newIdentification[key], value: e.target.value,
                isInValid: isEmpty(e.target.value),
                isValid: !isEmpty(e.target.value),
                errorMessage: isEmpty(e.target.value) ? this.renderInputError(key) : ""
            }
        } else if (key === "streetNumber") {
            if (e.target.value !== '' && isNumber(e.target.value.replaceAll(lang.localeSeparateur, ''))) {
                newIdentification[key] = {
                    ...newIdentification[key], value: formatInputNumber(e.target.value, lang.localNumber),
                    isInValid: (key !== "street" && key !== "streetNumber") ? isEmpty(e.target.value) : false,
                    isValid: (key !== "street" && key !== "streetNumber") ? !isEmpty(e.target.value) : false,
                    errorMessage: isEmpty(e.target.value) ? this.renderInputError(key) : ""
                }
            } else if (e.target.value === '') {
                newIdentification[key] = {
                    ...newIdentification[key], value: e.target.value
                }
            }
        } else {
            newIdentification[key] = {
                ...newIdentification[key], value: e.target.value,
                isInValid: (key !== "street" && key !== "streetNumber") ? isEmpty(e.target.value) : false,
                isValid: (key !== "street" && key !== "streetNumber") ? !isEmpty(e.target.value) : false,
                errorMessage: isEmpty(e.target.value) ? this.renderInputError(key) : ""
            }
        }
        newIdentification.isUpdated = true
        this.setState({ stateIdentification: newIdentification })
    }
    setPositionGoogleMaps = (lat, lng) => {
        this.setState({ stateIdentification: { ...this.state.stateIdentification, lat: lat, lng: lng } })
    }
    componentDidUpdate(prevProps, prevState) {
        if (
            this.state.stateIdentification.lat !== prevState.stateIdentification.lat ||
            this.state.stateIdentification.lng !== prevState.stateIdentification.lng
        ) {
            this.props.getLatLng && this.props.getLatLng(this.state.stateIdentification.lat, this.state.stateIdentification.lng)
        }
        if (
            ((prevState.stateIdentification.postalCode.value !== this.state.stateIdentification.postalCode.value ||
                prevState.stateIdentification.country.value !== this.state.stateIdentification.country.value ||
                prevState.stateIdentification.street.value !== this.state.stateIdentification.street.value ||
                prevState.stateIdentification.streetNumber.value !== this.state.stateIdentification.streetNumber.value ||
                prevState.stateIdentification.city.value !== this.state.stateIdentification.city.value) ||
                prevState.stateIdentification.isPositionLoaded !== this.state.stateIdentification.isPositionLoaded)
        ) {
            this.setState({ stateIdentification: { ...this.state.stateIdentification, getPosition: !this.state.stateIdentification.getPosition } })
        }
        if (prevProps.isCallAPi !== this.props.isCallAPi && this.state.stateIdentification.isUpdated) {
            this.updateIdentification()
        }
        if (this.props.isPropertieLoaded !== prevProps.isPropertieLoaded) {
            this.getIdentification()
        }
        if (prevProps.propertieName !== this.props.propertieName) {
            let newIdentification = { ...this.state.stateIdentification }
            newIdentification.identificationInterne.value = this.props.propertieName
            this.setState({ stateIdentification: newIdentification })
        }
    }
    getIdentification = () => {
        let newState = { ...this.state.stateIdentification }
        newState.identificationInterne.value = this.props.propertie.name
        newState.postalCode.value = this.props.propertie.identification.postalCode
        newState.country.value = this.props.propertie.identification.country
        newState.city.value = this.props.propertie.identification.city
        newState.streetNumber.value = this.props.propertie.identification.number && formatInputNumber(this.props.propertie.identification.number, lang.localNumber)
        newState.street.value = this.props.propertie.identification.street && this.props.propertie.identification.street
        newState.lng = this.props.propertie.identification.lng && this.props.propertie.identification.lng
        newState.lat = this.props.propertie.identification.lat && this.props.propertie.identification.lat
        newState.city.isPublic = this.props.propertie.identification.cityStatus
        newState.country.isPublic = this.props.propertie.identification.countryStatus
        newState.street.isPublic = this.props.propertie.identification.streetStatus
        newState.streetNumber.isPublic = this.props.propertie.identification.numberStatus
        newState.postalCode.isPublic = this.props.propertie.identification.postalCodeStatus
        newState.isPositionLoaded = !newState.isPositionLoaded
        this.setState({
            stateIdentification: newState,
            defaultCenter: {
                lat: this.props?.propertie?.identification?.lat, lng: this.props?.propertie?.identification?.lng
            }
        })
        this.props.getLatLng && this.props.getLatLng(this.props?.propertie?.identification.lat, this.props?.propertie.identification.lng)
    }

    onClickStreetVisible(e, key) {
        let newIdentification = { ...this.state.stateIdentification }
        newIdentification[key] = {
            ...newIdentification[key], isPublic: !newIdentification[key].isPublic
        }
        newIdentification.isUpdated = true
        this.setState({ stateIdentification: newIdentification })
    }
    updateIdentification = async () => {
        this.props.onChangeIdentificationError("Identification", false)
        let newIdentification = { ...this.state.stateIdentification }
        newIdentification.isUpdated = false
        this.setState({ stateIdentification: newIdentification })
        let valid = true
        let newState = { ...this.state.stateIdentification }
        if (!this.state.stateIdentification.identificationInterne.value) {
            valid = false
            this.props.onChangeIdentificationError("Identification", true)
            newState.identificationInterne.isInValid = true
            newState.identificationInterne.errorMessage = lang.indentificationInterneError
            this.setState({
                stateIdentification: newState
            })
        }
        if (!this.state.stateIdentification.postalCode.value) {
            valid = false
            this.props.onChangeIdentificationError("Identification", true)
            newState.postalCode.isInValid = true
            newState.postalCode.errorMessage = lang.postalcodeError
            this.setState({
                stateIdentification: newState
            })
        }
        if (!this.state.stateIdentification.city.value) {
            valid = false
            this.props.onChangeIdentificationError("Identification", true)
            newState.city.isInValid = true
            newState.city.errorMessage = lang.cityError
            this.setState({
                stateIdentification: newState
            })
        }
        if (!this.state.stateIdentification.country.value) {
            valid = false
            this.props.onChangeIdentificationError("Identification", true)
            newState.country.isInValid = true
            newState.country.errorMessage = lang.countryError
            this.setState({
                stateIdentification: newState
            })
        }
        if (valid) {
            this.props.setLoader(true)
            const response = await apiUpdateIdentification(JSON.stringify({
                name: this.state.stateIdentification.identificationInterne.value,
                postalCode: this.state.stateIdentification.postalCode.value,
                country: this.state.stateIdentification.country.value,
                city: this.state.stateIdentification.city.value,
                street: this.state.stateIdentification.street.value,
                number: this.state.stateIdentification.streetNumber.value.replaceAll(lang.localeSeparateur, ''),
                lat: this.state.stateIdentification.lat,
                lng: this.state.stateIdentification.lng,
                postalCodeStatus: this.state.stateIdentification.postalCode.isPublic,
                countryStatus: this.state.stateIdentification.country.isPublic,
                cityStatus: this.state.stateIdentification.city.isPublic,
                streetStatus: this.state.stateIdentification.street.isPublic,
                numberStatus: this.state.stateIdentification.streetNumber.isPublic,
                id: this.props.propertie.id ? this.props.propertie.id : this.props.propertie._id
            }));
            if (response.statusCode === 200) {
                let newIdentification = { ...this.state.stateIdentification }
                newIdentification.isUpdated = false
                this.props.dataUpdated("identification")
                this.setState({ stateIdentification: newIdentification })
            } else {
                this.props.setLoader(false)
                this.props.onChangeIdentificationError("Identification", true)
            }
        }
    }
    render() {
        return (
            <div>
                <Collapse title={lang.Identification} iconStart="search">
                    <div className="row mb-5 gx-5">
                        <div className="col-sm-12">
                            <MoleculeInput
                                inputLabel={lang.internIdentification}
                                listIcons={[
                                    renderIconTooltipObject("lock_outlined", true, lang.mandatTooltip, 'tooltip-icon-label')
                                ]}
                                inputClassname='inputs-step-three'
                                placeholder={lang.louveigné144}
                                onchangeInput={(e) => this.onChangeIdentificationInput(e, "identificationInterne")}
                                inputValue={this.state.stateIdentification.identificationInterne.value}
                                isValid={this.state.stateIdentification.identificationInterne.isValid}
                                isInvalid={this.state.stateIdentification.identificationInterne.isInValid}
                                inputError={this.state.stateIdentification.identificationInterne.errorMessage}
                                errorClassname='error-msg-inputs'
                            />
                        </div>

                    </div>
                    <div className="row gx-5">
                        <div className="col-lg-6 mb-5">
                            <MoleculeInput
                                inputLabel={lang.street}
                                listIcons={[
                                    {
                                        ...renderIconTooltipObject(this.state.stateIdentification.street.isPublic ? "visible_outlined" : "hidden_outlined", true, this.state.stateIdentification.street.isPublic ? lang.informationPublic : lang.informationPrivee, 'tooltip-icon-label'),
                                        onClick: (e) => this.onClickStreetVisible(e, "street"),
                                    }]}
                                inputClassname='inputs-step-three'
                                placeholder={lang.pontStreet}
                                onchangeInput={(e) => this.onChangeIdentificationInput(e, "street")}
                                inputValue={this.state.stateIdentification.street.value}
                                isValid={this.state.stateIdentification.street.isValid}
                                isInvalid={this.state.stateIdentification.street.isInValid}
                                inputError={this.state.stateIdentification.street.errorMessage}
                                errorClassname='error-msg-inputs'
                            />
                        </div>
                        <div className="col-lg-2 mb-5">
                            <MoleculeInput
                                inputLabel={lang.number}
                                listIcons={[
                                    {
                                        ...renderIconTooltipObject(this.state.stateIdentification.streetNumber.isPublic ? "visible_outlined" : "hidden_outlined", true, this.state.stateIdentification.streetNumber.isPublic ? lang.informationPublic : lang.informationPrivee, 'tooltip-icon-label'),
                                        onClick: (e) => this.onClickStreetVisible(e, "streetNumber")
                                    }]}
                                inputClassname='inputs-step-three'
                                placeholder="74"
                                onchangeInput={(e) => this.onChangeIdentificationInput(e, "streetNumber")}
                                inputValue={this.state.stateIdentification.streetNumber.value}
                                isValid={this.state.stateIdentification.streetNumber.isValid}
                                isInvalid={this.state.stateIdentification.streetNumber.isInValid}
                                inputError={this.state.stateIdentification.streetNumber.errorMessage}
                                errorClassname='error-msg-inputs'
                            />
                        </div>
                        <div className="col-lg-4 mb-5">
                            <MoleculeInput
                                inputLabel={lang.code_postal}
                                listIcons={[
                                    {
                                        ...renderIconTooltipObject(this.state.stateIdentification.postalCode.isPublic ? "visible_outlined" : "hidden_outlined", true, this.state.stateIdentification.postalCode.isPublic ? lang.informationPublic : lang.informationPrivee, 'tooltip-icon-label'),
                                        onClick: (e) => this.onClickStreetVisible(e, "postalCode"),
                                    }]}
                                inputClassname='inputs-step-three'
                                placeholder="5000"
                                onchangeInput={(e) => this.onChangeIdentificationInput(e, "postalCode")}
                                inputValue={this.state.stateIdentification.postalCode.value}
                                isValid={this.state.stateIdentification.postalCode.isValid}
                                isInvalid={this.state.stateIdentification.postalCode.isInValid}
                                inputError={this.state.stateIdentification.postalCode.errorMessage}
                                errorClassname='error-msg-inputs'
                            />
                        </div>
                    </div>
                    <div className="row gx-5">
                        <div className="col-lg-6 mb-5">
                            <MoleculeInput
                                inputLabel={lang.ville}
                                listIcons={[
                                    {
                                        ...renderIconTooltipObject(this.state.stateIdentification.city.isPublic ? "visible_outlined" : "hidden_outlined", true, this.state.stateIdentification.city.isPublic ? lang.informationPublic : lang.informationPrivee, 'tooltip-icon-label'),
                                        onClick: (e) => this.onClickStreetVisible(e, "city"),
                                    }]}
                                inputClassname='inputs-step-three'
                                placeholder={lang.namur}
                                onchangeInput={(e) => this.onChangeIdentificationInput(e, "city")}
                                inputValue={this.state.stateIdentification.city.value}
                                isValid={this.state.stateIdentification.city.isValid}
                                isInvalid={this.state.stateIdentification.city.isInValid}
                                inputError={this.state.stateIdentification.city.errorMessage}
                                errorClassname='error-msg-inputs'
                            />
                        </div>
                        <div className="col-lg-6 mb-5">
                            <MoleculeInput
                                inputLabel={lang.country}
                                listIcons={[
                                    {
                                        ...renderIconTooltipObject(this.state.stateIdentification.country.isPublic ? "visible_outlined" : "hidden_outlined", true, this.state.stateIdentification.country.isPublic ? lang.informationPublic : lang.informationPrivee, 'tooltip-icon-label'),
                                        onClick: (e) => this.onClickStreetVisible(e, "country"),
                                    }]}
                                inputClassname='inputs-step-three'
                                placeholder={lang.belgium}
                                onchangeInput={(e) => this.onChangeIdentificationInput(e, "country")}
                                inputValue={this.state.stateIdentification.country.value}
                                isValid={this.state.stateIdentification.country.isValid}
                                isInvalid={this.state.stateIdentification.country.isInValid}
                                inputError={this.state.stateIdentification.country.errorMessage}
                                errorClassname='error-msg-inputs'
                            />
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-lg-12 mb-5">
                            <GoogleMaps
                                defaultZoom={15}
                                defaultCenter={this.state.defaultCenter}
                                setPositionGoogleMaps={this.setPositionGoogleMaps}
                                getPosition={this.state.stateIdentification.getPosition}
                                address={{
                                    postalCode: this.state.stateIdentification.postalCode.value,
                                    city: this.state.stateIdentification.city.value,
                                    country: this.state.stateIdentification.country.value,
                                    street: this.state.stateIdentification.street.value,
                                    streetNumber: this.state.stateIdentification.streetNumber.value,
                                }}
                            />
                        </div>
                    </div>
                </Collapse>
            </div>
        )
    }

}