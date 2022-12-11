import React from 'react'
import { Modal, Icon, Text, TextIcon, Pagination, formatNumber } from '@easymo/designSystem'
import translator from '../../lang/translator'
import { useState } from 'react'
import { displayLabel, historiqueKey, optionsWithColor, setDropDownColorAndText } from '../../data/data'
import { NavLink } from 'react-router-dom'
import { paginate, renderDateDayMonthYear, renderPrice } from '../../Common/Common'
import { useSelector } from 'react-redux'
function TemplateModalHistoriqueActivite(props) {
  const lang = translator('fr')
  const language = 'fr'
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
  const [history, setHistory] = useState([
    { title: 'sold', status: 'sold', to: { firstName: 'josephine', lastName: 'Marcelle', _id: '5456df4g56' }, price: 279000, document: [{ path: '', name: 'Acte-de-vente.pdf' }], date: new Date() },
    { title: 'receivedOffer', number: 8, to: { firstName: 'josephine', lastName: 'Marcelle', _id: '5456df4g56' }, price: 279000, document: [{ path: '', name: 'Acte-de-vente.pdf' }, { path: '', name: ' carte-identite.pdf' }], date: new Date() },
    { title: 'phoneMeeting', to: { firstName: 'josephine', lastName: 'Marcelle', _id: '5456df4g56' }, date: new Date(), details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac ornare ante, vitae congue nulla. Curabitur et molestie mauris, placerat lacinia nibh...' },
    { title: 'onLine', to: { firstName: 'julien', lastName: 'bobo', _id: '5456ddfgf4g56' }, networks: ['Facebook', 'Site web'], date: new Date() },
    { title: 'phoneMeeting', to: { firstName: 'josephine', lastName: 'Marcelle', _id: '5456df4g56' }, date: new Date(), details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac ornare ante, vitae congue nulla. Curabitur et molestie mauris, placerat lacinia nibh...' },
    { title: 'receivedOffer', number: 8, to: { firstName: 'josephine', lastName: 'Marcelle', _id: '5456df4g56' }, price: 279000, document: [{ path: '', name: 'Acte-de-vente.pdf' }, { path: '', name: ' carte-identite.pdf' }], date: new Date() },
    { title: 'sold', status: 'sold', to: { firstName: 'josephine', lastName: 'Marcelle', _id: '5456df4g56' }, price: 279000, document: [{ path: '', name: 'Acte-de-vente.pdf' }], date: new Date() },
    { title: 'onLine', to: { firstName: 'julien', lastName: 'bobo', _id: '5456ddfgf4g56' }, networks: ['Facebook', 'Site web'], date: new Date() },
  ])
  const renderSubtitle = (title) => {
    if (title === 'sold') {
      return lang.bienEte
    }
    if (title === 'receivedOffer') {
      return lang.achatSignee
    }
    if (title === 'phoneMeeting') {
      return lang.consigne
    }
    if (title === 'onLine') {
      return lang.misJourPar
    }
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
        <Text className='mx-1 by-subtitle normal-txt' text={lang.par} />
        {renderContact(el)}
      </div>
    </div>
  }
  const renderContact = (el, contacts, i, length) => {
    return <NavLink className={'receiver-name activitie item-center ml-1'} to="#">
      <div className="capitalize item-center w-max" >
        {` ${contacts ? contacts : el.userInfo?.firstName} ${contacts ? i !== length - 1 ? ',' : '' : el.userInfo?.lastName}`}
      </div>
    </NavLink>
  }
  const renderPriceDetails = (el, price) => {
    return <div className='flex mb-2'>
      <Text className='mr-1 by-subtitle normal-txt mb-0' text={lang.prixModifieDe} />
      <div className='flex item-center status-historique-header ' >
        {
          price ?
            <Text text={el.oldData?.price ? formatNumber(el.oldData?.price, props.devise, lang.localNumber, false) : `${0} ${props.devise}`} type='' className='by-subtitle normal-txt fw-600 p-0' />
            :
            <Text text={el.oldData?.value ? formatNumber(el.oldData?.value, props.devise, lang.localNumber, false) : `${0} ${props.devise}`} type='' className='by-subtitle normal-txt fw-600 p-0' />
        }
        <Icon icon='arrow_forward' />
        {
          price ?
            <Text text={el.newData?.price ? formatNumber(el.newData?.price, props.devise, lang.localNumber, false) : `${0} ${props.devise}`} type='' className='by-subtitle normal-txt fw-600 p-0' />
            :
            <Text text={el.newData?.value ? formatNumber(el.newData?.value, props.devise, lang.localNumber, false) : `${0} ${props.devise}`} type='' className='by-subtitle normal-txt fw-600 p-0' />
        }
        <Text className='mx-1 by-subtitle normal-txt' text={lang.par} />
        {renderContact(el)}
      </div>
    </div>
  }
  const onCheckEqualArray = (arr1, arr2) => {
    return arr1.sort().join() === arr2.sort().join()
  }
  const renderContactTransaction = (el) => {
    return <div >
      {
        el.oldData.contact.length && el.newData.contact.length && !onCheckEqualArray(el.oldData.contact, el.newData.contact) ? <div className='flex mb-2 flex-wrap'>
          <Text className='mr-1 by-subtitle normal-txt mb-0' text={lang.leContact} />
          <div className='flex' >{el.oldData.contact.map((item, i) => renderContact(el, renderContactById(item), i, el.oldData.contact.length))}</div>
          <Text className='mr-1 by-subtitle normal-txt mb-0' text={lang.misAjour} />
          <div className='flex' >{el.newData.contact.map((item, i) => renderContact(el, renderContactById(item), i, el.newData.contact.length))}</div>
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

  const renderCompromise = (el) => {
    return <div>
      {el.oldData?.price !== el.newData?.price && renderPriceDetails(el, true)}
      {renderContactTransaction(el)}
    </div>
  }
  const rendreOffreDetails = (el) => {
    return <div className='flex mb-2 flex-wrap'>
      <Text className='mr-1 by-subtitle normal-txt mb-0 w-max' text={lang.offreSignerDe} />
      <div  >{el.newData.contact.map((item, i) => renderContact(el, renderContactById(item), i, el.newData.contact.length))}</div>
      <Text className='mr-1 by-subtitle normal-txt mb-0 w-max' text={lang.pour} />
      <Text text={el.newData?.price ? formatNumber(el.newData?.price, props.devise, lang.localNumber, false) : `${0} ${props.devise}`} type='' className='by-subtitle normal-txt fw-600 p-0' />

    </div>
  }
  const renderDetails = (el) => {
    return <div>
      <div className="flex item-center" >
        <Text text={`${displayLabel(el.section, historiqueKey())} ${el.section === 'receivedOffer' ? '#' + el.number : ''}`} className='second-title-historique mt-10px mb-1' type='h5' />
      </div>
      {
        el.isStatic ?
          <div className='flex mb-1' >
            <Text text={lang.bienAjour} type='' className='by-subtitle normal-txt' />
            {renderContact(el)}
          </div>
          :
          <>
            <div className='flex mb-1' >
              <Text text={renderSubtitle(el.section)} type='' className='by-subtitle normal-txt' />
              {
                el.section === 'status' ?
                  renderStatusDetails(el) :
                  el.section === 'price' ?
                    renderPriceDetails(el) :
                    el.section === 'compromise' || el.section === 'acteAuthentic' ?
                      renderCompromise(el) :
                      rendreOffreDetails(el)
              }
            </div>
          </>
      }
      <TextIcon containerClassName='mb-4 justify-flex-start small-txt muted-text' text={renderDateDayMonthYear(el.updatedAt, language)} iconStart='time' textclassName=' small-txt muted-text ml-1' />
    </div>
  }
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      centered={true}
      dialogClassName={'modal-activitie'}
      contentClassName={'modal-historique-content'}
    >
      <>
        <div className="modal-historique-header mb-4" >
          <Text text={lang.historiqueActivite} type='h4' />
          <div className="close-modal-historique-container" >
            <Icon className='close-modal-historique-icon' icon='clear' onClick={props.onHide} />
          </div>
        </div>
        {
          props.activitieHistorique.data.map((el, i) => <div key={i} className="flex over-hidden h-auto mx-4" >
            <div className=''>
              <span className="color-activitie-point" >
                <span className={"point dark-blue-point"}  >
                </span>
              </span>
              <div className="left-icon-border h-100" ></div>
            </div>
            {renderDetails(el)}
          </div>
          )}
      </>
      <Pagination
        containerClassName='status-pagination'
        iconNavigation
        numberOfPage={Math.ceil(props.activitieHistorique.length / props.activitieHistoriquePages.perPage)}
        page={props.activitieHistoriquePages.page}
        onClick={(e) => props.setActivitiesPage(e)}
      />
    </Modal>
  )
}

export default TemplateModalHistoriqueActivite