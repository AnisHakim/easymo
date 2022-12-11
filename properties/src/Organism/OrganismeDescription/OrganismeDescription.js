import { Switch, Button, Text, MoleculeInput, Select, Collapse, GroupeInput, RadioButton, isNumber, viewLabel, Tooltip, InputCustom, MoleculeDatePicker, AddAgent, Icon, formatInputNumber } from "@easymo/designSystem";
import { useEffect, useState } from "react";
import { optionsWithIconOrientation, propertiesType, renderIconTooltipObject, renderInputObject, sousCategoriOptions, stateDescription } from "../../data/data";
import translator from "../../lang/translator";
import { useSelector } from 'react-redux'
import moment from "moment";
import { apiUpdateDescription } from "../../Api/Properties/properties";
function OrganismeDescription(props) {
    const lang = translator('fr')
    const language = 'fr'
    const [state, setState] = useState({ ...stateDescription })
    const [isChecked, setCheked] = useState({
        renové: false,
        enCours: false
    })
    const [etatGeneral, setEtat] = useState('new')
    const [renovationDetail, setDetails] = useState([{
        renovationDate: renderInputObject('', '', false, false),
        renovationDetails: renderInputObject('', '', false, false),
    }])
    let typeOption = propertiesType(lang)
    typeOption.shift()
    const contact = useSelector((state) => state.contacts)
    const onChangeSelectInfo = (e, key) => {
        let newState = { ...state }
        newState[key].value = e.value
        newState.isUpdated = true
        setState(newState);
    }
    const onAddRenovation = () => {
        let newState = { ...state }

        const list = [...renovationDetail]
        list.push({
            renovationDate: renderInputObject('', '', false, false),
            renovationDetails: renderInputObject('', '', false, false),
        })
        newState.isUpdated = true
        setDetails(list);
        setState(newState);

    }
    const removeRenovation = (index) => {
        let newState = { ...state }
        const list = [...renovationDetail]
        let newList = list.filter((el, i) => i !== index)
        newState.isUpdated = true
        setState(newState);
        setDetails(newList);
    }
    const onCheckRadio = (e) => {
        let newState = { ...state }
        setEtat(e.target.id)
        newState.isUpdated = true
        setState(newState);
    }
    const onChangeListArchitect = (key, e) => {
        let newState = { ...state }
        newState[key].value = e
        newState[key].isValid = e.length > 0
        newState[key].isInValid = e.length === 0
        newState[key].errorMessage = e.length > 0 ? null : lang.architectError
        newState.isUpdated = true
        setState(newState);
    }
    const onClickCounter = (key, instruction) => {
        let newState = { ...state }
        if (instruction === 'add') {
            newState[key].value = Number(state[key].value) + 1
        } else {
            if (state[key].value > 2) {
                newState[key].value = Number(state[key].value) - 1
            }
        }
        newState.isUpdated = true
        setState(newState);
    }
    const onChangeInput = (e, key, index, key2) => {
        let newState = { ...state }
        if (index != undefined) {
            let details = [...renovationDetail]
            details[index][key2]['value'] = e.target.value
            setDetails(details)
        } else
            if (key === 'façade') {
                if (isNumber(e.target.value) && e.target.value >= 2) {
                    newState[key].value = e.target.value
                }
            } else if (key === 'surface') {
                if (isNumber(e.target.value.replaceAll(lang.localeSeparateur, ''))) {
                    if (e.target.value !== '') {
                        newState[key].value = formatInputNumber(e.target.value, lang.localNumber)
                    } else {
                        newState[key].value = e.target.value
                    }
                }
            }
            else {
                newState[key].value = e.target.value
            }

        newState.isUpdated = true
        setState(newState)
    }
    const onChangeDateRange = (start, key, index, key2) => {
        let newState = { ...state }
        if (index != undefined) {
            let details = [...renovationDetail]
            details[index][key2]['value'] = new Date(start)
            setDetails(details)
        }
        else {
            newState[key].value = new Date(start)
        }

        newState.isUpdated = true
        setState(newState);
    }
    const onChangeInputCutom = (value, key) => {
        let newState = { ...state }
        newState[key].value = value
        newState.isUpdated = true
        setState(newState)
    }
    const onChangetSwitch = (key, value = null) => {
        let newState = { ...state }
        let newCheck = { ...isChecked }
        newCheck[key] = value === true || value === false ? value : !isChecked[key]
        newState.isUpdated = true
        setCheked(newCheck);
        setState(newState);
    }
    useEffect(() => {
        getData()
    }, [props.isPropertieLoaded])
    const getData = () => {
        if (props.propertie) {
            let newInfo = { ...state }
            let newCheck = { ...isChecked }
            newInfo.type.value = props.propertie?.type
            newCheck.renové = props.propertie?.building?.isRenovated
            newInfo.titre.value = props.propertie?.building?.title
            newInfo.sousCategorie.value = props.propertie?.subType
            newInfo.descriptionLongue.value = props.propertie?.building?.longDescription
            newInfo.descriptionCourte.value = props.propertie?.building?.shortDescription
            newInfo.constructionDate.value = moment(props.propertie?.building?.construnctionDate).locale(language)
            newCheck.enCours = props.propertie?.building?.isUnderConstrunction
            newInfo.architecte.value = props.propertie?.building?.architect?.map(el => { return { value: el._id, label: `${el.firstName} ${el.lastName} ` } })
            newInfo.façade.value = props.propertie?.building?.numberOfFacade ? props.propertie?.building?.numberOfFacade : 2
            newInfo.revetFaçade.value = props.propertie?.building?.coatingFacade
            newInfo.surface.value = props.propertie?.building?.landArea ? formatInputNumber(props.propertie?.building?.landArea, lang.localNumber) : ''
            newInfo.environement.value = props.propertie?.building?.fieldEnvironment
            newInfo.orientationBatiment.value = props.propertie?.building?.orientationbBuilding
            newInfo.orientationTerrain.value = props.propertie?.building?.orientationbLand
            newInfo.orientationTerrasse.value = props.propertie?.building?.orientationbTerrace
            setState(newInfo);
            setCheked(newCheck)
            setEtat(props.propertie?.building?.buildingStatus ? props.propertie?.building?.buildingStatus : 'new')
            setDetails(props.propertie?.building?.renovatedDetails ? props.propertie?.building?.renovatedDetails?.map(el => {
                return {
                    renovationDate: renderInputObject(moment(el.date).locale(language), '', false, false),
                    renovationDetails: renderInputObject(el.description, '', false, false)
                }
            })
                :
                [{
                    renovationDate: renderInputObject('', '', false, false),
                    renovationDetails: renderInputObject('', '', false, false)
                }],
            )
        }
    }
    useEffect(() => {
        state.isUpdated && updateDescription()

    }, [props.isCallAPi])
    const updateDescription = async () => {
        props.setLoader(true)
        props.onChangeIdentificationError("DescriptionBatiment", false)
        const response = await apiUpdateDescription(JSON.stringify({

            id: props.propertie?._id,
            type: state.type.value,
            subType: state.sousCategorie.value ? state.sousCategorie.value : undefined,
            title: props.titre.value,
            shortDescription: state.descriptionCourte.value,
            longDescription: state.descriptionLongue.value,
            construnctionDate: state.constructionDate.value,
            isUnderConstrunction: isChecked.enCours,
            architect: state.architecte.value.map(el => el.value),
            isRenovated: isChecked.renové,
            renovatedDetails: renovationDetail.map(el => { return { date: el.renovationDate.value, description: el.renovationDetails.value } }),
            buildingStatus: etatGeneral,
            numberOfFacade: state.façade.value,
            coatingFacade: state.revetFaçade.value,
            landArea: state.surface.value !== '' ? Number(state.surface.value.replaceAll(lang.localeSeparateur, '')) : null,
            fieldEnvironment: state.environement.value,
            orientationbBuilding: state.orientationBatiment.value,
            orientationbLand: state.orientationTerrain.value,
            orientationbTerrace: state.orientationTerrasse.value,


        }));
        if (response.statusCode === 200) {
            let newState = { ...state }
            newState.isUpdated = false
            setState(newState)
            props.dataUpdated('intervenant')
        } else {
            props.setLoader(false)
            props.onChangeIdentificationError("DescriptionBatiment", true)
        }

    }

    return (
        <Collapse
            iconStart="brick_wall"
            title={lang.DescriptionBatiment}
        >
            <div className="row" >
                <div className="col-sm-6 mb-5" >
                    <Tooltip
                        tooltipText={lang.changeTypeNo}
                        withIcon={false}
                        element={() =>
                            <Select
                                inputLabel={lang.typeBien}
                                labelClassname="header-select-label mandat"
                                leftIconlClassname="mr-1 drawer-title-icon"
                                className="select-drawer-classname"
                                options={typeOption}
                                onChange={(e) => onChangeSelectInfo(e, 'type')}
                                inputError={state.type.errorMessage}
                                isValid={state.type.isValid}
                                isInvalid={state.type.isInValid}
                                value={state.type.value}
                                disabled
                            />
                        }
                    />
                </div>
                <div className="col-sm-6 mb-5" >
                    {state.type.value !== 'various'
                        ?
                        <Select
                            inputLabel={lang.sousCategorie}
                            labelClassname="header-select-label mandat"
                            placeholder={lang.seelctSousCategorie}
                            className="select-status-identification-step-two w-100"
                            options={sousCategoriOptions(lang, state.type.value)}
                            optionClassName='option-select-status-identification'
                            onChange={(e) => onChangeSelectInfo(e, 'sousCategorie')}
                            value={state.sousCategorie.value}
                            inputError={state.sousCategorie.errorMessage}
                            isValid={state.sousCategorie.isValid}
                            isInvalid={state.sousCategorie.isInValid}
                        />
                        :
                        <MoleculeInput
                            inputLabel={lang.sousCategorie}
                            labelClassname="header-select-label mandat"
                            placeholder={lang.ecrireSousCategorie}
                            inputClassname={'input-mandat w-100'}
                            containerClassName='w-100'
                            labelTextType='h5'
                            onchangeInput={(e) => onChangeInput(e, 'sousCategorie')}
                            inputValue={state.sousCategorie.value}
                            isValid={state.sousCategorie.isValid}
                            isInvalid={state.sousCategorieisInValid}
                            inputError={state.sousCategorie.errorMessage}
                        />
                    }
                </div>

            </div>
            <div className="row" >
                <div className="col-sm-6 mb-5 relative" >
                    <div className="length-area-title" >
                        {props.titre?.value?.length ? props.titre?.value?.length : 0} /75
                    </div>
                    <MoleculeInput
                        inputLabel={lang.titreAnnonce}
                        placeholder={lang.superbeMaison}
                        inputClassname={'input-mandat'}
                        labelTextType='h5'
                        onchangeInput={(e) => {
                            if (e.target.value.length <= 75) {
                                props.onChangeInput(e, 'titre')
                                setState({ ...state, isUpdated: true })
                            }
                        }}
                        inputValue={props.titre.value}
                        isValid={props.titre.isValid}
                        isInvalid={props.titre.isInValid}
                        inputError={props.titre.errorMessage}
                    />
                </div>

            </div>
            <div className="row" >
                <div className="col mb-5" >
                    <div className="length-area" >
                        {state.descriptionCourte?.value?.length ? state.descriptionCourte?.value?.length : 0} /150
                    </div>
                    <MoleculeInput
                        inputLabel={lang.descCourte}
                        placeholder={lang.ecrireDescription}
                        inputClassname={'input-mandat text-area'}
                        labelTextType='h5'
                        onchangeInput={(e) => {
                            onChangeInput(e, 'descriptionCourte')
                        }}
                        inputValue={state.descriptionCourte.value}
                        isValid={state.descriptionCourte.isValid}
                        isInvalid={state.descriptionCourte.isInValid}
                        inputError={state.descriptionCourte.errorMessage}
                        as='textarea'
                        rows={2}
                        maxLength={150}
                    />
                </div>

            </div>
            <div className="row" >
                <div className="col mb-5" >
                    {viewLabel({
                        label: lang.descLongue
                    })}
                    <InputCustom
                        value={state.descriptionLongue.value}
                        onChange={(e) => onChangeInputCutom(e, 'descriptionLongue')}
                        placeholder={lang.ecrireDescLongue}
                    />
                </div>

            </div>
            <div className="row" >
                <div className="col-sm-3 mb-5 mandat-date-row" >
                    {viewLabel({
                        label: lang.dateConstruction,
                        labelClass: "header-select-label mandat"

                    })}
                    <MoleculeDatePicker
                        isSingleDate
                        isPlaceholder
                        iconClass='mr-2'
                        onApply={(start) => onChangeDateRange(start, 'constructionDate')}
                        start={state.constructionDate.value ? moment(state.constructionDate.value) : null}
                    />
                </div>
                <div className="col-sm-3 mb-5" >
                    {viewLabel({
                        label: lang.courConstruction,
                        labelClass: "header-select-label mandat"

                    })}
                    <div className="flex item-center" >
                        <Switch
                            onChange={() => onChangetSwitch('enCours')}
                            checked={isChecked.enCours}
                            className={'ligne-switch mandat'}
                            id="encours"
                        />
                        <Text text={isChecked.enCours ? lang.oui : lang.non} type='' className='ml-2 mb-0 ligne-switch-text' />
                    </div>
                </div>
            </div>
            <AddAgent placeholder={lang.ajouterArchitecte}
                inputLabel={state.architecte.length > 0 ? lang.architectes : lang.architecte}
                listIcons={[
                    renderIconTooltipObject("help_outlined", true, lang.helpArchitecte, 'tooltip-icon-label')
                ]}
                onChange={(e) => onChangeListArchitect("architecte", e)}
                separatorText={lang.or}
                buttonText={lang.createNewContact}
                withBtn
                isInvalid={state.architecte.isInValid}
                isValid={state.architecte.isValid}
                inputError={state.architecte.errorMessage}
                value={state.architecte.value}
                options={contact.listAgent.filter(item => item.serviceProviderSubCategory === 'architect').map(el => { return { value: el._id, label: el.firstName + " " + el.lastName } })}
            />
            <div className="row" >
                <div className="col-sm-3 mb-5" >
                    {viewLabel({
                        label: lang.bienRenove,
                        labelClass: "header-select-label mandat"

                    })}
                    <div className="flex item-center" >
                        <Switch
                            onChange={() => onChangetSwitch('renové')}
                            checked={isChecked.renové}
                            className={'ligne-switch mandat'}
                            id="renove"
                        />
                        <Text text={isChecked.renové ? lang.oui : lang.non} type='' className='ml-2 mb-0 ligne-switch-text' />
                    </div>
                </div>
                {
                    isChecked.renové &&

                    <div className="col-sm-9" >
                        {renovationDetail.map((el, i) =>
                            <div key={i} className="row">
                                <div className="col-sm-4 mb-5 mandat-date-row" >
                                    {viewLabel({
                                        label: lang.dateRenovation,
                                        labelClass: "header-select-label mandat"

                                    })}
                                    <MoleculeDatePicker
                                        isSingleDate
                                        isPlaceholder
                                        iconClass='mr-2'
                                        onApply={(start) => onChangeDateRange(start, `renovationDetail`, i, 'renovationDate')}
                                        start={renovationDetail[i]?.renovationDate?.value ? moment(renovationDetail[i].renovationDate.value) : null}
                                    />
                                </div>
                                <div className="col-sm-8 mb-5 relative  historique-mandat-col" >
                                    {i !== 0 && <Icon icon='clear' onClick={() => removeRenovation(i)} className='clear-renovation' />}
                                    <MoleculeInput
                                        inputLabel={lang.renovationDetails}
                                        placeholder={lang.revFacPlaceholder}
                                        inputClassname={'input-mandat'}
                                        containerClassName='w-100'
                                        labelTextType='h5'
                                        onchangeInput={(e) => onChangeInput(e, `renovationDetail`, i, 'renovationDetails')}
                                        inputValue={renovationDetail[i].renovationDetails.value}
                                        isValid={renovationDetail[i].renovationDetails.isValid}
                                        isInvalid={renovationDetail[i].renovationDetails.isInValid}
                                        inputError={renovationDetail[i].renovationDetails.errorMessage}
                                    />
                                </div>
                            </div>
                        )}
                        <div className="mb-5" >
                            <Button icon='add' type='secondary' text={lang.ajouterRenovation} onClick={onAddRenovation} />
                        </div>
                    </div>
                }
            </div>
            <div className="row" >
                <div className="col-sm mb-5" >
                    <div className="flex item-center input-mandat-row" >
                        {viewLabel({
                            label: lang.etatBien, listIcons: [
                                renderIconTooltipObject("help_outlined", true, lang.etatTooltip, 'tooltip-icon-label')
                            ]
                        })}
                    </div>
                    <div onClick={onCheckRadio} className='pointer'>
                        <RadioButton reverse radioContainer='radio-mandat-container flex description padding-right-radio-description' id="new" onCheck={onCheckRadio} radioText={lang.neuf}
                            isChecked={etatGeneral === 'new'} radioClassName="radio-drawer" name="description" />
                    </div>

                </div>
                <div className="col-sm mb-5  historique-mandat-col pointer" onClick={onCheckRadio}>
                    <RadioButton icon='star' reverse radioContainer='radio-mandat-container flex description padding-right-radio-description' id="perfect" onCheck={onCheckRadio} radioText={lang.parfait}
                        isChecked={etatGeneral === 'perfect'} radioClassName="radio-drawer" name="description" />
                </div>
                <div className="col-sm mb-5  historique-mandat-col pointer" onClick={onCheckRadio}>
                    <RadioButton icon='checkmark_circle' reverse radioContainer='radio-mandat-container flex description' id="well" onCheck={onCheckRadio} radioText={lang.bon}
                        isChecked={etatGeneral === 'well'} name="description" />

                </div>
                <div className="col-sm mb-5  historique-mandat-col pointer" onClick={onCheckRadio}>
                    <RadioButton icon='paint' reverse radioContainer='radio-mandat-container flex description' id="toRefresh" onCheck={onCheckRadio} radioText={lang.aRafraichir}
                        isChecked={etatGeneral === 'toRefresh'} name="description" />
                </div>
                <div className="col-sm mb-5  historique-mandat-col pointer" onClick={onCheckRadio}>
                    <RadioButton icon='warning' reverse radioContainer='radio-mandat-container flex description' id="toRenovate" onCheck={onCheckRadio} radioText={lang.aRenover}
                        isChecked={etatGeneral === 'toRenovate'} name="description" />
                </div>
            </div>
            <div className="row" >
                <div className="col-sm-3 mb-5" >

                    <MoleculeInput
                        inputLabel={lang.nbrFaçade}
                        placeholder={''}
                        inputClassname={'input-mandat'}
                        labelTextType='h5'
                        onchangeInput={(e) => onChangeInput(e, 'façade')}
                        inputValue={state.façade.value}
                        isValid={state.façade.isValid}
                        isInvalid={state.façade.isInValid}
                        inputError={state.façade.errorMessage}
                        increment={() => onClickCounter('façade', 'add')}
                        decrement={() => onClickCounter('façade')}
                        withCounter
                    />
                </div>
                <div className="col-sm-6 mb-5  historique-mandat-col" >
                    <MoleculeInput
                        inputLabel={lang.revetementFaçades}
                        placeholder={lang.revFacPlaceholder}
                        inputClassname={'input-mandat'}
                        containerClassName='w-100'
                        labelTextType='h5'
                        onchangeInput={(e) => onChangeInput(e, 'revetFaçade')}
                        inputValue={state.revetFaçade.value}
                        isValid={state.revetFaçade.isValid}
                        isInvalid={state.revetFaçade.isInValid}
                        inputError={state.revetFaçade.errorMessage}
                    />
                </div>
            </div>
            <div className="row" >
                <div className="col-sm-3 mb-5" >
                    {viewLabel({
                        label: lang.surfaceTerrain
                    })}
                    <GroupeInput
                        withSelect={false}
                        onchangeInput={(e) => onChangeInput(e, 'surface')}
                        inputValue={state.surface.value}
                        isValidInput={state.surface.isValid}
                        isInvalidInput={state.surface.isInValid}
                        inputError={state.surface.errorMessage}
                        suffix={'m²'}
                        placeHolderInput='123 456'

                    />
                </div>
                <div className="col-sm-4 mb-5  historique-mandat-col" >
                    <MoleculeInput
                        inputLabel={lang.environnementTerrain}
                        placeholder={lang.exEnvironnementTerrain}
                        inputClassname={'input-mandat'}
                        containerClassName='w-100'
                        labelTextType='h5'
                        onchangeInput={(e) => onChangeInput(e, 'environement')}
                        inputValue={state.environement.value}
                        isValid={state.environement.isValid}
                        isInvalid={state.environement.isInValid}
                        inputError={state.environement.errorMessage}
                    />
                </div>
            </div>
            <div className="row" >
                <div className="col-sm-4 mb-5" >
                    <Select
                        isOptionwithIcon
                        inputLabel={lang.orientationBatiment}
                        labelClassname="header-select-label mandat"
                        placeholder={lang.choisirOrientation}
                        className="select-status-identification-step-two w-100"
                        options={optionsWithIconOrientation(lang)}
                        optionClassName='option-select-status-identification'
                        onChange={(e) => onChangeSelectInfo(e, 'orientationBatiment')}
                        value={state.orientationBatiment.value}
                        inputError={state.orientationBatiment.errorMessage}
                        isValid={state.orientationBatiment.isValid}
                        isInvalid={state.orientationBatiment.isInValid}
                    />
                </div>
                <div className="col-sm-4 mb-5" >
                    <Select
                        isOptionwithIcon
                        inputLabel={lang.orientationTerrain}
                        labelClassname="header-select-label mandat"
                        placeholder={lang.choisirOrientation}
                        className="select-status-identification-step-two w-100"
                        options={optionsWithIconOrientation(lang)}
                        optionClassName='option-select-status-identification'
                        onChange={(e) => onChangeSelectInfo(e, 'orientationTerrain')}
                        value={state.orientationTerrain.value}
                        inputError={state.orientationTerrain.errorMessage}
                        isValid={state.orientationTerrain.isValid}
                        isInvalid={state.orientationTerrain.isInValid}
                    />
                </div>
                <div className="col-sm-4 mb-5" >
                    <Select
                        isOptionwithIcon
                        inputLabel={lang.orientationTerrasse}
                        labelClassname="header-select-label mandat"
                        placeholder={lang.choisirOrientation}
                        className="select-status-identification-step-two w-100"
                        options={optionsWithIconOrientation(lang)}
                        optionClassName='option-select-status-identification'
                        onChange={(e) => onChangeSelectInfo(e, 'orientationTerrasse')}
                        value={state.orientationTerrasse.value}
                        inputError={state.orientationTerrasse.errorMessage}
                        isValid={state.orientationTerrasse.isValid}
                        isInvalid={state.orientationTerrasse.isInValid}
                    />
                </div>

            </div>
        </Collapse >
    )
}

export default OrganismeDescription
