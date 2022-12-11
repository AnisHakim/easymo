import React from "react";
import { OrganismeListesProprietes, OrganismDrawerFilter } from "../../Organism";
import { ModalConfirmation, ModalInfo } from "@easymo/designSystem";
import translator from "../../lang/translator";
export default function TemplateListProperties(props) {
    const lang = translator('fr')
    const optionPerPage = [
        { value: 10, label: '10' },
        { value: 20, label: '20' },
        { value: 5, label: '5' }
    ]
    function getNumberSelected() {
        if (props.idProperties)
            return 1
        return props.listElementSelected.length
    }
    function renderDescription() {
        switch (props.typeAction.toLowerCase()) {
            case "duplicate":
                return getNumberSelected() !== 1 ? lang.textConfirmDuplicate : lang.textMonoConfirmDuplicate
            case "delete":
                return getNumberSelected() !== 1 ? lang.textConfirmDelete : lang.textMonoConfirmDelete
            case "revende":
                return getNumberSelected() !== 1 ? lang.textConfirmRevendre : lang.textMonoConfirmRevendre
            case "active":
                return getNumberSelected() !== 1 ? lang.textConfirmActived : lang.textMonoConfirmActived
            case "archive":
                return getNumberSelected() !== 1 ? lang.textConfirmArchive : lang.textMonoConfirmArchive
            default:
                break;
        }
    }
    return <>
        {props.showModalConfirmation && <ModalConfirmation
            show={props.showModalConfirmation}
            onHide={props.onHideModalConfirmation}
            onSubmit={props.onSubmitAction}
            textConfirm={renderDescription()}
        />}
        {props.showModalInfo && <ModalInfo
            show={props.showModalInfo}
            onHide={props.onHideModalInfo}
            description={props.msgInfo}
            type={props.typeModal}
        />}
        <OrganismeListesProprietes
            onExportItem={props.onExportItem}
            onOpenDrawer={props.onOpenDrawer}
            onChangeSwitch={props.onChangeSwitch}
            onChangeDateRange={(start, end) => props.onChangeDateRange(start, end)}
            optionsExport={props.optionsExport}
            optionsTabFilter={props.optionsTabFilter}
            setpage={props.setpage}
            page={props.page}
            numberOfPage={props.numberOfPage}
            optionPerPage={optionPerPage}
            data={props.data}
            listCol={props.listCol}
            handleKeyPressSearch={(e) => props.handleKeyPressSearch(e)}
            onChangeSaleFilter={(type) => props.onChangeSaleFilter(type)}
            saleFilter={props.saleFilter}
            searchWorld={props.searchWorld}
            onChangeSearchWorld={(e) => props.onChangeSearchWorld(e)}
            onClearSearchInput={props.onClearSearchInput}
            filter={props.filter}
            displayFilterTypeLabel={props.displayFilterTypeLabel}
            displayContactName={props.displayContactName}
            actifFilter={props.actifFilter}
            nbrOfElement={props.nbrOfElement}
            setPerPage={props.setPerPage}
            perPage={props.perPage}
            onSelect={props.onSelect}
            listElementSelected={props.listElementSelected}
            onAction={props.onAction}
            totalProperties={props.totalProperties}
            totalPropertiesPrcentage={props.totalPropertiesPrcentage}
            forSellProperties={props.forSellProperties}
            forSellPropertiesPercentage={props.forSellPropertiesPercentage}
            forRentProperties={props.forRentProperties}
            forRentPropertiesPercentage={props.forRentPropertiesPercentage}
            closedRentPropeties={props.closedRentPropeties}
            closedRentPropetiesPercentage={props.closedRentPropetiesPercentage}
            listIds={props.listIds}
            clearSelection={props.clearSelection}
            onClearSelection={props.onClearSelection}
            isActiveChecked={props.isActiveChecked}
            start={props.minDate}
            end={props.maxDate}
            isClearDate={props.isClearDate}
            clearDate={props.clearDate}
            dateFilter={props.dateFilter}
            listStatus={props.listStatus}
        />
        {props.isDrawerOpen && <OrganismDrawerFilter
            isDrawerOpen={props.isDrawerOpen}
            onOpenDrawer={props.onOpenDrawer}
            onCloseDrawer={props.onCloseDrawer}
            statusList={props.statusList}
            onSelectStatus={props.onSelectStatus}
            onSelectType={props.onSelectType}
            typeList={props.typeList}
            isActiveChecked={props.isActiveChecked}
            isArchivedChecked={props.isArchivedChecked}
            onCheckActive={props.onCheckActive}
            onCheckArchived={props.onCheckArchived}
            isAllChecked={props.isAllChecked}
            isVenteChecked={props.isVenteChecked}
            isLocationChecked={props.isLocationChecked}
            onChangePostalCode={props.onChangePostalCode}
            postalCode={props.postalCode}
            onChangeCity={props.onChangeCity}
            city={props.city}
            onChangeRangeValues={props.onChangeRangeValues}
            optionsStatus={props.optionsStatus}
            typeOptions={props.typeOptions}
            usersOptions={props.usersOptions}
            onSelectUser={props.onSelectUser}
            usersList={props.usersList}
            onCheckAllTransaction={props.onCheckAllTransaction}
            onChecktous={props.onChecktous}
            istousChecked={props.istousChecked}
            onClickFooterButton={props.onClickFooterButton}
            rangeValues={props.rangeValues}
            minPropertyPrice={props.minPropertyPrice}
            maxPropertyPrice={props.maxPropertyPrice}
            listIds={props.listIds}
            devise={props.devise}
        />
        }
    </>
}
