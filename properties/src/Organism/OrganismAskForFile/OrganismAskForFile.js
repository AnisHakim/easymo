import React from 'react'
import translator from '../../lang/translator'
import { Modal, Text, AddAgent, Button, Select, Icon, viewLabel, MoleculeInput } from "@easymo/designSystem";
import { renderIconTooltipObject, documentTypeOptions } from '../../data/data';
const lang = translator('fr')

function OrganismAskForFile(props) {
    const renderFolderList = () => {
        const list = props.folderList.map(el => { return { value: el._id, label: el.name } })
        return [{ value: "root", label: lang.notSpecificated }, ...list]
    }
    return (
        <Modal
            show={props.isModalAskForFileOpen}
            onHide={props.onHideAskForFileModal}
            centered={true}
            contentClassName="add-file-modal-container"
            dialogClassName='ask-for-file-tab-modal-container'
        >
            <div className='p-5'>
                <div className='flex justify-space-between'>
                    <Text text={props.isShareFolder ? lang.partagerDossier : props.isShareFile ? lang.partagerFichier : lang.demandeFiles} type="h5" className='mb-0 modal-add-contact-title' />
                    <div className="close-modal-historique-container" >
                        <Icon className='close-modal-historique-icon' icon='clear' onClick={props.onHideAskForFileModal} />
                    </div>
                </div>
                <div className='pt-4'>
                    {viewLabel({
                        label: lang.Contact,
                        labelClass: 'ask-file-label',
                        listIcons: [
                            renderIconTooltipObject("help_outlined", true, lang.askFiletooltip, 'ask-file-tooltip-icon')
                        ]
                    })}
                    <AddAgent
                        notMb
                        containerClassName={`w-100 mb-0  ${props?.contactId?.errorMessage ? 'padding-input-modal-files-error' : 'padding-input-modal-files'}`}
                        withoutRow
                        placeholder={lang.contactPlaceHolder}
                        value={props?.contactId?.value}
                        isInvalid={props?.contactId?.isInValid}
                        isValid={props?.contactId?.isValid}
                        inputError={props?.contactId?.errorMessage}
                        onChange={(e) => props.onChangeContact(e)}
                        options={props.listContact.map((el) => {
                            return {
                                value: el._id,
                                label: el.firstName + " " + el.lastName,
                            };
                        })}

                    />
                </div>
                {!(props.isShareFile || props.isShareFolder) && <div className='padding-input-modal-files'>
                    {viewLabel({
                        label: lang.typeDeFichier,
                        labelClass: 'ask-file-label',
                    })}
                    <Select
                        placeholder={lang.selectTypeFile}
                        className='doc-upload-tab-select doc-upload-input w-100'
                        options={renderFolderList()}
                        value={props.type.value}
                        onChange={(e) => props.onChangeSelect(e)}
                        optionClassName='option-select-status-identification'
                        menuPlacement={'bottom'}
                    />
                </div>}
                <div className='padding-input-modal-files'>
                    {viewLabel({
                        label: lang.Message,
                        labelClass: 'ask-file-label',
                    })}
                    <MoleculeInput
                        placeholder={lang.askFileTextArea}
                        inputClassname='adminitratif-text-area'
                        onchangeInput={(e) => props.onChangeMessage(e)}
                        inputValue={props.message.value}
                        as='textarea'
                    />
                </div>
            </div>
            <div className='flex justify-end padding-modal-files border-top' >
                <Button type='filter' text={lang.cancel} className='mr-2 add-contact-cancel-button' onClick={props.onHideAskForFileModal} />
                <Button text={lang.Envoyer} onClick={props.submit} />
            </div>
        </Modal>
    )
}

export default OrganismAskForFile