import React, { useState } from 'react';
import translator from '../../lang/translator'
import { Modal, Text, MoleculeInput, Button, Select, GoogleMaps, InputGoogleMaps, Tooltip } from '@easymo/designSystem'
import { proximityOptions } from '../../data/data';
const lang = translator('fr')
const TemplateModalAddProximity = (props) => {
    return <Modal
        contentClassName=''
        dialogClassName='flex item-center modal-add-Proximity'
        show={props.show}>
        <div className="basic-modal-header-video flex item-center">
            <div className='flex item-center'>
                <span className='modal-add-priximity-label'>
                    {lang.addPointOfInterest}
                </span>
                <Tooltip
                    icon='help_outlined'
                    iconClassname='icon-header-proximity ml-1'
                    tooltipText={lang.addPointOfInterestTooltip}
                    place='right'
                />
            </div>
            <Button
                type='ghost'
                text=''
                icon='clear'
                className='button-header-basic-modal'
                iconClassName='icon-header-basic-modal'
                onClick={props.closeModal}
            />
        </div>
        <div className='containter-modal-add-proximity'>
            <div className='mb-4'>
                <Text className='text-add-proxmity' text={lang.manually} />
            </div>
            <div className='row px-4'>
                <div className='col-sm-6 col-lg-3  mb-5'>
                    <Select
                        isOptionwithIcon
                        labelClassname='color-label-modal-proximity'
                        inputLabel={lang.type}
                        placeholder={lang.selectType}
                        className="select-add-equipement"
                        options={(proximityOptions(lang))}
                        onChange={(e) => props.onChangeSelect(e)}
                        value={props.type.value}
                        optionClassName='option-select-proximity'
                        inputError={props.type.errorMessage}
                        isValid={props.type.isValid}
                        isInvalid={props.type.isInValid}
                    />
                </div>
                <div className='col-sm-6 col-lg-3  mb-5'>
                    <MoleculeInput
                        inputClassname='input-add-equipement'
                        labelClassname='color-label-modal-proximity'
                        placeholder={lang.namePointOfInterestPlaceHolder}
                        inputLabel={lang.name}
                        labelTextType='h5'
                        onchangeInput={(e) => props.onChange(e, 'pointOfInterest')}
                        inputValue={props.pointOfInterest.value}
                        isValid={props.pointOfInterest.isValid}
                        isInvalid={props.pointOfInterest.isInValid}
                        inputError={props.pointOfInterest.errorMessage}
                    />
                </div>
                <div className='col-sm-6 col-lg-3  mb-5'>
                    <MoleculeInput
                        inputClassname='input-add-equipement'
                        labelClassname='color-label-modal-proximity'
                        placeholder={lang.distancePointOfInterestPlaceHolder}
                        inputLabel={lang.distanceInKm}
                        labelTextType='h5'
                        onchangeInput={(e) => props.onChangeNumber(e, 'distance')}
                        inputValue={props.distance.value}
                        isValid={props.distance.isValid}
                        isInvalid={props.distance.isInValid}
                        inputError={props.distance.errorMessage}
                    />
                </div>
                <div className='col-sm-6 col-lg-3  mb-5'>
                    <MoleculeInput
                        inputClassname='input-add-equipement'
                        labelClassname='color-label-modal-proximity'
                        placeholder={lang.timePointOfInterestPlaceHolder}
                        inputLabel={lang.timePtOfInterest}
                        labelTextType='h5'
                        onchangeInput={(e) => props.onChangeNumber(e, 'time')}
                        inputValue={props.time.value}
                        isValid={props.time.isValid}
                        isInvalid={props.time.isInValid}
                        inputError={props.time.errorMessage}
                    />
                </div>
            </div>
            <div className='mb-4'>
                <Text className='text-add-proxmity' text={lang.orSearchWithGoogleMaps} />
            </div>
            <div className='row'>
                <div className='col px-6'>
                    <div className='mb-4'>
                        <InputGoogleMaps
                            placeholder={lang.searchWithGoogleMap}
                            inputLabel=''
                            labelTextType='h5'
                            withIconStart
                            startIcon='search'
                            getAdress={props.getAdress}
                            getTextAddress={props.getTextAddress}
                        />
                    </div>
                    <GoogleMaps
                        defaultCenter={props?.defaultCenter}
                        defaultZoom={12}
                        containerClassName='height-map-modal-proximity'
                        addressLatLng={props.address}
                        getTypeOfPlace={props.getTypeOfPlace} />
                </div>
            </div>
        </div>
        <div className='border-top  container-footer flex justify-flex-end'>
            <Button type='filter' text={lang.close} className='cancel-button-add-equipement ml-1 mr-1' onClick={props.closeModal} />
            <Button type='primary' text={lang.save} className='ml-1 mr-1' onClick={props.save} />
        </div>
    </Modal>;
};

export default TemplateModalAddProximity;
