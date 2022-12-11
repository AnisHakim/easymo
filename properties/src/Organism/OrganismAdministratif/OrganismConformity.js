import React, { Component } from 'react';
import { RadioInput } from "@easymo/designSystem";
import { renderRadioList, renderRadioList5 } from '../../data/data';
import translator from "../../lang/translator";
const lang = translator('fr')
export default class OrganismConformity extends Component {
    render() {
        return (
            <div>
                <div className='row'>
                    <div className="col-sm-6 mb-6">
                        <div className='flex'>
                            <RadioInput
                                label={lang.Electricity}
                                radioList={renderRadioList5(lang, 'electricity')}
                                getData={(data) => this.props.getData(data, "electricity")}
                                value={this.props.stateAdministratif.electricity}
                            />
                        </div>
                    </div>
                    <div className="col-sm-6 mb-6">
                        <div className='flex'>
                            <RadioInput label={lang.Gaz}
                                radioList={renderRadioList5(lang, 'gaz')}
                                getData={(data) => this.props.getData(data, "gaz")}
                                value={this.props.stateAdministratif.gaz}
                            />
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-sm-6 mb-6">
                        <div className='flex'>
                            <RadioInput
                                label={lang.Eau}
                                radioList={renderRadioList(lang, 'eau')}
                                getData={(data) => this.props.getData(data, "eau")}
                                value={this.props.stateAdministratif.eau}
                            />
                        </div>
                    </div>
                    <div className="col-sm-6 mb-6">
                        <div className='flex'>
                            <RadioInput label={lang.Fluxys}
                                radioList={renderRadioList(lang, 'fluxys')}
                                getData={(data) => this.props.getData(data, "fluxys")}
                                value={this.props.stateAdministratif.fluxys}
                            />
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-sm-6 mb-6">
                        <div className='flex'>
                            <RadioInput
                                label={lang.attestatioDeSol}
                                radioList={renderRadioList(lang, 'solCertificat')}
                                getData={(data) => this.props.getData(data, "solCertificat")}
                                value={this.props.stateAdministratif.solCertificat}
                            />
                        </div>
                    </div>
                    <div className="col-sm-6 mb-6">
                        <div className='flex'>
                            <RadioInput label={lang.rapportAsBuilt}
                                radioList={renderRadioList(lang, 'rapportAsBuilt')}
                                getData={(data) => this.props.getData(data, "rapportAsBuilt")}
                                value={this.props.stateAdministratif.rapportAsBuilt}
                            />
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-sm-6 mb-6">
                        <div className='flex'>
                            <RadioInput
                                label={lang.oilTankCertificate}
                                radioList={renderRadioList(lang, 'oilTankCertificate')}
                                getData={(data) => this.props.getData(data, "oilTankCertificate")}
                                value={this.props.stateAdministratif.oilTankCertificate}
                            />
                        </div>
                    </div>
                    <div className="col-sm-6 mb-6">
                        <div className='flex'>
                            <RadioInput label={lang.attestationCiterneGaz}
                                radioList={renderRadioList(lang, 'gasTankCertificate')}
                                getData={(data) => this.props.getData(data, "gasTankCertificate")}
                                value={this.props.stateAdministratif.gasTankCertificate}
                            />
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-sm-6 mb-6">
                        <div className='flex'>
                            <RadioInput
                                label={lang.Ascenseur}
                                radioList={renderRadioList(lang, 'lift')}
                                getData={(data) => this.props.getData(data, "lift")}
                                value={this.props.stateAdministratif.lift}
                            />
                        </div>
                    </div>
                    <div className="col-sm-6 mb-6">
                        <div className='flex'>
                            <RadioInput
                                label={lang.Incendie}
                                radioList={renderRadioList(lang, 'fire')}
                                getData={(data) => this.props.getData(data, "fire")}
                                value={this.props.stateAdministratif.fire}
                            />
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-sm-6 mb-6">
                        <div className='flex'>
                            <RadioInput
                                label={lang.declarationEnvironnementale}
                                radioList={renderRadioList(lang, 'environmentalDeclaration')}
                                getData={(data) => this.props.getData(data, "environmentalDeclaration")}
                                value={this.props.stateAdministratif.environmentalDeclaration}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
