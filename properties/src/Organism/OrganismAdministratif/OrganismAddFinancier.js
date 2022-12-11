import React, { Component } from 'react';
import { MoleculeInput, GroupeInput, viewLabel, isEmpty, isNumber, formatInputNumber } from "@easymo/designSystem";
import translator from "../../lang/translator";
import { financier } from '../../data/data';
const lang = translator('fr')

export default class OrganismAddFinancier extends Component {
    constructor(props) {
        super(props)
        this.state = {
            financier: { ...financier },
            isUpdated: false,
        }

    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.financier != prevState.financier) {
            this.props.setData && this.props.setData(this.state.financier)
        }
        if (this.props.updateState !== prevProps.updateState) {
            this.setState({
                financier: this.props.financier
            })
        }
    }
    onChangeInput = (e, key, type) => {
        let newState = { ...this.state.financier }
        newState.isUpdated = true
        if (type === "number") {
            if (isNumber(e.target.value.replaceAll(lang.localeSeparateur, ''))) {
                if (e.target.value !== '') {
                    newState[key] = {
                        ...newState[key],
                        value: formatInputNumber(e.target.value, lang.localNumber),
                        errorMessage: "",
                        isValid: (isNumber(e.target.value) && !isEmpty(e.target.value))
                    }
                } else {
                    newState[key] = {
                        ...newState[key],
                        value: e.target.value,
                        errorMessage: "",
                        isValid: (isNumber(e.target.value) && !isEmpty(e.target.value))
                    }
                }

            }
        }
        else {
            newState[key] = {
                ...newState[key],
                value: e.target.value,
            }
        }
        this.setState({ financier: newState })
    }
    render() {
        return (
            <div>
                <div className="row mb-5">
                    <div className="col-4">
                        {viewLabel({
                            label: lang.nature,
                            labelClass: "text-capitalize"
                        })}
                        <MoleculeInput
                            placeholder={lang.nature}
                            inputClassname={'input-mandat'}
                            labelTextType='h5'
                            onchangeInput={(e) => this.onChangeInput(e, 'nature')}
                            inputValue={this.state.financier.nature.value}
                        />
                    </div>
                    <div className="col-4">
                        {viewLabel({
                            label: lang.description,
                            labelClass: "text-capitalize"
                        })}
                        <MoleculeInput
                            placeholder={lang.description}
                            inputClassname={'input-mandat'}
                            labelTextType='h5'
                            onchangeInput={(e) => this.onChangeInput(e, 'description')}
                            inputValue={this.state.financier.description.value}
                        />
                    </div>
                    <div className="col-4">
                        {viewLabel({
                            label: lang.cout,
                            labelClass: "text-capitalize"
                        })}
                        <GroupeInput
                            withSelect={false}
                            placeHolderInput="123 456"
                            onchangeInput={(e) => this.onChangeInput(e, 'cost', 'number')}
                            inputValue={this.state.financier.cost.value}
                            containerInput="w-100"
                        />
                    </div>
                </div>
            </div>
        );
    }
}
