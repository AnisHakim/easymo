import React from "react";
import { MoleculeInput, Switch, viewLabel, Text, isNumber, MoleculeDatePicker, Select, GroupeInput, formatInputNumber } from "@easymo/designSystem";
import translator from '../../lang/translator';
import { OCCUPATION, leastDurationOptions, chargesTypesOptions } from "../../data/data";
import moment from 'moment'

const lang = translator('fr')
class OrganismAddOccupation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            occupation: { ...OCCUPATION },
            isUpdated: false,
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.occupation !== prevState.occupation) {
            this.props.setData && this.props.setData(this.state.occupation)
        }
        if (this.props.updateState !== prevProps.updateState) {
            this.setState({
                occupation: this.props.occupation
            })
        }
    }
    onChange = (e, key) => {
        this.setState({
            isUpdated: true,
            occupation: {
                ...this.state.occupation,
                [key]: { ...this.state.occupation[key], value: e.target.value }
            }
        })
    }
    onChangeNumber = (e, key) => {
        if (isNumber(e.target.value.replaceAll(lang.localeSeparateur, ''))) {
            if (e.target.value !== '') {
                this.setState({
                    isUpdated: true,
                    occupation: {
                        ...this.state.occupation,
                        [key]: { ...this.state.occupation[key], value: formatInputNumber(e.target.value, lang.localNumber) }
                    }
                })
            } else {
                this.setState({
                    isUpdated: true,
                    occupation: {
                        ...this.state.occupation,
                        [key]: { ...this.state.occupation[key], value: e.target.value }
                    }
                })
            }
        }
    }
    onChangeSwitchSwitch = (key) => {
        this.setState({
            isUpdated: true,
            occupation: {
                ...this.state.occupation,
                [key]: !this.state.occupation[key]
            }
        })
    }
    onChangeDate = (date) => {
        this.setState({
            isUpdated: true,
            occupation: {
                ...this.state.occupation,
                startOflease:
                {
                    ...this.state.occupation.startOflease,
                    value: date
                }
            }
        })
    }
    onSelectChange = (key, element) => {
        this.setState({
            isUpdated: true,
            occupation: {
                ...this.state.occupation,
                [key]: {
                    ...this.state[key],
                    value: element.value
                }
            }
        })
    }
    render() {
        return (
            <div className="w-100" style={{ width: this.props.containerForm ? this.props.containerForm : "100%" }}>
                <div className="row mb-1">
                    <div className="col-lg-3 col-sm-6 mb-5">
                        <MoleculeInput
                            inputClassname='inputs-add-occupation'
                            inputLabel={lang.name}
                            inputValue={this.state.occupation.name.value}
                            onchangeInput={(e) => this.onChange(e, "name")}
                        />
                    </div>
                    <div className="col-lg-3 col-sm-6 mb-5 mandat-date-row">
                        {viewLabel({
                            label: lang.startOflease
                        })}
                        <MoleculeDatePicker
                            isSingleDate
                            onApply={(e) => this.onChangeDate(e)}
                            start={this.state.occupation.startOflease.value ? moment(this.state.occupation.startOflease.value) : null}
                        />
                    </div>
                    <div className="col-lg-3 col-sm-6 mb-5">
                        <Select
                            placeholder={lang.duration}
                            className='text-select-edit-occupation'
                            inputLabel={lang.leastDuration}
                            options={leastDurationOptions(lang)}
                            value={this.state.occupation.leastDuration.value}
                            onChange={(e) => this.onSelectChange('leastDuration', e)}
                            optionClassName='option-select-status-identification'
                        />
                    </div>

                    <div className="col-lg-3 col-sm-6 mb-5">
                        {viewLabel({
                            label: lang.rent,
                            labelClass: "header-select-label mandat"
                        })}
                        <GroupeInput
                            withSelect={false}
                            placeHolderInput=""
                            onchangeInput={(e) => this.onChangeNumber(e, "rent")}
                            inputValue={this.state.occupation.rent.value}
                        />
                    </div>
                </div>
                <div className="row mb-1">
                    <div className="col-lg-3 col-sm-6 mb-5">
                        {viewLabel({
                            label: lang.chargesCom,
                            labelClass: "header-select-label mandat"
                        })}
                        <GroupeInput
                            withSelect={false}
                            placeHolderInput=""
                            onchangeInput={(e) => this.onChangeNumber(e, "chargesCom")}
                            inputValue={this.state.occupation.chargesCom.value}
                        />
                    </div>
                    <div className="col-lg-3 col-sm-6 mb-5">
                        {viewLabel({
                            label: lang.privCharges,
                            labelClass: "header-select-label mandat"
                        })}
                        <GroupeInput
                            withSelect={false}
                            placeHolderInput=""
                            onchangeInput={(e) => this.onChangeNumber(e, "privCharges")}
                            inputValue={this.state.occupation.privCharges.value}
                        />
                    </div>
                    <div className="col-lg-3 col-sm-6 mb-5">
                        <Select
                            placeholder={lang.type}
                            className='text-select-edit-occupation'
                            inputLabel={lang.chargesTypes}
                            options={chargesTypesOptions(lang)}
                            value={this.state.occupation.chargesTypes.value}
                            onChange={(e) => this.onSelectChange('chargesTypes', e)}
                            optionClassName='option-select-status-identification'
                        />
                    </div>

                    <div className="col-lg-3 col-sm-6 mb-5">
                        {viewLabel({
                            label: lang.guaranteeLoc,
                            labelClass: "header-select-label mandat"
                        })}
                        <GroupeInput
                            withSelect={false}
                            placeHolderInput=""
                            onchangeInput={(e) => this.onChangeNumber(e, "guaranteeLoc")}
                            inputValue={this.state.occupation.guaranteeLoc.value}
                        />
                    </div>
                </div>
                <div className="row mb-1">
                    <div className="col-sm-2 mb-5">
                        {viewLabel({
                            label: lang.guarantee,
                            labelClass: "header-select-label mandat"

                        })}
                        <div className="flex item-center" >
                            <Switch
                                onChange={() => this.onChangeSwitchSwitch("guarantee")}
                                checked={this.state.occupation.guarantee}
                                className={'ligne-switch mandat'}
                            />
                            <Text text={this.state.occupation.guarantee ? lang.oui : lang.non} type='' className='ml-2 mb-0 ligne-switch-text' />
                        </div>
                    </div>
                    <div className="col-sm-2  mb-5">
                        {viewLabel({
                            label: lang.leaseEnergie,
                            labelClass: "header-select-label mandat"

                        })}
                        <div className="flex item-center" >
                            <Switch
                                onChange={() => this.onChangeSwitchSwitch("leaseEnergie")}
                                checked={this.state.occupation.leaseEnergie}
                                className={'ligne-switch mandat'}
                            />
                            <Text text={this.state.occupation.leaseEnergie ? lang.oui : lang.non} type='' className='ml-2 mb-0 ligne-switch-text' />
                        </div>
                    </div>
                    <div className="col-sm-2  mb-5">
                        {viewLabel({
                            label: lang.placesStatus,
                            labelClass: "header-select-label mandat"

                        })}
                        <div className="flex item-center" >
                            <Switch
                                onChange={() => this.onChangeSwitchSwitch("placesStatus")}
                                checked={this.state.occupation.placesStatus}
                                className={'ligne-switch mandat'}
                            />
                            <Text text={this.state.occupation.placesStatus ? lang.oui : lang.non} type='' className='ml-2 mb-0 ligne-switch-text' />
                        </div>
                    </div>
                    <div className="col-sm-2  mb-5">
                        {viewLabel({
                            label: lang.energPlacesStatus,
                            labelClass: "header-select-label mandat"

                        })}
                        <div className="flex item-center" >
                            <Switch
                                onChange={() => this.onChangeSwitchSwitch("energPlacesStatus")}
                                checked={this.state.occupation.energPlacesStatus}
                                className={'ligne-switch mandat'}
                            />
                            <Text text={this.state.occupation.energPlacesStatus ? lang.oui : lang.non} type='' className='ml-2 mb-0 ligne-switch-text' />
                        </div>
                    </div>
                </div>

            </div >);
    }
}

export default OrganismAddOccupation;