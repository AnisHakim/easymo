import React, { useEffect, useState } from 'react';
import { Collapse, RadioInput } from "@easymo/designSystem";
import translator from '../../lang/translator';
import { dataAffichage, isSpecificRadioList } from '../../data/data';
import { apiUpdateAffichage } from '../../Api/Properties/properties';

function OrganismeAffichage(props) {
    const lang = translator('fr')
    const renderTypeDescriptionObject = (type, description) => {
        return {
            type: type,
            description: description
        }
    }
    const [state, setState] = useState({
        bannerInstalled: renderTypeDescriptionObject('notSpecified', ''),
        panelInstalled: renderTypeDescriptionObject('notSpecified', ''),
        displayAllowed: renderTypeDescriptionObject('notSpecified', ''),
        isUpdated: false
    })
    const [data, setData] = useState([...dataAffichage])
    useEffect(() => {
        if (state.displayAllowed.type === 'no') {
            let newState = { ...state }
            newState.bannerInstalled = renderTypeDescriptionObject('notSpecified', '')
            newState.panelInstalled = renderTypeDescriptionObject('notSpecified', '')
            newState.isUpdated = true
            setState(newState)
            setData(data.slice(0, 1))
        } else {
            setData([...dataAffichage])
        }
    }, [state.displayAllowed.type])
    useEffect(() => {
        if (props.propertie) {
            let newState = { ...state }
            newState.bannerInstalled.type = props.propertie?.display ? props.propertie.display?.bannerInstalled.type : 'notSpecified'
            newState.bannerInstalled.description = props.propertie?.display ? props.propertie.display?.bannerInstalled.description : ''
            newState.displayAllowed.type = props.propertie?.display ? props.propertie.display?.displayAllowed.type : 'notSpecified'
            newState.displayAllowed.description = props.propertie?.display ? props.propertie.display?.displayAllowed.description : ''
            newState.panelInstalled.type = props.propertie?.display ? props.propertie.display?.panelInstalled.type : 'notSpecified'
            newState.panelInstalled.description = props.propertie?.display ? props.propertie.display?.panelInstalled.description : ''

            setState(newState);
        }
    }, [props.isPropertieLoaded])
    useEffect(() => {
        state.isUpdated && updateAffichage()
    }, [props.isCallAPi])
    const updateAffichage = async () => {
        props.setLoader(true)
        props.onChangeIdentificationError("Affichage", false)
        let body = { id: props.propertie?._id }
        if (state.displayAllowed.type === 'no') {
            body = {
                ...body, displayAllowed: renderTypeDescriptionObject(state.displayAllowed.type, state.displayAllowed.description)
            }
        } else {
            body = {
                ...body,
                displayAllowed: renderTypeDescriptionObject(state.displayAllowed.type, state.displayAllowed.description),
                panelInstalled: renderTypeDescriptionObject(state.panelInstalled.type, state.panelInstalled.description),
                bannerInstalled: renderTypeDescriptionObject(state.bannerInstalled.type, state.bannerInstalled.description),
            }
        }
        const response = await apiUpdateAffichage(JSON.stringify(body));
        if (response.statusCode === 200) {
            let newState = { ...state }
            newState.isUpdated = false
            props.dataUpdated("Affichage")
            setState(newState)
        } else {
            props.setLoader(false)
            props.onChangeIdentificationError("Affichage", true)
        }
    }
    const getRadioData = (radio, inputValue, key) => {
        let newState = { ...state }
        newState[key].type = radio.radio
        newState[key].description = inputValue
        newState.isUpdated = true
        setState(newState)
    }
    return <Collapse
        iconStart='visible'
        title={lang.Affichage}>
        {data.map((el, i) =>
            <RadioInput
                key={i}
                label={el.label} radioList={isSpecificRadioList(el.name)}
                getData={(e, inputValue) => getRadioData(e, inputValue, el.name)}
                value={state[el.name]}
                listIcons={el.listIcons}
                radioType='type-2'
            />
        )
        }
    </Collapse>;
}

export default OrganismeAffichage;
