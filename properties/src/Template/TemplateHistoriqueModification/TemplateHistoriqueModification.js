import React, { useEffect } from 'react'
import { Modal, Icon, Text, TextIcon, Button, formatNumber, Spinner } from '@easymo/designSystem'
import translator from '../../lang/translator'
import { useState } from 'react'
import { displayLabel, historiqueKey, offreObject, setDropDownColorAndText } from '../../data/data'
import { NavLink } from 'react-router-dom'
import { paginate, renderDateDayMonthYear } from '../../Common/Common'
import { apiGetHistoricModification } from '../../Api/Properties/properties'
import { useSelector } from 'react-redux'
function TemplateHistoriqueModification(props) {
    const PER_PAGE = 6
    const lang = translator('fr')
    const language = 'fr'
    const [history, setHistory] = useState([])
    const contact = useSelector(state => state.contacts)
    const renderAllContact = () => {
        const agentData = contact.listAgent.map(el => { return { value: el._id, label: el.firstName + " " + el.lastName } })
        const ownerData = contact.listOwner.map(el => { return { value: el._id, label: el.firstName + " " + el.lastName } })
        const listAgentUser = contact.listAgentUser.map(el => { return { value: el._id, label: el.firstName + " " + el.lastName } })
        const listBuyer = contact.listBuyer.map(el => { return { value: el._id, label: el.firstName + " " + el.lastName } })
        const listTenant = contact.listTenant.map(el => { return { value: el._id, label: el.firstName + " " + el.lastName } })
        return [...agentData, ...ownerData, ...listAgentUser, ...listBuyer, ...listTenant]
    }
    const renderContactById = (id) => {
        let contact = renderAllContact().filter(element => element.value === id)
        return contact[0].label
    }
    useEffect(async () => {
        const response = await apiGetHistoricModification(props.id)
        setHistory(response.data)
        setIsLoading(false)
    }, [])
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(6)

    const renderSubtitle = (el) => {
        return <Text text={`${lang.laSection} ${displayLabel(el.section, el.section === 'newOffre' ? offreObject() : historiqueKey())} ${lang.estMiseAJour}`} type='' className='second-title-historique mt-10px mb-1' />
    }
    const renderPriceDetails = (oldData, newData) => {
        return <div className='flex mb-2'>
            <Text className='mr-1 by-subtitle normal-txt mb-0' text={lang.prixModifieDe} />
            <div className='flex item-center status-historique-header ' >
                <Text text={oldData ? formatNumber(oldData, props.devise, lang.localNumber, false) : `${0} ${props.devise}`} type='' className='by-subtitle normal-txt fw-600 hash p-0' />
                <Icon icon='arrow_forward' />
                <Text text={newData ? formatNumber(newData, props.devise, lang.localNumber, false) : `${0} ${props.devise}`} type='' className='by-subtitle normal-txt fw-600 p-0' />
                <Text className='mx-1 by-subtitle normal-txt' text={lang.par} />
            </div>
        </div>
    }
    const renderStatusDetails = (el) => {
        let prevColors = { ...setDropDownColorAndText(el.oldData, lang, props.propertie?.forSale), backgroundColor: `${setDropDownColorAndText(el.oldData, lang).dropDownColor}19` }
        let currentColors = { ...setDropDownColorAndText(el.newData, lang, props.propertie?.forSale), backgroundColor: `${setDropDownColorAndText(el.newData, lang).dropDownColor}19` }
        return <div className='flex mb-2'>
            <Text className='mr-1 by-subtitle normal-txt mb-0' text={lang.statusModifieDe} />
            <div className='flex item-center status-historique-header pl-1' >
                <div className='flex hash-status' style={{ color: prevColors.dropDownColor, '--background': prevColors.backgroundColor }}  >
                    <span className='dot-color' style={{ background: prevColors.dropDownColor }}>
                    </span>
                    {prevColors.dropDownText}
                </div>
                <Text className='mx-1 by-subtitle normal-txt' text={lang.à} />
                <div className='flex current-status' style={{ color: currentColors.dropDownColor, '--background': `${currentColors.backgroundColor}` }}  >
                    <span className='dot-color' style={{ background: currentColors.dropDownColor }}>
                    </span>
                    {currentColors.dropDownText}
                </div>
            </div>
        </div>
    }
    const renderIdentifcationDetails = (oldData, newData) => {
        let list = []
        if (oldData?.city !== newData?.city) {
            list.push({ key: lang.ville, old: oldData?.city, new: newData?.city })
        }
        if (oldData?.cityStatus !== newData?.cityStatus) {
            if (oldData?.cityStatus) {
                list.push({ key: lang.villeStatus, old: lang.public, new: lang.private })
            } else {
                list.push({ key: lang.villeStatus, old: lang.private, new: lang.public })
            }
        }
        if (oldData?.country !== newData?.country) {
            list.push({ key: lang.country, old: oldData?.country, new: newData?.country })
        }
        if (oldData?.countryStatus !== newData?.countryStatus) {
            if (oldData?.countryStatus) {
                list.push({ key: lang.countrystatus, old: lang.public, new: lang.private })
            } else {
                list.push({ key: lang.countrystatus, old: lang.private, new: lang.public })
            }
        }
        if (oldData?.number !== newData?.number) {
            list.push({ key: lang.number, old: oldData?.number, new: newData?.number })
        }
        if (oldData?.numberStatus !== newData?.numberStatus) {
            if (oldData?.numberStatus) {
                list.push({ key: lang.numeroStatus, old: lang.public, new: lang.private })
            } else {
                list.push({ key: lang.numeroStatus, old: lang.private, new: lang.public })
            }
        }
        if (oldData?.postalCode !== newData?.postalCode) {
            list.push({ key: lang.code_postal, old: oldData?.postalCode, new: newData?.postalCode })
        }
        if (oldData?.postalCodeStatus !== newData?.postalCodeStatus) {
            if (oldData?.postalCodeStatus) {
                list.push({ key: lang.statusCodePostal, old: lang.public, new: lang.private })
            } else {
                list.push({ key: lang.statusCodePostal, old: lang.private, new: lang.public })
            }
        }
        if (oldData?.street !== newData?.street) {
            list.push({ key: lang.street, old: oldData?.street, new: newData?.street })
        }
        if (oldData?.streetStatus !== newData?.streetStatus) {
            if (oldData?.streetStatus) {
                list.push({ key: lang.statusStreet, old: lang.public, new: lang.private })
            } else {
                list.push({ key: lang.statusStreet, old: lang.private, new: lang.public })
            }
        }
        return list.map((element, index) => <div key={index} className='flex mb-2'>
            <Text className='mr-1 by-subtitle normal-txt mb-0' text={element.key + " " + lang.modifieDe} />
            <div className='flex item-center status-historique-header ' >
                <Text text={element.old} type='' className='by-subtitle normal-txt fw-600 p-0' />
                <Text text={lang.à} type='' className='by-subtitle normal-txt p-0 mx-1' />
                <Text text={element.new} className='by-subtitle normal-txt fw-600 p-0' />
            </div>
        </div>)
    }
    const renderNameDetails = (el) => {
        return <div className='flex mb-2'>
            <Text className='mr-1 by-subtitle normal-txt mb-0' text={lang.leNomDeLaProperite} />
            <div className='flex item-center status-historique-header ' >
                <Text text={el.oldData} type='' className='by-subtitle normal-txt fw-600 p-0' />
                <Text text={lang.à} type='' className='by-subtitle normal-txt p-0 mx-1' />
                <Text text={el.newData} className='by-subtitle normal-txt fw-600 p-0' />
            </div>
        </div>
    }
    const renderCompromiseDetails = (el) => {
        return <div>
            {el.oldData?.price !== el.newData?.price && renderPriceDetails(el.oldData?.price, el.newData?.price)}
            {renderContactTransaction(el)}
        </div>
    }
    const renderContactTransaction = (el) => {
        return <div>
            {
                el.oldData.contact.length && el.newData.contact.length && !onCheckEqualArray(el.oldData.contact, el.newData.contact) ? <div className='flex mb-2 flex-wrap'>
                    <Text className='mr-1 by-subtitle normal-txt mb-0' text={lang.leContact} />
                    <div  >{el.oldData.contact.map((item, i) => renderContact(el, renderContactById(item), i, el.oldData.contact.length))}</div>
                    <Text className='mr-1 by-subtitle normal-txt mb-0' text={lang.misAjour} />
                    <div  >{el.newData.contact.map((item, i) => renderContact(el, renderContactById(item), i, el.newData.contact.length))}</div>
                </div> : null
            }
            {
                !el.oldData?.contact?.length && el.newData?.contact?.length ? <div className='flex mb-2 flex-wrap'>
                    <Text className='mr-1 by-subtitle normal-txt mb-0 w-max' text={lang.leContact} />
                    <div  >{el.newData.contact.map((item, i) => renderContact(el, renderContactById(item), i, el.newData.contact.length))}</div>
                    <Text className='mr-1 by-subtitle normal-txt mb-0 w-max' text={lang.ajouterPar} />
                    {renderContact(el)}
                </div> : null
            }
        </div>
    }
    const renderContact = (el, contacts, i, length) => {
        return <NavLink className={'receiver-name activitie item-center ml-1'} to="#">
            <div className="capitalize item-center w-max" >
                {` ${contacts ? contacts : el.userInfo?.firstName} ${contacts ? i !== length - 1 ? ',' : '' : el.userInfo?.lastName}`}
            </div>
        </NavLink>
    }
    const rendreOffreDetails = (el) => {
        return <div className='flex mb-2 flex-wrap'>
            <Text className='mr-1 by-subtitle normal-txt mb-0 w-max' text={lang.offreSignerDe} />
            <div  >{el.newData.contact.map((item, i) => renderContact(el, renderContactById(item), i, el.newData.contact.length))}</div>
            <Text className='mr-1 by-subtitle normal-txt mb-0 w-max' text={lang.pour} />
            <Text text={el.newData?.price ? formatNumber(el.newData?.price, props.devise, lang.localNumber, false) : `${0} ${props.devise}`} type='' className='by-subtitle normal-txt fw-600 p-0' />
        </div>
    }
    const renderUnderSubTitle = (el) => {
        if (el.section === 'document') {
            return <Text text={`${el.documents.length} ${el.length > 1 ? lang.documentsAjoutesAuDossier : lang.documentAjouteAuDossier}`} type='' className='by-subtitle normal-txt mb-1' />
        }
        if (el.section === 'status') {
            return renderStatusDetails(el)
        }
        if (el.section === "price") {
            return renderPriceDetails(el.oldData?.value, el.newData?.value)
        }
        if (el.section === "compromise" || el.section === "acteAuthentic") {
            return renderCompromiseDetails(el)
        }
        if (el.section === "newOffre") {
            return rendreOffreDetails(el)
        }
        if (el.section === "minPrice") {
            return renderPriceDetails(el.oldData, parseInt(el.newData))
        }
        if (el.section === 'name') {
            return renderNameDetails(el)
        }
        if (el.section === "identification") {
            return renderIdentifcationDetails(el.oldData, el.newData)
        }
    }
    const renderTimeAndUser = (el) => {
        return <div className='flex'>
            <TextIcon containerClassName='justify-flex-start small-txt muted-text' text={renderDateDayMonthYear(el.createdAt, language) + " " + lang.par} iconStart='time' textclassName=' small-txt muted-text ml-1' />
            <Text text={el.userInfo.firstName} type='' className='ml-1  historique-document-name-user mb-0 pointer' />
        </div>
    }
    const renderDocument = (el) => {
        if (el.isStatic) {
            return <div className='mb-4 w-100'>
                {renderSubtitle(el)}
                {renderUnderSubTitle(el)}
                {renderTimeAndUser(el)}
            </div>
        } else {
            return <div className='mb-4 w-100'>
                {renderSubtitle(el)}
                {renderUnderSubTitle(el)}
                {renderTimeAndUser(el)}
            </div>
        }
    }
    const onDisplayData = () => {
        let newPerPage = perPage
        if (perPage >= history.length) {
            newPerPage = perPage > 6 ? perPage - 6 : 6
        } else {
            newPerPage = perPage < history.length ? perPage + 6 : history.length
        }
        setPerPage(newPerPage)
    }
    const onCheckEqualArray = (arr1, arr2) => {
        return arr1.sort().join() === arr2.sort().join()
    }
    return (
        <Modal
            show={props.show}
            onHide={props.onToggleHistoriqueModal}
            centered={true}
            dialogClassName={'modal-historique-modification'}
            contentClassName={'modal-historique-modification-container'}
        >
            <>
                <div className="modal-historique-modification-header mb-4" >
                    <Text text={lang.historiqueDesModifications} type='h4' />
                    <div className="close-modal-historique-container" >
                        <Icon className='close-modal-historique-icon' icon='clear' onClick={props.onToggleHistoriqueModal} />
                    </div>
                </div>
                <div className={`${isLoading ? 'flex justify-center item-center' : ''} modal-historique-modification-body`}>
                    {isLoading ? <Spinner /> : null}
                    {
                        paginate(history, perPage, page).map((el, i) => <div key={i} className="flex over-hidden h-auto" >
                            <div className=''>
                                <span className="color-activitie-point" >
                                    <span className={"point dark-blue-point"}  >
                                    </span>
                                </span>
                                <div className="left-icon-border h-100" ></div>
                            </div>
                            {renderDocument(el)}
                        </div>
                        )}
                </div>
            </>
            <div className='pl-3'>
                <div className='modal-historique-modification-divider pb-4'></div>
            </div>
            {PER_PAGE < history.length && <Button onClick={onDisplayData} type="third" text={perPage < history.length ? lang.afficherPlus : lang.afficherMoins} icon='chevron_up' containerClassName="w-100 pb-3 pr-3 pl-5" className="afficher-plus w-100" />}

        </Modal>
    )
}

export default TemplateHistoriqueModification