import moment from "moment";
import { Icon } from "../../Atoms";
import { ButtonBlue, PricefilterGrey } from "../../Colors";
const defaultProps = {
    type: "type-1",
    containerClassName: null,
    tableClassName: null,
    withSelect: true,
    withOption: true,
    withSort: true,
    onSelect: null,
    onSort: null,
    listCol: [],
    data: [],
    listIds: [],
    withAction: true,
    withValidation: true,
    actionFirst: false,
    listAction: ["edit", "duplicate", "delete"],
    listInput: [],
    withBtnAdd: true,
    btnClassName: "",
    numberOfNewElement: 1,
    icon: 'add',
    withoutTitleAction: false,
    dateFormat: "DD/MM/YYYY",
    trAcceptedColor: false,
    editComponent: null,
    closeElement: false,
    padding: 20,
    sortAccepted: false,
    iconClassName: null,
    emptyArrayText: "",
    iconClassName: null,
    withDataDetails: false,
    listColDetails: [],
    renderContainerDetail: null,
    onGetElementToMoreDetails: null,
    withFooter: false,
    devise: "€",
    withDragAndDrop: false,
    perPage: 10,
    withPagination: false,
    withIndex: false,
    maxFormContainer: false,
    editWithModal: false,
    openModalEdit: null,
    withFilter: false,
    title: null,
    inputPlaceHolder: null,
    nullDuplicateAttribute: [],
    checkIsUpdated: null,
}
const sortfunction = (a, b, col, asc) => {
    if (a[col] < b[col]) {
        return asc ? -1 : 1;
    }
    return asc ? 1 : -1
}
const containerStyle = ({ withSizeControl, ref, padding }) => {
    let style = {}
    if (withSizeControl) {
        if (ref.current) {
            style['maxWidth'] = ref.current.parentElement.offsetWidth - padding
        }
    }
    return style
}
const renderText = ({ val, lang }) => {
    if (typeof val === "boolean") {
        if (val === true) {
            return lang.yes
        } else {
            if (val === false) { return lang.no }
            else return null
        }
    } else {
        return val
    }
}
const formatDate = ({ val, dateFormat }) => {

    if (val) {
        return moment(val).format(dateFormat, 'fr')
    }
    return null
}
const renderIcon = ({ icon, top, renderColorIcon }) => {
    return <Icon
        icon={icon}
        size="16px"
        className="absolute"
        style={{ top: top }}
        color={renderColorIcon}
    />
}
const getContainerClassName = ({ containerClassName, form, maxFormContainer }) => {
    const className = ["container-table", "w-100"]
    if (containerClassName) {
        className.push(containerClassName)
    }
    if (form && maxFormContainer) {
        className.push('container-table-hidden')
    }
    return className.join(' ')
}
const getColObject = (key, ligne) => {
    const keys = key.split('.')
    let res = null
    for (let index = 0; index < keys.length; index++) {
        if (index === 0) {
            if (ligne[keys[index]]) {
                res = ligne[keys[index]]
            } else {
                res = null
                break
            }
        } else {
            if (res[keys[index]]) {
                res = res[keys[index]]
            } else {
                res = null
                break
            }
        }
    }
    return res
}
const getTableClassName = ({ type, tableClassName, isAccepted, acceptOneElement }) => {
    const className = ["w-100"]
    if (type === 'type-1') {
        className.push("base-table")
    }
    if (type === 'type-2') {
        className.push("editable-table")
    }
    if (acceptOneElement && isAccepted) {
        className.push('table-border-last-element')
    }
    if (tableClassName) {
        className.push(tableClassName)
    }
    return className.join(' ')
}
const renderColorIcon = ({ col, up, asc, colSelected }) => {
    if (colSelected === col.key && asc && up) {
        return ButtonBlue
    }
    if (colSelected === col.key && !asc && !up) {
        return ButtonBlue
    }
    return PricefilterGrey
}
const getColSpan = ({ numberCol, withAction, withValidation, withDataDetails, withIndex }) => {
    let number = numberCol
    if (withDataDetails) number++
    if (withAction) number++
    if (withValidation) number++
    if (withIndex) number++
    return number
}
export {
    sortfunction,
    containerStyle,
    renderText,
    formatDate,
    renderIcon,
    getContainerClassName,
    getColObject,
    getTableClassName,
    defaultProps,
    renderColorIcon,
    getColSpan
}
