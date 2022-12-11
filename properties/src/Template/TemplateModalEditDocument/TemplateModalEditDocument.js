import React from "react";
import { Modal, Button, Text, MoleculeInput, AddAgent, Tooltip, Select, RenderFile, } from "@easymo/designSystem";
import translator from "../../lang/translator";
import { renderIconTooltipObject } from "../../data/data";
const lang = translator("fr");
function TemplateModalEditDocument(props) {
  const renderFolderList = () => {
    const newList = props.folderList.filter(el => el._id !== props.fileToShow._id)
    const list = newList.map(el => { return { value: el._id, label: el.name } })
    return [{ value: "root", label: lang.notSpecificated }, ...list]
  }
  return (
    <Modal
      contentClassName=""
      dialogClassName="modal-update-file"
      show={props.showModal}
      onHide={false}
      centered={true}
    >
      <div className="basic-modal-header-video flex item-center">
        <Text
          type="h4"
          text={lang.editDocument}
          className="basic-modal-header-text-video"
        />
        <Button
          type="ghost"
          text=""
          icon="clear"
          className="button-header-basic-modal"
          iconClassName="icon-header-basic-modal"
          onClick={props.onCloseViewModal}
        />
      </div>
      <div className="container-modal-video w-100 update-document-body-modal">
        <div className="row mb-4">
          <div className="col-md-8 pl-5 pr-6 border-right-modal flex item-center justify-space-between">

            <div className="img-modal-document w-100">
              <RenderFile fileId={props?.fileToShow?._id} type={props?.fileToShow?.type} name={props?.fileToShow?.name} />
            </div>

          </div>
          <div className="col-md-4 pl-4">
            <div className="mb-5">
              <Select
                labelClassname="label-input-modal-document"
                inputLabel={lang.documentType}
                placeholder={lang.selectType}
                className="select-add-equipement"
                options={renderFolderList()}
                onChange={(e) => props.onChangeSelect(e)}
                value={props.fileToShow.folderId}
                optionClassName="option-select-proximity"
              />
            </div>
            <div className="mb-5">
              <MoleculeInput
                inputClassname="input-add-equipement disabled-input-modal-media"
                labelClassname="label-input-modal-document"
                inputValue={props.fileToShow.name}
                inputLabel={lang.fileName}
                labelTextType="h5"
                placeholder={lang.placeholderFileName}
                onchangeInput={(e) => props.onChangeName(e)}
              />
            </div>
            <div className="mb-5">
              <Select
                labelClassname="label-input-modal-document"
                inputLabel={lang.user}
                placeholder={lang.selectType}
                className="select-add-equipement"
                options={props?.listAgent?.map((el) => {
                  return {
                    value: el._id,
                    label: el.firstName + " " + el.lastName,
                  };
                })}
                onChange={(e) => props.onChangeLists(e)}
                value={props.fileToShow.userId}
                optionClassName="option-select-proximity"
              />
            </div>
            <div className="mb-5">
              <AddAgent
                labelClassname="label-input-modal-document"
                full
                inputLabel={lang.contacts}
                listIcons={[
                  renderIconTooltipObject(
                    "help_outlined",
                    true,
                    lang.tooltipContact,
                    "tooltip-icon-modal-document ml-1"
                  ),
                ]}
                value={props.fileToShow.documentContact}
                onChange={(e) => props.onChangeContact(e)}
                options={props?.listOwner?.map((el) => {
                  return {
                    value: el._id,
                    label: el.firstName + " " + el.lastName,
                  };
                })}
              />
            </div>
            <div className="mb-5">
              <MoleculeInput
                disabled
                withIconStart
                startIcon="update"
                inputClassname="input-add-equipement disabled-input-modal-media"
                labelClassname="label-input-modal-document"
                inputLabel={lang.sendDocumentDate}
                labelTextType="h5"
                placeholder={lang.sendDocumentDatePlaceholder}
              />
            </div>
            <div className="flex justify-space-between flex-wrap">
              <Tooltip
                tooltipText={lang.public}
                withIcon={false}
                element={() => (
                  <Button
                    type="third"
                    icon={
                      props.fileToShow?.isPublic ? "visible_outlined" : "hidden_outlined"
                    }
                    text={props.fileToShow?.isPublic ? lang.public : lang.private}
                    onClick={() => props.setPublic()}
                  />
                )}
              />
              <Button
                text={lang.btnDeleted}
                className="btn-delete-modal-media-2"
                icon="delete"
                onClick={props.onDeleteDocument}
                iconClassName="icon-delete-modal-media"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8"></div>
        </div>
      </div>
      <div className="border-top  container-footer flex justify-flex-end">
        <Button
          type="filter"
          text={lang.cancel}
          className="cancel-btn-modal-media ml-1 mr-1"
          onClick={props.onCloseViewModal}
        />
        <Button
          type="primary"
          text={lang.save}
          className="ml-1 mr-1"
          onClick={() => props.onSave()}
        />
      </div>
    </Modal>
  );
}

export default TemplateModalEditDocument;
