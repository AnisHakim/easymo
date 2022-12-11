import React from 'react'
import { Button, Icon, Text } from '../../Atoms';
import { Modal } from '../../Modal'
import translator from '../../lang/translator';
import { Select } from '../../Molecules';
const lang = translator('fr')

function OrganismMoveFolder(props) {
    const renderSelectOptions = () => {
        const newList = props.folderList.filter(el => el._id !== props.folderToMove._id)
        const listfolderDeleted = []
        for (let index = 0; index < newList.length; index++) {
            if (newList[index].parentFolder === props.folderToMove._id || newList[index]._id === props.folderToMove.parentFolder) {
                listfolderDeleted.push(newList[index]._id)
            } else {
                for (let j = 0; j < listfolderDeleted.length; j++) {
                    if (newList[index].parentFolder === listfolderDeleted[j]) {
                        listfolderDeleted.push(newList[index]._id)
                    }
                }
            }
        }
        const list = newList.filter(el => listfolderDeleted.indexOf(el._id) === -1).map(el => { return { value: el._id, label: el.name } })
        if (props.folderToMove.parentFolder) {
            return [{ value: "root", label: lang.notSpecificated }, ...list]
        }
        return list
    }
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            centered={true}
            dialogClassName={'modal-historique'}
        >
            <div className='mx-4 mt-3 flex justify-space-between'>
                <Text text={lang.selectionnerDossier} type="h5" className='mb-0 modal-add-contact-title' />
                <div className="close-modal-historique-container" >
                    <Icon className='close-modal-historique-icon' icon='clear' onClick={props.onHide} />
                </div>
            </div>
            <div className='px-4 pt-4 pb-6'>
                <Select
                    placeholder={lang.selectionnerDossier}
                    className='doc-upload-input'
                    options={renderSelectOptions()}
                    value={props.selectedValue}
                    onChange={(e) => props.onSelectChange(e)}
                    optionClassName='option-select-status-identification'
                    menuPlacement={'top'}
                />
            </div>
            <div className='flex justify-end border-top-container padding' >
                <Button type='filter' text={lang.cancel} className='mr-2 add-contact-cancel-button' onClick={props.onHide} />
                <Button text={lang.envoyer} onClick={props.onSubmit} />
            </div>
        </Modal>
    )
}

export default OrganismMoveFolder