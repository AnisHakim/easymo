import React, { Component } from "react";
import { TemplateModalEditDocument } from "../../Template";
import { connect } from "react-redux";
import { renderInputObject } from "../../data/data";
class ModalEditDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      folderId: null,
      type: renderInputObject("", "", false, false),
      contactId: renderInputObject([], "", false, false),
      userId: renderInputObject([], "", false, false),
      isPublic: true,
      name: renderInputObject("", "", false, false),
    };
  }

  render() {
    return (
      <TemplateModalEditDocument
        {...this.state}
        showModal={this.props.isViewDocumentModalOpened}
        setShowModal={this.props.onViewFile}
        onCloseViewModal={this.props.onCloseViewModal}
        onChangeSelect={this.props.onChangeFolder}
        onChangeName={this.props.onChangeDocumentName}
        setPublic={this.props.updateDocumentStatus}
        onDeleteDocument={this.props.onDeleteDocument}
        onChangeLists={this.props.onChangeDocumentUser}
        onChangeContact={this.props.onChangeContact}
        listOwner={this.props?.contact?.listOwner}
        listAgent={this.props?.contact?.listAgentUser}
        fileToShow={this.props.fileToShow}
        folderList={this.props.folderList}
        onSave={this.props.updateDocument}

      />
    );
  }
}
const mapStateToProps = (state) => ({
  contact: state.contacts,
});

export default connect(mapStateToProps, null)(ModalEditDocument);
