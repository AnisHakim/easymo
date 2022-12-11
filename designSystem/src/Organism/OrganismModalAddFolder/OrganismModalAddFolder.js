import React from 'react'
import { Button, Icon, Input, Text } from '../../Atoms';
import translator from '../../lang/translator';
import { Modal } from '../../Modal';
import { MoleculeInput } from '../../Molecules';
function OrganismModalAddFolder(props) {
    const lang = translator('fr')

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            centered={true}
            dialogClassName={'modal-historique'}
        >
            <>
                <div className="modal-historique-header" >
                    <Text text={props.title} type='h4' />
                    <div className="close-modal-historique-container" >
                        <Icon className='close-modal-historique-icon' icon='clear' onClick={props.onHide} />
                    </div>
                </div>
                <div className="add-folder-input-container">
                    <MoleculeInput
                        placeholder={props.isRenameFile ? lang.renommerFichier : lang.ajouterUnDossier}
                        inputValue={props.folder.value}
                        onchangeInput={(e) => props.onChangeInput(e, "folder")}
                        isValid={props.folder.isValid}
                        isInvalid={props.folder.isInValid}
                        inputError={props.folder.errorMessage}
                        onKeyPress={props.onKeyPress}
                    />
                </div>
                <div className='flex justify-end border-top-container p-4' >
                    <Button type='filter' text={lang.cancel} className='mx-1 add-folder-cancel-btn' onClick={props.onHide} />
                    <Button text={lang.Sauvgarder} className='mx-1' onClick={props.addNewFolder} />
                </div>
            </>
        </Modal>
    )
}

export default OrganismModalAddFolder