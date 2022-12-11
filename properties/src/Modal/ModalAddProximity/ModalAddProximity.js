import translator from '../../lang/translator'
import React, { Component } from 'react';
import { TemplateModalAddProximity } from '../../Template';
import { isNumber, typeOfPlace, getTypeAddress, getDistanceAddress, formValidation } from '@easymo/designSystem'
import { stateProximity } from '../../data/data';
const lang = translator('fr')
class ModalAddProximity extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ...stateProximity,
            address: '',
            stateGoogleMaps: {
                type: '',
                distance: '',
                time: '',
                pointOfInterest: '',
                lat: '',
                lng: ''
            }
        }
    }
    onChange = (e, key) => {
        this.setState({
            [key]: {
                errorMessage: '',
                isValid: false,
                isInValid: false,
                value: e.target.value,
            }
        })
    }
    onChangeNumber = (e, key) => {
        if (isNumber(e.target.value)) {
            this.setState({
                [key]: {
                    errorMessage: '',
                    isValid: false,
                    isInValid: false,
                    value: e.target.value,
                }
            })
        }
    }
    componentDidMount() {
        if (this.props.elementToEdit)
            this.setState({
                type: { ...this.state.type, value: this.props.elementToEdit?.type },
                pointOfInterest: { ...this.state.pointOfInterest, value: this.props.elementToEdit?.pointOfInterest },
                distance: { ...this.state.distance, value: this.props.elementToEdit?.distance },
                time: { ...this.state.time, value: this.props.elementToEdit?.time },
            })
    }
    onChangeSelect = (e) => {
        this.setState({
            type: {
                errorMessage: '',
                isValid: false,
                isInValid: false,
                value: e.value,
            }
        })
    }
    getTypeOfPlace = async () => {
        const objAdress = { lat: '', lng: '' }
        objAdress.lat = this.state.address.lat.toString();
        objAdress.lng = this.state.address.lng.toString();
        const listTypes = await getTypeAddress(objAdress)
        if (listTypes?.length) {
            let type = null
            for (let index = 0; index < listTypes.length; index++) {
                const element = listTypes[index];
                type = typeOfPlace(element)
            }
            this.setState({ stateGoogleMaps: { ...this.state.stateGoogleMaps, type: type } })
        }
    }
    getDistance = (startAddress) => {
        let distance = getDistanceAddress(startAddress, this.state.address)
        distance = Math.round(distance * 10) / 10
        const time = distance * 2
        this.setState({
            stateGoogleMaps: {
                ...this.state.stateGoogleMaps,
                distance: distance, time: time, lat: this.state.address.lat, lng: this.state.address.lng
            },
            type: { ...this.state.type, errorMessage: '', isValid: false, isInValid: false },
            pointOfInterest: { ...this.state.pointOfInterest, errorMessage: '', isValid: false, isInValid: false },
            distance: { ...this.state.distance, errorMessage: '', isValid: false, isInValid: false },
            time:
                { ...this.state.time, errorMessage: '', isValid: false, isInValid: false },
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.address !== prevState.address) {
            this.getTypeOfPlace()
            this.getDistance(this.props.startAddress)
        }
    }
    getAdress = (data) => {
        this.setState({ address: data })
    }
    save = () => {
        const validation = [
            { value: "type", validation: [{ error: lang.typeProximityMsgError, type: 'isNotEmpty' }] },
            { value: "pointOfInterest", validation: [{ error: lang.internIdentificationError, type: 'isNotEmpty' }] },
            { value: "distance", validation: [{ error: lang.distanceProximityMsgError, type: 'isNotEmpty' }] },
            { value: "time", validation: [{ error: lang.timeProximityMsgError, type: 'isNotEmpty' }] },
        ]
        const { res, verif } = formValidation(validation, this.state)
        if (!verif &&
            (this.state.stateGoogleMaps.type === '' || this.state.stateGoogleMaps.pointOfInterest === '')) {
            this.setState({
                ...this.state,
                ...res
            })
        } else {
            if ((this.state.stateGoogleMaps.type !== '' && this.state.stateGoogleMaps.pointOfInterest !== '')
                || (verif && this.state.stateGoogleMaps.type === '' && this.state.stateGoogleMaps.pointOfInterest === '')) {
                this.props.getDataFromModal && this.props.getDataFromModal(this.state)
                this.props.closeModal();
            }
        }

    }
    getTextAddress = (addressText) => {
        this.setState({ stateGoogleMaps: { ...this.state.stateGoogleMaps, pointOfInterest: addressText } })
    }
    render() {
        return (<TemplateModalAddProximity
            defaultCenter={this.props.startAddress}
            closeModal={this.props.closeModal}
            show={this.props.show}
            onChange={this.onChange}
            onChangeSelect={this.onChangeSelect}
            save={this.save}
            onChangeNumber={this.onChangeNumber}
            getAdress={this.getAdress}
            getTypeOfPlace={this.getTypeOfPlace}
            getTextAddress={this.getTextAddress}
            {...this.state} />);
    }
}

export default ModalAddProximity;