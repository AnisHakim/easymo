import React, { Component } from 'react'
import { MoleculeInput, AddAgent, GroupeInput, viewLabel, isEmpty, isNumber, formatInputNumber, MoleculeDatePicker, Button } from "@easymo/designSystem";
import translator from "../../lang/translator";
import { objectOffre } from '../../data/data';
import { connect } from "react-redux";
import moment from "moment";
const lang = translator('fr')

class OrganismAddTransaction extends Component {
    constructor(props) {
        super(props)
        this.state = {
            object: { ...objectOffre },
            isUpdated: false,

        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.object != prevState.object) {
            this.props.setData && this.props.setData(this.state.object)
        }
        if (this.props.updateState !== prevProps.updateState) {
            this.setState({
                object: this.props.object
            })
        }
    }
    onChangeTransactionInput = (e, key) => {
        let newState = { ...this.state.object }
        newState.isUpdated = true
        if (isNumber(e.target.value.replaceAll(lang.localeSeparateur, ''))) {
            if (e.target.value !== '') {
                newState[key] = {
                    ...newState[key], value: formatInputNumber(e.target.value, lang.localNumber),
                    errorMessage: "",
                    isValid: (isNumber(e.target.value) && !isEmpty(e.target.value))
                }
            } else {
                newState[key] = {
                    ...newState[key], value: e.target.value,
                    errorMessage: "",
                    isValid: (isNumber(e.target.value) && !isEmpty(e.target.value))
                }
            }
        }
        this.setState({ object: newState })
    }
    onChangeContact = (e) => {
        let newState = { ...this.state.object }
        newState.contact.value = e
        this.setState({ object: newState })
    }
    getContactList = () => {
        if (this.props.contact) {
            let contacts = [...this.props.contact.listAgent, ...this.props.contact.listBuyer, ...this.props.contact.listOwner, ...this.props.contact.listTenant]
            let newList = contacts.map(el => { return { value: el._id, label: el.firstName + " " + el.lastName } })
            return newList
        }
        return null
    }
    onChangeDateRange = (e) => {
        let newState = { ...this.state.object }
        newState.date.value = new Date(e)
        this.setState({ object: newState })
    }
    onUploadFile = (e, key) => {
        let newState = { ...this.state.object }
        newState[key].value = e.target.files
        let fileDetail = {
            name: null,
            size: null,
            isNew: false,
        }
        if (e.target.files.length) {
            fileDetail = {
                name: e.target.files[0].name,
                size: e.target.files[0].size,
                isNew: true,
            }
        }
        newState[key + "Detail"] = fileDetail
        newState.isUpdated = true
        this.setState({ object: newState })
    }
    renderFileText = (label, detail) => {
        if (detail?.name) {
            return detail?.name
        }
        return label

    }
    render() {

        return (
            <div>
                <div className="row mb-2">
                    <div className="col-12 col-sm-6 col-lg-4 ">
                        {viewLabel({
                            label: lang.Prix,
                        })}
                        <GroupeInput
                            withSelect={false}
                            placeHolderInput="123 456"
                            onchangeInput={(e) => this.onChangeTransactionInput(e, "price")}
                            inputValue={this.state.object.price.value}
                            containerInput="w-100"
                            isValidInput={this.state.object.price.isValid}
                            isInvalidInput={this.state.object.price.isInValid}
                            inputError={this.state.object.price.errorMessage}
                        />
                    </div>
                    <div className="col-12 col-sm-6 col-lg-4 mandat-date-row">
                        {viewLabel({
                            label: lang.Date
                        })}
                        <MoleculeDatePicker
                            isSingleDate
                            onApply={(e) => this.onChangeDateRange(e)}
                            start={this.state.object.date.value ? moment(this.state.object.date.value) : this.state.object.date.value}
                        />
                    </div>

                    <div className="col-12 col-sm-6 col-lg-4">
                        <AddAgent
                            selectClassName="transaction-contact-input"
                            placeholder={lang.placeHolderContactText}
                            inputLabel={lang.Contact}
                            value={this.state.object.contact.value}
                            onChange={(e) => this.onChangeContact(e)}
                            options={this.getContactList()}
                            full
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-5">
                        {viewLabel({
                            label: lang.offreSignée,
                        })}
                        <Button
                            type='upload'
                            text={this.renderFileText(lang.joindreLeDocument, this.state.object.offerSignedDetail)}
                            icon='attachment'
                            className="upload-compromis"
                            onChangeFile={(e) => this.onUploadFile(e, 'offerSigned')}
                        />
                    </div>
                    <div className="col-md-6 mb-5">
                        {viewLabel({
                            label: lang.identityCarte,
                        })}
                        <Button
                            type='upload'
                            text={this.renderFileText(lang.joindreLeDocument, this.state.object.identityCardDetail)}
                            icon='attachment'
                            className="upload-compromis"
                            onChangeFile={(e) => this.onUploadFile(e, 'identityCard')}
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