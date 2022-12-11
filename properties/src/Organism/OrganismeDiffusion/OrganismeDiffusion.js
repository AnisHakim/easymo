import React, { useEffect, useState } from 'react'
import { Switch, Button, Text, MoleculeInput, Select, Collapse, Img, Icon, viewLabel } from "@easymo/designSystem";
import translator from "../../lang/translator";
import { tagOptions } from '../../data/data';
import Immoweb from '../../assets/Images/logo/immoweb.jpg'
import Immovlan from '../../assets/Images/logo/immovlan.jpg'
import LogicImmo from '../../assets/Images/logo/logic-immo.jpg'
import Zimmo from '../../assets/Images/logo/zimmo.jpg'
import { apiUpdateDiffusion } from '../../Api/Properties/properties';
function OrganismeDiffusion(props) {
    const lang = translator('fr')
    const [state, setState] = useState({
        agence: false,
        tag: 'new',
        platImmo: false,
        platImmoDetails: [
            { isConnected: false, actif: false, name: 'Immoweb', link: 'https://www.immoweb.be/TonAgence', logo: Immoweb },
            { isConnected: false, actif: false, name: 'Immovlan', link: 'https://www.immovlan.be/TonAgence', logo: Immovlan },
            { isConnected: false, actif: false, name: 'Logic-Immo', link: 'https://www.immoweb.be/TonAgence', logo: LogicImmo },
            { isConnected: false, actif: false, name: 'Zimmo', link: 'https://www.zimmo.be/TonAgence', logo: Zimmo }],
        reseauSociaux: false,
        reseauDetails: [
            { isConnected: false, actif: false, name: lang.facebook, link: 'https://www.facebook.com/TonAgence', icon: 'facebook' },
            { isConnected: false, actif: false, name: lang.instagram, link: 'https://www.instagram.com/TonAgence', icon: 'instagram' },
            { isConnected: false, actif: false, name: lang.linkedIn, link: 'https://www.linkedin.com/TonAgence', icon: 'linkedin' },
        ],
        isUpdated: false

    })
    useEffect(() => {
        if (props.propertie?.diffusion) {
            let newState = { ...state }
            newState.agence = props.propertie?.diffusion.agenceVisible
            newState.tag = props.propertie?.diffusion.agenceVisible ? props.propertie?.diffusion.webSiteTag : 'new'
            newState.platImmo = props.propertie?.diffusion.realEstatePlatforms
            newState.reseauSociaux = props.propertie?.diffusion.socialNetworks
            setState(newState);
        }
    }, [props.isPropertieLoaded])
    useEffect(() => {
        state.isUpdated && updateDiffusion()

    }, [props.isCallAPi])
    const updateDiffusion = async () => {
        props.onChangeIdentificationError("Diffusion", false)

        props.setLoader(true)

        const response = await apiUpdateDiffusion(JSON.stringify({

            id: props.propertie?._id,
            agenceVisible: state.agence,
            webSiteTag: state.agence ? state.tag : null,
            realEstatePlatforms: state.platImmo,
            socialNetworks: state.reseauSociaux
        }));
        if (response.statusCode === 200) {
            let newState = { ...state }
            newState.isUpdated = false
            props.dataUpdated("Diffusion")
            setState(newState)
        } else {
            props.setLoader(false)
            props.onChangeIdentificationError("Diffusion", true)
        }
    }

    const onChangetSwitch = (key) => {
        let newState = { ...state }
        newState[key] = !state[key]
        newState.isUpdated = true
        setState(newState)
    }
    const changeTag = (e) => {
        let newState = { ...state }
        newState.tag = e.value
        newState.isUpdated = true
        setState(newState)
    }
    const onChangeDynamicSwitch = (index, key) => {
        let newState = { ...state }
        newState[key][index].actif = !state[key][index].actif
        newState.isUpdated = true
        setState(newState)
    }
    return (
        <Collapse title={lang.Diffusion} iconStart="globe">
            <div className='row' >
                <div className='col-sm-4 mb-4' >
                    {viewLabel({
                        label: lang.siteAgence,
                        labelClass: 'bold-black-txt-14',
                    })}
                    <div className="flex item-center" >
                        <Switch
                            onChange={() => onChangetSwitch('agence')}
                            checked={state.agence}
                            className={'ligne-switch mandat'}
                            id="encours"
                        />
                        <Text text={state.agence ? lang.oui : lang.non} type='' className='ml-2 mb-0 ligne-switch-text' />
                    </div>
                </div>
                {
                    state.agence &&
                    <div className='col-sm-4 mb-4' >
                        {viewLabel({
                            label: lang.tagWebsite,
                            listIcons: [
                                {
                                    icon: "help_outlined",
                                    tooltip: true,
                                    tooltipText: lang.tagWebsiteTooltip,
                                    iconClassname: 'tooltip-icon-label',
                                }

                            ]
                        })}
                        <Select
                            className="select-drawer-classname"
                            options={tagOptions(lang)}
                            onChange={changeTag}
                            value={state.tag}
                        />
                    </div>
                }
            </div>
            <div className='row' >
                <div className='col-12 mb-4' >
                    {viewLabel({
                        label: lang.platImmobiliere,
                        labelClass: 'bold-black-txt-14',
                    })}
                    <div className="flex item-center" >
                        <Switch
                            onChange={() => onChangetSwitch('platImmo')}
                            checked={state.platImmo}
                            className={'ligne-switch mandat'}
                            id="encours"
                        />
                        <Text text={state.platImmo ? lang.oui : lang.non} type='' className='ml-2 mb-0 ligne-switch-text' />
                    </div>
                </div>
                {
                    state.platImmo &&
                    <div className='col-12 mb-8' >
                        {state.platImmoDetails.map((el, i) => <div key={i} className={i !== state.platImmoDetails.length - 1 ? 'list-row' : 'list-row no-border'}  >
                            <div className=' flex item-center w-100 '>
                                <Img src={el.logo} type='' className='immo-logo mr-3' />
                                <div className='row w-100 justify-space-between'>
                                    <div className='col-sm-auto' >
                                        <div>
                                            <Text type='h5' text={el.name} className={el.isConnected ? 'mb-0' : 'grey-text mb-0'} />
                                            {el.isConnected ? <a href={el.link} target='_blank' className='link-immo' > {el.link} </a> : <Text type='' text={lang.notConnected} className='grey-text mb-0 font-size-sm' />}
                                        </div>

                                    </div>
                                    <div className='col-sm-auto flex item-center' >
                                        {el.isConnected ?
                                            <div className='flex item-center' >
                                                <Switch
                                                    onChange={() => onChangeDynamicSwitch(i, 'platImmoDetails')}
                                                    checked={el.actif}
                                                    className={'ligne-switch mandat'}
                                                    id="encours"
                                                />
                                                <Text text={el.actif ? lang.oui : lang.non} type='' className='ml-2 mb-0 ligne-switch-text' />
                                            </div>
                                            :
                                            <Button type='filter' text='Connecter' className='ft-13' />}
                                    </div>
                                </div>
                            </div>
                        </div>

                        )
                        }
                    </div>
                }
            </div>
            <div className='row' >
                <div className='col-12 mb-4' >
                    {viewLabel({
                        label: lang.reseauSociaux,
                        labelClass: 'bold-black-txt-14',
                    })}
                    <div className="flex item-center" >
                        <Switch
                            onChange={() => onChangetSwitch('reseauSociaux')}
                            checked={state.reseauSociaux}
                            className={'ligne-switch mandat'}
                            id="encours"
                        />
                        <Text text={state.reseauSociaux ? lang.oui : lang.non} type='' className='ml-2 mb-0 ligne-switch-text' />
                    </div>
                </div>
            </div>
            {
                state.reseauSociaux && state.reseauDetails.map((el, i) => <div key={i} className={i !== state.reseauDetails.length - 1 ? 'list-row' : 'list-row no-border'}  >
                    <div className=' flex item-center w-100 '>
                        <Icon icon={el.icon} className='sm-icon dark-grey mr-3' />
                        <div className='row w-100 justify-space-between'>
                            <div className='col-sm-auto' >
                                <div>
                                    <Text type='h5' text={el.name} className={el.isConnected ? 'mb-0' : 'grey-text mb-0'} />
                                    {el.isConnected ? <a href={el.link} target='_blank' className='link-immo' > {el.link} </a> : <Text type='' text={lang.notConnected} className='grey-text mb-0 font-size-sm' />}
                                </div>

                            </div>
                            <div className='col-sm-auto flex item-center' >
                                {el.isConnected ?
                                    <div className='flex item-center' >
                                        <Switch
                                            onChange={() => onChangeDynamicSwitch(i, 'reseauDetails')}
                                            checked={el.actif}
                                            className={'ligne-switch mandat'}
                                            id="encours"
                                        />
                                        <Text text={el.actif ? lang.oui : lang.non} type='' className='ml-2 mb-0 ligne-switch-text' />
                                    </div>
                                    :
                                    <Button type='filter' text='Connecter' className='ft-13' />}
                            </div>
                        </div>
                    </div>
                </div>

                )
            }
        </Collapse>
    )
}

export default OrganismeDiffusion