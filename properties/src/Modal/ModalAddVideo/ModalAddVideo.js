
import React, { Component } from 'react';
import translator from '../../lang/translator'
import { TemplateModalAddVideo } from '../../Template'
const lang = translator('fr')
class ModalAddVideo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            index: 0
        }
    }
    changeSwitch = (key) => {
        const list = [...this.state.list]
        list[this.state.index][key] = !list[this.state.index][key]
        this.setState({
            list: list
        })
        this.props.setIsUpdated(true);
    }
    changeName = (e) => {
        const list = [...this.state.list]
        list[this.state.index].videoName.value = e.target.value
        this.setState({
            list: list
        })
        this.props.setIsUpdated(true);
    }
    save = () => {
        this.props.getDataFromModal && this.props.getDataFromModal(this.state.list)
    }
    changePublic = () => {
        const list = [...this.state.list]
        list[this.state.index].public = !list[this.state.index].public
        this.props.setIsUpdated(true);
    }
    componentDidMount() {
        this.setState({
            list: this.props.listToEdit,
            index: this.props.indexVideo,
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if ((this.props.listToEdit != prevProps.listToEdit) || (this.props.listToEdit !== prevState.list)) {
            this.setState({
                list: this.props.listToEdit
            })
        }
        if (this.props.indexVideo != prevProps.indexVideo) {
            this.setState({
                index: this.props.indexVideo
            })
        }
    }

    changeElementToEdit = (index) => {
        this.setState({ index: index })
    }
    onChangeImg = (e, key) => {
        const list = [...this.state.list]
        list[this.state.index][key].value = e.target.value
        this.setState({
            list: list
        })
        this.props.setIsUpdated(true);
    }
    render() {
        return <TemplateModalAddVideo
            {...this.state}
            selectedNavItem={this.props.selectedNavItem}
            changeSwitch={this.changeSwitch}
            changeName={this.changeName}
            setOpenModal={this.props.setOpenModal}
            setPublic={this.changePublic}
            save={this.save}
            show={true}
            removeElementFromModal={this.props.removeElementFromModal}
            changeElementToEdit={this.changeElementToEdit}
            isImageEdit={this.props.isImageEdit}
            onChangeImgName={this.onChangeImgName}
            onChangeDesscription={this.onChangeDesscription}
            onChangeImg={this.onChangeImg}
        />;
    }
}

export default ModalAddVideo;