import React, { Component } from 'react';
import { Select, viewLabel, MoleculeDatePicker, RadioInput, InputCustom, MoleculeInput } from "@easymo/designSystem";
import translator from "../../lang/translator";
import { floodRisk, renderRadioList, urbanAllocation } from '../../data/data';
const lang = translator('fr')
import moment from "moment";

export default class OrganismJuridique extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <div className='row mb-4'>
                    <div className="col-sm-4 mb-5 mandat-date-row" >
                        {viewLabel({
                            label: lang.dateConstruction,
                            labelClass: "energie-input-header"

                        })}
                        <MoleculeDatePicker
                            isSingleDate
                            onApply={(e) => this.props.onChangeDateRange(e, "constructionDate")}
                            start={this.props.stateAdministratif.constructionDate.value ? moment(this.props.stateAdministratif.constructionDate.value) : null}
                        />
                    </div>
                    <div className="col-sm-4 mb-5" >
                        <Select
                            inputLabel={lang.affectationUrbanistique}
                            labelClassname="energie-input-header"
                            leftIconlClassname="mr-1 drawer-title-icon"
                            className="input-administratif"
                            options={urbanAllocation(lang)}
                            placeholder={lang.selectionnerLaNote}
                            onChange={(e) => this.props.onChange(e, "urbanAffectation")}
                            value={this.props.stateAdministratif.urbanAffectation.value}
                        />
                    </div>

                    <div className="col-sm-4 mb-5" >
                        <Select
                            inputLabel={lang.risqueDinondation}
                            labelClassname="energie-input-header"
                            leftIconlClassname="mr-1 drawer-title-icon"
                            className="input-administratif"
                            options={floodRisk(lang)}
                            placeholder={lang.selectionnerLaNote}
                            onChange={(e) => this.props.onChange(e, "inindationRisque")}
                            value={this.props.stateAdministratif.inindationRisque.value}
                        />
                    </div>

                </div>
                <div className='row'>
                    <div className="col-sm-6 mb-6">
                        <div className='flex'>
                            <RadioInput
                                label={lang.permisDeConstruire}
                                radioList={renderRadioList(lang, "buildingLicense")}
                                getData={(data) => this.props.getData(data, "buildingLicense")}
                                value={this.props.stateAdministratif.buildingLicense}
                            />
                        </div>
                    </div>
                    <div className="col-sm-6 mb-6">
                        <div className='flex'>
                            <RadioInput
                                label={lang.permisDeLotir}
                                radioList={renderRadioList(lang, "PermisDeLotir")}
                                getData={(data) => this.props.getData(data, "subdivisionLicense")}
                                value={this.props.stateAdministratif.subdivisionLicense}
                            />
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-sm-6 mb-6">
                        <div className='flex'>
                            <RadioInput
                                label={lang.professionLiberalePossible}
                                radioList={renderRadioList(lang, "possibleProfession")}
                                getData={(data) => this.props.getData(data, "possibleProfession")}
                                value={this.props.stateAdministratif.possibleProfession}
                            />
                        </div>
                    </div>
                    <div className="col-sm-6 mb-6">
                        <div className='flex'>
                            <RadioInput label={lang.infractionUrbanistique}
                                radioList={renderRadioList(lang, "urbanInfraction")}
                                getData={(data) => this.props.getData(data, "urbanInfraction")}
                                value={this.props.stateAdministratif.urbanInfraction}
                            />
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-sm-6 mb-6">
                        <div className='flex'>
                            <RadioInput label={lang.declareInhabitableOuInsalubre}
                                radioList={renderRadioList(lang, "declaredUninhabitable")}
                                getData={(data) => this.props.getData(data, "declaredUninhabitable")}
                                value={this.props.stateAdministratif.declaredUninhabitable}
                            />
                        </div>
                    </div>
                    <div className="col-sm-6 mb-6">
                        <div className='flex'>
                            <RadioInput label={lang.droitDePremption}
                                radioList={renderRadioList(lang, "rightOfFirstRefusal")}
                                getData={(data) => this.props.getData(data, "rightOfFirstRefusal")}
                                value={this.props.stateAdministratif.rightOfFirstRefusal}
                            />
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-sm-6 mb-6">
                        <div className='flex'>
                            <RadioInput label={lang.droitDePreference}
                                radioList={renderRadioList(lang, "rightOfPreference")}
                                getData={(data) => this.props.getData(data, "rightOfPreference")}
                                value={this.props.stateAdministratif.rightOfPreference}
                            />
                        </div>
                    </div>
                    <div className="col-sm-6 mb-6">
                        <div className='flex'>
                            <RadioInput label={lang.planExpropriation}
                                radioList={renderRadioList(lang, "expropriationPlan")}
                                getData={(data) => this.props.getData(data, "expropriationPlan")}
                                value={this.props.stateAdministratif.expropriationPlan}
                            />
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-sm-6 mb-6">
                        <div className='flex'>
                            <RadioInput label={lang.siteActiviteInexploite}
                                radioList={renderRadioList(lang, "untappedActivitySite")}
                                getData={(data) => this.props.getData(data, "untappedActivitySite")}
                                value={this.props.stateAdministratif.untappedActivitySite}
                            />
                        </div>
                    </div>
                    <div className="col-sm-6 mb-6">
                        <div className='flex'>
                            <RadioInput label={lang.batimentClasse}
                                radioList={renderRadioList(lang, "buildingClass")}
                                getData={(data) => this.props.getData(data, "buildingClass")}
                                value={this.props.stateAdministratif.buildingClass}
                            />
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-sm-6 mb-6">
                        <div className='flex'>
                            <RadioInput label={lang.Servitude}
                                radioList={renderRadioList(lang, "Servitude")}
                                getData={(data) => this.props.getData(data, "Servitude")}
                                value={this.props.stateAdministratif.Servitude}
                            />
                        </div>
                    </div>
                    <div className="col-sm-6 mb-6">
                        <div className='flex'>
                            <RadioInput label={lang.jugementEnCours}
                                radioList={renderRadioList(lang, "JudgmentInProgress")}
                                getData={(data) => this.props.getData(data, "JudgmentInProgress")}
                                value={this.props.stateAdministratif.JudgmentInProgress}
                            />
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-sm-6 mb-6">
                        <div className='flex'>
                            <RadioInput label={lang.certificatUrbanisme}
                                radioList={renderRadioList(lang, "townPlanningCertificate")}
                                getData={(data) => this.props.getData(data, "townPlanningCertificate")}
                                value={this.props.stateAdministratif.townPlanningCertificate}
                            />
                        </div>
                    </div>
                </div>
                <div className="row" >
                    <div className="col-sm-6 mb-6" >
                        <MoleculeInput
                            inputLabel={lang.autresMentionslegales}
                            placeholder=""
                            inputClassname='adminitratif-text-area'
                            onchangeInput={(e) => this.props.onChangeInput(e, 'legalNotice')}
                            inputValue={this.props.stateAdministratif.legalNotice.value}
                            as='textarea'
                        />
                    </div>
                </div>
            </div >

        );
    }
}
