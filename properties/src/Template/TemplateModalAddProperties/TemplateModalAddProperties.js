import React, { useState } from "react"
import translator from '../../lang/translator'
import { Modal, Text, Button, Stepper, ModalInfo } from '@easymo/designSystem'
import { OrganismAddPropertyStepOne, OrganismAddPropertyStepTwo, OrganismAddPropertyStepThree } from "../../Organism"
export default function TemplateModalAddProperties(props) {
    const lang = translator('fr')
    return <Modal
        contentClassName='basic-modal-content flex flex-direction-col px-3 py-3'
        dialogClassName={`flex item-center modal-dialog-add-property`}
        show={props.show}
        onHideAnnimation
    >
        {props.showModalInfo && <ModalInfo
            show={props.showModalInfo}
            onHide={props.onHideModalInfo}
            description={props.msgInfo}
            type={"error"}
        />}
        <div className="basic-modal-header flex item-center">
            <Text
                type='h4'
                text={lang.addNewProperty}
                className='basic-modal-header-text'
            />
            <Button
                type='ghost'
                text=''
                icon='clear'
                className='button-header-basic-modal'
                iconClassName='icon-header-basic-modal'
                onClick={props.onHide}
            />
        </div>
        <Stepper
            containerClassName='modal-stepper'
            className='step-container'
            textClassName='text-stepper'
            isStepperRegister={false}
            steps={[lang.type, lang.informations, lang.localisation]}
            index={props.index}
            onClick={
                (value, index) => props.onChooseStep(props.index, index)} />
        {props.index === 0 &&
            <OrganismAddPropertyStepOne
                data={props.data}
                handleClickStepOne={props.handleClickStepOne}
                onChooseStep={props.onChooseStep}
                type={props.type}
                index={props.index}
                isInValidType={props.isInValidType}
            />
        }
        {props.index === 1 &&
            <OrganismAddPropertyStepTwo
                name={props.name}
                status={props.status}
                onChangeName={props.onChangeName}
                onChangeStatus={props.onChangeStatus}
                index={props.index}
                onChooseStep={props.onChooseStep}
                onChangeAgent={props.onChangeAgent}
                onChangeOwner={props.onChangeOwner}
                agent={props.agent}
                owner={props.owner} />}
        {props.index === 2 &&
            <OrganismAddPropertyStepThree
                onChangeStreetName={props.onChangeStreetName}
                onChangeStreetNumber={props.onChangeStreetNumber}
                onChangeStreetPostal={props.onChangeStreetPostal}
                onChangeCity={props.onChangeCity}
                onChangeCountry={props.onChangeCountry}
                index={props.index}
                onChooseStep={props.onChooseStep}
                street={props.street}
                streetNumber={props.streetNumber}
                postalCode={props.postalCode}
                city={props.city}
                country={props.country}
                onHide={props.onHide}
                onValidateCreationProperty={props.onValidateCreationProperty}
                getPosition={props.getPosition}
                setPositionGoogleMaps={props.setPositionGoogleMaps}
            />}

    </Modal>
}