import { MoleculeInput, MoleculeCard, Button, MoleculeHeader, MoleculeDatePicker, Dropdown, Table, MoleculeTablePages, Pagination, MoleculeFilter, HeaderGreyIcon, Icon, formatNumber } from "@easymo/designSystem";
import { useNavigate } from "react-router-dom";
import translator from '../../lang/translator'
function OrganismeListesProprietes(props) {
    const lang = translator('fr')
    const navigation = useNavigate()
    const renderActifFilter = () => {
        if (!props.saleFilter['tous'] || props.actifFilter.length !== 0 || props.dateFilter !== '') {
            let length = 0
            if (props?.dateFilter !== "") length = length + 1
            if (!props?.saleFilter["tous"]) length = length + 1
            if (props?.actifFilter?.length) length = length + props.actifFilter.length
            return <MoleculeFilter
                onClickIcon2={() => props.onChangeSaleFilter('tous')}
                textButtonOne={props.actifFilter}
                textButtonTwo={props.saleFilter['tous'] ? '' : props.saleFilter['vente'] ? 'À vendre' : 'À louer'}
                textFilter={length > 1 ? lang.actifFilter : lang.monoActifFilter}
                textThirdButton={props.dateFilter}
                onClickThirdIcon={props.clearDate}
            />
        }
    }
    let newListId = props.listStatus.filter((el, i) => el._id = props.listElementSelected[i]).filter(item => item.status !== 'sold').length
    return (
        <div className="container-fluide propriete-list-container" >
            <div className="mb-5 flex item-center properties-header-container" >
                <MoleculeHeader text={[{ text: lang.Propriétés }, { text: lang.vueEnsemble }]} pageTitle={lang.Propriétés} />
                <Button iconClassName='mr-2' containerClassName='new-propriete-btn add' onClick={() => navigation('/properties/add')} text={lang.nvBien} icon='add_property' />
            </div>
            <div className="row gx-2 gx-lg-3">
                <div className="col-sm-6 col-lg-3 mb-3 mb-lg-5 ">
                    <MoleculeCard subtitleClassName='card-subtitle'
                        subtitleText={lang.proprieteTotal}
                        textQuantityOne={formatNumber(props.totalProperties, null, lang.localNumber)}
                        icon="trending_up"
                        classNameIcon="badge badge-soft-success p-1"
                        textIcon={props.totalPropertiesPrcentage}
                        textIconClassName="text-badge-success" />
                </div>
                <div className="col-sm-6 col-lg-3 mb-3 mb-lg-5 ">
                    <MoleculeCard subtitleClassName='card-subtitle'
                        subtitleText={lang.aVendre}
                        textQuantityOne={formatNumber(props.forSellProperties, null, lang.localNumber)}
                        textQuantityTwo={`${lang.sur} ${props.totalProperties}`}
                        icon="trending_up"
                        classNameIcon="badge badge-soft-success p-1"
                        textIcon={props.forSellPropertiesPercentage}
                        textIconClassName="text-badge-success" />
                </div>
                <div className="col-sm-6 col-lg-3 mb-3 mb-lg-5 ">
                    <MoleculeCard subtitleClassName='card-subtitle'
                        subtitleText={lang.aLouer}
                        textQuantityOne={props.forRentProperties}
                        textQuantityTwo={`${lang.sur} ${formatNumber(props.totalProperties, null, lang.localNumber)}`}
                        icon="trending_down"
                        classNameIcon="badge badge-soft-danger p-1"
                        textIcon={props.forRentPropertiesPercentage}
                        textIconClassName="text-badge-danger" />
                </div>
                <div className="col-sm-6 col-lg-3 mb-3 mb-lg-5 ">
                    <MoleculeCard subtitleClassName='card-subtitle'
                        subtitleText={lang.venteConclu}
                        textQuantityOne={formatNumber(props.closedRentPropeties, null, lang.localNumber)}
                        textQuantityTwo={`${lang.sur} ${formatNumber(props.totalProperties, null, lang.localNumber)}`}
                        icon="trending_up"
                        classNameIcon="badge badge-soft-success p-1"
                        textIcon={props.closedRentPropetiesPercentage}
                        textIconClassName="text-badge-success" />
                </div>
            </div>

            <div className="shadowContainer" >
                <div className="p-5 flex items-center propriete-list-filter-row justify-space-between" >
                    <div className="search-propriete-container" >
                        <MoleculeInput
                            isSearch placeholder={lang.chercherBien}
                            inputValue={props.searchWorld}
                            onchangeInput={(e) => props.onChangeSearchWorld(e)}
                            onClearSearchInput={props.onClearSearchInput}
                            onKeyPress={(e) => props.handleKeyPressSearch(e)}
                        />
                    </div>
                    <div className="flex filter-drop-propriete-list" >
                        <div className="flex filter-properties-btn-group" >
                            <Button text={lang.Toutes} onClick={() => props.onChangeSaleFilter('tous')} type="filter" className={`btn-left ${props.saleFilter['tous'] && 'active'}`} />
                            <Button text={lang.Ventes} onClick={() => props.onChangeSaleFilter('vente')} type="filter" className={`btn-between ${props.saleFilter['vente'] && 'active'}`} />
                            <Button text={lang.Locations} onClick={() => props.onChangeSaleFilter('location')} type="filter" className={`btn-right ${props.saleFilter['location'] && 'active'}`} />
                        </div>
                        <MoleculeDatePicker
                            onApply={(start, end) => props.onChangeDateRange(start, end)}
                            start={props.start}
                            end={props.end}
                            clearDate={props.isClearDate} />
                        <Button onClick={props.onOpenDrawer} text={lang.Filtrer} type="filter" icon='filter_outlined' containerClassName='filter-btn-propriete-list' />
                        <Dropdown animated
                            dropdownBtn={'drop-down-export-btn'}
                            withStartIcon={true}
                            iconStart='download_to'
                            text={lang.Exporter}
                            options={props.optionsExport}
                            onPickItem={props.onExportItem}
                            containerDropClass='propriete-drop-btn'
                        />
                        <Dropdown animated
                            dropdownBtn={'drop-down-filterTable-btn'}
                            withStartIcon={true}
                            iconStart='table'
                            text={''}
                            options={props.optionsTabFilter}
                            dropType='switch'
                            withEndIcon={false}
                            onChangeSwitch={props.onChangeSwitch}
                            containerDropClass='propriete-drop-export'
                        />

                    </div>
                </div>
                <div className={`flex flex-wrap justify-space-between ${!props.listElementSelected.length && 'justify-end'} pr-5 pl-5`}>
                    {props.listElementSelected.length ? <div className="flex flex-wrap pb-3">
                        <span className="font-size-sm" style={{ color: HeaderGreyIcon, paddingTop: 7 }}>
                            {`${props.listElementSelected.length} ${props.listElementSelected.length != 1 ?
                                lang.tablePropertiesNumberSelected : lang.tablePropertiesMonoNumberSelected}`}
                            <Icon icon="clear" size="18px" className="pointer" onClick={props.onClearSelection} />
                        </span>
                        {props.isActiveChecked ? <>
                            <Button
                                type="third"
                                text={lang.btnDuplicate}
                                icon="copy"
                                className="btn-table-properties ml-3"
                                onClick={() => props.onAction("duplicate")}
                            />
                            {!newListId && <Button
                                type="third"
                                text={lang.btnRevendre}
                                icon="forward"
                                className="btn-table-properties ml-3"
                                onClick={() => props.onAction("revende")}

                            />}
                            <Button
                                type="third"
                                text={lang.btnArchited}
                                icon="archive"
                                iconClassName='btn-archived-properties'
                                className="btn-table-properties btn-archived-properties ml-3"
                                onClick={() => props.onAction("archive")}
                            />
                        </> : <>
                            <Button
                                type="third"
                                text={lang.actived}
                                icon="archive"
                                iconClassName='btn-archived-properties'
                                className="btn-table-properties btn-archived-properties ml-3"
                                onClick={() => props.onAction("active")}
                            />
                        </>}
                        <Button
                            type="third"
                            text={lang.btnDeleted}
                            icon="delete_outlined"
                            className="btn-table-properties btn-delete-properties ml-3"
                            iconClassName="btn-delete-properties"
                            onClick={() => props.onAction("delete")}
                        />
                    </div> : null}
                    {renderActifFilter()}
                </div>
                <Table
                    listCol={props.listCol}
                    data={props.data}
                    onSelect={props.onSelect}
                    listIds={props.listIds}
                    clearSelection={props.clearSelection}
                    colClassNames={[{ className: 'td-name-list-tab', key: 'propertieName' }]}
                />
                <div className="flex flex-wrap item-center pages-table-properties">
                    <MoleculeTablePages options={props.optionPerPage}
                        displayText={lang.display}
                        onText={lang.sur}
                        totalPages={props.nbrOfElement}
                        perPage={props.perPage}
                        setPerPage={props.setPerPage}
                    />
                    {parseInt(props.numberOfPage.toString()) > 1 && <Pagination
                        numberOfPage={props.numberOfPage}
                        page={props.page}
                        onClick={(e) => props.setpage(e)}
                    />
                    }
                </div>
            </div>
        </div >
    )
}

export default OrganismeListesProprietes
