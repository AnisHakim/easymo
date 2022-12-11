import React from "react"
import translator from "../../lang/translator"
import { csv, excel, pdf } from "../../svg/svg"
import { TemplateListProperties } from "../../Template"
import { jsonToFormData, Dropdown, DarkBlue, Green, lightBlue, LightGreen, Icon, Orange, RougeBordeau, SecondDarkBlue, SecondLightBlue, MoleculeNameTable, getDate, AddContact, formatNumber, formatInputNumber } from "@easymo/designSystem";
import { AuthStore } from "@easymo/auth"
import { apiArchivePropperties, apiDeletePropperties, apiDuplicatePropperties, apiListProperties, apiMonthstatistic, apiUpdateStatus, apiExportProperties } from "../../Api/Properties/properties";
import { propertiesType, propertiesStatus, listCol, setDropDownColorAndText, displayLabel, etatDuBien } from "../../data/data"
import { getAgentList } from "../../Api/Agent"
import { connect } from 'react-redux'
import { renderTableContact } from "../../Common/Common";
import OrganismeModalStatus from "../../Organism/OrganismeModalStatus/OrganismeModalStatus";


const lang = translator('fr')
const options = [
    {
        details:
            [
                { value: 'prospect', text: lang.prospect, withcolor: true, color: DarkBlue },
                { value: 'mondat', text: lang.mandat, withcolor: true, color: SecondDarkBlue },
                { value: 'onSale', text: lang.onSale, withcolor: true, color: lightBlue },
                { value: 'offer', text: lang.offer, withcolor: true, color: SecondLightBlue },
                { value: 'option', text: lang.option, withcolor: true, color: LightGreen },
                { value: 'sold', text: lang.sold, withcolor: true, color: Green },
                { value: 'suspended', text: lang.suspended, withcolor: true, color: Orange },
                { value: 'lost', text: lang.lost, withcolor: true, color: RougeBordeau },
            ]
    }
]
const optionsExport = [
    {
        title: lang.options,
        details:
            [
                { text: lang.Envoyer, withStartIcon: true, iconStart: 'share' },
                { text: lang.Imprimer, withStartIcon: true, iconStart: 'print' },
            ]
    },
    {
        title: lang.Téléchargement,
        details:
            [
                { text: lang.Excel, withImg: true, src: excel, svg: true, value: "xlsx" },
                { text: lang.csv, withImg: true, src: csv, svg: true, value: "csv" },
                { text: lang.PDF, withImg: true, src: pdf, svg: true, value: "pdf" }
            ]
    }
]
class ListProperties extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            perPage: (AuthStore && AuthStore.getState().auth && AuthStore.getState().auth.user && AuthStore.getState().auth.user.setting &&
                AuthStore.getState().auth.user.setting.listPropertiesPerPage) ? AuthStore.getState().auth.user.setting.listPropertiesPerPage : 10,
            numberOfPage: 0,
            nbrOfElement: 0,
            listCol: [...listCol],
            data: [],
            listIds: [],
            options: options,
            isDrawerOpen: false,
            isAllChecked: true,
            isVenteChecked: false,
            isLocationChecked: false,
            isActiveChecked: true,
            isArchivedChecked: false,
            istousChecked: true,
            statusList: [],
            typeList: [],
            optionsTabFilter: [
                { text: lang.Prix, key: "price", checked: true },
                { text: lang.Date, key: "date", checked: true },
                { text: lang.Agent, key: "propertieAgent", checked: true },
                { text: lang.Propriétaire, key: "propertieOwner", checked: true },
            ],
            optionsExport: optionsExport,
            usersList: [],
            clearSelection: false,
            postalCode: '',
            city: '',
            rangeValues: [],
            searchWorld: '',
            filter: {},
            minDate: null,
            maxDate: null,
            saleFilter: { tous: true, vente: false, location: false },
            actifFilter: [],
            listElementSelected: [],
            showModalConfirmation: false,
            typeAction: null,
            refresh: false,
            showModalInfo: false,
            msgInfo: null,
            typeModal: null,
            idProperties: null,
            totalProperties: '0',
            totalPropertiesPrcentage: '0 %',
            forSellProperties: '0',
            forSellPropertiesPercentage: '0 %',
            forRentProperties: '0',
            forRentPropertiesPercentage: '0 %',
            closedRentPropeties: '0',
            closedRentPropetiesPercentage: '0 %',
            isClearDate: false,
            dateFilter: '',
            minPropertyPrice: 0,
            maxPropertyPrice: 0,
            listStatus: [],
            dropDownText: '',
            isAddContactVisible: false,
            isModalStatusVisible: false,
            currentStatus: {},
            prevStatus: '',
            id: ''
        }
    }
    deleteFilterActif = (type, key, filterKey) => {
        let newList = [...this.state[key]]
        let newActifFilter = [...this.state.actifFilter]
        if (newList[newList.length - 1].value !== '') {
            newList = newList.filter(el => el.value !== type)
        } else {
            newList = [{ value: '', label: lang.tous_les_bien }]
        }
        newActifFilter = newActifFilter.filter(el => el.label !== this.displayFilterTypeLabel(type))
        let newFilter = { ...this.state.filter, [filterKey]: newList.map(el => el.value) }
        this.setState({
            [key]: newList,
            actifFilter: newActifFilter,
            filter: newFilter
        }, () => this.getListProperties())
    }
    deleteContactActifFilter = (type, key, filterKey) => {
        let newList = [...this.state[key]]
        let newActifFilter = [...this.state.actifFilter]
        if (newList[newList.length - 1].value !== '') {
            newList = newList.filter(el => el.value !== type)
        } else {
            newList = [{ value: '', label: lang.tous_les_bien }]
        }
        newActifFilter = newActifFilter.filter(el => el.label !== this.displayContactName(type))
        let newFilter = { ...this.state.filter, [filterKey]: newList.map(el => el.value) }
        this.setState({
            [key]: newList,
            actifFilter: newActifFilter,
            filter: newFilter
        }, () => this.getListProperties())
    }
    restartInitPrice = (price) => {
        let newActifFilter = [...this.state.actifFilter]
        newActifFilter = newActifFilter.filter(el => el.label !== price)
        let newFilter = { ...this.state.filter, maxPrice: '' }
        this.setState({
            rangeValues: [newFilter.minPrice, this.state.maxPropertyPrice],
            filter: newFilter,
            actifFilter: newActifFilter
        }, () => this.getListProperties())
    }
    restartminInitPrice = (price) => {
        let newActifFilter = [...this.state.actifFilter]
        newActifFilter = newActifFilter.filter(el => el.label !== price)
        let newFilter = { ...this.state.filter, minPrice: '' }
        this.setState({
            rangeValues: [this.state.minPropertyPrice, newFilter.maxPrice],
            filter: newFilter,
            actifFilter: newActifFilter
        }, () => this.getListProperties())
    }
    resetArchiveFilter = (type) => {
        this.onCheckActive()
        let newActifFilter = [...this.state.actifFilter]
        newActifFilter = newActifFilter.filter(el => el.label !== type)
        let newFilter = { ...this.state.filter, isArchived: 'false' }
        this.setState({
            filter: newFilter,
            actifFilter: newActifFilter
        }, () => this.getListProperties())
    }
    deleteFilterAdress = (type, key) => {
        let newActifFilter = [...this.state.actifFilter]
        newActifFilter = newActifFilter.filter(el => el.label !== type)
        let newFilter = { ...this.state.filter, [key]: '' }
        this.setState({
            filter: newFilter,
            actifFilter: newActifFilter,
            [key]: ''
        }, () => this.getListProperties())

    }

    renderActifFilter = (filter) => {
        let actifFilter = []
        let typeFilter = (filter.type && filter.type[0] !== "") ? filter.type?.map(el => { return { label: this.displayFilterTypeLabel(el), action: () => this.deleteFilterActif(el, 'typeList', 'type') } }) : []
        let statusFilter = (filter.status && filter.status[0] !== "") ? filter.status?.map(el => { return { label: this.displayFilterTypeLabel(el), action: () => this.deleteFilterActif(el, 'statusList', 'status') } }) : []
        let contactName = (filter.contactId && filter.contactId[0] !== "") ? filter.contactId?.map(el => { return { label: this.displayContactName(el), action: () => this.deleteContactActifFilter(el, 'usersList', 'contactId') } }) : []
        let priceFilter = ((filter.minPrice && filter.minPrice !== this.state.minPropertyPrice) || (filter.maxPrice && filter.maxPrice !== this.state.maxPropertyPrice)) ? [{ label: `${lang.max} ${formatNumber(filter.maxPrice, null, lang.localNumber)} ${AuthStore.getState().auth?.user?.devise}`, action: () => this.restartInitPrice(`${lang.max} ${formatNumber(filter.maxPrice, null, lang.localNumber)} ${AuthStore.getState().auth?.user?.devise}`) }] : []
        let priceminFilter = ((filter.minPrice && filter.minPrice !== this.state.minPropertyPrice) || (filter.maxPrice && filter.maxPrice !== this.state.maxPropertyPrice)) ? [{ label: `${lang.min} ${formatNumber(filter.minPrice, null, lang.localNumber)} ${AuthStore.getState().auth?.user?.devise}`, action: () => this.restartminInitPrice(`${lang.min} ${formatNumber(filter.minPrice, null, lang.localNumber)} ${AuthStore.getState().auth?.user?.devise}`) }] : []
        let archiveFilter = (filter.isArchived !== '' && filter.isArchived === true ?
            [{ label: lang.archives, action: () => this.resetArchiveFilter(lang.archives) }] :
            [])
        let postalFilter = (filter.postalCode !== '') ? [{ label: filter.postalCode, action: () => this.deleteFilterAdress(filter.postalCode, 'postalCode') }] : []
        let citylFilter = (filter.city !== '') ? [{ label: filter.city, action: () => this.deleteFilterAdress(filter.city, 'city') }] : []

        actifFilter = [...typeFilter, ...statusFilter, ...contactName, ...priceFilter, ...archiveFilter, ...postalFilter, ...citylFilter, ...priceminFilter]
        return actifFilter
    }
    clearDate = () => {
        this.setState({
            minDate: null,
            maxDate: null,
            dateFilter: '',
            isClearDate: !this.state.isClearDate
        })
    }
    componentDidUpdate(prevProps, prevState) {

        if (this.state.listIds.length !== prevState.listIds.length) {
            this.props.publish("REFRESH_LIST_PROPERTY")
        }
        if (this.state.refresh !== prevState.refresh) {
            this.getListProperties()
            this.getMonthStatistic()
        }
        if (((prevState.minDate !== this.state.minDate) && (prevState.maxDate !== this.state.maxDate))
            || this.state.page !== prevState.page || this.state.perPage !== prevState.perPage
        ) {
            this.getListProperties()
        }
        if (this.state.typeList.length === 0) {
            this.setState({
                typeList: [{ value: '', label: lang.tous }],
            })
        }
        if (this.state.usersList.length === 0) {
            this.setState({
                usersList: [{ value: '', label: lang.tous }],
            })
        }
        if (this.state.statusList.length === 0) {
            this.setState({
                statusList: [{ value: '', label: lang.tous_les_bien }],
            })
        }
        if (this.props.propertie.id !== prevProps.propertie.id && this.props.propertie.id !== null) {

            this.props.navigation('/properties/add')
        }
    }
    getListProperties = async (filter = null) => {
        let data = {
            page: this.state.page,
            perPage: this.state.perPage,
            searchWord: this.state.searchWorld,
            minDate: this.state.minDate,
            maxDate: this.state.maxDate,
        }
        if (!filter) {
            data.isArchived = this.state.isActiveChecked ? "false" : true
        }
        if (filter) {
            if (filter?.postalCode) {
                filter.postalCode = filter.postalCode
            }
            data = { ...data, ...filter }
        } else {
            data = { ...data, ...this.state.filter }
        }
        const response = await apiListProperties(data)
        if (response.statusCode === 200) {
            this.setState({
                nbrOfElement: response.data.nbrOfElement,
                numberOfPage: Math.ceil(parseInt(response.data.nbrOfElement) / this.state.perPage),
                data: this.getTableData(response.data.list),
                listIds: response.data.listIds.map(el => el._id),
                listStatus: response.data.listIds,
                clearSelection: filter ? filter.isArchived !== this.state.filter ? !this.state.clearSelection : this.state.clearSelection : this.state.clearSelection,
                minPropertyPrice: response.data.minPrice,
                maxPropertyPrice: response.data.maxPrice,
                rangeValues: [this.state.rangeValues[0] ? this.state.rangeValues[0] : response.data.minPrice, this.state.rangeValues[1] ? this.state.rangeValues[1] : response.data.maxPrice],
            })
        }
    }
    getStateClearSelection = (filter, data) => {

    }
    onChangeSearchWorld = (e) => {
        this.setState({
            searchWorld: e.target.value
        })
    }
    onClearSearchInput = () => {
        this.setState({
            searchWorld: ''
        }, () => this.getListProperties())
    }
    handleKeyPressSearch = (e) => {
        if (e.key === "Enter") {
            this.getListProperties()
        }
    }
    onChangeSaleFilter = (type) => {
        let newSaleFilter = Object.keys(this.state.saleFilter).map(el => el === type ? this.state.saleFilter[el] = true : this.state.saleFilter[el] = false)
        let filter = {
            ...this.state.filter,
            forSale: newSaleFilter[0] ? '' : newSaleFilter[2] ? 'false' : true,
        }
        this.setState({
            saleFilter: { tous: newSaleFilter[0], vente: newSaleFilter[1], location: newSaleFilter[2] },
            isAllChecked: newSaleFilter[0],
            isVenteChecked: newSaleFilter[1],
            isLocationChecked: newSaleFilter[2],
            filter: filter
        }, () => this.getListProperties(filter))
    }
    onClickFooterButton = async () => {
        let filter = {
            contactId: this.state.usersList.map(el => el.value),
            status: this.state.statusList.map(el => el.value),
            postalCode: this.state.postalCode,
            city: this.state.city,
            type: this.state.typeList.map(el => el.value),
            isArchived: this.state.isActiveChecked ? 'false' : true,
            forSale: this.state.isAllChecked ? '' : this.state.isLocationChecked ? 'false' : true,
        }
        if (this.state.listIds.length > 1 && this.state.minPropertyPrice != null && this.state.minPropertyPrice != undefined
            && this.state.maxPropertyPrice != null && this.state.maxPropertyPrice != undefined &&
            this.state.maxPropertyPrice > this.state.minPropertyPrice && (this.state.minPropertyPrice !== this.state.rangeValues[0] || this.state.maxPropertyPrice !== this.state.rangeValues[1])) {
            filter = {
                ...filter,
                minPrice: this.state.listIds.length > 1 ? this.state.rangeValues[0] : null,
                maxPrice: this.state.listIds.length > 1 ? this.state.rangeValues[1] : null,
            }
        }
        this.getListProperties(filter)
        let actifFilter = await this.renderActifFilter(filter)
        this.setState({
            filter: filter,
            isDrawerOpen: false,
            saleFilter: { tous: this.state.isAllChecked, vente: this.state.isVenteChecked, location: this.state.isLocationChecked },
            actifFilter: actifFilter
        })
    }
    onChangeSwitch = (value, i, key) => {
        let newOption = [...this.state.optionsTabFilter]
        newOption[i].checked = !value
        let newListCol = [...this.state.listCol]
        const index = newListCol.findIndex(el => el.key === key)
        newListCol[index].show = !value
        this.setState({
            optionsTabFilter: [...newOption],
            listCol: newListCol
        })
    }
    goToDetails = (id) => {
        this.props.dispatch({ type: "SET_SHOW_INFO", payload: false })
        this.props.dispatch({ type: "SAVE_ID", payload: id })
    }
    getTableData = (data) => {
        return data.map(el => {
            return {
                ...el,
                propertieName: <MoleculeNameTable
                    exportPropertie={this.exportPropertie}
                    isArchiveStatus={el.isArchived}
                    srcImg={el.image}
                    textName={el.name}
                    status={el.status}
                    onAction={this.onAction}
                    id={el._id}
                    onClick={() => this.goToDetails(el._id)}
                />,
                propertieStatus: this.renderStatusDropDownTableProperties(el._id, el.status, el.isArchived, el.forSale),
                propertieType: this.renderType(el.type, el.building?.buildingStatus),
                address: this.renderAddress(el),
                propertietrans: el.forSale ? lang.aVendre : lang.aLouer,
                price: formatNumber(el.mandat?.price?.value ? el.mandat?.price?.value : 0, AuthStore.getState().auth?.user?.devise, lang.localNumber) !== undefined ? formatNumber(el.mandat?.price?.value ? el.mandat?.price?.value : 0, AuthStore.getState().auth?.user?.devise, lang.localNumber) : <div className="flex item-center"> {`0 ${AuthStore.getState().auth?.user?.devise}`} <Icon icon='exclamation' className='ml-1 orange-small-icon' /> </div>,
                date: getDate(el.createdAt, "fr"),
                propertieAgent: renderTableContact(el.speakers.detailAgent ? [...el.speakers.detailAgent] : [], lang),
                propertieOwner: renderTableContact(el.speakers.detailOwner ? el.speakers.detailOwner : [], lang),
                trClassName: el.isArchived && 'tr-archived',
            }
        })
    }
    renderType = (type, typeStatus) => {
        return <>  <div className="text-type-list-properties">{displayLabel(type, propertiesType())}</div>
            <div className="f-13" >{displayLabel(typeStatus ? typeStatus : 'new', etatDuBien(type))}</div>
        </>
    }

    renderAddress = (data) => {
        return `${data.identification.street} ${data.identification.number}${data.identification.number || data.identification.street ? ',' : ''} ${data.identification.postalCode} ${data.identification.city}`
    }
    onOpenDrawer = () => {
        this.setState({
            isDrawerOpen: true
        })
    }
    onCloseDrawer = () => {
        this.setState({
            isDrawerOpen: false,
        })
    }
    onSelectStatus = (item) => {
        let newList = []
        if (item.length === 0) {
            newList = [{ value: '', label: lang.tous_les_bien }]
        } else
            if (item[item.length - 1].value !== '') {
                newList = item.filter(el => el.value !== '')
            } else {
                newList = [{ value: '', label: lang.tous_les_bien }]
            }
        this.setState({ statusList: newList })
    }
    onSelectType = (item) => {
        let newTypeList = []
        if (item.length === 0) {
            newTypeList = [{ value: '', label: lang.tous }]
        } else
            if (item[item.length - 1].value !== '') {
                newTypeList = item.filter(el => el.value !== '')
            } else {
                newTypeList = [{ value: '', label: lang.tous }]
            }
        this.setState({ typeList: newTypeList })
    }
    onChecktous = () => {
        this.setState({
            istousChecked: true,
            isActiveChecked: false,
            isArchivedChecked: false
        })
    }
    onCheckActive = () => {
        this.setState({
            istousChecked: false,
            isActiveChecked: true,
            isArchivedChecked: false
        })
    }
    onCheckArchived = () => {
        this.setState({
            istousChecked: false,
            isActiveChecked: false,
            isArchivedChecked: true
        })
    }
    componentDidMount() {
        document.title = lang.propertiesList
        this.props.dispatch({ type: "SAVE_ID", payload: null })
        this.getListProperties()
        this.getMonthStatistic()
        this.onGetAgentList()
        this.setState({
            statusList: [{ value: '', label: lang.tous_les_bien }],
            typeList: [{ value: '', label: lang.tous }],
            usersList: [{ value: '', label: lang.tous }],
        })
    }
    onChangeDateRange = (startDate, endDate) => {
        this.setState({
            minDate: new Date(startDate),
            maxDate: new Date(endDate),
            dateFilter: `${startDate.format("DD/MM/YYYY")}-${endDate.format("DD/MM/YYYY")}`
        })
    }

    renderStatusDropDownTableProperties = (id, status, isArchiveStatus = false, forSale) => {
        const { dropDownColor, dropDownText } = setDropDownColorAndText(status, lang, forSale)
        return <div className="flex" >
            <Dropdown
                inTab
                onPickItem={(item, i) => this.onPickItem(item, i, id, status, isArchiveStatus)}
                isArchiveStatus={isArchiveStatus}
                dropdownBtn={isArchiveStatus ? 'drop-down-btn-archived ' : 'drop-down-clor-btn'}
                dropdownBtnColor={!isArchiveStatus && dropDownColor}
                text={dropDownText}
                options={
                    this.state.options
                }

            />
        </div>
    }

    onChangePostalCode = (e) => {
        this.setState({
            postalCode: e.target.value
        })
    }

    onChangeCity = (e) => {
        this.setState({
            city: e.target.value
        })
    }
    onChangeRangeValues = (values) => {
        this.setState({
            rangeValues: values
        })
    }
    onSelectUser = (user) => {
        let newUsersList = []
        if (user.length === 0) {
            newUsersList = [{ value: '', label: lang.tous }]
        } else
            if (user[user.length - 1].value !== '') {
                newUsersList = user.filter(el => el.value !== '')
            } else {
                newUsersList = [{ value: '', label: lang.tous }]
            }
        this.setState({ usersList: newUsersList })
    }
    onCheckAllTransaction = (e) => {
        if (e.target.id === "all") {
            this.setState({
                isAllChecked: true,
                isVenteChecked: false,
                isLocationChecked: false
            })
        } else if (e.target.id === "vente") {
            this.setState({
                isAllChecked: false,
                isVenteChecked: true,
                isLocationChecked: false
            })
        } else {
            this.setState({
                isAllChecked: false,
                isVenteChecked: false,
                isLocationChecked: true
            })
        }
    }
    onGetAgentList = async () => {
        const response = await getAgentList()
        if (response.statusCode === 200) {
            this.setState({
                usersOptions: [{ value: '', label: lang.tous }, ...response.data.map((el) => {
                    return {
                        value: el._id,
                        label: `${el.firstName} ${el.lastName}`
                    }
                })]
            })
        }
    }
    getMonthStatistic = async () => {
        const res = await apiMonthstatistic()
        if (res.statusCode === 200) {
            this.setState({
                totalProperties: res.data.totalProperties.toString(),
                totalPropertiesPrcentage: `${res.data.percentProperties.toString()} %`,
                forSellProperties: res.data.forSale.toString(),
                forSellPropertiesPercentage: `${res.data.percentForSale.toString()} %`,
                forRentProperties: res.data.forRent.toString(),
                forRentPropertiesPercentage: `${res.data.percentForRent.toString()} %`,
                closedRentPropeties: res.data.saled.toString(),
                closedRentPropetiesPercentage: `${res.data.percentSaled.toString()} %`
            })
        }
    }
    displayFilterTypeLabel = (type) => {
        if (type && type !== '') {
            const index = [...propertiesType(lang), ...propertiesStatus(lang)].findIndex(item => { return item.value.toUpperCase() === type.toUpperCase() })
            if (index >= 0) {
                return [...propertiesType(lang), ...propertiesStatus(lang)][index].label
            } else {
                return type
            }
        }
    }
    displayContactName = (id) => {
        if (id && id !== '') {
            const index = this.state.usersOptions.findIndex(item => { return item.value === id })

            return this.state.usersOptions[index].label
        }
    }

    onSelect = (e) => {
        this.setState({ listElementSelected: e })
    }
    onAction = (type, id = null) => {
        this.setState({
            typeAction: type.toLowerCase(),
            showModalConfirmation: true,
            idProperties: id
        })
    }
    onSubmitAction = () => {
        switch (this.state.typeAction.toLowerCase()) {
            case "duplicate":
                this.duplicateProperties()
                break;
            case "delete":
                this.deleteProperties()
                break;
            case "revende":
                break;
            case "archive":
                this.archiveProperties(true)
                break;
            case "active":
                this.archiveProperties(false, this.state.idProperties);
                break;
            default:
                break;
        }
    }
    duplicateProperties = async (id) => {
        const response = await apiDuplicatePropperties(JSON.stringify({
            ids: this.state.idProperties ? [this.state.idProperties] : this.state.listElementSelected,
        }))
        this.responseAction(response, this.state.idProperties ? lang.monodescriptionDuplicatePropertie : lang.descriptionDuplicatePropertie, lang.maxNumberOfProperties)
    }
    deleteProperties = async (id) => {
        const response = await apiDeletePropperties(JSON.stringify({
            ids: this.state.idProperties ? [this.state.idProperties] : this.state.listElementSelected,
        }))
        this.responseAction(response, this.state.idProperties ? lang.monodescriptionDeletePropertie : lang.descriptionDeletePropertie, null)
    }
    archiveProperties = async (type, id) => {
        const response = await apiArchivePropperties(JSON.stringify({
            ids: this.state.idProperties ? [this.state.idProperties] : this.state.listElementSelected,
            status: type
        }))
        if (this.state.idProperties) {
            this.responseAction(response, lang[type ? "monodescriptionArchivePropertie" : "monodescriptionActivePropertie"], lang.maxNumberOfProperties)
        } else {
            this.responseAction(response, lang[type ? "descriptionArchivePropertie" : "descriptionActivePropertie"], lang.maxNumberOfProperties)
        }
    }
    onHideModalInfo = () => {
        this.setState({
            showModalInfo: false,
            msgInfo: null
        })
    }
    responseAction = (response, success, error) => {
        if (response.statusCode === 200) {
            this.setState({
                refresh: !this.state.refresh,
                showModalConfirmation: false,
                showModalInfo: true,
                msgInfo: success,
                typeModal: "success",
                idProperties: null
            })
        } else {
            this.setState({
                showModalConfirmation: false,
                showModalInfo: true,
                msgInfo: error,
                typeModal: "error",
                idProperties: null
            })
        }
    }
    onClearSelection = () => {
        this.setState({
            clearSelection: !this.state.clearSelection
        })
    }
    setPerPage = (e) => {
        this.setState({ perPage: e.value, page: 1 })
        this.props.publish("SET_PERPAGE", e.value)
    }
    onPickItem = async (item, i, id, status, isArchiveStatus) => {
        if (item?.value !== status) {
            const index = this.state.data.findIndex(el => el._id === id)
            const data = [...this.state.data]
            data[index].status = item.value
            this.setState({
                dropDownText: item.value,
                data: this.getTableData(data),
                id: id
            })
            if (item.value === 'prospect' || item.value === 'mondat' || item.value === 'onSale') {
                let body = { id: id, status: item.value }
                let formData = new FormData()
                let formDataresult = jsonToFormData(formData, body)
                const response = await apiUpdateStatus(formDataresult)
                if (response.statusCode === 200) {
                    this.setState({
                        prevStatus: item.value,
                    })
                } else {
                    data[index].status = this.state.prevStatus
                    this.setState({
                        dropDownText: this.state.prevStatus,
                        data: this.getTableData(data),
                        id: id
                    })
                }
            } else {
                this.onChangeModalStatusVisibility(true, this.state.dropDownText)
                data[index].status = item.value
                this.setState({
                    dropDownText: item.value,
                    prevStatus: status,
                    currentStatus: { ...item, label: item.text },
                    data: this.getTableData(data),
                    id: id
                })
            }
        }
    }
    onSaveStatusChangement = (value) => {
        const index = this.state.data.findIndex(el => el._id === this.state.id)
        const data = [...this.state.data]
        data[index].status = value
        this.setState({
            dropDownText: value,
            data: this.getTableData(data)
        })
    }
    cancelChangeStatus = () => {
        this.onChangeModalStatusVisibility(false)
        const index = this.state.data.findIndex(el => el._id === this.state.id)
        const data = [...this.state.data]
        data[index].status = this.state.prevStatus
        this.setState({
            dropDownText: this.state.prevStatus,
            data: this.getTableData(data)
        })
    }
    onChangeModalStatusVisibility = (status, prevStatus) => {
        if (prevStatus) {
            this.setState({
                isModalStatusVisible: status,
                prevStatus: prevStatus
            })
        } else {
            this.setState({
                isModalStatusVisible: status
            })
        }
    }
    changeContactVisibility = (status) => {
        this.setState({
            isAddContactVisible: status,
            isModalStatusVisible: !this.state.isModalStatusVisible
        })
    }
    exportFunction = async (listIdProperties, type) => {
        const body = JSON.stringify({
            type: type,
            propertiesId: listIdProperties
        })
        const response = await apiExportProperties(body)
        const link = document.createElement("a");
        link.setAttribute('download', lang.Propriétés + '.' + type);
        link.href = response;
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
    exportPropertie = (id) => {
        if (id) {
            this.exportFunction([id], "xlsx")
        }
    }
    onExportItem = (item, i) => {
        if (this.state.listElementSelected.length > 0) {
            this.exportFunction(this.state.listElementSelected, item.value)
        }
    }
    render() {
        const Devise = AuthStore.getState().auth?.user?.devise
        return (
            <>
                <TemplateListProperties
                    onPickItem={this.onPickItem}
                    onExportItem={this.onExportItem}
                    onOpenDrawer={this.onOpenDrawer}
                    onCloseDrawer={this.onCloseDrawer}
                    onSelectStatus={(item) => this.onSelectStatus(item)}
                    onSelectType={(item) => this.onSelectType(item)}
                    onCheckActive={this.onCheckActive}
                    onChecktous={this.onChecktous}
                    onCheckArchived={this.onCheckArchived}
                    onChangeSwitch={this.onChangeSwitch}
                    onChangeDateRange={(start, end) => this.onChangeDateRange(start, end)}
                    setpage={(e) => this.setState({ page: e })}
                    onChangePostalCode={(e) => this.onChangePostalCode(e)}
                    onChangeCity={(e) => this.onChangeCity(e)}
                    onChangeRangeValues={(values) => this.onChangeRangeValues(values)}
                    optionsStatus={propertiesStatus(lang)}
                    typeOptions={propertiesType(lang)}
                    usersOptions={this.state.usersOptions}
                    onSelectUser={(user) => this.onSelectUser(user)}
                    onCheckAllTransaction={(e) => this.onCheckAllTransaction(e)}
                    onClickFooterButton={this.onClickFooterButton}
                    onChangeSearchWorld={(e) => this.onChangeSearchWorld(e)}
                    handleKeyPressSearch={(e) => this.handleKeyPressSearch(e)}
                    onChangeSaleFilter={(type) => this.onChangeSaleFilter(type)}
                    onClearSearchInput={this.onClearSearchInput}
                    setPerPage={(e) => this.setPerPage(e)}
                    onSelect={this.onSelect}
                    onAction={this.onAction}
                    onHideModalConfirmation={() => this.setState({ showModalConfirmation: false, idProperties: null })}
                    onSubmitAction={this.onSubmitAction}
                    onHideModalInfo={this.onHideModalInfo}
                    onClearSelection={this.onClearSelection}
                    clearDate={this.clearDate}
                    devise={Devise}
                    {...this.state}
                />
                {this.state.isModalStatusVisible &&
                    <OrganismeModalStatus
                        onHide={this.cancelChangeStatus}
                        show={this.state.isModalStatusVisible}
                        devise={Devise}
                        prevStatus={this.state.prevStatus}
                        currentStatus={this.state.currentStatus}
                        onSave={this.onSaveStatusChangement}
                        changeContactVisibility={this.changeContactVisibility}
                        contact={this.props.contact}
                        id={this.state.id}
                        subscribe={this.props.subscribe}
                    />
                }
                {
                    this.state.isAddContactVisible &&
                    <AddContact
                        isModalOpen={this.state.isAddContactVisible}
                        onHideModal={() => this.changeContactVisibility(false)} />
                }
            </>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => {
            dispatch(action);
        },
    };
};
const mapStateToProps = (state) => {
    return {
        propertie: state.properties,
        contact: state.contacts,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListProperties)