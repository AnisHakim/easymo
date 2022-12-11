import React, { Component } from 'react';
import { Text, Select, viewLabel, Button, MoleculeInput, MoleculeDatePicker, GroupeInput } from "@easymo/designSystem";
import translator from "../../lang/translator";
import moment from "moment";
const lang = translator('fr')
const performanceList = [
    { value: "A++", label: "A++" },
    { value: "A+", label: "A+" },
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
    { value: "D", label: "D" },
    { value: "E", label: "E" },
    { value: "F", label: "F" },
    { value: "G", label: "G" },
]
export default class OrganismEnergie extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    renderTheoriquePrefix = () => {
        return <div>CO<sub>2</sub>/an</div>
    }
    renderSpeciquePrefix = () => {
        return <div>CO<sub>2</sub>/m².an</div>
    }
    renderButtonText = () => {
        if (this.props.stateAdministratif.energyFileDetails?.name) {
            return this.props.stateAdministratif.energyFileDetails.name
        }
        return lang.joindreLeDocument
    }
    render() {
        return (
            <div>
                <Text text={lang.certificatDePerformance} type="h4" className="energie-header mb-2" />
                <div className='mb-8'>
                    <Button
                        type='upload'
                        text={this.renderButtonText()}
                        icon='attachment'
                        className="upload-compromis"
                        onChangeFile={(e) => this.props.onChangeUploadFile(e)}
                    // valueUpload={this.props.stateAdministratif.energeticPerformance.value}
                    />
                </div>
                <div className='row'>
                    <div className="col-sm-4 mb-5" >
                        <Select
                            inputLabel={lang.performanceEnergetique}
                            labelClassname="energie-input-header"
                            leftIconlClassname="mr-1 drawer-title-icon"
                            className="input-administratif"
                            options={performanceList}
                            placeholder={lang.selectionnerLaNote}
                            onChange={(e) => this.props.onChange(e, "energeticPerformance")}
                            value={this.props.stateAdministratif.energeticPerformance.value}
                        />
                    </div>
                    <div className="col-sm-4 mb-5 mandat-date-row" >
                        {viewLabel({
                            label: lang.dateDuCertificat,
                            labelClass: "energie-input-header"

                        })}
                        <MoleculeDatePicker
                            isSingleDate
                            onApply={(e) => this.props.onChangeDateRange(e, "certificateDate")}
                            start={this.props.stateAdministratif.certificateDate.value ? moment(this.props.stateAdministratif.certificateDate.value) : null}
                        />
                    </div>
                    <div className="col-sm-4 mb-5" >
                        {viewLabel({
                            label: lang.numeroCodeUnique,
                            labelClass: "energie-input-header"
                        })}
                        <MoleculeInput
                            placeholder="123456789"
                            inputClassname={'input-mandat'}
                            labelTextType='h5'
                            onchangeInput={(e) => this.props.onChangeInput(e, 'uniqueCode')}
                            inputValue={this.props.stateAdministratif.uniqueCode.value}
                        />
                    </div>

                </div>
                <div className='row'>
                    <div className="col-sm-4 mb-5 " >
                        {viewLabel({
                            label: lang.consommationTheoriqueEnergie
                        })}
                        <GroupeInput
                            withSelect={false}
                            onchangeInput={(e) => this.props.onChangeInput(e, 'theoricalPrimaryEnergyConsumptionNumber')}
                            inputValue={this.props.stateAdministratif.theoricalPrimaryEnergyConsumptionNumber.value}
                            suffix={'kWh/an'}
                            placeHolderInput='123 456'
                            containerInput="w-100"
                        />
                    </div>
                    <div className="col-sm-4 mb-5" >
                        {viewLabel({
                            label: lang.consommationSpecifiqueEnergie
                        })}
                        <GroupeInput
                            withSelect={false}
                            onchangeInput={(e) => this.props.onChangeInput(e, 'specificPrimaryEnergyConsumptionNumber')}
                            inputValue={this.props.stateAdministratif.specificPrimaryEnergyConsumptionNumber.value}
                            suffix={'kWh/m².an'}
                            placeHolderInput='123'
                            containerInput="w-100"
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className="col-sm-4 mb-5 " >
                        {viewLabel({
                            label: lang.emissionsAnnuellesCO2DuLogement
                        })}
                        <GroupeInput
                            withSelect={false}
                            onchangeInput={(e) => this.props.onChangeInput(e, 'annualHousingCO2EmissionNumber')}
                            inputValue={this.props.stateAdministratif.annualHousingCO2EmissionNumber.value}
                            suffix={this.renderTheoriquePrefix()}
                            placeHolderInput='123 456'
                            containerInput="w-100"
                        />
                    </div>
                    <div className="col-sm-4 mb-5" >
                        {viewLabel({
                            label: lang.emissionsSpecifiqueCO2,
                            labelClass: "specific-emission-label"
                        })}
                        <GroupeInput
                            withSelect={false}
                            onchangeInput={(e) => this.props.onChangeInput(e, 'specificCO2EmissionNumber')}
                            inputValue={this.props.stateAdministratif.specificCO2EmissionNumber.value}
                            suffix={this.renderSpeciquePrefix()}
                            placeHolderInput='123'
                            containerInput="w-100"
                        />
                    </div>
                </div>
            </div>

        );
    }
}
