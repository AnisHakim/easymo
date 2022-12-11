import { TemplateModalAddEquipement } from '../../Template'
import translator from '../../lang/translator'
import React, { Component } from 'react';
import { formValidation, isEmpty } from '@easymo/designSystem'
import { apiListEquipementCategory, apiCreateEquipment } from '../../Api/Properties/properties';
const lang = translator('fr')
class ModalAddEquipement extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: {
                value: "",
                isValid: false,
                isInValid: false,
                errorMessage: '',
            },
            category: {
                value: "",
                isValid: false,
                isInValid: false,
                errorMessage: '',
            },
            description: {
                value: "",
                isValid: false,
                isInValid: false,
                errorMessage: '',
            },
            saveEquipement: false,
            listCategoryOptions: []
        }
    }
    getListCategories = async () => {
        const response = await apiListEquipementCategory();
        if (response.statusCode === 200) {
            const listCategories = response.data
            const listOptions = [];
            for (let index = 0; index < listCategories.length; index++) {
                const name = listCategories[index].name.filter(el => el.key === "fr")
                listOptions.push({
                    value: listCategories[index]._id,
                    label: name.length ? name[0].value : null,
                })
            }
            this.setState({
                listCategoryOptions: listOptions
            })
        }
    }

    componentDidMount() {
        this.getListCategories();
    }
    onChange = (e, key) => {
        if (key === 'name') {
            this.setState({
                [key]: {
                    ...this.state[key],
                    value: e.target.value,
                    isInValid: isEmpty(e.target.value),
                    isValid: !isEmpty(e.target.value),
                }
            })
        } else {
            this.setState({
                [key]: {
                    ...this.state[key],
                    value: e.target.value,
                }
            })
        }

    }
    onChangeStatus = (e) => {
        this.setState({
            category: {
                ...this.state.category,
                value: e.value,
                isInValid: isEmpty(e.value),
                isValid: !isEmpty(e.value),
                errorMessage: isEmpty(e.value) && lang.countryError
            }
        })
    }
    changeSwitch = () => {
        this.setState({
            saveEquipement: !this.state.saveEquipement
        })
    }
    submit = async () => {
        const validation = [
            { value: "name", validation: [{ error: lang.internIdentificationError, type: 'isNotEmpty' }] },
            { value: "category", validation: [{ error: lang.categoryError, type: 'isNotEmpty' }] },
        ]
        const { res, verif } = formValidation(validation, this.state)
        if (!verif) {
            this.setState({
                ...this.state,
                ...res
            })
        } else {
            const response = await apiCreateEquipment(JSON.stringify({ name: this.state.name.value, category: this.state.category.value }))
            if (response.statusCode === 200) {
                this.props.setShowModal && this.props.setShowModal(false);
                this.props.getDataFromModal && this.props.getDataFromModal({
                    ...response.data,
                    description: this.state.description.value,
                    saveEquipement: this.state.saveEquipement
                })
            }
        }
    }
    render() {
        return (
            <TemplateModalAddEquipement
                show={this.props.show}
                setShowModal={this.props.setShowModal}
                onHide={this.props.onHide}
                changeSwitch={this.changeSwitch}
                onChangeStatus={this.onChangeStatus}
                onChange={this.onChange}
                submit={this.submit}
                {...this.state} />
        );
    }
}

export default ModalAddEquipement;