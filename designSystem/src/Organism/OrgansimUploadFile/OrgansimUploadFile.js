import React from 'react'
import { useRef } from 'react'
import { browseFile } from '../../assets/svg/svg'
import { Button, Icon, Text } from '../../Atoms'
import translator from '../../lang/translator'
import { Modal } from '../../Modal'
import MoleculeDragUpload from '../../Molecules/MoleculeDragUpload/MoleculeDragUpload'

const lang = translator('fr')
function OrgansimUploadFile(props) {

    return (
        <Modal
            show={props.isModalOpen}
            onHide={props.onChangeUploadFileModal}
            centered={true}
            dialogClassName={'upload-file-modal-container'}
        >
            <>
                <div className='upload-modal-body flex justify-space-between'>
                    <Text text={lang.ajouterDesFichiers} type="h5" className='mb-0 modal-add-contact-title' />
                    <div className="close-modal-historique-container" >
                        <Icon className='close-modal-historique-icon' icon='clear' onClick={props.onChangeUploadFileModal} />
                    </div>
                </div>
                <div className='p-4'>
                    <MoleculeDragUpload uploadFile={props.uploadFile} />
                </div>
                <div className='flex justify-end border-top-container padding' >
                    <Button type='filter' text={lang.cancel} className='mr-2 add-contact-cancel-button' onClick={props.onChangeUploadFileModal}
                    />
                    <Button text={lang.envoyer} onClick={props.sendFile} />
                </div>
            </>
        </Modal>
    )
}
export default OrgansimUploadFile