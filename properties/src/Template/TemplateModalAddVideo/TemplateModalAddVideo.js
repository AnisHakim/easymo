import React from 'react';
import translator from '../../lang/translator'
import { Modal, Text, MoleculeInput, Switch, Img, Button, Icon, Tooltip, Iframe, apiURL } from '@easymo/designSystem'
import { getImageSrc } from '../../Organism/OrganismMedia/common';
const TemplateModalAddVideo = (props) => {
    const lang = translator('fr')
    const ref = React.useRef()
    const onScroll = (to) => {
        if (ref.current.scrollWidth > ref.current.clientWidth) {
            if (!to) {
                // ref.current.clientLeft
                ref.current.scrollLeft = ref.current.scrollLeft - 166
            } else {
                ref.current.scrollLeft = ref.current.scrollLeft + 166
            }
        }
    }
    return <Modal contentClassName=''
        dialogClassName='flex item-center modal-dialog-add-video'
        show={props.show}
        onHide={props.onHide}>
        <div className="basic-modal-header-video flex item-center">
            <Text
                type='h4'
                text={props.isImageEdit ? lang.photos : lang.videos}
                className='basic-modal-header-text-video'
            />
            <Button
                type='ghost'
                text=''
                icon='clear'
                className='button-header-basic-modal'
                iconClassName='icon-header-basic-modal'
                onClick={props.setOpenModal}
            />
        </div>
        <div className='container-modal-video w-100'>
            <div className=' flex w-100 justify-space-between pb-6 item-center'>
                <Icon icon='chevron_left' className='icon-chevron-modal-video pointer'
                    onClick={() => onScroll(false)}
                />
                <div className='flex scroll-container-imgs' ref={ref}>
                    {
                        props.list.map((element, index) => <div key={index} className='container-imgs mr-3 pointer'
                            onClick={() => props.changeElementToEdit(index)}>
                            {props.isImageEdit ?
                                <Img
                                    className='img-modal-video'
                                    src={getImageSrc(element.image)}
                                />
                                :
                                <Iframe className='img-modal-video'
                                    src={element.videoLink} />
                            }
                            <div className='overlay'></div>
                        </div>)
                    }
                </div>
                <Icon icon='chevron_right' className='icon-chevron-modal-video pointer'
                    onClick={() => onScroll(true)}
                />
            </div>
            {props.list[props.index] && <div className='row'>
                <div className='col-md-8 pl-5 pr-6 border-right-modal'>
                    {props.isImageEdit ?
                        <div className='flex item-center justify-center w-100 h-100'>
                            <Img
                                className='mw-100'
                                type="L"
                                src={getImageSrc(props.list[props.index].image)}
                            />
                        </div>
                        :
                        <Iframe className='iframe-media'
                            src={props.list[props.index]?.videoLink} />
                    }
                </div>
                <div className='col-md-4 pl-4'>
                    <div className="mb-5">
                        <MoleculeInput
                            inputClassname='input-add-equipement disabled-input-modal-media'
                            labelClassname="label-input-modal-media"
                            inputValue={props.isImageEdit ? props.list[props.index]?.videoName?.value : props.list[props.index]?.videoLink}
                            inputLabel={props.isImageEdit ? lang.imgLabel : props.selectedNavItem === 0 ? lang.videoLink : lang.visitLink}
                            labelTextType='h5'
                            disabled={!props.isImageEdit}
                            onchangeInput={(e) => props.isImageEdit && props.onChangeImg(e, 'videoName')}
                        />
                    </div>
                    <div className="mb-5">
                        <MoleculeInput
                            inputClassname='input-add-equipement'
                            labelClassname="label-input-modal-media"
                            placeholder={props.selectedNavItem === 0 ? lang.presentationOfVideo : lang.virtualVisitCorps}
                            inputLabel={props.isImageEdit ? lang.description : props.selectedNavItem === 0 ? lang.videoName : lang.virtualVisitName}
                            labelTextType='h5'
                            onchangeInput={(e) => props.isImageEdit ? props.onChangeImg(e, "description") : props.changeName(e)}
                            inputValue={props.isImageEdit ? props.list[props.index]?.description.value : props.list[props.index]?.videoName.value}
                        />
                    </div>
                    <div className='label-input-modal-media mb-2 pb-1'>
                        {lang.Diffusion}
                    </div>
                    <div className='text-modal-media mb-2'>
                        {lang.linkAgent}
                    </div>
                    <div className='flex item-center mb-3 mt-1'>
                        <Switch
                            onChange={() => props.changeSwitch('linkAgent')}
                            checked={props.list[props.index]?.linkAgent} />
                        <span className='text-switch-modal-media ml-3'>{props.linkAgent ? lang.oui : lang.non}</span>
                    </div>
                    <div className='text-modal-media mb-2'>
                        {lang.RealEstatePlatforms}
                    </div>
                    <div className='flex item-center mb-3 mt-1'>
                        <Switch
                            onChange={() => props.changeSwitch('RealEstatePlatforms')}
                            checked={props.list[props.index]?.RealEstatePlatforms} />
                        <span className='text-switch-modal-media ml-3'>{props.RealEstatePlatforms ? lang.oui : lang.non}</span>
                    </div>
                    <div className='text-modal-media mb-2'>
                        {lang.socialNetworks}
                    </div>
                    <div className='flex item-center mb-6 mt-1'>
                        <Switch
                            onChange={() => props.changeSwitch('socialNetworks')}
                            checked={props.list[props.index]?.socialNetworks} />
                        <span className='text-switch-modal-media ml-3'>{props.socialNetworks ? lang.oui : lang.non}</span>
                    </div>
                    <div className='flex justify-space-between flex-wrap'>
                        <Tooltip
                            tooltipText={lang.public}
                            withIcon={false}
                            element={() => <Button type='third'
                                icon={props.list[props.index].public ? 'visible_outlined' : "hidden_outlined"}
                                text={props.list[props.index].public ? lang.public : lang.private}
                                onClick={() => props.setPublic()} />
                            }
                        />
                        <Button text={lang.btnDeleted} className='btn-delete-modal-media' icon='delete'
                            onClick={() => props.removeElementFromModal(props.index)}
                            iconClassName='icon-delete-modal-media' />
                    </div>
                </div>
            </div>
            }
        </div>
        <div className='border-top  container-footer flex justify-flex-end'>
            <Button type='filter' text={lang.cancel} className='cancel-btn-modal-media ml-1 mr-1' onClick={props.setOpenModal} />
            <Button type='primary' text={lang.save} className='ml-1 mr-1' onClick={() => props.save()} />
        </div>
    </Modal>;
};

export default TemplateModalAddVideo;
