import React from 'react';
import { Modal, Img, Icon } from '@easymo/designSystem'

const ModalFullImage = (props) => {
    return <Modal contentClassName='vw-100 vh-100 bg-transparent'
        dialogClassName='item-center flex justify-center vh-100 my-0 w-100'
        show={props.isImageFull}
        onHide={props.onChangeVisibilityFullImg}>
        <div className='h-100 item-center flex justify-center relative' >
            <div className="close-modal-historique-container absolute t-10 r-10 bg-white" onClick={props.onChangeVisibilityFullImg}>
                <Icon className='close-modal-historique-icon' icon='clear' />
            </div>
            <Img type={'full'} className={'full-screnn-img'} src={props.image} />
        </div>
    </Modal>;
};

export default ModalFullImage;
