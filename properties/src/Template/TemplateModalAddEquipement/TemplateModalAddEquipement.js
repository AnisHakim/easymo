import React, { useState } from 'react';

import { Modal, MoleculeInput, Select, viewLabel, Switch, Button } from '@easymo/designSystem'
import translator from '../../lang/translator'
const TemplateModalAddEquipement = (props) => {
    const lang = translator('fr')
    return <Modal contentClassName=''
        dialogClassName='flex item-center modal-dialog-add-equipement'
        show={props.show}
        onHide={props.onHide}
    >
        <div className='basic-modal-content flex flex-direction-col px-4 py-4'>
            <span className='text-add-equipement'>{lang.addNewEquipement}</span>
            <div className="mb-5">
                <MoleculeInput
                    inputClassname='input-add-equipement'
                    labelClassname="label-input-add-equipement"
                    placeholder={lang.name}
                    inputLabel={lang.name}
                    labelTextType='h5'
                    onchangeInput={(e) => props.onChange(e, 'name')}
                    inputValue={props.name.value}
                    isValid={props.name.isValid}
                    isInvalid={props.name.isInValid}
                    inputError={props.name.errorMessage}
                    errorClassname='error-msg-inputs'
                />
            </div>
            <div className='w-100 mb-5'>
                <Select
                    labelClassname='label-input-add-equipement'
                    inputLabel={lang.category}
                    placeholder={lang.selectCategory}
                    className="select-add-equipement"
                    options={props.listCategoryOptions}
                    onChange={(e) => props.onChangeStatus(e)}
                    value={props.category.value}
                    isValid={props.category.isValid}
                    isInvalid={props.category.isInValid}
                    inputError={props.category.errorMessage}
                    optionClassName='option-select-status-identification'
                    errorClassname='mb-0'
                />
            </div>
            <div className="mb-5">
                <MoleculeInput
                    inputClassname='input-add-equipement'
                    labelClassname="label-input-add-equipement"
                    placeholder={lang.description}
                    inputLabel={lang.description}
                    labelTextType='h5'
                    onchangeInput={(e) => props.onChange(e, 'description')}
                    inputValue={props.description.value}
                    isValid={props.description.isValid}
                    isInvalid={props.description.isInValid}
                    inputError={props.description.errorMessage}
                    errorClassname='error-msg-inputs'
                />
            </div>
            <div>
                {viewLabel({
                    label: lang.saveEquipement, listIcons: [
                        {
                            icon: "help_outlined",
                            tooltip: true,
                            tooltipText: lang.saveEquipementTooltip,
                            iconClassname: 'tooltip-icon-label',
                        }

                    ],
                    labelClass: 'text-save-add-equipement'
                })}
            </div>
            <div className='flex item-center mb-5'>
                <Switch
                    onChange={() => props.changeSwitch()}
                    checked={props.saveEquipement} />
                <span className='ml-3'>{props.saveEquipement ? lang.oui : lang.non}</span>
            </div>
        </div>
        <div className='border-top  flex justify-flex-end px-4 py-4'>
            <Button type='filter' text={lang.cancel} className='cancel-button-add-equipement ml-1 mr-1' onClick={() => props.setShowModal(false)} />
            <Button icon='add' type='primary' text={lang.addEquipement} className='ml-1 mr-1' onClick={() => props.submit()} />
        </div>
    </Modal>
};

export default TemplateModalAddEquipement;
