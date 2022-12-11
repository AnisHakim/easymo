import React, { useEffect, useState } from 'react'
import { MoleculeInput, GroupeInput, viewLabel, isNumber, Select, Text, Switch, Icon, formatInputNumber } from "@easymo/designSystem";
import translator from "../../lang/translator";
import { compositionGlobaleLeft, compositionGlobaleRight, etageOption, renderInputObject } from '../../data/data';
const lang = translator('fr')

function OrganismeAjouterPiece(props) {
    const [state, setState] = useState({
        name: renderInputObject('', '', false, false),
        description: renderInputObject('', '', false, false),
        etage: renderInputObject(0, '', false, false),
        length: renderInputObject(0, '', false, false),
        width: renderInputObject(0, '', false, false),
        height: renderInputObject(0, '', false, false),
        status: renderInputObject(1, '', false, false),
        comment: renderInputObject('', '', false, false),
        sol: renderInputObject('', '', false, false),
        icon: renderInputObject('', '', false, false),
        size: 0,
        Habitable: false,
        updateState: false,
        loading: false,
    })
    useEffect(() => {
        if (state.loading)
            props.setData && props.setData(state)
    }, [state])
    useEffect(() => {
        setState({ ...props.object })
    }, [props.object.updateState])
    let listIcon = [...compositionGlobaleLeft, ...compositionGlobaleRight].map(el => { return { value: el.value, label: el.label, icon: el.icon, iconClassSelect: '', isOptionwithIcon: true, } })
    listIcon = [...new Map(listIcon.map(item => [item.icon, item])).values()]

    const onChangeInput = (e, key) => {
        const newState = { ...state }
        if (key === 'height' || key === 'width' || key === 'length') {
            if (e.target.value !== "" && isNumber(e.target.value.replaceAll(lang.localeSeparateur, ''))) {
                newState[key].value = formatInputNumber(e.target.value, lang.localNumber)
            }
            else {
                newState[key].value = e.target.value
            }
        } else {
            newState[key].value = e.target.value
        }
        newState.updateState = true
        newState.loading = true
        setState(newState)

    }
    const onChangetSwitch = (e) => {
        const newState = { ...state }
        newState.Habitable = e
        newState.updateState = true
        newState.loading = true
        setState(newState)
    }
    const onChangeSelectGrp = (e, key) => {
        let newState = { ...state }
        newState[key].value = e.value
        if (key === 'name') {
            newState.icon.value = e.icon
        }
        newState.updateState = true
        newState.loading = true
        setState(newState);

    }
    const onClickStar = (value) => {
        const newState = { ...state }
        newState.status.value = value
        newState.updateState = true
        newState.loading = true
        setState(newState);
    }

    return <>
        <div className='row' >
            <div className="col-sm-3 mb-5" >
                <Select
                    isOptionwithIcon
                    inputLabel={lang.name}
                    labelClassname="header-select-label mandat"
                    placeholder={lang.name}
                    className="select-status-identification-step-two w-100"
                    options={listIcon}
                    optionClassName='option-select-status-identification'
                    onChange={(e) => onChangeSelectGrp(e, 'name')}
                    value={state.name.value}
                    inputError={state.name.errorMessage}
                    isValid={state.name.isValid}
                    isInvalid={state.name.isInValid}
                />
            </div>
            <div className="col-sm-3 mb-5" >
                <MoleculeInput
                    inputLabel={lang.sol}
                    placeholder={lang.sol}
                    inputClassname={'input-mandat'}
                    labelTextType='h5'
                    onchangeInput={(e) => onChangeInput(e, 'sol')}
                    inputValue={state.sol.value}
                    isValid={state.sol.isValid}
                    isInvalid={state.sol.isInValid}
                // inputError={state.sol.errorMessage}
                />
            </div>
            <div className="col-sm-3 mb-5" >
                <Select
                    inputLabel={lang.etage}
                    labelClassname="header-select-label mandat capitalize"
                    leftIconlClassname="mr-1 drawer-title-icon"
                    className="select-drawer-classname"
                    options={etageOption(Number(props.maxEtage))}
                    onChange={(e) => onChangeSelectGrp(e, 'etage')}
                    // inputError={state.etage.errorMessage}
                    isValid={state.etage.isValid}
                    isInvalid={state.etage.isInValid}
                    value={state.etage.value}
                />
            </div>
            <div className="col-sm-3 mb-5" >
                <MoleculeInput
                    inputLabel={lang.description}
                    placeholder={lang.description}
                    inputClassname={'input-mandat'}
                    labelTextType='h5'
                    onchangeInput={(e) => onChangeInput(e, 'description')}
                    inputValue={state.description.value}
                    isValid={state.description.isValid}
                    isInvalid={state.description.isInValid}
                // inputError={state.description.errorMessage}
                />
            </div>
        </div>
        <div className='row' >


            <div className="col-sm-3 mb-5" >
                <MoleculeInput
                    inputLabel={lang.commentaireEtat}
                    placeholder={lang.commentaireEtat}
                    inputClassname={'input-mandat'}
                    labelTextType='h5'
                    onchangeInput={(e) => onChangeInput(e, 'comment')}
                    inputValue={state.comment.value}
                    isValid={state.comment.isValid}
                    isInvalid={state.comment.isInValid}
                // inputError={state.comment.errorMessage}
                />
            </div>
            <div className="col-sm-3 mb-5" >
                {viewLabel({
                    label: lang.length
                })}
                <GroupeInput
                    withSelect={false}
                    onchangeInput={(e) => onChangeInput(e, 'length')}
                    inputValue={state.length.value}
                    isValidInput={state.length.isValid}
                    isInvalidInput={state.length.isInValid}
                    // inputError={state.length.errorMessage}
                    suffix={'m'}
                    containerInput="w-100"
                    placeHolderInput='321'

                />
            </div>
            <div className="col-sm-3 mb-5" >
                {viewLabel({
                    label: lang.width
                })}
                <GroupeInput
                    withSelect={false}
                    onchangeInput={(e) => onChangeInput(e, 'width')}
                    inputValue={state.width.value}
                    isValidInput={state.width.isValid}
                    isInvalidInput={state.width.isInValid}
                    // inputError={state.width.errorMessage}
                    suffix={'m'}
                    containerInput="w-100"
                    placeHolderInput='321'

                />
            </div>
            <div className="col-sm-3 mb-5" >
                {viewLabel({
                    label: lang.height
                })}
                <GroupeInput
                    withSelect={false}
                    onchangeInput={(e) => onChangeInput(e, 'height')}
                    inputValue={state.height.value}
                    isValidInput={state.height.isValid}
                    isInvalidInput={state.height.isInValid}
                    // inputError={state.height.errorMessage}
                    suffix={'m'}
                    containerInput="w-100"
                    placeHolderInput='321'

                />
            </div>
        </div>
        <div className='row' >

            <div className="col-sm-3 mb-5" >
                {viewLabel({
                    label: lang.etatGeneral
                })}
                <div className='flex' >
                    {[...Array(5).keys()].map((index) => {
                        return (
                            <div
                                key={index}
                                className="stars"
                                onClick={() => onClickStar(index + 1)}
                            >
                                <Icon
                                    icon={index + 1 <= state.status.value ?
                                        'star' : 'star_outlined'}
                                    className="star"
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="col-sm-3 mb-5" >
                {viewLabel({
                    label: lang.habitable,
                })}
                <div className="flex item-center" >
                    <Switch
                        onChange={() => onChangetSwitch(!state.Habitable)}
                        checked={state.Habitable}
                        className={'ligne-switch mandat'}
                        id="Habitable"
                    />
                    <Text text={state.Habitable ? lang.oui : lang.non} type='' className='ml-2 mb-0 ligne-switch-text' />
                </div>
            </div>
        </div>
    </>
}

export default OrganismeAjouterPiece;
