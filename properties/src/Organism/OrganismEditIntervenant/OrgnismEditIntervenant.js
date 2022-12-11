import React, { Component } from "react";
import { stateIntervenant, originMandatOptions, renderIconTooltipObject } from "../../data/data";
import { Collapse, Select, AddAgent, Input } from '@easymo/designSystem';
import translator from '../../lang/translator';
import { AuthStore } from "@easymo/auth"
import { connect } from 'react-redux';
import { apiUpdateIntervenant } from "../../Api/Properties/properties";
const lang = translator('fr')
class OrgnismEditIntervenant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...stateIntervenant
        }
    }
    handleOtherDescription = (element) => {
        this.setState({
            ...this.state,
            isUpdated: true,
            otherDescription: {
                ...this.state.otherDescription,
                value: element.target.value,
            }
        })
    }
    onSelectOriginMandat = (element) => {
        this.setState({
            ...this.state,
            isUpdated: true,
            originMandat: {
                ...this.state.originMandat,
                value: element.value
            }
        })
    }
    onChangeListsRequired = (key, e) => {
        this.setState({
            isUpdated: true,
            [key]: {
                ...this.state[key],
                value: e,
                isValid: e.length > 0,
                isInValid: e.length === 0,
                errorMessage: e.length > 0 ? null : this.getErrorMessage(key)
            }
        })
    }
    onChangeLists = (key, e) => {
        this.setState({
            isUpdated: true,
            [key]: {
                ...this.state[key],
                value: e,
                isValid: false,
                isInValid: false,
                errorMessage: null
            }
        })
    }
    getErrorMessage = (key) => {
        switch (key) {
            case "owner":
                return lang.selectOwnerMsgError
            case "agent":
                return lang.selectAgentMsgError
            default:
                break;
        }
    }
    optionBuyerAndTenant = () => {
        const buyerData = this.props.contact.listBuyer.map(el => { return { value: el._id, label: el.firstName + " " + el.lastName } })
        const tenantData = this.props.contact.listTenant.map(el => { return { value: el._id, label: el.firstName + " " + el.lastName } })
        return [...buyerData, ...tenantData]
    }
    optionBuyerOrTenant = () => {
        return this.props.propertie?.forSale === true ?
            this.props.contact.listBuyer.map(el => { return { value: el._id, label: el.firstName + " " + el.lastName } }) :
            this.props.contact.listTenant.map(el => { return { value: el._id, label: el.firstName + " " + el.lastName } })
    }
    optionContact = () => {
        const agentData = this.props.contact.listAgent.map(el => { return { value: el._id, label: el.firstName + " " + el.lastName } })
        const ownerData = this.props.contact.listOwner.map(el => { return { value: el._id, label: el.firstName + " " + el.lastName } })
        return [...this.optionBuyerAndTenant(), ...agentData, ...ownerData]
    }
    componentDidMount() {
        this.setState({
            agent: {
                ...this.state.agent,
                value: [{
                    value: AuthStore.getState().auth?.user?._id
                    , label: AuthStore.getState().auth?.user?.firstName + ' ' + AuthStore.getState().auth?.user?.lastName
                }]
            }
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.isCallAPi !== prevProps.isCallAPi && this.state.isUpdated) {
            this.submit()
        }
        if (this.props.isPropertieLoaded !== prevProps.isPropertieLoaded) {
            this.formatdata()
        }
    }
    formatdata = () => {
        setTimeout(() => {
            const state = { ...this.state }
            const agentsId = this.props.propertie.speakers.detailAgent.map(el => el.userId)
            const ownerId = this.props.propertie.speakers.owner
            const tenantId = this.props.propertie.speakers.tenant
            const contactRecommented = this.props.propertie.speakers.contactRecommented
            state.otherDescription.value = this.props.propertie.speakers.otherDescription && this.props.propertie.speakers.otherDescription
            state.agent.value = this.props.contact.listAgentUser.filter(el => agentsId.indexOf(el._id) !== -1).map(el => {
                return ({
                    value: el._id,
                    label: el.firstName + " " + el.lastName
                })
            })
            state.owner.value = this.props.contact.listOwner.filter(el => ownerId.indexOf(el._id) !== -1).map(el => {
                return ({
                    value: el._id,
                    label: el.firstName + " " + el.lastName
                })
            })
            state.contactRecommended.value = contactRecommented.length && this.optionContact().filter(el => contactRecommented.indexOf(el.value) !== -1)
            state.buyerAndTenant.value = [...this.props.contact.listTenant, ...this.props.contact.listBuyer].filter(el => tenantId.indexOf(el._id) !== -1).map(el => {
                return ({
                    value: el._id,
                    label: el.firstName + " " + el.lastName
                })
            })
            const originMandat = this.props.propertie.speakers.origin && originMandatOptions(lang).filter(el => el.value === this.props.propertie.speakers.origin)
            state.originMandat.value = originMandat && originMandat.length > 0 ? originMandat[0].value : this.state.originMandat.value

            this.setState({ ...state })
        }, 500);
    }
    submit = async () => {
        this.props.onChangeIdentificationError("Intervenants", false)
        let verif = true
        let agent = this.state.agent
        let owner = this.state.owner
        if (this.state.agent.value.length === 0) {
            agent = {
                ...this.state.agent,
                isValid: false,
                isInValid: true,
                errorMessage: lang.selectAgentMsgError
            }
            verif = false
            this.props.onChangeIdentificationError("Intervenants", true)
        }
        if (this.state.owner.value.length === 0) {
            owner = {
                ...this.state.owner,
                isValid: false,
                isInValid: true,
                errorMessage: lang.selectOwnerMsgError
            }
            verif = false
            this.props.onChangeIdentificationError("Intervenants", true)
        }
        if (verif) {
            this.props.setLoader(true)
            const data = {
                "id": this.props.propertie.id ? this.props.propertie.id : this.props.propertie._id,
                "agent": this.state.agent.value.map(el => el.value),
                "owner": this.state.owner.value.map(el => el.value),
                "tenant": this.state.buyerAndTenant.value.map(el => el.value),
                "origin": this.state.originMandat.value,
                "otherDescription": this.state.otherDescription.value,
                "contactRecommented": this.state.contactRecommended?.value?.length ? this.state.contactRecommended?.value?.map(el => el.value) : [],
            }
            const response = await apiUpdateIntervenant(JSON.stringify(data));
            if (response.statusCode === 200) {
                this.props.dataUpdated('intervenant')
                this.setState({
                    isUpdated: false
                })
            } else {
                this.props.onChangeIdentificationError("Intervenants", true)
                this.props.setLoader(false)
                if (response.err && response.err.message === "check list of owners!") {
                    this.setState({
                        owner: { ...this.state.owner, isValid: false, isInValid: true }
                    })
                }
                if (response.err && response.err.message === "check list of agents!") {
                    this.setState({
                        agent: { ...this.state.agent, isValid: false, isInValid: true }
                    })
                }
            }
        } else {
            this.setState({
                agent: agent,
                owner: owner
            })
        }
    }
    render() {
        return <Collapse
            withStartIcon
            iconStart="contact_notebook"
            title={lang.Intervenants}
        >
            <AddAgent placeholder={lang.placeHolderOwnerText}
                inputLabel={`${lang.oneOrManyProperty}${this.state.owner.value.length > 1 ? "s" : ''}`}
                listIcons={[
                    renderIconTooltipObject("help_outlined", true, lang.tootltipMessageOwner, 'tooltip-icon-label'),
                    renderIconTooltipObject("lock_outlined", true, lang.etapeTransaction, 'tooltip-icon-label')
                ]}
                onChange={(e) => this.onChangeListsRequired("owner", e)}
                separatorText={lang.or}
                buttonText={lang.createNewContact}
                withBtn
                isInvalid={this.state.owner.isInValid}
                isValid={this.state.owner.isValid}
                inputError={this.state.owner.errorMessage}
                value={this.state.owner.value}
                options={this.props.contact.listOwner.map(el => { return { value: el._id, label: el.firstName + " " + el.lastName } })}
                typeContactToAdd={["seller"]}
            />
            <AddAgent placeholder={lang.placeHolderAgentText}
                inputLabel={`${lang.oneOrManyAgent}${this.state.agent.value.length > 1 ? "s" : ''}`}
                listIcons={[
                    renderIconTooltipObject("help_outlined", true, lang.tootltipMessageAgent, 'tooltip-icon-label')
                ]}
                value={this.state.agent.value}
                onChange={(e) => this.onChangeListsRequired("agent", e)}
                isInvalid={this.state.agent.isInValid}
                isValid={this.state.agent.isValid}
                inputError={this.state.agent.errorMessage}
                options={this.props.contact.listAgentUser.map(el => { return { value: el._id, label: el.firstName + " " + el.lastName } })}
            />
            <AddAgent placeholder={`${this.props.propertie?.forSale ? lang.buyerPlaceHolder : lang.tenantPlaceHolder}`}
                inputLabel={`${this.props.propertie?.forSale ? lang.buyer : lang.tenant}${this.state.buyerAndTenant.value.length > 1 ? "s" : ''}`}
                listIcons={[
                    renderIconTooltipObject("help_outlined", true, lang.tootltipMessageOwner, 'tooltip-icon-label'),
                    renderIconTooltipObject("lock_outlined", true, lang.mandatTooltip, 'tooltip-icon-label')
                ]}
                value={this.state.buyerAndTenant.value}
                separatorText={lang.or}
                buttonText={lang.createNewContact}
                withBtn
                isInvalid={this.state.buyerAndTenant.isInValid}
                isValid={this.state.buyerAndTenant.isValid}
                inputError={this.state.buyerAndTenant.errorMessage}
                options={this.optionBuyerOrTenant()}
                onChange={(e) => this.onChangeLists("buyerAndTenant", e)}
                typeContactToAdd={this.props.propertie?.forSale ? ['buyer'] : ['tenant']}
            />
            <div className={`${this.state.originMandat.value === 'recommendation' ? '' : 'mb-5'} row`}>
                <div className={`${this.state.originMandat.value === 'unspecified' ? '' : 'col-sm-4'}`}>
                    <Select
                        inputLabel={lang.mandatOrigin}
                        className={`${this.state.originMandat.value === 'unspecified' ? 'col-sm-4' : ''}`}
                        options={originMandatOptions(lang)}
                        listIcons={[
                            renderIconTooltipObject("lock_outlined", true, lang.mandatTooltip, 'tooltip-icon-label')
                        ]}
                        value={this.state.originMandat.value}
                        onChange={(e) => this.onSelectOriginMandat(e)}
                        optionClassName='option-select-status-identification'
                    />
                </div>
                <div className={`${this.state.originMandat.value === 'recommendation' ? 'col-sm-12' : 'col-sm-8'}`}>
                    {this.state.originMandat.value === 'recommendation' && <AddAgent placeholder={lang.addContact}
                        labelWithTooltipIcon=''
                        className=''
                        separatorText={lang.or}
                        buttonText={lang.createNewContact}
                        containerClassName='container-add-contact item-center'
                        withBtn
                        isInvalid={this.state.contactRecommended.isInValid}
                        isValid={this.state.contactRecommended.isValid}
                        inputError={this.state.contactRecommended.errorMessage}
                        options={this.optionContact()}
                        value={this.state.contactRecommended.value}
                        onChange={(e) => this.onChangeLists("contactRecommended", e)}
                        secondClassName='specific-pt-required'
                        thirdClassName='no-pt-required'
                        typeContactToAdd={['all']}
                    />}
                    {this.state.originMandat.value === 'other' &&
                        <Input className='origin-mandat-input'
                            placeholder={lang.originMandatOtherPlaceHolder}
                            onChange={(e) => this.handleOtherDescription(e)}
                            value={this.state.otherDescription.value} />}
                </div>

            </div>
        </Collapse>
    }
}

const mapStateToProps = state => ({
    contact: state.contacts
});


export default connect(mapStateToProps, null)(OrgnismEditIntervenant)