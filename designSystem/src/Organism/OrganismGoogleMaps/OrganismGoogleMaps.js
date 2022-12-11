import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Geocode from "react-geocode";
import { Icon } from '../../Atoms';
import { googleMapsAPI } from '../../config';
import { Red, WhiteColor } from '../../Colors';
Geocode.setApiKey(googleMapsAPI);
Geocode.setLanguage("fr");
Geocode.setRegion("fr");
Geocode.enableDebug();

const Pointer = (props) => {
    return <div className='relative flex justify-center container-marker-map'>
        <Icon icon={props.icon}
            size="24px"
            color={Red}
            className="self-center" />
        <Icon icon={props.secondIcon}
            size="14px"
            color={WhiteColor}
            className="self-center absolute top-position-icon"
        />
    </div>
}
Pointer.defaultProps = {
    icon: "map-marker-alt",
    secondIcon: null
}
class OrganismGoogleMaps extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            position: this.props.defaultCenter,
            center: this.props.defaultCenter,
            zoom: this.props.zoom,
            displayPointer: false
        }
    }

    static defaultProps = {
        defaultCenter: { lat: 48.8, lng: 2.3 },
        defaultZoom: 0,
        containerClassName: null,
        getPosition: false,
        address: {
            street: null, number: null, city: null, postalcode: null, country: null
        },
        type: "type-1",
    };

    getLocation = () => {
        let zoomVar = 0;
        let address = ''
        if (this.props.address.country) {
            zoomVar = 5
            address += " " + this.props.address.country
        }
        if (this.props.address.city) {
            zoomVar = 10
            address += " " + this.props.address.city
        }
        if (this.props.address.postalCode) {
            zoomVar = 15
            address += " " + this.props.address.postalCode.toString()
        }
        if (this.props.address.street && this.props.address.streetNumber) {
            if (this.props.address.postalCode.toString() !== '' && this.props.address.city !== '' && this.props.address.country !== '') {
                zoomVar = 18
                address += " " + this.props.address.street
                address += " " + this.props.address.streetNumber.toString()
            }
        }
        Geocode.fromAddress(address).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                this.setState({
                    position: { lat, lng },
                    center: { lat, lng },
                    zoom: zoomVar,
                    displayPointer: true
                })
                this.props.setPositionGoogleMaps && this.props.setPositionGoogleMaps(lat, lng)
            },
            (error) => {
                this.setState({
                    position: { lat: null, lng: null },
                    zoom: 0,
                    displayPointer: false
                })
                this.props.setPositionGoogleMaps && this.props.setPositionGoogleMaps(null, null)
            }
        );
    }

    getLocationFromLatLng = () => {
        const { lat, lng } = this.props.addressLatLng
        this.setState({
            position: { lat: lat, lng: lng },
            center: { lat, lng },
            zoom: 15,
            displayPointer: true
        })
    }
    componentDidUpdate(prevProps) {
        const { lat, lng } = this.props.defaultCenter
        if (this.props.getPosition != prevProps.getPosition) {
            this.getLocation()
        }
        if (this.props.addressLatLng != prevProps.addressLatLng) {
            this.getLocationFromLatLng()
        }
        if (this.props.defaultCenter != prevProps.defaultCenter) {
            this.setState({ displayPointer: true, center: { lat: Number(lat), lng: Number(lng) }, position: { lat: Number(lat), lng: Number(lng) } })
        }
    }
    componentDidMount() {
        const { lat, lng } = this.props.defaultCenter
        this.setState({ center: { lat: Number(lat), lng: Number(lng) }, position: { lat: Number(lat), lng: Number(lng) } })
    }
    getContainerclassName = () => {
        const className = ["w-100", "default-contaner-map", "mb-4"]
        if (this.props.containerClassName) {
            className.push(this.props.containerClassName)
        }
        return className.join(' ')
    }

    render() {
        return (
            <div className={this.getContainerclassName()}>

                <GoogleMapReact
                    bootstrapURLKeys={{ key: googleMapsAPI, language: "fr" }}
                    defaultCenter={this.props.defaultCenter}
                    center={this.state.center}
                    defaultZoom={this.props.defaultZoom}
                    yesIWantToUseGoogleMapApiInternals
                    zoom={this.state.zoom}
                >
                    {this.props.type === "type-1" &&
                        this.state.displayPointer &&
                        this.state.position.lat && this.state.position.lng &&
                        <MyGreatPlace lat={this.state.position.lat} lng={this.state.position.lng} />}
                    {this.props.type === "type-2" && this.props?.listPlaces.map(el => <MyGreatPlace lat={el.lat} lng={el.lng} text={el.pointOfInterest} secondIcon={el.icon} />)}
                    {this.props.type === "type-2" && <MyGreatPlace lat={this.state.position.lat} lng={this.state.position.lng} />}

                </GoogleMapReact>

            </div>
        );
    }
}
class MyGreatPlace extends Component {

    render() {
        return (
            <div className='flex width-container-pointer item-center'>
                <Pointer secondIcon={this.props.secondIcon} />
                <span className='text-marker-map'>{this.props.text}</span>
            </div>
        );
    }
}
export default OrganismGoogleMaps;