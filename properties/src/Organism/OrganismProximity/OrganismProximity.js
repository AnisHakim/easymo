import React, { Component } from 'react';
import { Collapse, Table, viewLabel, Icon, GoogleMaps, Switch, getDistanceAddress } from '@easymo/designSystem';
import translator from "../../lang/translator";
import ModalAddProximity from '../../Modal/ModalAddProximity/ModalAddProximity';
import { proximityOptions } from '../../data/data';
import { apiUpdateProximity } from '../../Api/Properties/properties';
const lang = translator('fr')
const getListElement = () => {
    return [
        { isChecked: false, icon: 'school', label: lang.school, type: 'school' },
        { isChecked: false, icon: 'train-car', label: lang.publicTransport, type: 'publicTransport' },
        { isChecked: false, icon: 'shopping_cart', label: lang.store, typ: 'store' },
        { isChecked: false, icon: 'museum-15', label: lang.museum, type: 'museum' },
        { isChecked: false, icon: 'restaurant', label: lang.restaurant, type: 'restaurant' },
        { isChecked: false, icon: 'dumbbell', label: lang.sportsHalls, type: 'sportsHalls' },
        { isChecked: false, icon: 'pine-tree', label: lang.park, type: 'park' },
        { isChecked: false, icon: 'parking', label: lang.parking, type: 'parking' },
        { isChecked: false, icon: 'home_vs', label: lang.establishment, type: 'establishment' },
    ]
}
class OrganismProximity extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tableData: [],
            newDataTable: [],
            showModal: false,
            isUpdated: false,
            indexElementToEdit: null,
            elementToEdit: null,
            isChecked: false,
            listOfFilterElements: [...getListElement()],
            startAddress: { lat: 48.8534, lng: 2.3488 },
            listTypeSelected: []
        }
    }
    formatdata = () => {
        if (this.props?.propertie?.listPromixity?.length) {
            let list = []
            list = this.props?.propertie?.listPromixity.map(el => {
                return {
                    ...el,
                    type: el.type,
                    pointOfInterest: el.pointInterest,
                    distance: el.distanceMetre,
                    time: el.timeSecond / 60,
                }
            })
            this.setState({
                tableData: list
            })
        }
    }
    getDataFromModal = (data) => {
        let obj = {
            type: data.type.value,
            pointOfInterest: data.pointOfInterest.value,
            distance: data.distance.value,
            time: data.time.value,
            icon: this.getIcon(data.type.value),
        }
        if (data.address !== '') {
            obj = {
                ...obj,
                type: data.stateGoogleMaps.type,
                distance: data.stateGoogleMaps.distance,
                time: data.stateGoogleMaps.time,
                pointOfInterest: data.stateGoogleMaps.pointOfInterest,
                lat: data.stateGoogleMaps.lat,
                lng: data.stateGoogleMaps.lng,
                icon: this.getIcon(data.stateGoogleMaps.type)
            }
        }
        const newData = [...this.state.newDataTable]
        if (newData[this.state.indexElementToEdit]) {
            newData[this.state.indexElementToEdit] = {
                ...newData[this.state.indexElementToEdit],
                ...obj,
                isUpdated: true
            }
        } else {
            newData.push({
                ...obj,
                isDeleted: false,
                isNew: true,
                isUpdated: true
            })
        }
        this.setState({ tableData: newData, newDataTable: newData, isUpdated: true })
    }
    checkNewDistance = () => {
        let list = [...this.state.newDataTable]
        for (let index = 0; index < list.length; index++) {
            if (list[index].lat !== undefined && !list[index].isDeleted) {
                let distance = getDistanceAddress(this.props?.position, { lat: list[index].lat, lng: list[index].lng })
                distance = Math.round(distance * 10) / 10
                list[index].distance = distance
                list[index].time = distance * 2
                list[index].isUpdated = true
            }
        }
        this.setState({
            isUpdated: true,
            tableData: list,
            startAddress: this.props.position
        })
    }


    componentDidUpdate(prevProps, prevState) {
        if (this.props.isCallAPi !== prevProps.isCallAPi && this.state.isUpdated) {
            this.submit()
        }
        if (this.props.isPropertieLoaded !== prevProps.isPropertieLoaded) {
            this.formatdata()
        }
        if (this.props.position != prevProps.position
            && this.props?.position?.lat
            && this.props?.propertie?.identification.lat != this.props?.position?.lat) {
            this.checkNewDistance()
        }
        if (this.props.position != prevProps.position) {
            this.setState({
                startAddress: this.props.position
            })
        }
    }
    getIcon = (type) => {
        if (type) {
            const list = proximityOptions(lang).filter(el => el.value === type)
            if (list.length) {
                return list[0].icon
            }
        }
        return 'home_vs'
    }
    submit = async () => {
        this.props.setLoader(true)
        let body = {
            id: this.props.propertie._id
        }
        const listProximity = []
        for (let index = 0; index < this.state.newDataTable.length; index++) {
            const element = this.state.newDataTable[index];
            if (element.isUpdated || element.isNew) {
                let proximity = {}
                if (element._id) {
                    proximity['id'] = element._id
                }
                proximity['type'] = element.type
                proximity['icon'] = this.getIcon(element.type)
                proximity['pointInterest'] = element.pointOfInterest
                proximity['distanceMetre'] = element.distance
                proximity['timeSecond'] = element.time * 60
                if (element.lng)
                    proximity['lng'] = element.lng
                if (element.lat)
                    proximity['lat'] = element.lat
                proximity['isDeleted'] = element.isDeleted
                listProximity.push(proximity)
            }
        }
        body['listProximity'] = listProximity
        const response = await apiUpdateProximity(JSON.stringify(body))
        if (response.statusCode === 200) {
            this.props.dataUpdated && this.props.dataUpdated('proximity')
            this.setState({
                isUpdated: false
            })
        }
        else {
            this.props.setLoader && this.props.setLoader(false)
            this.props.onChangeIdentificationError && this.props.onChangeIdentificationError("proximity", true)
        }
    }
    openModalEdit = (index) => {
        this.setState({ showModal: true, elementToEdit: this.state.tableData[index], indexElementToEdit: index })
    }
    renderType = (e, ligne) => {
        if (ligne.type !== '') {
            const data = proximityOptions(lang).filter(el => el.value === ligne.type)
            return <div className='flex align-items-flex-end type-proxmity-text'>
                <Icon className='icon-table-proximity' icon={ligne.icon} />
                <span>{data[0].label}</span>
            </div>
        }
        return null
    }
    renderPointOfInterest = (e, ligne) => {
        if (ligne.type !== '') {
            return <div className='pointinterest-truncate'>
                {ligne.pointOfInterest}
            </div>
        }
        return null
    }
    renderDistance = (e, ligne) => {
        if (ligne.type !== '') {
            return <>
                {ligne.distance}
                <span className='ml-1'>Km</span>
            </>
        }
        return null
    }
    getNewData = (e) => {
        this.setState({
            newDataTable: e,
            isUpdated: this.state.newDataTable.length ? true : false
        })
    }
    onChangeSwitch = (index) => {
        let list = [...this.state.listOfFilterElements]
        list[index].isChecked = !list[index].isChecked
        const listTypeSelected = []
        for (let i = 0; i < list.length; i++) {
            if (list[i].isChecked)
                listTypeSelected.push(list[i].type)
        }
        this.setState({
            listOfFilterElements: list,
            listTypeSelected: listTypeSelected
        })
    }
    render() {
        return (<Collapse title={lang.proximity} iconStart="my_location">
            {this.state.showModal && <ModalAddProximity show={this.state.showModal}
                closeModal={() => this.setState({ showModal: false })}
                getDataFromModal={this.getDataFromModal}
                elementToEdit={this.state.elementToEdit}
                startAddress={this.state.startAddress} />}
            <div className='row mb-6'>
                <div className='col-sm-9'>
                    <GoogleMaps containerClassName='container-google-maps-proximity'
                        defaultCenter={this.state.startAddress}
                        defaultZoom={12}
                        listPlaces={this.state.newDataTable.filter(el => {
                            if (!el.isDeleted)
                                if (this.state.listTypeSelected.indexOf(el.type) !== -1 && el.lng != undefined && el.lat !== undefined && el.lng != null && el.lat !== null)
                                    return {
                                        icon: el.icon,
                                        pointOfInterest: el.pointOfInterest,
                                        lat: el.lat,
                                        lng: el.lng,
                                    }
                        })}
                        type="type-2"
                    />
                </div>
                <div className='col-sm-3'>
                    <div>
                        {viewLabel({
                            label: lang.chooseElementToDisplay,
                            labelClass: 'bold-16-label mb-3'
                        })}
                    </div>
                    {this.state.listOfFilterElements.map((el, index) => <div className='mb-3'>
                        <div className='flex item-center'>
                            <Switch
                                onChange={() => this.onChangeSwitch(index)}
                                checked={el.isChecked}
                                className='mr-2'
                            />
                            <Icon icon={el.icon} className={el.isChecked ? 'icon-filter-selected-proximity' : 'icon-filter-proximity'} />
                            <span className={el.isChecked ? 'color-text-selected-filter-proximity' : 'text-filter-proximity'}>{el.label}</span>
                        </div>
                    </div>)}
                </div>
            </div>
            <div className='mb-5'>
                <Table
                    tableClassName="offre-table piece"
                    containerClassName={'table-max-w100'}
                    withValidation={false}
                    actionFirst={false}
                    withAction
                    type="type-2"
                    listAction={["edit", "delete"]}
                    listCol={[
                        { key: "type", name: lang.type, sort: true, type: "custom", renderFunction: this.renderType },
                        { key: "pointOfInterest", name: lang.pointOfInterest, sort: true, type: "custom", renderFunction: this.renderPointOfInterest },
                        { key: "distance", name: lang.distance, sort: true, type: "custom", renderFunction: this.renderDistance },
                        { key: "time", name: lang.time, sort: true },
                    ]}
                    data={this.state.tableData}
                    getdata={(e) => this.getNewData(e)}
                    trAcceptedColor
                    withSizeControl
                    sortAccepted
                    emptyArrayText={lang.emptyProximityTableText}
                    withPagination
                    editWithModal
                    openModalEdit={this.openModalEdit}
                    withBtnAdd
                    btnText={lang.addPointManually}
                    icon='add'
                    withFilter
                    title={lang.pointOfInterestProximity}
                    inputPlaceHolder={lang.searchPointOfInterest}
                />
            </div>
        </Collapse>);
    }
}

export default OrganismProximity;