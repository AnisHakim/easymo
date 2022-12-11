import { useEffect, useState } from "react"
import { Switch, Button, Img, TextIcon, Text, Tooltip, Select, SiderbarItemBlack, Icon, MoleculeInput, isEmpty, ModalConfirmation, Spinner, formatNumber } from "@easymo/designSystem";
import translator from "../../lang/translator";
import { infoPropriete, optionsWithColor, propertiesType, renderIconTooltipObject, transactionOption } from "../../data/data";
import property from '../../assets/Images/property.jpg'
import ModalFullImage from "../../Modal/modalFullImage/ModalFullImage";
import { apiArchivePropperties, apiDeletePropperties, apiUpdateGeneralInfo, apiUpdateImg } from "../../Api/Properties/properties";
import { useNavigate } from "react-router-dom";
import { apiGetFile } from "../../Api/File";
function OrganismeAddProprieteInfo(props) {
    const lang = translator('fr')
    const navigation = useNavigate()
    const [state, setState] = useState({ ...infoPropriete })
    const [img, setImg] = useState(null)
    const [isImageFull, setFullImg] = useState(false)
    const [showModalConfirmation, setModalConfirmation] = useState(false)
    const [actionType, setTypeAction] = useState('')
    const [isImgLoading, setLoadingImg] = useState(false)
    const changeModalconfirmVisability = () => {
        setModalConfirmation(!showModalConfirmation)
    }
    const onChangeVisibilityFullImg = () => {
        setFullImg(!isImageFull)
    }
    const onSubmitAction = () => {
        switch (actionType.toLowerCase()) {
            case "delete":
                return deleteProperty()
            case "archive":
                return archiveProperty()
            default:
                break;
        }
    }

    const onChangeEnLigne = () => {
        let newInfo = { ...state }
        newInfo.isEnLigne = !state.isEnLigne
        newInfo.isUpdated = true
        updateGeneralInfo(newInfo, 'isEnLigne')
    }
    const onChangeSelectInfo = (e, key) => {
        let newInfo = { ...state }
        newInfo[key].value = e.value
        newInfo.isUpdated = true
        setState(newInfo);
    }
    const changeTransaction = (e) => {
        props.onChangeSelectTransaction(e)
        let newState = { ...state }
        newState.isUpdated = true
        setState(newState);
    }
    const changeSelectInfoStatus = (e) => {
        if (e?.value !== props?.status?.value) {
            props.onChangeSelectInfoStatus(e)
            let newState = { ...state }
            newState.isUpdated = true
            setState(newState);
        }
    }
    useEffect(() => {
        props.getData && state.isUpdated && props.getData("info", state)
    }, [props.isCallAPi])
    useEffect(() => {
        setLoadingImg(true)
        if (props.propertie) {

            let newInfo = { ...state }
            newInfo.type.value = props.propertie?.type ? props.propertie?.type : ''
            newInfo.name.value = props.propertie?.name ? props.propertie?.name : ''
            newInfo.isEnLigne = props.propertie?.isOnline ? props.propertie?.isOnline : false
            newInfo.cretedAt = props.propertie?.createdAt ? props.propertie?.createdAt : ''
            newInfo.price.value = props.propertie?.mandat?.price ? props.propertie?.mandat.price.value : 0
            newInfo.adresse.value = props.propertie?.identification ? `${props.propertie?.identification.street} ${props.propertie?.identification.number && formatNumber(Number(props.propertie?.identification.number), null, lang.localNumber)}${props.propertie?.identification?.street ? ',' : ''} ${props.propertie?.identification.postalCode} ${props.propertie?.identification.city}, ${props.propertie?.identification.country} ` : ''
            newInfo.description.value = props.propertie?.building ? props.propertie?.building?.title : ''
            setState(newInfo);
            getFile(props.propertie?.image)
        }
    }, [props.isPropertieLoaded])
    useEffect(() => {
        if (props?.propertie?.mandat?.price?.value) {
            const newInfo = {
                ...state,
                price: {
                    ...state.price,
                    value: props.propertie?.mandat?.price ? props.propertie?.mandat.price.value : 0
                }
            }
            setState(newInfo);
        }
    }, [props?.propertie?.mandat?.price?.value])
    const onChangeInput = (e, key) => {
        let newInfo = { ...state }
        newInfo[key].value = e.target.value
        newInfo[key].isInValid = isEmpty(e.target.value)
        newInfo.isUpdated = true
        setState(newInfo)
    }
    useEffect(() => {
        if (props.imageFeatured) {
            setImg(props.imageFeatured)
        }
    }, [props.imageFeatured])
    const renderTextOrInput = (isEdit, key, type, showLoading, index, styleText) => {
        if (isEdit) {
            return <div className="flex item-center" >
                <MoleculeInput
                    placeholder={''}
                    inputClassname={'small-input info'}
                    onchangeInput={(e) => onChangeInput(e, key)}
                    inputValue={state[key].value}
                    isValid={state[key].isValid}
                    isInvalid={state[key].isInValid}
                    inputError={state[key].errorMessage}
                />
                <Icon onClick={() => onEdit(index, key)} icon={'save'} className='ml-1 iconEnd-header-info pointer' />
            </div>

        }
        return <div className="flex item-center" >
            <Text text={props.propertie ?
                key === 'price'
                    ?
                    state.price.value !== ''
                        ?
                        `${formatNumber(Number(state.price.value ? state.price.value : 0), props.Devise, lang.localNumber)}` !== 'undefined'
                            ?
                            `${formatNumber(Number(state.price.value ? state.price.value : 0), props.Devise, lang.localNumber)}`
                            :
                            `0 ${props.Devise}`
                        :
                        ''
                    :
                    state[key].value
                :
                ''
            }
                showLoading={showLoading} type={type} className={styleText + ' mb-0'} />
            {
                key !== 'adresse' ?
                    < Icon onClick={() => onEditstatus(index, key)} icon={'edit'} className='ml-1 iconEnd-header-info pointer' /> :
                    <a href="#Identification">
                        < Icon icon={'edit'} className='ml-1 iconEnd-header-info pointer' />
                    </a>
            }
        </div>

    }
    const onEdit = (index, key) => {
        let newInfo = { ...state }
        if (!state[key].isInValid) {
            newInfo.isEdit[index] = !state.isEdit[index]
            updateGeneralInfo(newInfo, key)
        }
    }
    const onEditstatus = (index, key) => {
        let newInfo = { ...state }
        newInfo.isEdit[index] = !state.isEdit[index]
        setState(newInfo)
    }

    const updateGeneralInfo = async (data, key) => {
        const response = await apiUpdateGeneralInfo(JSON.stringify({
            id: props.propertie?._id,
            isOnline: data.isEnLigne,
            name: data.name.value,
            title: data.description.value,
            price: data.price.value
        }));
        if (response.statusCode === 200) {
            if (key === 'name') {
                props.setPropertiesName(data.name.value)
            }
            if (key === 'description') {
                props.onChangeInput(data.description.value, 'titre', 'info')
            }
            if (key === 'price') {
                props.setPrice(state.price.value)
            }
            setState(data)
            props.getHistoriqueActivite()
        } else {
            if (key !== 'isEnLigne') {
                data[key].isInValid = true
                setState(data)
            }
        }
    }
    const changePhoto = (e) => {
        if (e.target.files.length) {
            setLoadingImg(true)
            updateImg(e.target.files[0])
        }
    }
    const updateImg = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("id", props.propertie?._id);
        const response = await apiUpdateImg(formData)
        if (response.statusCode === 200) {
            getFile(response.data._id, true)
            props.setImages(response.data)
        }
    }
    const deleteProperty = async () => {
        const response = await apiDeletePropperties(JSON.stringify({
            ids: [props.propertie?._id]
        }));
        if (response.statusCode === 200) {
            navigation('/properties')
        }

    }
    const archiveProperty = async () => {
        const response = await apiArchivePropperties(JSON.stringify({
            ids: [props.propertie?._id],
            status: true
        }));
        if (response.statusCode === 200) {
            navigation('/properties')
        }
    }
    let typeOption = propertiesType(lang)
    typeOption.shift()

    const renderDescription = () => {
        switch (actionType.toLowerCase()) {
            case "delete":
                return lang.textMonoConfirmDelete
            case "archive":
                return lang.textMonoConfirmArchive
            default:
                break;
        }
    }
    const getFile = async (file, change) => {
        if (props.propertie?.image || change) {
            let response = null
            while (!response) {
                const res = await apiGetFile(file)
                try {
                    let responseJson = await res.json();
                } catch (error) {
                    response = res
                }
            }
            setImg(response)
        } else {
            setImg(property)
        }
        setLoadingImg(false)
    }
    return (
        <div className="shadowContainer mb-8px" >
            <div className="relative" >
                {!isImgLoading && < Button containerClassName='absolute btn-full-screen-img' type='' onClick={onChangeVisibilityFullImg} icon='multi_direction_diagonal' />}
                {isImgLoading ? <div className="h-14r flex justify-center item-center" > <Spinner /> </div> :
                    <Img type='FULL' className='img-header-info' src={img}
                    />}
                <div className="absolute flex btn-action-container " >
                    <Button linkBtn href='#Medias' type='filter' icon='media_photo' text={lang.modifierMedia} />
                    <Button containerClassName='pointer' onChangeFile={changePhoto} type='upload' accept=".jpg, .jpeg, .png" icon='add_photo' text={lang.photoUne} />
                </div>
            </div>
            <div className="flex p-5 header-info-propertie-edit" >
                <div className="info-user_properties" >
                    {renderTextOrInput(state.isEdit[0], "name", 'h3', true, 0)}
                    {props.propertie?.building?.title && renderTextOrInput(state.isEdit[1], "description", '', true, 1, ' header-info-txt adresse fw-600')}
                    {renderTextOrInput(state.isEdit[2], "adresse", '', true, 2, ' header-info-txt adresse')}
                    {renderTextOrInput(state.isEdit[3], "price", '', true, 3, ' header-info-txt adresse')}
                </div>
                {props.activitieHistorique?.length ?
                    <Button withNotif notifNumber={props.activitieHistorique?.length} type='third' text={lang.historiqueActivité} icon='history' onClick={props.changeModalActivitieVisibility} />
                    : null}

            </div>
            <div className=" p-5" >
                <Text text={lang.infoBien} className='info-prop-title mb-2' type='h4' />
                <div className="row mb-6" >
                    <div className="col-sm-4" >
                        <Tooltip
                            tooltipText={lang.changeTypeNo}
                            withIcon={false}
                            element={() =>
                                <Select
                                    inputLabel={lang.typeBien}
                                    labelClassname="header-select-label"
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
                    <div className="col-sm-4" >
                        <Select
                            inputLabel={lang.typeTransaction}
                            labelClassname="header-select-label"
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
                    <div className="col-sm-4" >
                        <Select
                            inputLabel={lang.statusMandat}
                            listIcons={[
                                renderIconTooltipObject("help_outlined", true, lang.etapeTransaction, 'tooltip-icon-label'),
                            ]}
                            labelClassname="header-select-label"
                            placeholder={lang.seelctStatus}
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

                </div>

                <Text text={lang.Diffusion} className='info-prop-title mb-2' type='h4' />
                <div className="flex item-center" >
                    <Text text={lang.diffuserEnLigne} className="header-select-label with-tooltip" />
                    <div className="ml-1">
                        <Tooltip
                            backgroundColor={SiderbarItemBlack}
                            tooltipText={lang.desactiverLebien}
                            iconClassname="drawer-title-icon header mb-2" />
                    </div>
                </div>
                <div className="row" >
                    <div className="col flex mb-3 item-center" >
                        <Switch
                            onChange={onChangeEnLigne}
                            checked={state.isEnLigne}
                            className={'ligne-switch'}
                        />
                        <TextIcon
                            containerClassName='ligne-switch-text'
                            type='' onClickContainer={onChangeEnLigne} withStartIcon
                            iconStart={state.isEnLigne ? 'visible_outlined' : 'hidden_outlined'}
                            text={state.isEnLigne ? lang.enLigne : lang.horsLigne}
                        />
                    </div>
                    <div className="col flex mb-3 justify-end flex-wrap" >
                        <Button containerClassName='inline-block' type='archive'
                            onClick={() => {
                                changeModalconfirmVisability()
                                setTypeAction('archive')
                            }}
                            text={lang.archiverBien} icon='archive' />
                        <Button containerClassName='inline-block' type='delete' onClick={() => {
                            changeModalconfirmVisability()
                            setTypeAction('delete')
                        }}
                            text={lang.supprimerBien} icon='delete' />
                    </div>
                </div>
            </div>
            {isImageFull && <ModalFullImage
                onChangeVisibilityFullImg={onChangeVisibilityFullImg}
                isImageFull={isImageFull}
                image={img}
            />}
            {showModalConfirmation && <ModalConfirmation
                show={showModalConfirmation}
                onHide={changeModalconfirmVisability}
                onSubmit={onSubmitAction}
                textConfirm={renderDescription()}
            />}
        </div>
    )
}

export default OrganismeAddProprieteInfo
