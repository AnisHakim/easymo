import React, { useEffect, useState } from 'react';
import { Switch, Text, MoleculeInput, Collapse, GroupeInput, isNumber, InputSwitch, Table, viewLabel, isEmpty, Icon, formatNumber, formatInputNumber } from "@easymo/designSystem";
import translator from '../../lang/translator';
import { compoRowData, compositionGlobaleLeft, displayLabel, meubleRowData, renderIconTooltipObject, renderInputObject } from '../../data/data';
import OrganismeAjouterMeuble from './OrganismeAjouterMeuble';
import { apiUpdateComposition } from '../../Api/Properties/properties';
import OrganismeAjouterPiece from './OrganismeAjouterPiece';
import OrganismeMoreDetailsCompo from './OrganismeMoreDetailsCompo';
function OrganismeComposition(props) {
    const lang = translator('fr')
    const [state, setState] = useState({
        localClick: false,
        surface: renderInputObject('', '', false, false),
        surfaceHabit: renderInputObject('', '', false, false),
        etage: renderInputObject(1, '', false, false),
        avMeuble: false,
        isUpdated: false,
        globalComp: [...compositionGlobaleLeft],
        listDetailComposition: {
            newTabData: [],
            allData: []
        },
        isdeleteElement: false
    });
    const [closeElement, setClose] = useState(false)
    const [closeElementCompo, setCloseCompo] = useState(false)
    const [moreDetailsData, setMoreDetails] = useState({})
    const [tab, setTabData] = useState({
        tabData: [],
        newTabData: [],
        allData: []
    })
    const [stateRowData, setRowData] = useState({ ...meubleRowData })
    const [stateRowCompoData, setRowCompoData] = useState({ ...compoRowData })

    const onChangeInput = (e, key) => {
        let newState = { ...state }
        if (e.target.value !== "" && isNumber(e.target.value.replaceAll(lang.localeSeparateur, ''))) {
            newState[key].value = formatInputNumber(e.target.value, lang.localNumber)
        } else if (e.target.value === "") {
            newState[key].value = e.target.value
        }
        newState.isUpdated = true
        setState(newState)
    }
    useEffect(() => {
        synchroListCompoWithDetailsCompo()
    }, [state.listDetailComposition.newTabData])
    const synchroListCompoWithDetailsCompo = () => {
        let newState = { ...state }
        compositionGlobaleLeft.map((item, i) => {
            let length = state.listDetailComposition.newTabData.filter(element => !element.isDeleted).filter(el => el.name === item.value).length
            if (length && length !== item.number) {
                newState.globalComp[i].isChecked = true
                newState.globalComp[i].number = length
            } else if (length === 0) {
                newState.globalComp[i].isChecked = false
                newState.globalComp[i].number = 1
            }
            newState.isdeleteElement = false
        })
        setState(newState)
    }
    useEffect(() => {
        if (state.avMeuble) {
            let myTab = []
            myTab = props.propertie?.composition?.isFurnished ?
                props.propertie?.composition.listFurniture.map(el => {
                    return {
                        ...el,
                        isDeleted: false,
                        isNew: false,
                        newAdded: false,
                        isEditable: false,
                        isUpdated: false,
                    }
                }) : []

            setTabData({
                ...tab,
                allData: myTab,
            })
        }
    }, [state.avMeuble && props.isPropertieLoaded])
    const onChangetSwitch = (key) => {
        let newState = { ...state }
        newState[key] = !state[key]
        // newState.isUpdated = true
        newState.isdeleteElement = false
        setState(newState)
    }
    const onClickCounter = (key, instruction) => {
        let newState = { ...state }
        if (instruction === 'add') {
            newState[key].value = Number(state[key].value) + 1
        } else {
            if (state[key].value > 1) {
                newState[key].value = Number(state[key].value) - 1
            }
        }
        newState.isUpdated = true
        setState(newState);
    }
    const changeNewData = (e) => {
        setTabData({ ...tab, newTabData: e })
    }
    const changeNewPieceData = (e, isdeleteElement) => {
        let newState = { ...state }
        newState.listDetailComposition.newTabData = e
        newState.isdeleteElement = isdeleteElement
        setState(newState);
    }
    useEffect(() => {
        if (props.propertie) {
            let newState = { ...state }
            newState.surface.value = props.propertie?.composition ? formatInputNumber(props.propertie?.composition.superficieTotale, lang.localNumber) : ''
            newState.surfaceHabit.value = props.propertie?.composition ? formatInputNumber(props.propertie?.composition.leavingArea, lang.localNumber) : ''
            newState.etage.value = props.propertie?.composition ? props.propertie?.composition.numberOfFloors : 0
            newState.avMeuble = props.propertie?.composition ? props.propertie?.composition.isFurnished : false
            let global = []
            let secondIndex = state.globalComp.map((el, i) => props.propertie?.composition?.listComposition.findIndex((element) => element.key === el.value))
            global = secondIndex.map((el, i) => el >= 0 ? { ...newState.globalComp[i], isChecked: true, number: props.propertie?.composition?.listComposition[el].number } : { ...newState.globalComp[i] })
            newState.globalComp = props.propertie?.composition ? global : state.globalComp
            newState.listDetailComposition.allData = props.propertie?.composition ? props.propertie?.composition?.listDetailComposition?.map(el => { return { ...el, size: el.width * el.length } }) : []
            setState(newState);
        }
    }, [props.isPropertieLoaded])
    useEffect(() => {
        state.isUpdated && updateComposition()
    }, [props.isCallAPi])

    const renderIconName = (e, item) => {
        return <div className='flex' >
            <Icon icon={item.icon} className='name-tab-icon' />
            {displayLabel(e, compositionGlobaleLeft)}
        </div>

    }
    const renderEtage = (e) => {
        return e == 0 ? lang.RDC : e
    }
    const updateComposition = async () => {
        props.setLoader(true)
        props.onChangeIdentificationError("Composition", false)
        const response = await apiUpdateComposition(JSON.stringify({

            id: props.propertie?._id,
            superficieTotale: Number(state.surface.value.replaceAll(lang.localeSeparateur, '')),
            leavingArea: Number(state.surfaceHabit.value.replaceAll(lang.localeSeparateur, '')),
            numberOfFloors: Number(state.etage.value),
            isFurnished: state.avMeuble,
            listComposition: state.globalComp.filter(el => el.isChecked === true).map(item => { return { key: item.value, number: item.number } }),
            listFurniture: tab.newTabData.filter(el => el.isDeleted === false),
            listDetailComposition: state.listDetailComposition.newTabData.filter(el => el.isDeleted === false),

        }));
        if (response.statusCode === 200) {
            let newState = { ...state }
            newState.isUpdated = false
            props.dataUpdated("Composition")
            setState(newState)
        } else {
            props.setLoader(false)
            props.onChangeIdentificationError("Composition", true)
        }
    }
    const getElementToEdit = (data) => {
        if (data) {
            const RowData = { ...stateRowData }
            RowData.furniture.value = data.furniture
            RowData.description.value = data.description
            RowData.price.value = props.propertie?.forSale ? data.sellingPrice : data.monthlyRent
            RowData.updateState = !RowData.updateState
            setRowData(RowData)
        } else {
            const RowData = { ...stateRowData }
            RowData.furniture.value = ''
            RowData.description.value = ''
            RowData.price.value = 0
            RowData.updateState = !RowData.updateState
            setRowData(RowData)
        }
    }
    const getElementCompoToEdit = (data) => {
        if (data) {
            const RowData = { ...stateRowCompoData }

            RowData.Habitable = data.Habitable
            RowData.name.value = data.name
            RowData.description.value = data.description
            RowData.etage.value = data.stage
            RowData.length.value = formatInputNumber(data.length, lang.localNumber)
            RowData.width.value = formatInputNumber(data.width, lang.localNumber)
            RowData.height.value = formatInputNumber(data.height, lang.localNumber)
            RowData.status.value = data.status
            RowData.sol.value = data.sol
            RowData.comment.value = data.comment
            RowData.size = data.length * data.width
            RowData.icon.value = data.icon
            RowData.updateState = !RowData.updateState

            setRowCompoData({ ...RowData, Habitable: data.Habitable })

        } else {
            const RowData = { ...stateRowCompoData }
            RowData.name.value = ''
            RowData.description.value = ''
            RowData.etage.value = 0
            RowData.length.value = 0
            RowData.width.value = 0
            RowData.height.value = 0
            RowData.status.value = 1
            RowData.sol.value = ''
            RowData.comment.value = ''
            RowData.Habitable = false
            RowData.icon.value = ''
            RowData.size = 0
            RowData.updateState = !RowData.updateState
            setRowCompoData(RowData)
        }
    }
    const updateRowData = (e) => {
        setRowData(e)
    }
    const updateRowCompoData = (e) => {
        setRowCompoData(e)

    }
    const onSaveCompo = (index) => {
        if (isEmpty(stateRowCompoData.name.value) && isEmpty(stateRowCompoData.description.value) && isEmpty(stateRowCompoData.sol.value) &&
            isEmpty(stateRowCompoData.comment.value) && (stateRowCompoData.etage.value === 0) &&
            (stateRowCompoData.length.value === 0) && (stateRowCompoData.width.value === 0) &&
            (stateRowCompoData.height.value === 0) && (stateRowCompoData.status.value === 1) && (!stateRowCompoData.Habitable)) {
            setCloseCompo(!closeElementCompo)
        }
        else {
            const newData = [...state.listDetailComposition.newTabData]
            const data = {
                Habitable: stateRowCompoData.Habitable,
                name: stateRowCompoData?.name?.value,
                description: stateRowCompoData?.description?.value,
                comment: stateRowCompoData?.comment?.value,
                stage: stateRowCompoData?.etage?.value,
                sol: stateRowCompoData?.sol?.value,
                length: stateRowCompoData?.length?.value.replaceAll(lang.localeSeparateur, ''),
                width: stateRowCompoData?.width?.value.replaceAll(lang.localeSeparateur, ''),
                height: stateRowCompoData?.height?.value.replaceAll(lang.localeSeparateur, ''),
                status: stateRowCompoData?.status?.value,
                icon: stateRowCompoData?.icon?.value,
                size: stateRowCompoData?.width?.value.replaceAll(lang.localeSeparateur, '') * stateRowCompoData?.length?.value.replaceAll(lang.localeSeparateur, ''),
            }
            if (newData[index]) {
                newData[index] = data
                newData[index].isEditable = false
                newData[index].isDeleted = false
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

            let newState = { ...state }
            setCloseCompo(!closeElementCompo)
            setRowCompoData({ ...compoRowData, updateState: stateRowCompoData.updateState })
            newState.isUpdated = true
            newState.listDetailComposition.allData = newData
            setState(newState)

        }
    }
    const onSave = (index) => {
        if (isEmpty(stateRowData.furniture.value) && isEmpty(stateRowData.description.value) && isEmpty(stateRowData.price.value)) {
            setClose(!closeElement)
        }
        else {
            const newData = [...tab.newTabData]
            const data = {
                furniture: stateRowData?.furniture?.value,
                description: stateRowData?.description?.value,
                sellingPrice: props.propertie.forSale ? stateRowData?.price?.value : "",
                monthlyRent: !props.propertie.forSale ? stateRowData?.price?.value : "",
                _id: stateRowData.id,
            }
            if (newData[index]) {
                newData[index] = data
                newData[index].isEditable = false
                newData[index].isDeleted = false
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

            let newState = { ...state }
            setClose(!closeElement)
            setRowData({ ...meubleRowData, updateState: stateRowData.updateState })
            newState.isUpdated = true
            setState(newState)
            setTabData({
                ...tab,
                tabData: newData,
                allData: newData
            })

        }
    }
    const synchronisationArrayTolist = (list, index, e) => {
        let newData = { ...state }
        if (e.checked === false) {
            const listData = state.listDetailComposition.allData.filter(el => el.name !== list[index].value)
            newData = {
                ...newData,
                listDetailComposition: { ...newData.listDetailComposition, allData: listData }
            }
            newData.isUpdated = true

        }
        if (e.isIncrement && e.checked) {
            let newComposition = {
                Habitable: false,
                comment: "",
                description: "",
                height: 0,
                icon: newData.globalComp[index].icon,
                isDeleted: false,
                isEditable: false,
                isNew: true,
                isUpdated: false,
                length: 0,
                name: newData.globalComp[index].value,
                newAdded: false,
                show: false,
                size: 0,
                sol: "",
                stage: 0,
                status: 1,
                width: 0
            }
            newData.listDetailComposition.allData = [...newData.listDetailComposition.newTabData, newComposition]
            newData.isUpdated = true
            // setState(newData)
        }
        if (e.isIncrement === false) {
            let tabData = state.listDetailComposition.allData.map(el => el.name)
            let lastIndex = tabData.lastIndexOf(state.globalComp[index].value)
            let newTabData = state.listDetailComposition.allData.filter((el, i) => i !== lastIndex)
            newData.listDetailComposition.allData = [...newTabData]
            newData.isUpdated = true
        }
        setState(newData)

    }
    const changeSwitch = (value, index) => {
        let newData = { ...state }
        newData.globalComp[index].isChecked = value
        let newComposition = {
            Habitable: false,
            comment: "",
            description: "",
            height: 0,
            icon: newData.globalComp[index].icon,
            isDeleted: false,
            isEditable: false,
            isNew: true,
            isUpdated: false,
            length: 0,
            name: newData.globalComp[index].value,
            newAdded: false,
            show: false,
            size: 0,
            sol: "",
            stage: 0,
            status: 1,
            width: 0
        }
        if (value) {
            newData.listDetailComposition.allData = [...newData.listDetailComposition.allData, newComposition]
        } else {
            newData.listDetailComposition.allData = deleteFormTable(newData.globalComp, index)
            newData.globalComp[index].number = 1
        }
        newData.isUpdated = true
        setState(newData)
    }
    const onChangeCheck = (e, index) => {
        let newData = { ...state }
        newData.globalComp[index].number = e.inputValue
        newData.localClick = true
        setState(newData)
        if (!state.isdeleteElement) {
            synchronisationArrayTolist(newData.globalComp, index, e)
        }
        setState({ ...state, isdeleteElement: false })
    }
    const deleteFormTable = (list, index, e) => {
        const listData = state.listDetailComposition.newTabData.filter(el => el.name !== list[index].value)
        return listData

    }
    return <Collapse
        iconStart='layout'
        title={lang.composition}>
        <div className="row" >
            <div className="col-sm-4 col-md-4 col-lg-3 mb-5" >
                {viewLabel({
                    label: lang.surfaceTot,
                    listIcons: [
                        renderIconTooltipObject("help_outlined", true, lang.surfaceTotTooltip, 'tooltip-icon-label')
                    ]
                })}
                <GroupeInput
                    withSelect={false}
                    onchangeInput={(e) => onChangeInput(e, 'surface')}
                    inputValue={state.surface.value}
                    isValidInput={state.surface.isValid}
                    isInvalidInput={state.surface.isInValid}
                    inputError={state.surface.errorMessage}
                    suffix={'m²'}
                    placeHolderInput='123'

                />
            </div>
            <div className="col-sm-4 col-md-4 col-lg-3 mb-5" >
                {viewLabel({
                    label: lang.surfaceHabit,
                    listIcons: [
                        renderIconTooltipObject("help_outlined", true, lang.surfaceHabitTooltip, 'tooltip-icon-label')
                    ]
                })}
                <GroupeInput
                    withSelect={false}
                    onchangeInput={(e) => onChangeInput(e, 'surfaceHabit')}
                    inputValue={state.surfaceHabit.value}
                    isValidInput={state.surfaceHabit.isValid}
                    isInvalidInput={state.surfaceHabit.isInValid}
                    inputError={state.surfaceHabit.errorMessage}
                    suffix={'m²'}
                    placeHolderInput='123'

                />
            </div>
            <div className="col-sm-4 col-md-4 col-lg-3 mb-5" >
                {viewLabel({
                    label: lang.nbrEtage,
                    listIcons: [
                        renderIconTooltipObject("help_outlined", true, lang.nbrEtageTooltip, 'tooltip-icon-label')
                    ]
                })}

                <MoleculeInput
                    placeholder={''}
                    inputClassname={'input-mandat'}
                    labelTextType='h5'
                    onchangeInput={(e) => onChangeInput(e, 'etage')}
                    inputValue={state.etage.value}
                    isValid={state.etage.isValid}
                    isInvalid={state.etage.isInValid}
                    inputError={state.etage.errorMessage}
                    increment={() => onClickCounter('etage', 'add')}
                    decrement={() => onClickCounter('etage')}
                    withCounter
                />
            </div>
            <div className='row' >

                <div className="col-sm-3 mb-5" >
                    {viewLabel({
                        label: lang.avMeuble,
                        listIcons: [
                            renderIconTooltipObject("help_outlined", true, lang.avMeubleTooltip, 'tooltip-icon-label')
                        ]
                    })}
                    <div className="flex item-center" >
                        <Switch
                            onChange={() => onChangetSwitch('avMeuble')}
                            checked={state.avMeuble}
                            className={'ligne-switch mandat'}
                            id="encours"
                        />
                        <Text text={state.avMeuble ? lang.oui : lang.non} type='' className='ml-2 mb-0 ligne-switch-text' />
                    </div>
                </div>
            </div>
            {
                state.avMeuble &&
                <div className='mb-5'>
                    <Table
                        tableClassName="offre-table"
                        containerClassName={'table-max-w100'}
                        withValidation={false}
                        actionFirst={false}
                        withAction
                        type="type-2"
                        btnText={lang.ajouterUnMeuble}
                        listAction={["edit", "duplicate", "delete"]}
                        listCol={[
                            { key: "furniture", name: lang.meuble, sort: true },
                            { key: "description", name: lang.description, sort: true, withSum: true, sumText: lang.total },
                            { key: props.propertie?.forSale === true ? "sellingPrice" : "monthlyRent", name: props.propertie.forSale === true ? lang.prixVente : lang.loyerMensuel, sort: true, withSum: true, type: "custom", renderFunction: (e) => formatNumber(e && Number(e), props.Devise, lang.localNumber) }
                        ]}
                        editComponent={<OrganismeAjouterMeuble
                            object={stateRowData}
                            setData={(e) => updateRowData(e)}
                            updateState={stateRowData.updateState}
                            propertie={props.propertie}
                            Devise={props.Devise}
                        />}
                        closeElement={closeElement}
                        getElementToEdit={getElementToEdit}
                        onSave={onSave}
                        data={tab.allData}
                        getdata={(e) => changeNewData(e)}
                        checkIsUpdated={() => setState({ ...state, isUpdated: true })}
                        trAcceptedColor
                        withSizeControl
                        padding={70}
                        sortAccepted
                        acceptOneElement
                        withFooter
                        emptyArrayText={lang.emptyCompoTableText}
                        withPagination
                        maxFormContainer
                    />
                </div>
            }
            <div className='row mb-5'>
                {viewLabel({
                    label: lang.compoGlobale,
                    labelClass: 'bold-16-label',
                    listIcons: [
                        renderIconTooltipObject("help_outlined", true, lang.compoGlobaleTooltip, 'tooltip-icon-label composition')
                    ]
                })}
                <div className='col-md-6 md-border-right pr-4 pl-4'>
                    {
                        state.globalComp.map((el, index) => index % 2 === 0 ?
                            <InputSwitch
                                isSynchronise
                                key={index}
                                onChange={(e) => onChangeCheck(e, index)}
                                text={el.label}
                                icon={el.icon}
                                value={{ checked: el.isChecked, description: el.number }}
                                openSwitch={el.isChecked}
                                withCounter
                                contentClassName='switch-compo'
                                inputClassname='switch-compo-input'
                                isComposition
                                minValue={1}
                                changeSwitch={(value) => changeSwitch(value, index)}
                                border={index !== (state.globalComp?.length - 1)
                                    && index !== (state.globalComp?.length - 2)}
                            />
                            : null
                        )
                    }
                </div>
                <div className='col-md-6 pr-4 pl-4'>
                    {
                        state.globalComp.map((el, index) => index % 2 !== 0 ?
                            <InputSwitch
                                isSynchronise
                                key={index}
                                onChange={(e) => onChangeCheck(e, index)}
                                changeSwitch={(value) => changeSwitch(value, index)}
                                text={el.label}
                                icon={el.icon}
                                value={{ checked: el.isChecked, description: el.number }}
                                openSwitch={el.isChecked}
                                withCounter
                                isComposition
                                contentClassName='switch-compo'
                                inputClassname='switch-compo-input'
                                minValue={1}
                                border={index !== (state.globalComp?.length - 1)
                                    && index !== (state.globalComp?.length - 2)}
                            />
                            : null
                        )
                    }
                </div>
            </div>
            <div className='mb-5'>
                {viewLabel({
                    label: lang.compoDetails,
                    labelClass: 'bold-16-label'
                })}
                <Table
                    tableClassName="offre-table piece"
                    containerClassName={'table-max-w100'}
                    withValidation={false}
                    actionFirst={false}
                    withAction
                    type="type-2"
                    btnText={lang.ajouterUnePiece}
                    iconClassName='play-list-add-array'
                    icon='playlist_add'
                    listAction={["edit", "duplicate", "delete", "drag"]}
                    listCol={[
                        { key: "name", name: lang.name, sort: true, type: "custom", renderFunction: (e, item) => renderIconName(e, item) },
                        { key: "size", name: lang.taille, sort: true, type: "custom", renderFunction: (e) => formatNumber(typeof e === 'number' ? e : Number(e), 'm²', lang.localNumber) },
                        { key: "description", name: lang.description, sort: true },
                        { key: "stage", name: lang.etage, sort: true, type: "custom", renderFunction: (e) => renderEtage(e) },
                        { key: "sol", name: lang.sol, sort: true }
                    ]}
                    editComponent={<OrganismeAjouterPiece
                        object={stateRowCompoData}
                        setData={(e) => updateRowCompoData(e)}
                        updateState={stateRowCompoData.updateState}
                        propertie={props.propertie}
                        Devise={props.Devise}
                        maxEtage={state.etage.value}
                    />}
                    closeElement={closeElementCompo}
                    getElementToEdit={getElementCompoToEdit}
                    onSave={onSaveCompo}
                    data={state.listDetailComposition.allData}
                    getdata={(e, isdeleteElement) => changeNewPieceData(e, isdeleteElement)}
                    checkIsUpdated={(isdeleteElement) => setState({ ...state, isUpdated: true, isdeleteElement: isdeleteElement })}
                    trAcceptedColor
                    withSizeControl
                    padding={70}
                    sortAccepted
                    acceptOneElement
                    emptyArrayText={lang.emptyCompoPieceTableText}
                    withPagination
                    withDragAndDrop
                    withDataDetails
                    onGetElementToMoreDetails={(e) => setMoreDetails(e)}
                    renderContainerDetail={< OrganismeMoreDetailsCompo
                        data={moreDetailsData}
                    />}
                    listColDetails={["name"]}
                    maxFormContainer
                />
            </div>
        </div>
    </Collapse>;
}

export default OrganismeComposition;
