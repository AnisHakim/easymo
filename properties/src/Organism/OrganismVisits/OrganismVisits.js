import React, { Component } from 'react';
import { Collapse, Switch, Text, viewLabel, MoleculeInput, Select, Button, Icon, Input, CheckBox } from '@easymo/designSystem';
import translator from "../../lang/translator";
import { optionsVisitsDays, renderIconTooltipObject } from '../../data/data';
import { apiUpdateVisit } from '../../Api/Properties/properties';
const lang = translator('fr')
class OrganismVisits extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isUpdated: false,
            preventOwner: false,
            haveKeys: false,
            hoursAndDaysFixed: false,
            moreInfos: {
                value: '',
                isValid: false,
                isInValid: false,
                errorMessage: ''
            },
            visitsDaysHoursLists: [{
                day: optionsVisitsDays(lang)[0].value,
                start: '',
                end: '',
            },],
            daysOfVisits: [
                { isChecked: false, value: 'monday', label: lang.monday },
                { isChecked: false, value: 'tuesday', label: lang.tuesday },
                { isChecked: false, value: 'wednesday', label: lang.wednesday },
                { isChecked: false, value: 'thursday', label: lang.thursday },
                { isChecked: false, value: 'friday', label: lang.friday },
                { isChecked: false, value: 'saturday', label: lang.saturday },
                { isChecked: false, value: 'sunday', label: lang.sunday },
            ]
        }
    }
    switchsList = () => {
        const list = [
            {
                label: lang.preventOwner,
                onChangeKey: 'preventOwner',
                checked: this.state.preventOwner,
                isWithInput: false,
                moreIcon: false,
            },
            {
                label: lang.haveKeys,
                onChangeKey: 'haveKeys',
                checked: this.state.haveKeys,
                isWithInput: true,
                moreIcon: false,
            },
            {
                label: lang.hoursAndDaysFixed,
                onChangeKey: 'hoursAndDaysFixed',
                checked: this.state.hoursAndDaysFixed,
                isWithInput: false,
                moreIcon: true,
            },
        ]
        return list
    }
    onChangeSwitch = (key) => {
        this.setState({ [key]: !this.state[key], isUpdated: true })
        if (key === 'hoursAndDaysFixed') {
            let fixDays = [...this.state.daysOfVisits]
            fixDays = fixDays.map(el => { return { ...el, isChecked: false } })
            this.setState({
                isUpdated: true, daysOfVisits: fixDays, visitsDaysHoursLists: [{
                    day: optionsVisitsDays(lang)[0].value,
                    start: '',
                    end: '',
                }]
            })
        }
    }
    onChangeMoreInfos = (e) => {
        this.setState({
            isUpdated: true,
            moreInfos: {
                ...this.state.moreInfos,
                value: e.target.value
            }
        })
    }
    removeElementFromList = (index) => {
        let data = [...this.state.visitsDaysHoursLists]
        data.splice(index, 1)
        this.setState({ visitsDaysHoursLists: data })
    }
    addVisitDaysHoursLine = () => {
        let data = [...this.state.visitsDaysHoursLists]
        data.push({
            day: optionsVisitsDays(lang)[0].value,
            start: '',
            end: '',
            withClearIcon: true
        })
        this.setState({ isUpdated: true, visitsDaysHoursLists: data })
    }
    onChangeDate = (e, index, key) => {
        let data = [...this.state.visitsDaysHoursLists]
        data[index][key] = e.target.value
        this.setState({ isUpdated: true, visitsDaysHoursLists: data })
    }
    onSelectChange = (e, index) => {
        let data = [...this.state.visitsDaysHoursLists]
        data[index].day = e.value
        this.setState({
            isUpdated: true,
            visitsDaysHoursLists: data
        })
    }
    onChangeCheckbox = (index) => {
        let data = [...this.state.daysOfVisits]
        data[index].isChecked = !data[index].isChecked
        this.setState({ isUpdated: true, daysOfVisits: data })
    }
    submit = async () => {
        this.props.setLoader(true)
        let body = {
            id: this.props.propertie.id ? this.props.propertie.id : this.props.propertie._id,
            landlordNotif: this.state.preventOwner,
            agencyKey: this.state.haveKeys,
            hourFix: this.state.hoursAndDaysFixed,
            agencyInfo: this.state.moreInfos.value,
        }
        let visitDaysOrHours = [...this.state.visitsDaysHoursLists];
        if (this.state.hoursAndDaysFixed) {
            visitDaysOrHours = visitDaysOrHours.map(el => { return { start: el.start, end: el.end } })
            const fixDays = this.state.daysOfVisits.filter(el => el.isChecked === true).map(el => el.value)
            body = { ...body, visitHours: visitDaysOrHours, fixDays: fixDays }
        } else {
            body = { ...body, visitDays: visitDaysOrHours }
        }
        const response = await apiUpdateVisit(JSON.stringify(body))
        if (response.statusCode === 200) {
            this.props.dataUpdated('visit')
            this.setState({
                isUpdated: false
            })
        } else {
            this.props.setLoader(false)
        }
    }
    formatdata = () => {
        let newState = {
            preventOwner: this.props?.propertie?.visit?.landlordNotif,
            haveKeys: this.props?.propertie?.visit?.agencyKey,
            hoursAndDaysFixed: this.props?.propertie?.visit?.hourFix,
            moreInfos: { ...this.state.moreInfos, value: this.props?.propertie?.visit?.agencyInfo },
        }
        if (this.props?.propertie?.visit?.fixDays.length > 0) {
            const arr = this.props.propertie.visit?.fixDays;
            let fixDays = [...this.state.daysOfVisits]
            for (let index = 0; index < arr.length; index++) {
                fixDays = fixDays.map(el => { return el.value === arr[index] ? { ...el, isChecked: true } : el })
            }
            newState = {
                ...newState, daysOfVisits: fixDays, visitsDaysHoursLists: this.props.propertie.visit?.visitHours ? this.props.propertie.visit?.visitHours : [{
                    day: optionsVisitsDays(lang)[0].value,
                    start: '',
                    end: '',
                }]
            }
        } else {
            newState = {
                ...newState, visitsDaysHoursLists: this.props.propertie.visit?.visitDays ? this.props.propertie.visit?.visitDays : [{
                    day: optionsVisitsDays(lang)[0].value,
                    start: '',
                    end: '',
                }]
            }
        }
        this.setState({ ...newState })
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.isCallAPi !== prevProps.isCallAPi && this.state.isUpdated) {
            this.submit()
        }
        if (this.props.isPropertieLoaded !== prevProps.isPropertieLoaded) {
            this.formatdata()
        }
    }
    render() {
        return (<>
            <Collapse title={lang.Visites} iconStart="standing">
                {this.switchsList().map((element, i) =>
                    <div key={i} className='row'>
                        <div className={element.isWithInput ? 'col-sm-4 mb-5' : 'col-sm-12 mb-5'}>
                            {viewLabel({
                                label: element.label,
                                listIcons: [
                                    element.moreIcon ?
                                        renderIconTooltipObject("help_outlined", true, lang.tooltipHoursAndDays, 'tooltip-icon-label') : {
                                            icon: "",
                                            tooltip: false,
                                        },
                                    renderIconTooltipObject("lock_outlined", true, lang.mandatTooltip, 'tooltip-icon-label')
                                ],
                                labelClass: "label-switch-visits"

                            })}
                            <div className="flex item-center" >
                                <Switch
                                    onChange={() => this.onChangeSwitch(element.onChangeKey)}
                                    checked={element.checked}
                                    className={'ligne-switch mandat'}
                                />
                                <Text text={element.checked ? lang.oui : lang.non} type='' className='ml-2 mb-0 ligne-switch-text' />
                            </div>
                        </div>
                        {element.isWithInput && <div className=' col-sm-8 col-xxl-3'>
                            <MoleculeInput
                                inputLabel={lang.moreInfos}
                                listIcons={[
                                    renderIconTooltipObject("lock_outlined", true, lang.mandatTooltip, 'tooltip-icon-label')
                                ]}
                                inputClassname='input-visits'
                                placeholder={lang.alarmCodeExemple}
                                onchangeInput={(e) => this.onChangeMoreInfos(e)}
                                inputValue={this.state.moreInfos.value}
                            />
                        </div>}
                    </div>)}
                <div className={this.state.hoursAndDaysFixed ? 'row' : 'row mb-4'}>
                    {viewLabel({
                        label: lang.daysOfVisits,
                        listIcons: [
                            renderIconTooltipObject("help_outlined", true, lang.daysOfVisitsTooltip, 'tooltip-icon-label'),
                            renderIconTooltipObject("lock_outlined", true, lang.mandatTooltip, 'tooltip-icon-label')
                        ],
                        labelClass: "label-switch-visits"

                    })}
                    {this.state.hoursAndDaysFixed && this.state.daysOfVisits.map((el, index) =>
                        <div key={index} className='col mb-5 pointer' onClick={() => this.onChangeCheckbox(index)}>
                            <div className='flex item-center checkbox-container-visits  w-100'>
                                <CheckBox
                                    className='visite-check-input'
                                    id={index}
                                    checked={el.isChecked}
                                    checkInput={false}
                                />
                                <span className='pl-2'> {el.label}
                                </span>
                            </div>
                        </div>)}
                </div>
                {this.state.hoursAndDaysFixed &&
                    <div className='row mb-4'>
                        {viewLabel({
                            label: lang.timeInerval,
                            listIcons: [
                                renderIconTooltipObject("lock_outlined", true, lang.mandatTooltip, 'tooltip-icon-label')
                            ],
                            labelClass: "label-switch-visits"

                        })} </div>
                }
                {
                    this.state.visitsDaysHoursLists?.map((el, index) => <div key={index} className='row mb-5 show-clear-button'>
                        {!this.state.hoursAndDaysFixed && <div className='col-sm-3 col-xxl-2'>
                            <Select
                                value={el.day}
                                options={optionsVisitsDays(lang)}
                                onChange={(e) => this.onSelectChange(e, index)}
                            />
                        </div>}
                        <div className='col-sm-4 col-md-3  col-xl-3 col-xxl-2'>
                            <div className='flex item-center'>
                                <span className={this.state.hoursAndDaysFixed ? 'span-visits mr-4' : 'span-visits mr-3'}>{lang.from}</span>
                                <Input
                                    onChange={(e) => this.onChangeDate(e, index, 'start')}
                                    value={el.start} type='time'
                                    className={this.state.hoursAndDaysFixed ? 'default-time-picker width-time-picker' : 'default-time-picker'} />
                            </div>
                        </div>
                        <div className='col-sm-4 col-md-3  col-xl-3 col-xxl-2'>
                            <div className='flex item-center'>
                                <span className={this.state.hoursAndDaysFixed ? 'span-visits mr-4' : 'span-visits mr-3'}>{lang.to}</span>
                                <Input
                                    onChange={(e) => this.onChangeDate(e, index, 'end')}
                                    value={el.end} type='time'
                                    className={`default-time-picker ${this.state.hoursAndDaysFixed ? 'width-time-picker' : ''}`} />
                            </div>
                        </div>
                        {el.withClearIcon && <div className='col-sm-1 col-md-2'>
                            <Icon icon='clear' className='icon-clear-visits pointer' onClick={() => this.removeElementFromList(index)} />
                        </div>}
                    </div>)
                }
                <Button
                    onClick={this.addVisitDaysHoursLine}
                    type='ghost' icon='add'
                    iconClassName='icon-color-visits'
                    text='Ajouter une plage horaire'
                    className='btn-visits' />
            </Collapse>
        </>);
    }
}

export default OrganismVisits;