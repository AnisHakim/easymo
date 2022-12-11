import { OrganismAskForFile } from "../../Organism";
import React, { Component } from "react";
import { connect } from "react-redux";
import { renderInputObject } from "../../data/data";
import { apiFileRequest } from "../../Api/Properties/properties";
import lang from "../../lang/fr";
import { apiShareFile, apiShareFolder } from "../../Api/document";
class ModalDemandeFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactId: renderInputObject([this.getOwner()], "", false, false),
            type: renderInputObject("", "", false, false),
            message: renderInputObject("", "", false, false),
        };
    }
    onChangeContact = (e) => {
        this.setState({
            contactId: {
                value: e,
                isValid: e.length > 0,
                isInValid: e.length === 0,
                errorMessage: e.length > 0 ? null : lang.contactError
            }
        })
    }
    getOwner = () => {
        const idOwner = this.props.owner[0]
        const owner = this.props?.contact?.listOwner.filter(el => el._id === idOwner)
        return {
            value: owner[0]._id,
            label: owner[0].firstName + " " + owner[0].lastName,
        }
    }
    onChangeMessage = (e) => {
        this.setState({ message: { ...this.state.message, value: e.target.value } })
    }
    listContact = () => {
        const contact = this.props?.contact
        const data = [...contact.listAgent, ...contact.listAgentUser, ...contact.listBuyer, ...contact.listOwner, ...contact.listTenant]
        return data
    }
    onChangeSelect = (e) => {
        this.setState({
            type: { ...this.state.type, value: e.value }
        })
    }
    onSubmit = async () => {
        let body = {
            contactId: this.state.contactId.value.map(el => el.value),
            message: this.state.message.value
        }
        if (this.props.isShareFile) {
            let data = { ...body, fileId: this.props.sharedDocumentId }
            const response = await apiShareFile(JSON.stringify(data))
            if (response.statusCode === 200) {
                this.props.onHideAskForFileModal()
            }
        }
        else if (this.props.isShareFolder) {
            let data = { ...body, folderId: this.props.sharedDocumentId }
            const response = await apiShareFolder(JSON.stringify(data))
            if (response.statusCode === 200) {
                this.props.onHideAskForFileModal()
            }
        }
        else {
            if (this.state.contactId.value.length !== 0) {
                const data = { ...body, folderId: this.state.type.value }
                const response = await apiFileRequest(JSON.stringify(data))
                if (response.statusCode === 200) {
                    this.props.onHideAskForFileModal()
                }
            }
        }
    }
    render() {
        return (<OrganismAskForFile
            {...this.state}
            folderList={this.props.folderList}
            submit={this.onSubmit}
            onChangeMessage={this.onChangeMessage}
            onChangeSelect={this.onChangeSelect}
            onChangeContact={this.onChangeContact}
            listContact={this.listContact()}
            isModalAskForFileOpen={this.props.isModalAskForFileOpen}
            onChangeAskForFileModal={this.props.onChangeAskForFileModal}
            onHideAskForFileModal={this.props.onHideAskForFileModal}
            isShareFile={this.props.isShareFile}
            isShareFolder={this.props.isShareFolder}
            sharedDocumentId={this.props.sharedDocumentId}
        />);
    }
}
const mapStateToProps = (state) => ({
    contact: state.contacts,
});
export default connect(mapStateToProps, null)(ModalDemandeFile);