import React from 'react';
import { Modal } from '../../Modal'
import { Text, Icon, Button, Img } from '../../Atoms'
import translator from '../../lang/translator';
function OrganismeModalPreview(props) {
    const lang = translator('fr')
    return <Modal
        show={props.show}
        onHide={props.onHide}
        centered={true}
        dialogClassName={'modal-historique'}
        contentClassName={'modal-historique-content'}
    >
        <>
            <div className="modal-historique-header" >
                <Text text={props.title} type='h4' />
                <div className="close-modal-historique-container" >
                    <Icon className='close-modal-historique-icon' icon='clear' onClick={props.onHide} />
                </div>
            </div>
            <div className="modal-historique-body" >
                {props.type === 'img' ? <Img type='FULL' src={props.url} /> : null}
                <iframe src="https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea%20Brochure.pdf"
                    type="application/pdf"></iframe>

            </div>
            {props.withFooterBtn && <div className='flex justify-end border-top-container padding' >
                <Button type='delete' text={lang.cancel} className='mx-1 cancel-btn-modal' />
                <Button text={lang.Sauvgarder} className='mx-1' />
            </div>}
        </>
    </Modal>;
}

export default OrganismeModalPreview;
