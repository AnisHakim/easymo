import React, { useEffect, useState } from 'react';
import { Modal, Icon, Text, MoleculeDatePicker, viewLabel, GroupeInput, Button, AddAgent, Spinner, shrinkString, MoleculeInput, isNumber, Table, Pagination, isEmpty, jsonToFormData, formatInputNumber, formatNumber } from "@easymo/designSystem";
import translator from '../../lang/translator';
import moment from 'moment'
import { paginate, renderTableContact } from '../../Common/Common';
import { renderInputObject, setDropDownColorAndText } from '../../data/data';
import { apiGetOffre, apiUpdateStatus } from '../../Api/Properties/properties';
function OrganismeModalStatus(props) {
    const lang = translator('fr')
    const [tabData, setData] = useState([])
    const [allData, setAll] = useState([])
    const [newTabData, setNew] = useState([])
    const [prevStatus, setPrev] = useState({})
    const [errorTable, setError] = useState('')
    const [myContact, setContact] = useState([])
    useEffect(() => {
        allContact(props.contact)
        if (props.currentStatus.value === 'option') { getOffre() }
        setPrev({ ...setDropDownColorAndText(props.prevStatus, lang, props.propertie?.forSale), backgroundColor: `${setDropDownColorAndText(props.prevStatus, lang, props.propertie?.forSale).dropDownColor}19` })
    }, [])
    const allContact = (contact) => {
        setContact([...contact.listAgent, ...contact.listTenant, ...contact.listOwner, ...contact.listBuyer].map(el => { return { value: el._id, label: el.firstName + " " + el.lastName } }))
    }

    useEffect(() => {
        props.subscribe('ADD_CONTACT', (msg, data) => {
            let myData = { value: data._id, label: data.firstName + " " + data.lastName }
            setContact([...myContact, myData])
        })
    }, [])
    const [state, setState] = useState({
        identité: null,
        offreSigné: null,
        details: renderInputObject('', '', false, false),
        prix: renderInputObject('', '', false, false),
        startDate: new Date(),
        contact: renderInputObject([], '', false, false),
    })
    const [page, setPage] = useState(1)
    const getOffre = async () => {
        const response = await apiGetOffre(props.id)
        if (response.statusCode === 200) {
            let data = response.data.map(el => { return { ...el, newprice: el.price ? `${formatNumber(el.price, props.devise, lang.localNumber)}` : `${0} ${props.devise}` } })
            setAll(data)
            setData(paginate(data, 10, page))
        }
    }

    const onChangeDateRange = (start, key) => {
        let newState = { ...state }
        newState[key] = new Date(start)
        newState.isUpdated = true
        setState(newState)
    }
    const onChangeInput = (e, key) => {
        let newState = { ...state }
        if (key === 'prix') {
            if (e.target.value !== '' && isNumber(e.target.value.replaceAll(lang.localeSeparateur, ''))) {
                newState[key].value = formatInputNumber(e.target.value, lang.localNumber)
                newState[key].isInValid = isEmpty(e.target.value)
                newState[key].isValid = !isEmpty(e.target.value)
            } else if (isNumber(e.target.value)) {
                newState[key].value = e.target.value
                newState[key].isInValid = isEmpty(e.target.value)
                newState[key].isValid = !isEmpty(e.target.value)
            }
        } else if (key === 'details') {
            newState[key].value = e.target.value
            newState[key].isInValid = false
            newState[key].isValid = false
        } else {
            newState[key].value = e.target.value
            newState[key].isInValid = isEmpty(e.target.value)
            newState[key].isValid = !isEmpty(e.target.value)
        }
        newState.isUpdated = true
        setState(newState)
    }
    const renderFileName = (fileName, size, key) => {
        return <div className='flex item-center' >
            <Spinner />
            <Icon onClick={() => deleteFile(key)} icon='clear' className='clear-renovation file' />
            <span className='file-name' > {shrinkString(fileName, 17, 6)}({size})</span>

        </div>
    }
    const onUploadFile = (e, key) => {
        let newState = { ...state }
        newState[key] = e.target.files
        setState(newState)
    }
    const deleteFile = (key) => {
        let newState = { ...state }
        newState[key] = []
        setState(newState)
    }
    const onChangeContact = (key, e) => {
        let newState = { ...state }
        newState[key].value = e
        newState[key].isValid = e.length > 0
        newState[key].isInValid = e.length === 0
        newState[key].errorMessage = e.length > 0 ? null : lang.contactError
        newState.isUpdated = true
        setState(newState);
    }
    const hideModal = () => {
        props.onHide()
        setState({
            identité: null,
            offreSigné: null,
            details: renderInputObject('', '', false, false),
            prix: renderInputObject('', '', false, false),
            startDate: new Date(),
            contact: renderInputObject([], '', false, false),
            errorTable: ''
        })
    }
    const changePage = (e) => {
        setPage(e)
        setData(paginate(allData, 10, e))
    }
    const saveStatus = async () => {
        let valid = true

        if (props.currentStatus.value === 'option') {
            if (newTabData.length === 0) {
                setError(lang.addOffreError)
                valid = false
            } else if (newTabData.map(el => el.isAccepted).includes(true) === false) {
                setError(lang.chosirOffreError)
                valid = false
            }
        }

        if ((props.currentStatus.value !== 'suspended' && props.currentStatus.value !== 'lost')) {
            let newState = { ...state }
            if (state.contact.value.length === 0) {
                newState.contact.isInValid = true
                valid = false
            }

            if (isEmpty(state.prix.value)) {
                newState.prix.isInValid = true
                valid = false
            }

            setState(newState)
        }
        let formData = new FormData()
        if (valid) {
            let body = { id: props.id, status: props.currentStatus.value, details: state.details.value }
            if (props.currentStatus.value === 'offer') {
                let offreSignedDetail = null
                let identityCardDetail = null
                if (state?.offreSigné?.length) {
                    offreSignedDetail = {
                        name: state.offreSigné[0]['name'],
                        size: state.offreSigné[0]['size']
                    }
                }
                if (state?.identité?.length) {
                    identityCardDetail = {
                        name: state.identité[0]['name'],
                        size: state.identité[0]['size']
                    }
                }
                body = {
                    ...body,
                    offre: {
                        price: state.prix.value.replaceAll(lang.localeSeparateur, ''),
                        date: state.startDate ? new Date(state.startDate).toString() : null,
                        contact: state.contact.value.map(el => el.value),
                        offreSignedDetail: offreSignedDetail,
                        identityCardDetail: identityCardDetail,
                        isAccepted: false,
                        isRejected: false,
                        isDeleted: false
                    }
                }
            }
            if (props.currentStatus.value === 'option') {
                let compromiseSignedDetail = null
                let bankJustificationDetail = null
                if (state?.offreSigné?.length) {
                    compromiseSignedDetail = {
                        name: state.offreSigné[0]['name'],
                        size: state.offreSigné[0]['size']
                    }
                }
                if (state?.identité?.length) {
                    bankJustificationDetail = {
                        name: state.identité[0]['name'],
                        size: state.identité[0]['size']
                    }
                }
                body = {
                    ...body,
                    offreId: newTabData?.filter(el => el.isAccepted === true)[0]?._id,
                    compromise: {
                        price: state.prix.value.replaceAll(lang.localeSeparateur, ''),
                        date: state.startDate ? new Date(state.startDate).toString() : null,
                        contact: state.contact.value.map(el => el.value),
                        compromiseSignedDetail: compromiseSignedDetail,
                        bankJustificationDetail: bankJustificationDetail,
                    }
                }
            }
            if (props.currentStatus.value === 'sold') {
                let actAuthenticSignedDetail = null
                if (state?.offreSigné?.length) {
                    actAuthenticSignedDetail = {
                        name: state.offreSigné[0]['name'],
                        size: state.offreSigné[0]['size']
                    }
                }
                body = {
                    ...body,
                    actAuthentic: {
                        price: state.prix.value.replaceAll(lang.localeSeparateur, ''),
                        date: state.startDate ? new Date(state.startDate).toString() : null,
                        contact: state.contact.value.map(el => el.value),
                        actAuthenticSignedDetail: actAuthenticSignedDetail
                    },
                }
            }
            if (props.currentStatus.value === 'suspended' || props.currentStatus.value === 'lost') {
                body = {
                    ...body,
                    date: state.startDate
                }
            }
            let formDataresult = jsonToFormData(formData, body)
            if (props.currentStatus.value === 'offer') {
                if (state?.offreSigné?.length) {
                    formDataresult.append('offreSignedFile', state.offreSigné[0])
                }
                if (state?.identité?.length) {
                    formDataresult.append('identityCardFile', state.identité[0])
                }
            }
            if (props.currentStatus.value === 'option') {
                if (state?.offreSigné?.length) {
                    formDataresult.append('compromiseSignedFile', state.offreSigné[0])
                }
                if (state?.identité?.length) {
                    formDataresult.append('bankJustificationFile', state.identité[0])
                }
            }
            if (props.currentStatus.value === 'sold') {
                if (state?.offreSigné?.length) {
                    formDataresult.append('actAuthenticSignedFile', state.offreSigné[0])
                }
            }
            const response = await apiUpdateStatus(formDataresult)
            if (response.statusCode === 200) {
                props.updateFileList()
                props.onHide()
                props.onSave(props.currentStatus.value)
                props.getHistoriqueActivite()
            }
        }
    }
    return <Modal

        show={props.show}
        onHide={hideModal}
        centered={true}
        dialogClassName={`modal-historique status ${props.currentStatus.value === 'option' ? 'option' : ''}`}
        contentClassName={'modal-historique-content'}
    >
        <div className="modal-historique-header" >
            <div className='flex item-center' >
                <Text text={lang.statusMandat} type='h4' />
                <div className='flex item-center status-historique-header pl-1' >
                    (
                    <div className='flex hash-status' style={{ color: prevStatus.dropDownColor, '--background': prevStatus.backgroundColor }}  >
                        <span className='dot-color' style={{ background: prevStatus.dropDownColor }}>
                        </span>
                        {prevStatus.dropDownText}
                    </div>
                    <Icon icon='arrow_forward' />

                    <div className='flex current-status' style={{ color: props.currentStatus.color, '--background': `${props.currentStatus.color}19` }}  >
                        <span className='dot-color' style={{ background: props.currentStatus.color }}>
                        </span>
                        {props.currentStatus.label}
                    </div>
                    )
                </div>
            </div>
            <div className="close-modal-historique-container" >
                <Icon className='close-modal-historique-icon' icon='clear' onClick={props.onHide} />
            </div>
        </div>
        <div className={`status-modal-body ${props.currentStatus.value === 'option' ? 'option-status' : ''}`} >
            {
                props.currentStatus.value === 'option' &&
                <div className='row' >
                    <div className='col mb-5 mandat-date-row modal-status' >
                        {viewLabel({
                            labelClass: 'tab-title-status',
                            label: lang.offreValidé
                        })}
                        <Table
                            acceptOneElement
                            tableClassName="offre-table-status"
                            emptyArrayText={lang.emptyOffreTableText}
                            withAction={false}
                            type="type-2"
                            withBtnAdd={false}
                            listAction={["edit", "duplicate", "delete"]}
                            listCol={[
                                { key: "newprice", name: "Prix", sort: true },
                                { key: "date", name: "Date", sort: true, isDate: true },
                                { key: "contact", name: "Contact", sort: true, type: "array", renderFunction: (e) => renderTableContact(e, lang) },

                            ]}
                            data={tabData}
                            getdata={(e) => {
                                setNew(e)
                                setError('')
                            }}
                        />
                        {
                            allData.length > 10 ?
                                <div className='flex paginaation-status-container' >
                                    <Pagination
                                        containerClassName='status-pagination'
                                        iconNavigation
                                        numberOfPage={Math.ceil(allData.length / 10)}
                                        page={page}
                                        onClick={(e) => changePage(e)}
                                    />
                                </div>
                                :
                                null
                        }
                        {
                            errorTable !== '' &&
                            <div className='flex paginaation-status-container'>
                                <Text text={errorTable} className="input-error-message" />
                            </div>
                        }
                    </div>

                </div>
            }
            <div className="row" >
                <div className="col-sm-6 mb-5 mandat-date-row modal-status relative" >
                    {viewLabel({
                        label: lang.Date
                    })}
                    <MoleculeDatePicker
                        isSingleDate
                        onApply={(start) => onChangeDateRange(start, 'startDate')}
                        start={moment(state.startDate)}
                    />
                </div>
                {
                    (props.currentStatus.value !== 'suspended' && props.currentStatus.value !== 'lost') &&
                    <div className="col-sm-6 mb-5 modal-status" >
                        {viewLabel({
                            label: lang.Prix
                        })}
                        <GroupeInput
                            withSelect={false}
                            onchangeInput={(e) => onChangeInput(e, 'prix')}
                            inputValue={state.prix.value}
                            isValidInput={state.prix.isValid}
                            isInvalidInput={state.prix.isInValid}
                            inputError={state.prix.errorMessage}
                            suffix={props.devise}
                            placeHolderInput='123 456'
                            containerInput="w-100"

                        />
                    </div>
                }
            </div>
            {
                (props.currentStatus.value !== 'suspended' && props.currentStatus.value !== 'lost') &&
                <div className="row mb-5" >
                    <div className={`mandat-date-row modal-status ${props.currentStatus.value === 'option' ? 'col-lg-8' : 'col-12 '}`} >
                        {viewLabel({
                            label: state.contact.value.length > 1 ? lang.Contacts : lang.Contact
                        })}
                        <AddAgent
                            changeModalVisibility={() => props.changeContactVisibility(true)}
                            outsideModal
                            full
                            placeholder={lang.addContact}
                            onChange={(e) => onChangeContact("contact", e)}
                            isInvalid={state.contact.isInValid}
                            isValid={state.contact.isValid}
                            inputError={state.contact.errorMessage}
                            value={state.contact.value}
                            options={myContact}
                        />
                    </div>
                    <div className={` ${props.currentStatus.value === 'option' ? 'col-lg-4 pt-3 baseline-content-col' : 'pt-3'}`} >
                        <Button onClick={() => props.changeContactVisibility(true)} type='secondary' text={lang.createNewContact} icon='user_add' />
                    </div>
                </div>
            }
            {
                (props.currentStatus.value !== 'suspended' && props.currentStatus.value !== 'lost') &&
                <div className="row" >
                    <div className="col-sm-6 mb-5 mandat-date-row modal-status" >
                        {viewLabel({
                            label: props.currentStatus.value === 'option' ? lang.compromisSignee : props.currentStatus.value === 'sold' ? lang.acteAuthentiqueSigne : lang.offreSignée
                        })}
                        {
                            state.offreSigné?.length ?
                                renderFileName(state.offreSigné[0].name, state.offreSigné[0].size, 'offreSigné')
                                :
                                <Button
                                    type='upload'
                                    text={lang.joindreLeDocument}
                                    icon='attachment'
                                    className="upload-compromis"
                                    onChangeFile={(e) => onUploadFile(e, 'offreSigné')}
                                />
                        }
                    </div>
                    {
                        props.currentStatus.value !== 'sold' &&
                        <div className="col-sm-6 mb-5 mandat-date-row modal-status" >
                            {viewLabel({
                                label: props.currentStatus.value === 'option' ? lang.justificatifDeLaBanque : lang.carteIdentité
                            })}
                            {
                                state.identité?.length ?
                                    renderFileName(state.identité[0].name, state.identité[0].size, 'identité')
                                    :
                                    <Button
                                        type='upload'
                                        text={lang.joindreLeDocument}
                                        icon='attachment'
                                        className="upload-compromis"
                                        onChangeFile={(e) => onUploadFile(e, 'identité')}
                                    />}
                        </div>
                    }
                </div>
            }
            <div className='row' >
                <div className='col mb-5 mandat-date-row modal-status' >
                    <MoleculeInput
                        inputLabel={lang.details}
                        placeholder={lang.describeChangement}
                        inputClassname={`input-mandat text-area description ${(props.currentStatus.value === 'suspended' || props.currentStatus.value === 'lost') ? 'h-109' : ''}`}
                        labelTextType='h5'
                        onchangeInput={(e) => onChangeInput(e, 'details')}
                        inputValue={state.details.value}
                        isValid={state.details.isValid}
                        isInvalid={state.details.isInValid}
                        inputError={state.details.errorMessage}
                        as='textarea'
                        rows={2}
                    />
                </div>
            </div>

        </div>
        <div className='flex justify-end border-top-container padding' >
            <Button onClick={hideModal} type='delete' text={lang.cancel} className='mx-1 cancel-btn-modal' />
            <Button onClick={saveStatus} text={lang.Sauvgarder} className='mx-1' />
        </div>
    </Modal>;
}

export default OrganismeModalStatus;
