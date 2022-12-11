import { Collapse, TransactionNav, Table, Text, GroupeInput, viewLabel, AddAgent, Button, MoleculeDatePicker, jsonToFormData, formatNumber, formatInputNumber, ModalFile } from "@easymo/designSystem";
import translator from "../../lang/translator";
import React, { Component } from 'react'
import { listNav, objectOffre, renderIconTooltipObject, stateTransaction } from "../../data/data";
import { isEmpty, isNumber, isDate } from "@easymo/designSystem";
import { connect } from "react-redux";
import moment from "moment";
import { apiUpdateTransaction } from "../../Api/Properties/properties";
import { renderTableContact, renderFile } from "../../Common/Common";
import OrganismAddTransaction from "./OrganismAddTransaction";

const lang = translator('fr')
class OrganismTransactions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stateTransaction: stateTransaction,
            selectedNavItem: "offres",
            listNavTransactions: listNav(lang),
            tabData: [],
            newTabData: [],
            contactList: [],
            object: { ...objectOffre },
            closeElement: false,
            updateState: false,
            loading: false,
            forceUpdateTable: false,
            isShow: false,
            fileId: null,
        }
    }

    onClickNavItem = (index, key) => {
        let newlist = this.state.listNavTransactions.map(el => { return { ...el, isActive: false } })
        newlist[index].isActive = true
        this.setState({ listNavTransactions: newlist, selectedNavItem: key })
    }
    onChangeTransactionInput = (e, key) => {
        let newState = { ...this.state.stateTransaction }
        newState.isUpdated = true
        if (key.includes("Prix")) {
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
        } else {
            newState[key] = {
                ...newState[key], value: e.target.value,
                isInValid: !isEmpty(e.target.value) ? !isDate(e.target.value) : false,
                isValid: (isDate(e.target.value)),
                errorMessage: ""
            }
        }
        this.setState({ stateTransaction: newState })
    }
    onChangeContact = (key, e) => {
        let newState = { ...this.state.stateTransaction }
        newState.isUpdated = true
        newState[key].value = e
        this.setState({ stateTransaction: newState })
    }
    onUploadFile = (e, key) => {
        let newState = { ...this.state.stateTransaction }
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
        this.setState({ stateTransaction: newState })
    }
    formatData = (propertie = this.props.propertie, detailsListoffres = this.props.propertie.detailsListoffres) => {
        if (propertie) {
            if (detailsListoffres) {
                let newTab = []
                newTab = detailsListoffres.map(el => {
                    return {
                        ...el, newprice: el.price && el.price,
                        isDeleted: el.isDeleted ? el.isDeleted : false,
                        isNew: false,
                        newAdded: false,
                        isEditable: false,
                        isUpdated: false,
                    }
                })
                let tabNav = newTab.filter(el => el.isDeleted === false)
                let newListNav = listNav(lang)
                newListNav[0].number = tabNav.length
                this.setState({
                    tabData: newTab,
                    listNavTransactions: newListNav
                })
            }
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.isPropertieLoaded !== prevProps.isPropertieLoaded) {
            this.formatData()
            this.getTransaction()
        }
        if (prevProps.isCallAPi !== this.props.isCallAPi
            && this.state.stateTransaction.isUpdated
        ) {
            this.updateTransaction()
        }
    }
    returnAllData = () => {
        return [...this.props.contact.listAgent, ...this.props.contact.listBuyer, ...this.props.contact.listOwner, ...this.props.contact.listTenant]
    }
    formatCompromisContact = () => {
        let contact = []
        contact = this.props.propertie.transaction &&
            this.props.propertie.transaction.compromise &&
            this.props.propertie.transaction.compromise.contact.map(el => { return { value: el._id, label: el.firstName + " " + el.lastName } })
        return contact
    }
    formatActeContact = () => {
        let contact = []
        contact = this.props.propertie.transaction &&
            this.props.propertie.transaction.actAuthentic &&
            this.props.propertie.transaction.actAuthentic.contact.map(el => { return { value: el._id, label: el.firstName + " " + el.lastName } })
        return contact
    }
    getTransaction = (transaction = this.props.propertie.transaction) => {
        let newState = { ...this.state.stateTransaction }
        newState.compromisContact.value = this.formatCompromisContact()
        newState.actePrix.value = this.props.propertie.transaction && this.props.propertie.transaction.compromise && formatNumber(this.props.propertie.transaction.actAuthentic.price, null, lang.localNumber)
        newState.acteDate.value = this.props.propertie.transaction && this.props.propertie.transaction.compromise && moment(this.props.propertie.transaction.actAuthentic.date)
        newState.compromisPrix.value = transaction && transaction.compromise && formatNumber(transaction.compromise.price, null, lang.localNumber)
        newState.compromisDate.value = transaction && transaction.compromise && transaction.compromise.date && moment(transaction.compromise.date)
        const arrayDetailcompromiseSignedDetail = []
        if (transaction?.compromise?.compromiseSignedDetail?.name) {
            arrayDetailcompromiseSignedDetail.push(transaction?.compromise?.compromiseSignedDetail?.name)
            arrayDetailcompromiseSignedDetail.push(transaction?.compromise?.compromiseSignedDetail?.type)
        }
        let detailcompromiseSignedDetail = {
            name: arrayDetailcompromiseSignedDetail.length ? arrayDetailcompromiseSignedDetail.join('.') : null,
            size: transaction?.compromise?.compromiseSignedDetail?.size,
            isNew: false,
        }
        newState.compromiseSignedId = transaction?.compromise?.compromiseSigned
        newState.compromisSigneeDetail = detailcompromiseSignedDetail
        const arraybankJustificationDetail = []
        if (transaction?.compromise?.bankJustificationDetail?.name) {
            arraybankJustificationDetail.push(transaction?.compromise?.bankJustificationDetail?.name)
            arraybankJustificationDetail.push(transaction?.compromise?.bankJustificationDetail?.type)
        }

        let detailbankJustificationDetail = {
            name: arraybankJustificationDetail.length ? arraybankJustificationDetail.join('.') : null,
            size: transaction?.compromise?.bankJustificationDetail?.size,
            isNew: false,
        }
        newState.compromisBanqueDetail = detailbankJustificationDetail
        newState.bankJustificationId = transaction?.compromise?.bankJustification
        newState.compromisContact.value = this.formatCompromisContact()
        newState.actePrix.value = transaction && transaction?.actAuthentic && transaction.actAuthentic.price
        newState.acteDate.value = transaction && transaction?.actAuthentic && transaction.actAuthentic.date && moment(transaction.actAuthentic.date)
        newState.acteContact.value = this.formatActeContact()
        const arrayactAuthenticSignedDetail = []
        if (transaction?.actAuthentic?.actAuthenticSignedDetail?.name) {
            arrayactAuthenticSignedDetail.push(transaction?.actAuthentic?.actAuthenticSignedDetail?.name)
            arrayactAuthenticSignedDetail.push(transaction?.actAuthentic?.actAuthenticSignedDetail?.type)
        }
        let detailactAuthenticSignedDetail = {
            name: arrayactAuthenticSignedDetail.length ? arrayactAuthenticSignedDetail.join('.') : null,
            size: transaction?.actAuthentic?.actAuthenticSignedDetail?.size,
            isNew: false,
        }
        newState.acteSigneeDetail = detailactAuthenticSignedDetail
        newState.bankJustificationId = transaction?.actAuthentic?.actAuthenticSigned
        this.setState({
            stateTransaction: newState,
            loading: true
        })
    }
    updateTransaction = async () => {
        let formData = new FormData()
        this.props.onChangeIdentificationError("Transactions", false)
        this.props.setLoader(true)
        const offres = []
        for (let index = 0; index < this.state.newTabData.length; index++) {
            const element = this.state.newTabData[index];
            if (element.isUpdated || element.isNew) {
                let offre = {}
                if (element._id) {
                    offre['id'] = element._id
                }
                offre['date'] = new Date(element.date).toString()
                offre['identityCard'] = element.identityCard
                offre['isAccepted'] = element.isAccepted
                offre['isDeleted'] = element.isDeleted
                offre['isRejected'] = element.isRejected
                offre['offreSigned'] = element.offreSigned
                offre['price'] = element.price && parseInt(element.price.toString())
                offre['contact'] = element.contact.map(el => el._id)
                if (element?.offreSignedDetail?.name) {
                    offre['offreSignedDetail'] = element.offreSignedDetail
                    formData.append("offreSignedFile", element.offreSignedFile[0])
                }
                if (element?.identityCardDetail?.name) {
                    offre['identityCardDetail'] = element.identityCardDetail
                    formData.append("identityCardFile", element.identityCardFile[0])
                }
                offres.push(offre)
            }
        }
        let compromise = {
            "price": this.state?.stateTransaction?.compromisPrix?.value ? this.state?.stateTransaction?.compromisPrix?.value?.toString()?.replaceAll(lang.localeSeparateur, '') : null,
            "date": this.state.stateTransaction.compromisDate.value ? new Date(this.state.stateTransaction.compromisDate.value).toString() : null,
            "contact": this.state.stateTransaction.compromisContact.value.map(el => el.value),
            compromiseSigned: this.state.stateTransaction.compromiseSignedId,
            bankJustification: this.state.stateTransaction.bankJustificationId,
        }
        if (this.state.stateTransaction?.compromisSigneeDetail?.name && this.state.stateTransaction?.compromisSigneeDetail?.isNew) {
            compromise = {
                ...compromise,
                "compromiseSignedDetail": {
                    "name": this.state.stateTransaction?.compromisSigneeDetail?.name,
                    "size": this.state.stateTransaction?.compromisSigneeDetail?.size
                }
            }
            formData.append('compromiseSignedFile', this.state.stateTransaction.compromisSignee.value[0])
        }
        if (this.state.stateTransaction?.compromisBanqueDetail?.name && this.state.stateTransaction?.compromisBanqueDetail?.isNew) {
            compromise = {
                ...compromise,
                "bankJustificationDetail": {
                    "name": this.state.stateTransaction?.compromisBanqueDetail?.name,
                    "size": this.state.stateTransaction?.compromisBanqueDetail?.size
                }
            }
            formData.append('bankJustificationFile', this.state.stateTransaction.compromisBanque.value[0])
        }
        let actAuthentic = {
            "price": this.state?.stateTransaction?.actePrix?.value ? this.state?.stateTransaction?.actePrix?.value?.toString().replaceAll(lang.localeSeparateur, '') : null,
            "date": this.state.stateTransaction.acteDate.value ? new Date(this.state.stateTransaction.acteDate.value).toString() : null,
            "contact": this.state.stateTransaction.acteContact.value.map(el => el.value),
            actAuthenticSigned: this.state.stateTransaction.actAuthenticSignedId
        }
        if (this.state.stateTransaction?.acteSigneeDetail?.name && this.state.stateTransaction?.acteSigneeDetail?.isNew) {
            actAuthentic = {
                ...actAuthentic,
                "actAuthenticSignedDetail": {
                    "name": this.state.stateTransaction?.acteSigneeDetail?.name,
                    "size": this.state.stateTransaction?.acteSigneeDetail?.size
                }
            }
            formData.append('actAuthenticSignedFile', this.state.stateTransaction.acteSignee.value[0])
        }
        const body = {
            'id': this.props.propertie._id,
            'offre': offres,
            "compromise": compromise,
            "actAuthentic": actAuthentic
        }
        const formDataresult = jsonToFormData(formData, body)
        const response = await apiUpdateTransaction(formDataresult)
        if (response.statusCode === 200) {
            this.formatData(this.props.propertie, response.data.detailsListoffres)
            this.getTransaction(response.data.transaction)
            this.props.updateFileList()
            let newState = { ...this.state.stateTransaction }
            newState.isUpdated = false
            this.setState({ stateTransaction: newState })
            this.props.dataUpdated("Transactions")
        } else {
            this.props.setLoader(false)
            this.props.onChangeIdentificationError("Transactions", true)
        }

    }
    renderContact = (e) => {
        return renderTableContact(e, lang)
    }
    setData = (e) => {
        this.setState({ object: e })
    }

    getElementToEdit = (data) => {
        if (data) {
            const object = { ...objectOffre }
            object.price.value = data.price
            object.date.value = moment(data.date)
            object.contact.value = data.contact.map(el => { return { value: el._id, label: el.firstName + " " + el.lastName } })
            object.id = data._id
            object.offerSignedId = data.offreSigned
            object.identityCardId = data.identityCard
            this.setState({
                object: { ...object },
                updateState: !this.state.updateState
            })
        }
        else {
            const object = { ...objectOffre }
            object.price.value = ""
            object.date.value = null
            object.contact.value = []
            object.id = ""
            this.setState({
                object: { ...object },
                updateState: !this.state.updateState
            })
        }
    }
    onSave = (index) => {
        if (!this.state.object.price.value && !this.state.object.date.value && !this.state.object.contact.value.length) {
            this.setState({
                closeElement: !this.state.closeElement,
            })
        }
        else {
            const newData = [...this.state.newTabData]
            const data = {
                price: this.state.object.price.value && this.state.object.price.value.toString().replaceAll(lang.localeSeparateur, ''),
                newprice: this.state.object.price.value && this.state.object.price.value.toString().replaceAll(lang.localeSeparateur, ''),
                offreSignedFile: this.state.object.offerSigned.value,
                identityCardFile: this.state.object.identityCard.value,
                date: this.state.object.date.value ? moment(this.state.object.date.value) : this.state.object.date.value,
                contact: this.state.object.contact.value && this.state.object.contact.value.map(el => { return { _id: el.value, firstName: el.label.split(' ')[0], lastName: el.label.split(' ')[1] } }),
                _id: this.state.object.id,
                offreSigned: this.state.object.offerSignedId,
                identityCard: this.state.object.identityCardId,
                offreSignedDetail: this.state.object.offerSignedDetail,
                identityCardDetail: this.state.object.identityCardDetail,
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
                object: { ...objectOffre },
                tabData: newData
            })
        }
    }
    onAddFile = (e, element, index, key) => {
        if (e.target.files) {
            let list = [...this.state.newTabData]
            list[index][key] = e.target.files
            list[index]["isUpdated"] = true
            const detail = {
                name: e.target.files[0].name,
                size: e.target.files[0].size,
                isNew: true
            }
            list[index][key.replace("File", "Detail")] = detail
            this.setState({
                tabData: list,
                stateTransaction: { ...this.state.stateTransaction, isUpdated: true },
                forceUpdateTable: true,
            })
        }
    }
    renderOffreFile = (file, element, index, key) => {
        return renderFile(file ? file : element[key], { onAdd: (e) => this.onAddFile(e, element, index, key), onOpen: () => this.setIsShow(file) })
    }
    onChangeDateRange = (start, key) => {
        let newData = { ...this.state.stateTransaction }
        newData.isUpdated = true
        newData[key].value = new Date(start)
        this.setState({
            stateTransaction: newData
        })
    }
    renderFileText = (label, detail) => {
        if (detail?.name) {
            return detail?.name
        }
        return label

    }
    setIsShow = (fileId = null) => {
        this.setState({
            isShow: fileId !== null,
            fileId: fileId
        })
    }
    render() {
        return (
            <div>
                {this.state.isShow && <ModalFile
                    show={this.state.isShow}
                    onHide={() => this.setIsShow()}
                    fileId={this.state.fileId}
                />}
                <Collapse title={lang.transaction} iconStart="swap_horizontal">
                    <div className="row">
                        <div className="col-sm-12 mb-7">
                            <TransactionNav listNav={this.state.listNavTransactions} onClickNavItem={(index, key) => this.onClickNavItem(index, key)} />
                        </div>
                    </div>
                    {
                        this.state.selectedNavItem === "compromis" &&
                        <div className="compromis-container">
                            <div className="compromis-header-container">
                                <Text text={lang.compromis} type="h5" className="mb-0 compromis-title" />
                            </div>
                            <div className="compromis-body-container">
                                <div className="row">
                                    <div className="col-md-3 mb-5">
                                        {viewLabel({
                                            label: lang.Prix,
                                        })}
                                        <GroupeInput
                                            withSelect={false}
                                            placeHolderInput="123 456"
                                            onchangeInput={(e) => this.onChangeTransactionInput(e, 'compromisPrix')}
                                            inputValue={this.state.stateTransaction.compromisPrix.value}
                                            containerInput="w-100"
                                            isValidInput={this.state.stateTransaction.compromisPrix.isValid}
                                            isInvalidInput={this.state.stateTransaction.compromisPrix.isInValid}
                                            inputError={this.state.stateTransaction.compromisPrix.errorMessage}
                                        />
                                    </div>
                                    <div className="col-md-3 mb-5 mandat-date-row">
                                        {viewLabel({
                                            label: lang.Date
                                        })}

                                        <MoleculeDatePicker
                                            isSingleDate
                                            onApply={(start) => this.onChangeDateRange(start, 'compromisDate')}
                                            start={this.state.stateTransaction.compromisDate.value ? moment(this.state.stateTransaction.compromisDate.value) : this.state.stateTransaction.compromisDate.value}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <AddAgent placeholder={lang.placeHolderContactText}
                                            inputLabel={lang.Contact}
                                            listIcons={[
                                                renderIconTooltipObject("help_outlined", true, lang.choisirContactExistant, 'tooltip-icon-label')
                                            ]}
                                            selectClassName="transaction-contact-input"
                                            value={this.state.stateTransaction.compromisContact.value}
                                            onChange={(e) => this.onChangeContact("compromisContact", e)}
                                            isInvalid={false}
                                            isValid={false}
                                            inputError={''}
                                            options={this.returnAllData().map(el => { return { value: el._id, label: el.firstName + " " + el.lastName } })}
                                            full
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-5">
                                        {viewLabel({
                                            label: lang.compromisSignee,
                                        })}
                                        <Button
                                            type='upload'
                                            text={this.renderFileText(lang.joindreLeDocument, this.state.stateTransaction.compromisSigneeDetail)}
                                            icon='attachment'
                                            className="upload-compromis"
                                            onChangeFile={(e) => this.onUploadFile(e, 'compromisSignee')}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-5">
                                        {viewLabel({
                                            label: lang.justificatifDeLaBanque,
                                        })}
                                        <Button
                                            type='upload'
                                            text={this.renderFileText(lang.joindreLeDocument, this.state.stateTransaction.compromisBanqueDetail)}
                                            icon='attachment'
                                            className="upload-compromis"
                                            onChangeFile={(e) => this.onUploadFile(e, 'compromisBanque')}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {this.state.selectedNavItem === "acte-authentique" && <div className="compromis-container">
                        <div className="compromis-header-container">
                            <Text text={lang.acteAuthentique} type="h5" className="mb-0 compromis-title" />
                        </div>
                        <div className="compromis-body-container">
                            <div className="row">
                                <div className="col-md-3 mb-5">
                                    {viewLabel({
                                        label: lang.Prix,
                                    })}
                                    <GroupeInput
                                        withSelect={false}
                                        placeHolderInput="123 456"
                                        onchangeInput={(e) => this.onChangeTransactionInput(e, 'actePrix')}
                                        inputValue={this.state.stateTransaction.actePrix.value}
                                        containerInput="w-100"
                                        isValidInput={this.state.stateTransaction.actePrix.isValid}
                                        isInvalidInput={this.state.stateTransaction.actePrix.isInValid}
                                        inputError={this.state.stateTransaction.actePrix.errorMessage}
                                    />
                                </div>
                                <div className="col-md-3 mb-5 mandat-date-row">
                                    {viewLabel({
                                        label: lang.Date
                                    })}

                                    <MoleculeDatePicker
                                        isSingleDate
                                        onApply={(start) => this.onChangeDateRange(start, 'acteDate')}
                                        start={this.state.stateTransaction.acteDate.value ? moment(this.state.stateTransaction.acteDate.value) : this.state.stateTransaction.acteDate.value}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <AddAgent placeholder={lang.placeHolderContactText}
                                        inputLabel={lang.Contact}
                                        listIcons={[
                                            renderIconTooltipObject("help_outlined", true, lang.choisirContactExistant, 'tooltip-icon-label')
                                        ]}
                                        selectClassName="transaction-contact-input"
                                        value={this.state.stateTransaction.acteContact.value}
                                        onChange={(e) => this.onChangeContact("acteContact", e)}
                                        isInvalid={false}
                                        isValid={false}
                                        inputError={''}
                                        options={this.returnAllData().map(el => { return { value: el._id, label: el.firstName + " " + el.lastName } })}
                                        full
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-5">
                                    {viewLabel({
                                        label: lang.acteAuthentiqueSigne,
                                    })}
                                    <Button
                                        type='upload'
                                        text={this.renderFileText(lang.joindreLeDocument, this.state.stateTransaction.acteSigneeDetail)}
                                        icon='attachment'
                                        className="upload-compromis"
                                        onChangeFile={(e) => this.onUploadFile(e, "acteSignee")}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                    <div className={this.state.selectedNavItem !== "offres" ? "diplay-none" : ''}>
                        <Table
                            tableClassName="offre-table"
                            withValidationv
                            actionFirst={false}
                            withAction
                            type="type-2"
                            btnText={lang.ajouterUneOffre}
                            listAction={["edit", "duplicate", "delete"]}
                            listCol={[
                                { key: "newprice", name: "Prix", sort: true, type: "custom", renderFunction: (e, item) => formatNumber(Number(e), this.props.Devise, lang.localNumber) },
                                { key: "date", name: "Date", sort: true, isDate: true },
                                { key: "contact", name: "Contact", sort: true, type: "array", renderFunction: (e) => this.renderContact(e) },
                                {
                                    key: "offreSigned", name: "Offre signée", sort: true, type: "file",
                                    renderFunction: (file, element, index) => this.renderOffreFile(file, element, index, "offreSignedFile")
                                },
                                {
                                    key: "identityCard", name: lang.identityCarte, sort: true, type: "file",
                                    renderFunction: (file, element, index) => this.renderOffreFile(file, element, index, "identityCardFile"), className: "flex justify-center item-center"
                                },
                            ]}
                            editComponent={<OrganismAddTransaction
                                object={this.state.object}
                                setData={(e) => this.setData(e)}
                                updateState={this.state.updateState}
                            />}
                            closeElement={this.state.closeElement}
                            getElementToEdit={this.getElementToEdit}
                            onSave={this.onSave}
                            data={this.state.tabData}
                            getdata={(e) =>
                                this.setState({
                                    newTabData: e, stateTransaction: {
                                        ...this.state.stateTransaction,
                                        forceUpdateTable: false
                                    }
                                })
                            }
                            checkIsUpdated={() => this.setState({ stateTransaction: { ... this.state.stateTransaction, isUpdated: true } })}
                            trAcceptedColor
                            withSizeControl
                            sortAccepted
                            acceptOneElement
                            emptyArrayText={lang.emptyOffreTableText}
                            maxFormContainer
                            nullDuplicateAttribute={['offreSigned', "identityCard", 'offreSignedId', "identityCardId", "offreSignedDetail", "identityCardDetail"]}
                        />
                    </div>

                </Collapse>
            </div>
        )
    }

}
const mapStateToProps = state => ({
    contact: state.contacts
});


export default connect(mapStateToProps, null)(OrganismTransactions)