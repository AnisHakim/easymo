import React, { Component } from "react";
import { Collapse, Switch, Text, viewLabel, Select, MoleculeInput, Table, formatNumber, MoleculeDatePicker } from '@easymo/designSystem';
import moment from 'moment'
import translator from '../../lang/translator';
import { listColOccupation, listInputOccupation, propertyAvailablityOptions, busyNatureOptions, OCCUPATION, leastDurationOptions, renderInputObject } from "../../data/data";
import { apiUpdateOccupation } from "../../Api/Properties/properties";
import { OrganismAddOccupation } from "..";
const lang = translator('fr')
class OrganismEditOccupation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            containerForm: 1000,
            isUpdated: false,
            isBusy: false,
            natureOfBusy: renderInputObject('owner', '', false, false),
            propertyAvailablity: renderInputObject('immediate', '', false, false),
            availabilityDate: renderInputObject('', '', false, false),
            reasonOfUnavailability: renderInputObject('', '', false, false),
            dataTable: [],
            newDataTable: [],
            updateState: false,
            closeElement: false,
            occupation: { ...OCCUPATION },
        }
    }
    onChangeOccupationSwitch = () => {
        this.setState({ isBusy: !this.state.isBusy, isUpdated: true })
    }
    onSelectChange = (key, element) => {
        this.setState({
            isUpdated: true,
            [key]: {
                ...this.state[key],
                value: element.value
            }
        })
    }
    onChangeDate = (date) => {
        this.setState({
            isUpdated: true,
            availabilityDate:
            {
                ...this.state.availabilityDate,
                value: new Date(date)
            }
        })
    }
    onInputChange = (key, element) => {
        this.setState({
            isUpdated: true,
            [key]: {
                ...this.state[key],
                value: element.target.value
            }
        })
    }
    submit = async () => {
        this.props.setLoader(true)
        const newData = this.state.newDataTable.length > 0 ? this.state.newDataTable.filter(el => el.isUpdated === true) : []
        const listOccupation = newData.length > 0 ? newData.map(el => {
            return {
                isDeleted: el.isDeleted,
                id: el._id,
                name: el.name,
                startOflease: el.startOflease ? new Date(el.startOflease) : null,
                leastDuration: el.leastDuration,
                rent: el.rent && parseInt(el.rent),
                chargesCom: el.chargesCom && parseInt(el.chargesCom),
                privCharges: el.privCharges && parseInt(el.privCharges),
                guaranteeLoc: el.guaranteeLoc && parseInt(el.guaranteeLoc),
                chargesTypes: el.chargesTypes,
                guarantee: el.guarantee,
                leaseEnergie: el.leaseEnergie,
                placesStatus: el.placesStatus,
                energPlacesStatus: el.energPlacesStatus
            }
        }) : []
        const data = {
            "id": this.props.propertie.id ? this.props.propertie.id : this.props.propertie._id,
            "isOccuped": this.state.isBusy,
            "disponibility": this.state.propertyAvailablity.value,
            "disponibilityDate": this.state.availabilityDate.value && this.state.availabilityDate.value,
            "reason": this.state.reasonOfUnavailability.value,
            "listOccupation": listOccupation
        }
        const response = await apiUpdateOccupation(JSON.stringify(data));
        if (response.statusCode === 200) {
            this.props.dataUpdated("Occupation")
            this.setState({
                isUpdated: false
            })
        } else {
            this.props.setLoader(false)
            this.props.onChangeIdentificationError("Occupation", true)
        }
    }
    firstAndLastName = (arr) => {
        return arr.map(el => el.firstName + " " + el.lastName).join(' ');
    }
    formatdata = () => {
        const state = { ...this.state }
        if (this.props.propertie.occupation) {
            state.propertyAvailablity.value = this.props.propertie.occupation.disponibility ? this.props.propertie.occupation.disponibility : state.propertyAvailablity.value;
            state.availabilityDate.value = this.props.propertie.occupation.disponibilityDate
            state.reasonOfUnavailability.value = this.props.propertie.occupation.reason ? this.props.propertie.occupation.reason : state.reasonOfUnavailability.value;
            state.isBusy = this.props.propertie.occupation.isOccuped ? this.props.propertie.occupation.isOccuped : state.isBusy
        }
        if (this.props.propertie.detailsListOccupations) {
            state.dataTable = this.props.propertie.detailsListOccupations
        }
        this.setState({ ...state })
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.isCallAPi !== prevProps.isCallAPi && this.state.isUpdated) {
            this.submit()
        }
        if (this.props.isPropertieLoaded !== prevProps.isPropertieLoaded) {
            this.formatdata()
        }
    }
    handleChangeData = (key, element) => {
        this.setState({
            isUpdated: true,
            [key]: element
        })
    }
    tableContainer = () => {
        const className = ['max-width-table-occupation']
        if (!this.state.isBusy || this.state.natureOfBusy.value === 'owner') {
            className.push('diplay-none')
        }
        return className.join(' ')
    }
    renderContact = (e) => {
        return <div className="pointer name-occupation">{e}</div>
    }
    getElementToEdit = (data, width) => {
        if (data) {
            const occ = { ...OCCUPATION }
            occ.name.value = data.name
            occ.startOflease.value = data.startOflease ? moment(data.startOflease) : data.startOflease
            occ.leastDuration.value = data.leastDuration
            occ.rent.value = data.rent
            occ.chargesCom.value = data.chargesCom
            occ.privCharges.value = data.privCharges
            occ.chargesTypes.value = data.chargesTypes
            occ.guaranteeLoc.value = data.guaranteeLoc
            occ.guarantee = data.guarantee
            occ.leaseEnergie = data.leaseEnergie
            occ.placesStatus = data.placesStatus
            occ.energPlacesStatus = data.energPlacesStatus
            occ.id = data._id
            this.setState({
                occupation: { ...occ },
                updateState: !this.state.updateState,
                containerForm: width
            })
        } else {
            this.setState({
                occupation: {
                    ...OCCUPATION,
                    name: { ...OCCUPATION.name, value: "" },
                    startOflease: { ...OCCUPATION.startOflease, value: "" },
                    leastDuration: { ...OCCUPATION.leastDuration, value: "" },
                    rent: { ...OCCUPATION.rent, value: "" },
                    chargesCom: { ...OCCUPATION.chargesCom, value: "" },
                    privCharges: { ...OCCUPATION.privCharges, value: "" },
                    chargesTypes: { ...OCCUPATION.chargesTypes, value: false },
                    guaranteeLoc: { ...OCCUPATION.guaranteeLoc, value: "" },
                },
                updateState: !this.state.updateState,
                containerForm: width
            })
        }

    }
    onSave = (index) => {
        const newData = [...this.state.newDataTable]
        const data = {
            name: this.state.occupation.name.value,
            startOflease: this.state.occupation.startOflease.value,
            leastDuration: this.state.occupation.leastDuration.value,
            rent: this.state.occupation.rent.value.replaceAll(lang.localeSeparateur, ''),
            chargesCom: this.state.occupation.chargesCom.value.replaceAll(lang.localeSeparateur, ''),
            privCharges: this.state.occupation.privCharges.value.replaceAll(lang.localeSeparateur, ''),
            chargesTypes: this.state.occupation.chargesTypes.value,
            guaranteeLoc: this.state.occupation.guaranteeLoc.value.replaceAll(lang.localeSeparateur, ''),
            guarantee: this.state.occupation.guarantee,
            leaseEnergie: this.state.occupation.leaseEnergie,
            placesStatus: this.state.occupation.placesStatus,
            energPlacesStatus: this.state.occupation.energPlacesStatus,
            _id: this.state.occupation.id,

        }
        if (newData[index]) {
            newData[index] = data
            newData[index].isEditable = false
            newData[index].isUpdated = true
            newData[index].isNew = false
        } else {
            newData.push({
                ...data,
                isDeleted: false,
                isNew: true,
                newAdded: true,
                isEditable: false,
                isUpdated: true,
            })
        }

        this.setState({
            updateState: !this.state.updateState,
            closeElement: !this.state.closeElement,
            occupation: { ...OCCUPATION },
            dataTable: newData
        })
    }
    setData = (e) => {
        this.setState({ occupation: e })
    }
    renderChargeType = (el) => {
        return el ? lang.fixed : lang.flatRate
    }
    renderLeaseDuration = (el) => {
        return el && el + " " + lang.month
    }
    renderPrice = (e) => {
        return formatNumber(e, this.props.Devise, lang.localNumber)
    }
    render() {
        return (<Collapse
            iconStart="group_equal"
            title={lang.occupation}>
            <div className="row mb-5 w-100">
                <div className="col-sm-4">
                    {viewLabel({
                        label: lang.propertyBusy,
                        labelClass: "header-select-label mandat"

                    })}
                    <div className="flex item-center" >
                        <Switch
                            onChange={() => this.onChangeOccupationSwitch()}
                            checked={this.state.isBusy}
                            className={'ligne-switch mandat'}
                        />
                        <Text text={this.state.isBusy ? lang.oui : lang.non} type='' className='ml-2 mb-0 ligne-switch-text' />
                    </div>
                </div>
                {this.state.isBusy && <div className=" col-sm-8 col-xl-4 container-select-occupation">
                    <Select
                        className='text-select-edit-occupation'
                        inputLabel={lang.natureOfBusy}
                        options={busyNatureOptions(lang)}
                        value={this.state.natureOfBusy.value}
                        onChange={(e) => this.onSelectChange('natureOfBusy', e)}
                        optionClassName='option-select-status-identification'
                    />
                </div>}
            </div>
            <div className="row mb-5 w-100">
                <div className="col-sm-4">
                    <Select
                        className='text-select-edit-occupation'
                        inputLabel={lang.propertyAvailablity}
                        options={propertyAvailablityOptions(lang)}
                        value={this.state.propertyAvailablity.value}
                        onChange={(e) => this.onSelectChange('propertyAvailablity', e)}
                        optionClassName='option-select-status-identification'
                    />
                </div>
                {this.state.propertyAvailablity.value === 'notAvailable' && <>
                    <div className="col-md-4 mandat-date-row" >
                        {viewLabel({
                            label: lang.availableDate
                        })}
                        <MoleculeDatePicker
                            isSingleDate
                            onApply={(e) => this.onChangeDate(e)}
                            start={this.state.availabilityDate.value ? moment(this.state.availabilityDate.value) : null}
                        />
                    </div>
                    <div className="col-md-4 container-input-occupation" >
                        <MoleculeInput
                            inputLabel={lang.reasonOfUnavailability}
                            inputClassname='inputs-step-three'
                            placeholder={lang.reasonOfUnavailabilityPlaceHolder}
                            onchangeInput={(e) => this.onInputChange('reasonOfUnavailability', e)}
                            inputValue={this.state.reasonOfUnavailability.value}
                            isValid={this.state.reasonOfUnavailability.isValid}
                            isInvalid={this.state.reasonOfUnavailability.isInValid}
                            inputError={this.state.reasonOfUnavailability.errorMessage}
                            errorClassname='error-msg-inputs'
                        />
                    </div>
                </>
                }
            </div>
            <div className="pb-6 w-100">
                <Table
                    btnText={lang.tenantPlaceHolder}
                    withBtnAdd={this.state.isBusy && this.state.natureOfBusy.value !== 'owner'}
                    containerClassName={this.tableContainer()}
                    tableClassName='table-occupation'
                    withoutTitleAction
                    withValidation={false}
                    actionFirst
                    withAction
                    emptyArrayText={lang.emptyLocataireTableText}
                    type="type-2"
                    listAction={["edit", "delete"]}
                    listCol={listColOccupation({
                        renderContact: this.renderContact,
                        renderLeaseDuration: this.renderLeaseDuration,
                        renderChargeType: this.renderChargeType,
                        renderPrice: this.renderPrice
                    })}
                    listInput={listInputOccupation}
                    data={this.state.dataTable}
                    getdata={(e) => this.setState({ newDataTable: e })}
                    withSizeControl
                    getElementToEdit={this.getElementToEdit}
                    onSave={this.onSave}
                    closeElement={this.state.closeElement}
                    editComponent={<OrganismAddOccupation
                        occupation={this.state.occupation}
                        setData={(e) => this.setData(e)}
                        updateState={this.state.updateState}
                        containerForm={this.state.containerForm}
                    />}
                    icon='playlist_add'
                    iconClassName='icon-table-occupation'
                    maxFormContainer
                />

            </div>
        </Collapse>);
    }
}

export default OrganismEditOccupation;