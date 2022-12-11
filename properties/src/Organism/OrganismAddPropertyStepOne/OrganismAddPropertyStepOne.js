import React, { useState } from 'react'
import translator from '../../lang/translator';
import { Icon, Button } from '@easymo/designSystem'
const OrganismAddPropertyStepOne = (props) => {
    const lang = translator('fr');
    return (
        <div className='modal-organism-container'>
            {props.data.map(element =>
                <>  <div className='flex flex-wrap flex-direction-col'>
                                     <label className={`text-modal-organism-step-one ${props.isInValidType[element.key]?'invalid-type-text' : 'mb-3'}`}>{element.label}</label>
                    {props.isInValidType[element.key]&& <label className='invalid-type-text mb-3 mt-1'>{element.errorMessage}</label>}
                </div>
                    <div className='row mb-1'>
                    {element.list.map(el =>
                                <div className='col-sm-6 col-md-4 col-lg-3 text-center mb-3'>
                                    <div className='custom-checkbox-card mb-2' onClick={() => props.handleClickStepOne(element.key, el.id)}>
                                        <div className='custom-checkbox-card-label flex flex-direction-col justify-center'>
                                            <div className='modal-add-property-img max-width-img-property'>
                                                {el.src}
                                            </div>
                                            <label className={`${el.id === props.type[element.key] && 'custom-checkbox-card-text-checked'} custom-checkbox-card-text`}>
                                            {el.type}
                                        </label>
                                        </div>
                                        {el.id === props.type[element.key] && <Icon icon='checkmark_circle' className='custom-checkbox-card-icon' />}
                                    </div>
                                </div>
                            )}
                    </div>
                </>
    )
}

<Button text={lang.next} type='primary' onClick={() => props.onChooseStep(props.index, 1)}
    className='button-next-modal-organism-stepone' icon='chevron_right' iconRight />
        </div >
    )
}

export default OrganismAddPropertyStepOne
