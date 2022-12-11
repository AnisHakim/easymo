import React, { Component } from 'react';
import { Collapse, TransactionNav, InputSwitch, Button } from '@easymo/designSystem';
import translator from "../../lang/translator";
import { apiListEquipements, apiUpdateEquipment } from '../../Api/Properties/properties';
import ModalAddEquipement from '../../Modal/ModalAddEquipement/ModalAddEquipement';
const lang = translator('fr')
class OrganismEquipements extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            selectedNavItem: 0,
            listNavEquipements: [],
            isUpdated: false,
            selectedList: [],
        }
    }
    formatListElements = (listElements) => {
        const list = []
        for (let index = 0; index < listElements.length; index++) {
            const name = listElements[index].name.filter(el => el.key === "fr")
            list.push({
                id: listElements[index]._id,
                text: name.length ? name[0].value : null,
                icon: listElements[index].icon
            })
        }
        return list
    }
    getListEquipements = async () => {
        const response = await apiListEquipements();
        if (response.statusCode === 200) {
            const data = response.data
            const list = []
            for (let index = 0; index < data.length; index++) {
                const name = data[index].name.filter(el => el.key === "fr")
                const listElements = this.formatListElements(data[index].listEquipment)
                list.push({
                    isActive: index === 0,
                    id: data[index]._id,
                    value: name.length ? name[0].value : null,
                    listElements: listElements.length ? listElements : []
                })
            }
            this.setState({
                listNavEquipements: list
            })
        }
    }
    submit = async () => {
        this.props.setLoader(false)
        this.props.onChangeIdentificationError("Equipements", false)
        const body = {
            'id': this.props.propertie.id ? this.props.propertie.id : this.props.propertie._id,
            'listEquipment': this.state.selectedList.map(el => { return { equipmentId: el.id, description: el.description } })
        }
        const response = await apiUpdateEquipment(JSON.stringify(body))
        if (response.statusCode === 200) {
            this.props.dataUpdated('equipement')
            this.setState({
                isUpdated: false
            })
        } else {
            this.props.onChangeIdentificationError("Equipements", true)
            this.props.setLoader(false)
        }
    }
    formatdata = () => {
        let list = []
        if (this.props?.propertie?.equipment?.length) {
            list = this.props?.propertie?.equipment.map(el => { return { id: el.equipmentId, description: el.description } })
        }
        this.setState({
            selectedList: list
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.isCallAPi !== prevProps.isCallAPi && this.state.isUpdated) {
            this.submit()
        }
        if (this.props.isPropertieLoaded !== prevProps.isPropertieLoaded) {
            this.getListEquipements();
            this.formatdata()
        }
    }
    onClickNavItem = (index) => {
        let newlist = this.state.listNavEquipements.map(el => { return { ...el, isActive: false } })
        newlist[index].isActive = true
        this.setState({ listNavEquipements: newlist, selectedNavItem: index })
    }
    setShowModal = (bool) => {
        this.setState({ showModal: bool })
    }
    getDataFromModal = (data) => {
        this.getListEquipements();
        if (data.saveEquipement) {
            const list = [...this.state.selectedList]
            list.push({
                description: data.description,
                id: data._id
            })
            this.setState({ selectedList: list, isUpdated: true });
        }
    }
    onChange = (e, id) => {
        const list = [...this.state.selectedList]
        const index = list.findIndex(el => el.id === id)
        if (e.checked) {
            if (index === -1) {
                list.push({
                    description: e.inputValue,
                    id: id
                })
            } else {
                list[index].description = e.inputValue
            }

        } else if (index !== -1) {
            list.splice(index, 1)
        }
        this.setState({
            selectedList: list,
            isUpdated: true
        })
    }
    getElmementState = (id) => {
        const index = this.state.selectedList.findIndex(el => el.id == id)
        if (index !== -1)
            return {
                checked: true,
                description: this.state.selectedList[index].description
            }
        else {
            return {
                checked: false,
                description: ""
            }
        }
    }
    render() {
        return (
            <>
                {this.state.showModal && <ModalAddEquipement show={this.state.showModal}
                    setShowModal={this.setShowModal}
                    getDataFromModal={this.getDataFromModal} />
                }
                <Collapse title={lang.equipements} iconStart="all_done">
                    <div className="row flex-wrap">
                        <div className="col-sm-12 mb-7">
                            <TransactionNav
                                listNav={this.state.listNavEquipements} onClickNavItem={(index) => this.onClickNavItem(index)} />
                        </div>
                    </div>
                    {this.state.listNavEquipements.length ? <div className='row  mb-4'>
                        <div className='col-sm-6 border-right pr-4 pl-4'>
                            {this.state.listNavEquipements[this.state.selectedNavItem]?.listElements
                                && this.state.listNavEquipements[this.state.selectedNavItem]?.listElements?.map((el, index) => index % 2 === 0 ?
                                    <InputSwitch
                                        key={index}
                                        onChange={(e) => this.onChange(e, el.id)}
                                        text={el.text}
                                        icon={el.icon}
                                        contentClassName='switch-compo'
                                        inputClassname='input-switch-equipment'
                                        border={index !== (this.state.listNavEquipements[this.state.selectedNavItem]?.listElements?.length - 1)
                                            && index !== (this.state.listNavEquipements[this.state.selectedNavItem]?.listElements?.length - 2)}
                                        value={this.getElmementState(el.id)}
                                    />
                                    : null)
                            }
                        </div>
                        <div className='col-sm-6 pr-4 pl-4'>
                            {this.state.listNavEquipements[this.state.selectedNavItem]?.listElements
                                && this.state.listNavEquipements[this.state.selectedNavItem]?.listElements?.map((el, index) => index % 2 !== 0 ?
                                    <InputSwitch
                                        key={index}
                                        onChange={(e) => this.onChange(e, el.id)}
                                        text={el.text}
                                        icon={el.icon}
                                        contentClassName='switch-compo'
                                        inputClassname='input-switch-equipment'
                                        value={this.getElmementState(el.id)}
                                        border={index !== (this.state.listNavEquipements[this.state.selectedNavItem]?.listElements?.length - 1)
                                            && index !== (this.state.listNavEquipements[this.state.selectedNavItem]?.listElements?.length - 2)} />
                                    : null)
                            }
                            <div className='container-button-equipment'>
                                <div className='flex flex justify-flex-end mt-6'>
                                    <Button text={lang.addEquipementButton} type='secondary' icon='add' className='button-add-equipement' onClick={() => this.setShowModal(true)} />
                                </div>
                            </div>
                        </div>
                    </div>
                        : null}
                </Collapse>
            </>
        );
    }
}

export default OrganismEquipements;