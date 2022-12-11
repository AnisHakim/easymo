
import { Switch, Button, Text, MoleculeInput, Select, Collapse, GroupeInput, RadioButton, MoleculeDatePicker, viewLabel, formatInputNumber } from "@easymo/designSystem";
import { useEffect, useState } from "react";
import { comissionType, duréeMandat, optionsWithColor, prixType, renderIconTooltipObject, stateMondat, transactionOption } from "../../data/data";
import moment from 'moment'
import translator from "../../lang/translator";
import OrganismeHistoriqueModal from "../OrganismeHistoriqueModal/OrganismeHistoriqueModal";
import { apiUpdateMandat, apiGetPriceHistoricById } from "../../Api/Properties/properties";
function OrganismeMandat(props) {
    const lang = translator('fr')
    const [state, setState] = useState({ ...stateMondat })
    const [prixAffiche, setAffichePrix] = useState([])
    const [prixSouhaite, setSouhePrix] = useState([])
    const [modal, setModal] = useState({
        showHistoriquePrix: false,
        showHistoriqueStatut: false
    })
    useEffect(() => {
        let newInfo = { ...state }
        newInfo.motifVente.value = props.propertie?.reasonForSale ? props.propertie?.reasonForSale : ''
        newInfo.status.value = props.propertie?.status ? props.propertie?.status : ''
        newInfo.comission.type = props.propertie?.mandat?.commitionPrice ? props.propertie?.mandat?.commitionPrice?.fix : false
        newInfo.comission.value = props.propertie?.mandat?.commitionPrice?.value ? formatInputNumber(props.propertie?.mandat?.commitionPrice.value, lang.localNumber) : ''
        newInfo.mandatRadio = props.propertie?.mandat?.mandat ? props.propertie?.mandat?.mandat : 'exclusif'
        newInfo.startDate = props.propertie?.mandat?.startMandat ? moment(props.propertie?.mandat?.startMandat) : moment()
        newInfo.endDate = props.propertie?.mandat?.endMandat ? moment(props.propertie?.mandat?.endMandat) : null
        newInfo.tva = props.propertie?.mandat ? props.propertie?.mandat.tva : false
        newInfo.enregistrement = props.propertie?.mandat ? props.propertie?.mandat.registrationFees : false
        newInfo.durée.value = props.propertie?.mandat?.mondatDuration ? props.propertie?.mandat.mondatDuration : 'indéterminée'
        newInfo.prix.value = props.propertie?.mandat?.price ? formatInputNumber(props.propertie?.mandat.price.value ? props.propertie?.mandat.price.value : 0, lang.localNumber) : ''
        newInfo.prix.type = props.propertie?.mandat?.price?.fix !== undefined ? props.propertie?.mandat?.price.fix : false
        newInfo.prix.visible = props.propertie?.mandat?.price ? props.propertie?.mandat.price.priceStatus : true
        newInfo.minimumPrix.value = props.propertie?.mandat?.minPrice ? formatInputNumber(props.propertie?.mandat.minPrice, lang.localNumber) : ''
        newInfo.covendeur.value = props.propertie?.mandat?.mandat === 'co-exclusif' ? props.propertie?.mandat.coSeller : ''
        newInfo.concurent.value = props.propertie?.mandat?.mandat === 'simple' ? props.propertie?.mandat.coSeller : ''
        setState(newInfo);
        getHistoric()
    }, [props.isPropertieLoaded])
    useEffect(() => {
        if (props.isMandatUpdated) {
            let newState = { ...state }
            newState.isUpdated = true
            setState(newState);
        }
    }, [props.isMandatUpdated])

    const getHistoric = async () => {
        if (props?.propertie?._id) {
            const response = await apiGetPriceHistoricById(props?.propertie?._id)
            if (response.statusCode === 200) {
                setAffichePrix(response.data?.historicPrice ? response.data?.historicPrice : [])
                setSouhePrix(response.data?.historicMinPrice ? response.data?.historicMinPrice : [])
            }
        }
    }
    const onChangeShowModal = (key, status) => {
        let newModal = { ...modal }
        newModal[key] = status
        setModal(newModal)

    }
    useEffect(() => {
        if (props.isPropertieLoaded) {
            let newState = { ...state }
            newState.isUpdated = true
            setState(newState);
        }
    }, [props.transaction.value])
    useEffect(() => {
        if (props.infoPrice) {
            let newState = { ...state }
            newState.prix.value = props.infoPrice
            setState(newState)
            getHistoric()
        }
    }, [props.infoPrice])
    const changeTransaction = (e) => {
        props.onChangeSelectTransaction(e)
        let newState = { ...state }
        newState.isUpdated = true
        setState(newState);
    }
    useEffect(() => {

    }, [])
    const changeSelectInfoStatus = (e) => {
        if (e?.value !== props?.status?.value) {
            props.onChangeSelectInfoStatus(e)
            let newState = { ...state }
            newState.isUpdated = true
            setState(newState);
        }
    }
    const onCheckMandatRadio = (e) => {
        let newMandat = { ...state }
        newMandat.mandatRadio = e.target.id
        newMandat.covendeur.value = ''
        newMandat.concurent.value = ''
        newMandat.isUpdated = true
        setState(newMandat);
    }
    const onChangeSelectGrp = (e, key) => {
        let newMandat = { ...state }
        newMandat[key].type = e.value
        newMandat.isUpdated = true
        setState(newMandat);

    }
    const onChangeMandatSwitch = (key) => {
        let newMandat = { ...state }
        newMandat[key] = !state[key]
        if (key === 'tva' && state.enregistrement) {
            newMandat.enregistrement = false
        }
        newMandat.isUpdated = true
        setState(newMandat);
    }
    const onChangeSelectMandat = (e, key) => {
        let newMandat = { ...state }
        newMandat[key].value = e.value
        newMandat.isUpdated = true
        if (key === 'durée') {
            if (e.value === 'indéterminée') {
                newMandat.endDate = null
            }
            if (e.value === 'personalized') {
                newMandat.endDate = newMandat.startDate ? moment(newMandat.startDate) : null
            }
            if (e.value === '3') {
                newMandat.endDate = newMandat.startDate ? moment(newMandat.startDate).add(3, 'months') : null
            }
            if (e.value === '6') {
                newMandat.endDate = newMandat.startDate ? moment(newMandat.startDate).add(6, 'months') : null
            }
            if (e.value === '12') {
                newMandat.endDate = newMandat.startDate ? moment(newMandat.startDate).add(1, 'years') : null
            }
        }
        setState(newMandat);
    }
    const onChangeMandaInput = (e, key) => {
        let newMandat = { ...state }
        if (e.target.value !== '' && (key === "prix" || key === "minimumPrix" || key === "comission")) {
            newMandat[key].value = formatInputNumber(e.target.value, lang.localNumber)
        } else {
            newMandat[key].value = e.target.value
        }
        newMandat.isUpdated = true
        setState(newMandat)
    }
    const onChangeDateRange = (start, key, first) => {

        let newMandat = { ...state }
        newMandat[key] = new Date(start)
        if (key === 'startDate') {
            newMandat.endDate = start
        }
        if (key === 'endDate') {
            newMandat.durée.value = 'personalized'
        }
        newMandat.isUpdated = true
        setState(newMandat);
        setFirst(first)
    }
    const onChangeVisible = () => {
        let newMandat = { ...state }
        newMandat.prix.visible = !state.prix.visible
        newMandat.isUpdated = true
        setState(newMandat)
    }
    useEffect(() => {
        state.isUpdated && updateMandat()

    }, [props.isCallAPi])
    const updateMandat = async () => {
        props.onChangeIdentificationError("Mandat", false)

        props.setLoader(true)

        const response = await apiUpdateMandat(JSON.stringify({

            id: props.propertie?._id,
            forSale: props.transaction.value,
            reasonForSale: state.motifVente.value,
            status: props.status.value,
            mandat: state.mandatRadio,
            coSeller: state.mandatRadio === 'co-exclusif' ? state.covendeur.value : state.mandatRadio === 'simple' ? state.concurent.value : '',
            startMandat: new Date(state.startDate),
            endMandat: state.endDate ? new Date(state.endDate) : null,
            mondatDuration: state.durée.value !== 'indéterminée' ? state.durée.value : undefined,
            minPrice: state.minimumPrix.value.replaceAll(lang.localeSeparateur, ''),
            tva: state.tva,
            priceStatus: state.prix.visible,
            registrationFees: state.enregistrement,
            price: {
                value: state.prix.value.replaceAll(lang.localeSeparateur, ''),
                fix: state.prix.type
            },
            commitionPrice: {
                value: state.comission.value.replaceAll(lang.localeSeparateur, ''),
                fix: state.comission.type
            }

        }));
        if (response.statusCode === 200) {
            let newMandat = { ...state }
            newMandat.isUpdated = false
            props.dataUpdated("mandat")
            setState(newMandat)
            getHistoric()
        } else {
            props.setLoader(false)
            props.onChangeIdentificationError("Mandat", true)
        }
    }
    return (
        <>
            <Collapse title={lang.mandat}>
                <div className="row" >
                    <div className="col-sm-6 mb-5" >
                        <Select
                            inputLabel={lang.Transaction}
                            labelClassname="header-select-label mandat"
                            leftIconlClassname="mr-1 drawer-title-icon"
                            className="select-drawer-classname"
                            options={transactionOption(lang)}
                            onChange={changeTransaction}
                            inputError={props.transaction.errorMessage}
                            isValid={props.transaction.isValid}
                            isInvalid={props.transaction.isInValid}
                            value={props.transaction.value}
                        />
                    </div>
                    <div className="col-sm-6 mb-5" >
                        <div className="flex item-center input-mandat-row" >
                        </div>
                        {
                            props.transaction.value &&
                            <MoleculeInput
                                inputLabel={lang.motifVente}
                                listIcons={[
                                    renderIconTooltipObject("lock_outlined", true, lang.mandatTooltip, 'tooltip-icon-label')
                                ]}
                                placeholder={lang.exDivorce}
                                inputClassname={'input-mandat'}
                                labelTextType='h5'
                                onchangeInput={(e) => onChangeMandaInput(e, 'motifVente')}
                                inputValue={state.motifVente.value}
                                isValid={state.motifVente.isValid}
                                isInvalid={state.motifVente.isInValid}
                                inputError={state.motifVente.errorMessage}
                            />}
                    </div>

                </div>
                <div className="row" >
                    <div className="col-sm-6 mb-5" >
                        <Select
                            inputLabel={lang.status}
                            placeholder={lang.seelctStatus}
                            labelClassname="header-select-label mandat"
                            className="select-status-identification-step-two w-100"
                            options={optionsWithColor(props.propertie?.forSale)}
                            optionClassName='option-select-status-identification'
                            onChange={changeSelectInfoStatus}
                            value={props.status.value}
                            inputError={props.status.errorMessage}
                            isValid={props.status.isValid}
                            isInvalid={props.status.isInValid}
                            withDots
                        />
                    </div>
                    <div className="col-sm-6 mb-5 historique-mandat-col with-btn" >
                        {
                            props.propertie?.statusHistoric?.length ?
                                <Button withNotif type='ghost'
                                    notifNumber={props.propertie?.statusHistoric?.length}
                                    text={lang.historiqueStatut} icon='history'
                                    onClick={() => onChangeShowModal('showHistoriqueStatut', true)}
                                /> : null
                        }
                    </div>
                </div>
                <div className="row" >
                    <div className="col-sm-4 mb-5" >
                        <div className="flex item-center input-mandat-row" >
                            {viewLabel({
                                label: lang.mandat, listIcons: [
                                    renderIconTooltipObject("lock_outlined", true, lang.mandatTooltip, 'tooltip-icon-label')
                                ]
                            })}
                        </div>
                        <RadioButton radioContainer='radio-mandat-container' id="exclusif" onCheck={onCheckMandatRadio} radioText={lang.Exclusif}
                            isChecked={state.mandatRadio === 'exclusif'} radioClassName="radio-drawer" name="mandat" />
                    </div>
                    <div className="col-sm-4 mb-5  historique-mandat-col" >
                        <RadioButton radioContainer='radio-mandat-container' id="co-exclusif" onCheck={onCheckMandatRadio} radioText={lang.Coexclusif}
                            isChecked={state.mandatRadio === 'co-exclusif'} radioClassName="radio-drawer" name="mandat" />
                    </div>
                    <div className="col-sm-4 mb-5  historique-mandat-col" >
                        <RadioButton radioContainer='radio-mandat-container' id="simple" onCheck={onCheckMandatRadio} radioText={lang.Simple}
                            isChecked={state.mandatRadio === 'simple'} name="mandat" />
                    </div>
                </div>
                {
                    state.mandatRadio !== 'exclusif' &&
                    <div className="row" >
                        <div className="col-sm-4 mb-5  historique-mandat-col" >
                            <MoleculeInput
                                withIconStart
                                placeholder={lang.expAgence}
                                inputClassname={'input-mandat  w-100'}
                                containerClassName='w-100'
                                labelTextType='h5'
                                onchangeInput={state.mandatRadio === 'co-exclusif' ? (e) => onChangeMandaInput(e, 'covendeur') : (e) => onChangeMandaInput(e, 'concurent')}
                                inputValue={state.mandatRadio === 'co-exclusif' ? state.covendeur.value : state.concurent.value}
                                isValid={state.mandatRadio === 'co-exclusif' ? state.covendeur.isValid : state.concurent.isValid}
                                isInvalid={state.mandatRadio === 'co-exclusif' ? state.covendeur.isInValid : state.concurent.isInValid}
                                inputError={state.mandatRadio === 'co-exclusif' ? state.covendeur.errorMessage : state.concurent.errorMessage}
                                inputLabel={state.mandatRadio === 'co-exclusif' ? lang.coVendeur : lang.vendeurConcurent}
                            />
                        </div>
                    </div>
                }
                <div className="row" >
                    <div className="col-sm-4 mb-5 mandat-date-row" >
                        {viewLabel({
                            label: lang.debutMandat, listIcons: [
                                renderIconTooltipObject("lock_outlined", true, lang.mandatTooltip, 'tooltip-icon-label')
                            ]
                        })}
                        <MoleculeDatePicker
                            isSingleDate
                            onApply={(start) => onChangeDateRange(start, 'startDate')}
                            start={moment(state.startDate)}
                        />
                    </div>
                    <div className="col-sm-4 mb-5" >
                        <Select
                            inputLabel={lang.duréMandat}
                            listIcons={[
                                renderIconTooltipObject("lock_outlined", true, lang.mandatTooltip, 'tooltip-icon-label')
                            ]}
                            leftIconlClassname="mr-1 drawer-title-icon"
                            className="select-drawer-classname"
                            options={duréeMandat(lang)}
                            onChange={(e) => onChangeSelectMandat(e, 'durée')}
                            inputError={state.durée.errorMessage}
                            isValid={state.durée.isValid}
                            isInvalid={state.durée.isInValid}
                            value={state.durée.value}
                        />
                    </div>
                    {
                        state.durée.value !== 'indéterminée' &&
                        <div className="col-sm-4 mb-5 mandat-date-row" >
                            {viewLabel({
                                label: lang.finMandat, listIcons: [
                                    renderIconTooltipObject("lock_outlined", true, lang.mandatTooltip, 'tooltip-icon-label')
                                ]
                            })}
                            <MoleculeDatePicker
                                isSingleDate
                                onApply={(start) => onChangeDateRange(start, 'endDate')}
                                start={state.endDate}
                                minDate={moment(state.startDate).toDate()}
                            />
                        </div>
                    }
                </div>
                <div className="row" >
                    <div className="col-sm-4 mb-5" >
                        {viewLabel({
                            label: lang.prixAffiché,
                            listIcons: [
                                renderIconTooltipObject("help_outlined", true, lang.helpPrix, 'tooltip-icon-label'),
                                {
                                    ...renderIconTooltipObject(state.prix.visible ? 'visible_outlined' : 'hidden_outlined', true, state.prix.visible ? lang.visibleTooltip : lang.hiddenTooltip, 'tooltip-icon-label'),
                                    onClick: onChangeVisible
                                }

                            ]
                        })}
                        <GroupeInput
                            valueSelect={state.prix.type}
                            option={prixType(lang)}
                            onChangeSelect={(e) => onChangeSelectGrp(e, 'prix')}
                            onchangeInput={(e) => { onChangeMandaInput(e, 'prix'); props.onChangePrice(e.target.value); }}
                            inputValue={state.prix.value}
                            isValidInput={state.prix.isValid}
                            isInvalidInput={state.prix.isInValid}
                            inputError={state.prix.errorMessage}
                            inputClassName={'text-left'}
                        />
                    </div>
                    <div className="col-sm-4 mb-5" >
                        {viewLabel({
                            label: lang.minimumPrix,
                            listIcons: [
                                renderIconTooltipObject("help_outlined", true, lang.minimumPrixTooltip, 'tooltip-icon-label'),
                                renderIconTooltipObject("lock_outlined", true, lang.mandatTooltip, 'tooltip-icon-label')

                            ]
                        })}
                        <GroupeInput
                            withSelect={false}
                            onchangeInput={(e) => onChangeMandaInput(e, 'minimumPrix')}
                            inputValue={state.minimumPrix.value}
                            isValidInput={state.minimumPrix.isValid}
                            isInvalidInput={state.minimumPrix.isInValid}
                            inputError={state.minimumPrix.errorMessage}
                            suffix={props.Devise}
                            valueSelect={state.prix.type}

                        />
                    </div>
                    <div className="col-sm-4 mb-5 historique-mandat-col with-btn" >
                        {
                            (prixAffiche.length + prixSouhaite.length) !== 0 ?
                                <Button
                                    notifNumber={prixAffiche.length + prixSouhaite.length}
                                    withNotif={(prixAffiche.length + prixSouhaite.length) ? true : false}
                                    type='ghost' text={lang.historiquePrix} icon='history'
                                    onClick={() => onChangeShowModal('showHistoriquePrix', true)}
                                /> : null
                        }
                    </div>
                </div>
                <div className="row" >
                    <div className="col-sm-4 mb-5" >
                        {viewLabel({
                            label: lang.Commission,
                            listIcons: [
                                renderIconTooltipObject("help_outlined", true, lang.comissionTooltip, 'tooltip-icon-label'),
                                renderIconTooltipObject("lock_outlined", true, lang.mandatTooltip, 'tooltip-icon-label')
                            ]
                        })}
                        <GroupeInput
                            valueSelect={state.comission.type}
                            option={comissionType(lang)}
                            onChangeSelect={(e) => onChangeSelectGrp(e, 'comission')}
                            onchangeInput={(e) => onChangeMandaInput(e, 'comission')}
                            suffix={state.comission.type ? props.Devise : '%'}
                            inputValue={state.comission.value}
                            isValidInput={state.comission.isValid}
                            isInvalidInput={state.comission.isInValid}
                            inputError={state.comission.errorMessage}
                            inputClassName={'text-left'}
                        />
                    </div>
                </div>

                <div className="row" >
                    <div className="col-sm-4 mb-5" >
                        {viewLabel({
                            label: lang.venteTva,
                            labelClass: "header-select-label mandat"

                        })}
                        <div className="flex item-center" >
                            <Switch
                                onChange={() => onChangeMandatSwitch('tva')}
                                checked={state.tva}
                                className={'ligne-switch mandat'}
                            />
                            <Text text={state.tva ? lang.oui : lang.non} type='' className='ml-2 mb-0 ligne-switch-text' />
                        </div>
                    </div>
                    {
                        state.tva &&
                        <div className="col-sm-4 mb-5" >
                            {viewLabel({
                                label: lang.terrainEnregistrement,
                                labelClass: "header-select-label mandat"

                            })}
                            <div className="flex item-center" >
                                <Switch
                                    onChange={() => onChangeMandatSwitch('enregistrement')}
                                    checked={state.enregistrement}
                                    className={'ligne-switch mandat'}
                                />
                                <Text type='' text={state.enregistrement ? lang.oui : lang.non} className='ml-2 mb-0 ligne-switch-text' />
                            </div>
                        </div>
                    }

                </div>
                {
                    modal.showHistoriquePrix &&
                    <OrganismeHistoriqueModal
                        title={lang.historiquePrix}
                        prix
                        prixAffiche={prixAffiche}
                        prixSouhaite={prixSouhaite}
                        devise={props.Devise}
                        show={modal.showHistoriquePrix}
                        onHide={() => onChangeShowModal('showHistoriquePrix', false)}
                        propertie={props.propertie}
                    />
                }
                {
                    modal.showHistoriqueStatut &&
                    <OrganismeHistoriqueModal
                        title={lang.historiqueStatut}
                        devise={props.Devise}
                        data={props.propertie?.statusHistoric}
                        show={modal.showHistoriqueStatut}
                        onHide={() => onChangeShowModal('showHistoriqueStatut', false)}
                        propertie={props.propertie}
                    />
                }
            </Collapse>
        </>
    )
}

export default OrganismeMandat
