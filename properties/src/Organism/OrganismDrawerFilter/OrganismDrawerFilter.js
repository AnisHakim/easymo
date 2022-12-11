import { Drawer, SiderbarItemBlack, RadioButton, TextIcon, Tooltip, Select, MoleculeInput, RangeSlider, RangeValue, formatNumber } from "@easymo/designSystem";
import React from "react";
import translator from '../../lang/translator'


function Organism(props) {
    const lang = translator('fr')

    const renderRangeSlider = () => {
        let tab = []
        for (let index = 0; index < 5; index++) {
            tab.push(formatNumber(props.minPropertyPrice + ((props.maxPropertyPrice - props.minPropertyPrice) * index / 4), null, null, true))
        }
        return tab
    }
    return (
        <>
            <Drawer
                open={props.isDrawerOpen}
                onClose={props.onCloseDrawer}
                direction='right'
                onClickFooterButton={props.onClickFooterButton}
            >
                <TextIcon text={lang.type_de_transaction}
                    withStartIcon iconStart="all_done"
                    type="h6"
                    iconStartClass="mr-1 drawer-title-icon"
                    textclassName="transaction-text"
                    containerClassName=" justify-flex-start mb-2" />
                <div className="flex mb-5">
                    <RadioButton id="all" onCheck={props.onCheckAllTransaction} radioText={lang.tous} isChecked={props.isAllChecked} radioClassName="radio-drawer" name="transaction" />
                    <RadioButton id="vente" onCheck={props.onCheckAllTransaction} radioText={lang.vente} isChecked={props.isVenteChecked} radioClassName="radio-drawer" name="transaction" />
                    <RadioButton id="location" onCheck={props.onCheckAllTransaction} radioText={lang.location} isChecked={props.isLocationChecked} name="transaction" />
                </div>
                <div className="flex">
                    <TextIcon text={lang.etat}
                        withStartIcon
                        iconStart="archive"
                        type="h6"
                        iconStartClass="mr-1 drawer-title-icon"
                        textclassName="transaction-text"
                        containerClassName=" justify-flex-start mb-2" />
                    <Tooltip
                        backgroundColor={SiderbarItemBlack}
                        tooltipText={lang.choisir_quels_bien}
                        iconClassname="drawer-title-icon ml-1" />
                </div>
                <div className="flex mb-5">
                    <RadioButton radioText={lang.actifs} isChecked={props.isActiveChecked} onCheck={props.onCheckActive} radioClassName="radio-drawer" name="etat" />
                    <RadioButton radioText={lang.archives} isChecked={props.isArchivedChecked} onCheck={props.onCheckArchived} name="etat" />
                </div>
                <Select
                    leftLabelIcon="checkmark_circle"
                    inputLabel={lang.statut}
                    labelClassname="transaction-text"
                    leftIconlClassname="mr-1 drawer-title-icon"
                    className="select-drawer-classname mb-5"
                    placeholder=""
                    onChange={props.onSelectStatus}
                    value={props.statusList}
                    options={props.optionsStatus}
                    isMulti
                />
                <Select
                    leftLabelIcon="folder_labeled"
                    inputLabel={lang.type}
                    labelClassname="transaction-text"
                    leftIconlClassname="mr-1 drawer-title-icon"
                    className="select-drawer-classname mb-5"
                    placeholder=""
                    onChange={props.onSelectType}
                    value={props.typeList}
                    options={props.typeOptions}
                    isMulti
                />
                <Select
                    leftLabelIcon="folder_labeled"
                    inputLabel={lang.agent}
                    labelClassname="transaction-text"
                    leftIconlClassname="mr-1 drawer-title-icon"
                    className="select-drawer-classname mb-5"
                    placeholder=""
                    onChange={props.onSelectUser}
                    options={props.usersOptions}
                    value={props.usersList}
                    isMulti
                />
                <div className="flex space-x-10 align-items-flex-end mb-5">
                    <MoleculeInput
                        leftLabelIcon="poi"
                        leftIconClassname="drawer-title-icon"
                        labelClassname="transaction-text"
                        placeholder={lang.code_postal}
                        inputLabel={lang.adresse}
                        labelTextType='h5'
                        inputClassname="drawer-postal-code"
                        onchangeInput={props.onChangePostalCode}
                        inputValue={props.postalCode}
                    />
                    <MoleculeInput
                        labelClassname="transaction-text"
                        placeholder={lang.ville}
                        inputLabel={""}
                        labelTextType='h5'
                        inputClassname="drawer-postal-code"
                        onchangeInput={props.onChangeCity}
                        inputValue={props.city}
                    />
                </div>
                {
                    props.listIds.length > 1 && props.minPropertyPrice != null && props.minPropertyPrice != undefined
                        && props.maxPropertyPrice != null && props.maxPropertyPrice != undefined &&
                        props.maxPropertyPrice > props.minPropertyPrice ?
                        <div className="filter-padding">
                            <TextIcon
                                text={lang.prix}
                                withStartIcon
                                iconStart="euro"
                                type="h6"
                                iconStartClass="mr-1 drawer-title-icon"
                                textclassName="transaction-text"
                                containerClassName=" justify-flex-start mb-6" />

                            <RangeSlider
                                values={props.rangeValues}
                                minPropertyPrice={props.minPropertyPrice && props.minPropertyPrice}
                                maxPropertyPrice={props.maxPropertyPrice && props.maxPropertyPrice}
                                onChange={props.onChangeRangeValues}
                                local={lang.localNumber}
                                step={(props.maxPropertyPrice - props.minPropertyPrice) / 8} />
                            <div>
                                <RangeValue
                                    data={renderRangeSlider()}
                                    containerClassName="justify-space-between"
                                />
                            </div>
                        </div>
                        : null}
            </Drawer>
        </>
    )
}

export default Organism
