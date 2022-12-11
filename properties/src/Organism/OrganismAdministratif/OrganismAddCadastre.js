import React, { Component } from 'react'
import { MoleculeInput, GroupeInput, viewLabel, isEmpty, isNumber, formatInputNumber } from "@easymo/designSystem";
import translator from "../../lang/translator";
import { connect } from "react-redux";
import { cadastre } from '../../data/data';
const lang = translator('fr')

class OrganismAddTransaction extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cadastre: { ...cadastre },
            isUpdated: false,
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.cadastre != prevState.cadastre) {
            this.props.setData && this.props.setData(this.state.cadastre)
        }
        if (this.props.updateState !== prevProps.updateState) {
            this.setState({
                cadastre: this.props.cadastre
            })
        }
    }
    onChangeInput = (e, key, type) => {
        let newState = { ...this.state.cadastre }
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
            if (key === 'division' || key === 'matrice') {
                if (isNumber(e.target.value)) {
                    newState[key] = {
                        ...newState[key],
                        value: e.target.value,
                        errorMessage: "",
                        isValid: (isNumber(e.target.value) && !isEmpty(e.target.value))
                    }
                }

            }
            else {
                newState[key] = {
                    ...newState[key],
                    value: e.target.value,
                }
            }
        }
        this.setState({ cadastre: newState })
    }


    render() {
        return (
            <div>
                <div className="row mb-5">
                    <div className="col-3 ">
                        {viewLabel({
                            label: lang.id,
                        })}
                        <MoleculeInput
                            placeholder={lang.id}
                            inputClassname={'input-mandat'}
                            labelTextType='h5'
                            onchangeInput={(e) => this.onChangeInput(e, 'customId')}
                            inputValue={this.state.cadastre.customId.value}
                        />
                    </div>
                    <div className="col-3">
                        {viewLabel({
                            label: lang.division,
                            labelClass: "text-capitalize"
                        })}
                        <MoleculeInput
                            placeholder="123456"
                            inputClassname={'input-mandat'}
                            labelTextType='h5'
                            onchangeInput={(e) => this.onChangeInput(e, 'division')}
                            inputValue={this.state.cadastre.division.value}
                        />
                    </div>

                    <div className="col-3">
                        {viewLabel({
                            label: lang.matrice,
                            labelClass: "text-capitalize"
                        })}
                        <MoleculeInput
                            placeholder="123456"
                            inputClassname={'input-mandat'}
                            labelTextType='h5'
                            onchangeInput={(e) => this.onChangeInput(e, 'matrice')}
                            inputValue={this.state.cadastre.matrice.value}
                        />
                    </div>
                    <div className="col-3">
                        {viewLabel({
                            label: lang.surface,
                            labelClass: "text-capitalize"
                        })}
                        <GroupeInput
                            suffix={'m²'}
                            withSelect={false}
                            placeHolderInput="123 456"
                            onchangeInput={(e) => this.onChangeInput(e, 'surface', 'number')}
                            inputValue={this.state.cadastre.surface.value}
                            containerInput="w-100"

                        />
                    </div>
                </div>
                <div className="row mb-5">
                    <div className="col-3 ">
                        {viewLabel({
                            label: lang.revenu,
                            labelClass: "text-capitalize"
                        })}
                        <GroupeInput
                            withSelect={false}
                            placeHolderInput="123 456"
                            onchangeInput={(e) => this.onChangeInput(e, 'revenu', 'number')}
                            inputValue={this.state.cadastre.revenu.value}
                            containerInput="w-100"
                        />
                    </div>
                    <div className="col-3 ">
                        {viewLabel({
                            label: lang.revenuInd,
                            labelClass: "text-capitalize"
                        })}
                        <GroupeInput
                            withSelect={false}
                            placeHolderInput="123 456"
                            onchangeInput={(e) => this.onChangeInput(e, 'revenuInd', 'number')}
                            inputValue={this.state.cadastre.revenuInd.value}
                            containerInput="w-100"
                        />
                    </div>
                    <div className="col-3 ">
                        {viewLabel({
                            label: lang.precompte,
                            labelClass: "text-capitalize"
                        })}
                        <GroupeInput
                            withSelect={false}
                            placeHolderInput="123 456"
                            onchangeInput={(e) => this.onChangeInput(e, 'preCompte', 'number')}
                            inputValue={this.state.cadastre.preCompte.value}
                            containerInput="w-100"

                        />
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    contact: state.contacts
});
export default connect(mapStateToProps, null)(OrganismAddTransaction)
