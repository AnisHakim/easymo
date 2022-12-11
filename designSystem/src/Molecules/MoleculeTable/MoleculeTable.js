import React, { Component } from "react"
import { CheckBox, Button, Icon } from "../../Atoms";
import translator from '../../lang/translator';
import MoleculePagination from "../MoleculePagination/MoleculePagination";
import { containerStyle, sortfunction, renderText, formatDate, renderIcon, getContainerClassName, getColObject, getTableClassName, defaultProps, renderColorIcon, getColSpan } from "./common";
import { renderContainerNewElement, renderTFoot } from "./TdFunction";
import { renderTrComponent } from "./TrComponent";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { MoleculeInput } from "..";
import { viewLabel } from "../../common";
const lang = translator('fr')
var row;
class MoleculeTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: [],
            asc: null,
            col: null,
            data: [],
            elementisEdit: { isNew: null, index: null },
            elementDetail: null,
            withDataDetails: false,
            page: 1,
            numberOfPage: 1,
            filterInput: "",
            dataIsLoaded: false
        };
    }
    ref = React.createRef()
    static defaultProps = { ...defaultProps }
    renderHeader = () => {
        const listCol = []
        if (this.props.withSelect) {
            listCol.push(<th className="table-col-checbox"><CheckBox
                className="check-table"
                containerClassName="container-check-table"
                onClick={this.selectAll}
                checked={this.props.listIds.length && this.props.listIds.length === this.state.selected.length}
            /></th>)
        }
        this.props.listCol.map((el, i) => {
            if (el.show) {
                const colClassName = ["flex"]
                if (this.props.withSort && el.sort) {
                    colClassName.push('pointer')
                }
                listCol.push(
                    <th key={i} className={el.className}>
                        <div className={colClassName.join(' ')} onClick={() => this.onSort(el)}>
                            {el.name}
                            {this.props.withSort && el.sort && <div className="flex flex-direction-col col-sort-table relative">
                                {renderIcon({ icon: "caret_up", top: -1, renderColorIcon: renderColorIcon({ col: el, up: true, asc: this.state.asc, colSelected: this.state.col }) })}
                                {renderIcon({ icon: "caret_down", top: 4, renderColorIcon: renderColorIcon({ col: el, up: false, asc: this.state.asc, colSelected: this.state.col }) })}

                            </div>}
                        </div>
                    </th >
                )
            }
        })
        return listCol
    }
    onSort = (col) => {
        if (col.key === this.state.col) {
            this.setState({
                asc: !this.state.asc

            })
        } else {
            if (this.state.col === null || this.state.col !== col.key) {
                this.setState({
                    asc: true,
                    col: col.key
                })
            }
        }
    }
    selectAll = () => {
        this.setState({
            selected: this.state.selected.length === this.props.listIds.length ? [] : this.props.listIds
        })
    }
    selectElement = (id, status) => {
        const index = this.state.selected.indexOf(id)
        const data = [...this.state.selected]
        if (index === -1) {
            data.push(id)
            this.setState({
                selected: data
            })
        } else {
            data.splice(index, 1)
            this.setState({
                selected: data
            })
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.type === "type-1") {
            if (this.state.selected !== prevState.selected) {
                this.props.onSelect && this.props.onSelect(this.state.selected)
            }
            if (this.state.col !== prevState.col || this.state.asc !== prevState.asc) {
                this.props.onSort && this.props.onSort({ col: this.state.col, asc: this.state.asc })
            }
            if (this.props.clearSelection !== prevProps.clearSelection || this.props.listIds === []) {
                this.setState({
                    selected: []
                })
            }
            if (this.props.data !== prevProps.data) {
                const listSelection = []
                for (let i = 0; i < this.state.selected.length; i++) {
                    if (this.props.listIds.indexOf(this.state.selected[i]) !== -1) {
                        listSelection.push(this.state.selected[i])
                    }
                }
                this.setState({
                    selected: listSelection
                })
            }
        } else {
            if (prevProps.data != this.props.data) {
                const data = this.props.data.map(el => {
                    return {
                        ...el,
                        isUpdated: el.isUpdated !== null && el.isUpdated !== undefined ? el.isUpdated : false,
                        isNew: el.isNew !== null && el.isNew !== undefined ? el.isNew : false,
                        isEditable: el.isEditable !== null && el.isEditable !== undefined ? el.isEditable : false,
                        newAdded: el.newAdded !== null && el.newAdded !== undefined ? el.newAdded : false,
                        show: el.show !== null && el.show !== undefined ? el.show : true,
                    }
                })
                if (this.props.acceptOneElement) {
                    data.sort((x, y) =>
                        (x.isAccepted === y.isAccepted) ? 0 : x.isAccepted ? 1 : -1
                    )
                }
                let verif = false
                if (this.props.listColDetails.length && this.props.withDataDetails) {
                    for (let i = 0; i < this.props.data.length; i++) {
                        for (let j = 0; j < this.props.listColDetails.length; j++) {
                            if (!this.props.data[i].isDeleted && this.props.data[i][this.props.listColDetails[j]]) {
                                verif = true
                                break
                            }
                            if (verif)
                                break

                        }
                    }
                }
                let page = this.state.page
                if (prevProps.data.length && prevProps.data.length < this.props.data.length) {
                    page = Math.ceil(this.props.data.filter(el => !el.isDeleted).length / this.props.perPage)
                }
                this.setState({
                    data: data,
                    withDataDetails: verif,
                    page: page,
                })
            }
            if (this.state.data != prevState.data) {
                if (this.props.withPagination) {
                    const numberOfPage = Math.ceil(this.state.data.filter(el => !el.isDeleted).length / this.props.perPage)
                    this.setState({
                        numberOfPage: numberOfPage
                    })
                }
                this.props.getdata && this.props.getdata(this.state.data, this.state.data.filter(el => !el.isDeleted).length < prevState.data.filter(el => !el.isDeleted).length)
                if (!this.state.dataIsLoaded) {
                    this.setState({
                        dataIsLoaded: true
                    })
                }
                if (this.state.dataIsLoaded) {
                    this.props.checkIsUpdated && this.props.checkIsUpdated(this.state.data.filter(el => !el.isDeleted).length < prevState.data.filter(el => !el.isDeleted).length)
                }
            }
            if (this.state.col !== prevState.col || this.state.asc !== prevState.asc) {
                this.localSort()
            }
            if (this.state.elementisEdit.index !== prevState.elementisEdit.index && this.state.elementisEdit.index !== null) {
                this.props.getElementToEdit && this.props.getElementToEdit(this.state.data[this.state.elementisEdit.index], this.ref.current.offsetWidth)
            }
            if (this.props.closeElement !== prevProps.closeElement) {
                this.setState({
                    elementisEdit: { isNew: null, index: null }
                })
            }
            if (this.state.filterInput !== prevState.filterInput) {
                this.setFiltredData()
            }
        }
    }
    renderBody = () => {
        const body = []
        this.props.data.map((el, index) => {
            const trClassName = []
            if (index % 2 === 0) {
                trClassName.push('blue-tr')
            }
            if (el.trClassName) {
                trClassName.push(el.trClassName)
            }
            body.push(<tr key={index} className={trClassName.join(' ')}>
                {this.props.withSelect &&
                    <td key={index} >
                        <CheckBox
                            key={el._id}
                            className="check-table"
                            containerClassName="container-check-table"
                            onClick={() => this.selectElement(el._id, el.status)}
                            checked={this.state.selected.indexOf(el._id) !== -1 ? true : false}
                        />
                    </td>}
                {this.renderTr(el)}</tr>)
        })
        return body
    }
    renderTr = (ligne) => {
        const tr = []
        this.props.listCol.map((el, i) => {
            tr.push(this.renderTd(ligne, el))
        })
        return tr
    }
    renderTd = (ligne, el) => {
        if (el.show)
            return <td key={el.key}>
                {el.key.split('.').length === 1 ? ligne[el.key] : getColObject(el.key, ligne)}
            </td>
        return null
    }
    renderHeaderEditable = () => {
        const listCol = []
        if (this.props.withDataDetails && this.props.listColDetails.length && this.state.withDataDetails) {
            listCol.push(<th></th>)
        }
        if (this.props.withIndex) {
            listCol.push(<th className="td-index">#</th>)
        }
        if (this.props.withValidation) {
            listCol.push(<th className="td-validation">
                {lang.etat}
            </th>)
        }
        if (this.props.actionFirst && this.props.withAction) {
            listCol.push(<th className="td-action">
                {!this.props.withoutTitleAction && lang.action}
            </th>)
        }
        this.props.listCol.map((el, index) => {
            const colClassName = ["flex"]
            if (this.props.withSort && el.sort) {
                colClassName.push('pointer')
            }
            listCol.push(
                <th key={index} className={el.className}>
                    <div className={colClassName.join(' ')} onClick={() => this.state.elementDetail === null && this.state.elementisEdit.index === null && this.onSort(el)}>
                        {el.name}
                        {this.props.withSort && el.sort && <div className="flex flex-direction-col col-sort-table relative">
                            {renderIcon({ icon: "caret_up", top: -1, renderColorIcon: renderColorIcon({ col: el, up: true, asc: this.state.asc, colSelected: this.state.col }) })}
                            {renderIcon({ icon: "caret_down", top: 4, renderColorIcon: renderColorIcon({ col: el, up: false, asc: this.state.asc, colSelected: this.state.col }) })}
                        </div>}
                    </div>
                </th >
            )
        })
        if (!this.props.actionFirst && this.props.withAction) {
            listCol.push(<th className="td-action">
                Action
            </th>)
        }
        return listCol
    }
    onDragEnd = (e) => {
        const data = [...this.state.data]
        this.setState({ data: [] })
        const newData = []
        const children = e.target.parentNode.children
        const listId = []
        for (let index = 0; index < children.length; index++) {
            listId.push(parseInt(children[index].id.toString().replace('tr-', "")))
        }
        for (let index = 0; index < listId.length; index++) {
            newData.push(data[listId[index]])
        }
        for (let index = 0; index < data.length; index++) {
            if (listId.indexOf(index) === -1) {
                newData.push(data[index])
            }
        }
        this.setState({
            data: newData
        })
    }
    defineTrProps = ({ el, position, indexToView, provider = null }) => {
        return {
            ref: this.ref,
            padding: this.props.padding,
            maxFormContainer: this.props.maxFormContainer,
            withDragAndDrop: this.props.withDragAndDrop,
            lang: lang,
            el: el,
            trAcceptedColor: this.props.trAcceptedColor,
            position: position,
            withDataDetails: this.props.withDataDetails,
            listColDetails: this.props.listColDetails,
            statewithDataDetails: this.state.withDataDetails,
            openDetails: () => this.openDetails(el, position),
            onCancel: () => this.setState({ elementDetail: null }),
            elementDetail: this.state.elementDetail,
            withValidation: this.props.withValidation,
            onValid: (type, index, status) => this.onValid(type, index, status),
            withAction: this.props.withAction,
            actionFirst: this.props.actionFirst,
            listAction: this.props.listAction,
            data: this.state.data,
            onAction: (action, index) => this.onAction(action, index),
            renderTrEditable: this.renderTrEditable,
            listCol: this.props.listCol,
            renderContainerDetailprop: this.props.renderContainerDetail,
            elementisEdit: this.state.elementisEdit,
            editComponent: this.props.editComponent,
            onSave: () => this.onSave(),
            onCancelAdd: () => this.onCancel(),
            withIndex: this.props.withIndex,
            indexToView: indexToView,
            provider: provider
        }
    }
    renderBodyEditable = (provider = null) => {
        const body = []
        const data = [...this.state.data]
        const firstIndex = !this.props.withPagination ? 0 : ((this.state.page - 1) * this.props.perPage)
        const lastIndex = data.length
        let i = 0
        for (let index = firstIndex; index < lastIndex; index++) {
            if ((i < this.props.perPage || !this.props.withPagination) &&
                (!this.props.withFilter && !data[index].isDeleted) ||
                (!data[index].isDeleted && this.props.withFilter && data[index].show)) {
                i++
                let tr = null
                if (this.props.withDragAndDrop && !this.state.elementDetail && !this.state.elementisEdit.index) {
                    tr = <Draggable
                        key={index}
                        draggableId={"table-" + index.toString()}
                        index={index}
                    >
                        {(provider) => (
                            renderTrComponent({ ...this.defineTrProps({ el: data[index], position: index, indexToView: i, provider: provider }) })
                        )}
                    </Draggable>
                } else {
                    tr = renderTrComponent({ ...this.defineTrProps({ el: data[index], position: index, indexToView: i }) })
                }
                body.push(tr)
            } else if ((i === this.props.perPage) && this.props.withPagination) {
                break
            }
        }
        if (this.state.elementisEdit.isNew) {
            body.push(
                renderContainerNewElement({
                    colSpan: getColSpan({
                        withDataDetails: this.props.withDataDetails,
                        numberCol: this.props.listCol.length,
                        withAction: this.props.withAction,
                        withValidation: this.props.withValidation,
                        withIndex: this.props.withIndex,
                    }),
                    editComponent: this.props.editComponent,
                    onCancel: () => this.onCancel(),
                    onSave: () => this.onSave(),
                    lang: lang,
                    form: this.state.elementisEdit.isNew ||
                        (this.state.elementisEdit.index !== null),
                    maxFormContainer: this.props.maxFormContainer,
                    ref: this.ref,
                    padding: this.props.padding
                })
            )
        }
        return <tbody
            ref={provider && provider.innerRef}
            {...provider?.droppableProps}
        >{body}
        </tbody>
    }
    onValid = (type, index, status) => {
        const data = [...this.state.data]
        if (type === "typeIsRejected") {
            data[index].isRejected = !data[index].isRejected
            if (data[index].isAccepted) {
                data[index].isAccepted = false
            }
        }
        if (type === "typeIsAccepted") {
            if (this.props.acceptOneElement) {
                data[index].isAccepted = data[index].isAccepted ? false : this.state.data.filter(el => el.isAccepted && !el.isDeleted).length > 0 ? data[index].isAccepted : true
            } else {
                data[index].isAccepted = !data[index].isAccepted
            }
            if (data[index].isRejected) {
                data[index].isRejected = this.props.acceptOneElement ? data[index].isRejected : false
            }
        }
        data[index].isUpdated = true
        if (this.props.acceptOneElement) {
            data.sort((x, y) =>
                (x.isAccepted === y.isAccepted) ? 0 : x.isAccepted ? 1 : -1
            )
        }
        this.setState({
            data: data
        })
    }
    renderTrEditable = (ligne, index) => {
        const tr = []
        this.props.listCol.map((el, i) => {
            tr.push(this.renderTdEditable(ligne, el, index))
        })
        return tr
    }
    renderTdEditable = (ligne, col, index) => {
        return <td >
            {col.key.split('.').length === 1 ? this.renderCol(ligne, col, index) : getColObject(col.key, ligne)}
        </td>
    }
    renderCol = (ligne, col, index) => {
        if (col.type === "array") {
            if (col.renderFunction) {
                return typeof col.renderFunction === "function" ? col.renderFunction(ligne[col.key], ligne, index) : null
            }
            return ligne[col.key].map(el => el)
        } if (col.type === "custom") {
            if (col.renderFunction) {
                return typeof col.renderFunction === "function" ? col.renderFunction(ligne[col.key], ligne, index) : null
            }
            return null
        } if (col.type === "file") {
            if (col.renderFunction) {
                return typeof col.renderFunction === "function" ? col.renderFunction(ligne[col.key], ligne, index) : null
            }
            return null
        } else {
            return col.isDate ?

                formatDate({ val: ligne[col.key], dateFormat: this.props.dateFormat })
                :
                renderText({ val: ligne[col.key], lang: lang })
        }
    }
    onAction = (action, index) => {
        const data = [...this.state.data]
        let elementisEdit = this.state.elementisEdit
        let page = this.state.page
        switch (action) {
            case "delete":
                data[index] = { ...data[index], isDeleted: true, isUpdated: true }
                break;
            case "duplicate":
                let attribute = {}
                if (this.props.nullDuplicateAttribute.length)
                    for (let index = 0; index < this.props.nullDuplicateAttribute.length; index++) {
                        attribute[this.props.nullDuplicateAttribute[index]] = null
                    }
                data.push({
                    ...data[index],
                    ...attribute,
                    _id: null,
                    id: null,
                    isNew: true,
                    isAccepted: false,
                    isRejected: false,
                })
                page = this.props.withPagination ? this.state.numberOfPage : this.state.page
                break;
            case "edit":
                const verif = data.filter(el => el.isEditable)
                if (!verif.length && this.state.elementDetail === null) {
                    elementisEdit = { isNew: false, index: index }
                    if (!this.props.editWithModal) {
                        data[index].isEditable = true
                    }
                    data[index].isUpdated = true
                    this.setElementIsEdit(elementisEdit)
                }
                break;
            case 'save':
                this.onSave()
                break
            default:
                break;
        }
        this.setState({
            data: data,
            page: page,
        })
    }
    onAddNew = () => {
        if (this.state.data.filter(el => el.isEditable).length < this.props.numberOfNewElement) {
            this.setElementIsEdit({ isNew: true, index: this.state.data.length })
        }
    }
    setElementIsEdit = (elementisEdit) => {
        if (this.props.maxFormContainer) {
            this.ref.current.scrollLeft = 0
        }
        if (this.props.editWithModal) {
            this.props.openModalEdit && this.props.openModalEdit(elementisEdit.index)
        } else {
            this.setState({ elementisEdit: elementisEdit })
        }
    }
    localSort = () => {
        const data = [...this.state.data]
        data.sort((a, b) => sortfunction(a, b, this.state.col, this.state.asc))
        let res = data
        if (this.props.sortAccepted) {
            let acceptedOffer = res.filter(el => el.isAccepted)
            let otherOffers = res.filter(el => !el.isAccepted)
            res = [...otherOffers, ...acceptedOffer]
        }
        this.setState({
            data: res
        })
    }
    onCancel = () => {
        const list = [...this.state.data]
        if (list.length && list[this.state.elementisEdit.index])
            list[this.state.elementisEdit.index].isEditable = false
        this.setState({
            data: list,
            elementisEdit: { isNew: null, index: null }
        })
    }
    onSave = () => {
        this.props.onSave && this.props.onSave(this.state.elementisEdit.index)
    }
    openDetails = (el, index) => {
        if (this.state.elementisEdit.index === null) {
            this.props.onGetElementToMoreDetails && this.props.onGetElementToMoreDetails(el)
            this.setState({
                elementDetail: index
            })
        }
    }
    renderBtn = (btnClassName = "") => {
        return <Button
            type='secondary'
            icon={this.props.icon}
            iconClassName={this.props.iconClassName}
            text={this.props.btnText}
            className={btnClassName + this.props.btnClassName}
            onClick={() => this.state.elementDetail === null && this.onAddNew()}
        />
    }
    renderType1 = () => {
        if (this.props.type === "type-1") {
            return <>
                <table className={getTableClassName({
                    type: this.props.type, tableClassName: this.props.tableClassName,
                    acceptOneElement: this.props.acceptOneElement,
                    isAccepted: this.state.data.filter(el => el.isAccepted && !el.isDeleted).length === 1
                })}>
                    <thead>
                        {this.renderHeader()}
                    </thead>
                    <tbody>
                        {this.renderBody()}
                    </tbody>
                </table>
            </>
        }
        return null
    }
    renderType2 = () => {
        if (this.props.type === "type-2") {
            return <>
                <table className={getTableClassName({
                    type: this.props.type, tableClassName: this.props.tableClassName,
                    acceptOneElement: this.props.acceptOneElement,
                    isAccepted: this.state.data.filter(el => el.isAccepted && !el.isDeleted).length === 1
                })}>
                    <thead>
                        {this.renderHeaderEditable()}
                    </thead>
                    {
                        (this.state.data.filter(el => !el.isDeleted).length > 0 || this.state.elementisEdit.isNew) ?
                            this.props.withDragAndDrop ?
                                <Droppable droppableId="droppable-1">
                                    {(provider) => (
                                        this.renderBodyEditable(provider)
                                    )}
                                </Droppable>
                                :
                                this.renderBodyEditable()
                            :
                            <tbody>
                                <tr>
                                    <td colSpan={
                                        getColSpan({
                                            withDataDetails: this.props.withDataDetails,
                                            numberCol: this.props.listCol.length,
                                            withAction: this.props.withAction,
                                            withValidation: this.props.withValidation,
                                            withIndex: this.props.withIndex
                                        })
                                    }>
                                        <div className="empty-text-container flex item-center">
                                            <Icon icon="warning" className="empty-tab-icon mr-2" />
                                            {this.props.emptyArrayText}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                    }
                    {this.props.type === "type-2" && this.props.withFooter ?
                        renderTFoot({
                            listCol: this.props.listCol,
                            data: this.state.data,
                            renderBtn: this.renderBtn(),
                            withAction: this.props.withAction,
                            withValidation: this.props.withValidation,
                            withDataDetails: this.state.withDataDetails,
                            actionFirst: this.props.actionFirst,
                            devise: this.props.devise,
                            withIndex: this.props.withIndex
                        })
                        : null}
                </table>
            </>
            // }
            return null
        }
        return null
    }
    changePage = (e) => {
        this.setState({ page: e })
    }
    handleDragEnd = (e) => {
        let data = [...this.state.data]
        let [source_data] = data.splice(e.source.index, 1);
        data.splice(e.destination.index, 0, source_data);
        this.setState({
            data: data
        })
    }
    onChangeSearch = (value) => {
        this.setState({
            filterInput: value
        })
    }
    renderInput = () => {
        return <div className='flex flex-wrap justify-space-between item-center mb-2'>
            {viewLabel({
                label: this.props.title,
                labelClass: 'bold-16-label'
            })}
            <MoleculeInput
                placeholder={this.props.inputPlaceHolder}
                withIconStart
                onchangeInput={(e) => this.onChangeSearch(e.target.value)}
                inputValue={this.state.filterInput}
                inputClassname='input-search-proximity input-add-equipement w-100'
                startIcon='search'
                startIconClass='icon-search-proximity'
            />
        </div>
    }
    setFiltredData = () => {
        const list = this.state.data.map(el => { return { ...el, show: false } })
        const filter = this.state.filterInput
        const listCol = this.props.listCol
        for (let index = 0; index < list.length; index++) {
            for (let j = 0; j < listCol.length; j++) {
                if (list[index][listCol[j].key].toString().includes(filter)) {
                    if (!list[index].show) {
                        list[index].show = true
                        break
                    }
                }
            }
        }
        this.setState({
            data: list
        })
    }
    render() {
        return (
            <>
                {this.props.type === "type-2" && this.props.withFilter && this.renderInput()}
                <div className={
                    getContainerClassName({
                        containerClassName: this.props.containerClassName,
                        form: this.state.elementisEdit.isNew ||
                            (this.state.elementisEdit.index !== null),
                        maxFormContainer: this.props.maxFormContainer
                    })
                }
                    ref={this.ref}
                    style={{
                        ...containerStyle({
                            withSizeControl: this.props.withSizeControl,
                            ref: this.ref,
                            padding: this.props.padding,

                        }),
                        overFlow: "hidden"
                    }
                    }
                >
                    {this.renderType1()}
                    {this.props.withDragAndDrop ?
                        <DragDropContext onDragEnd={this.handleDragEnd}>
                            {this.renderType2()}
                        </DragDropContext>
                        : this.renderType2()
                    }
                </div>
                {this.props.type === "type-2" && this.props.withPagination && this.state.numberOfPage > 1 && <div className='flex paginaation-status-container' >
                    <MoleculePagination
                        containerClassName='status-pagination'
                        iconNavigation
                        numberOfPage={this.state.numberOfPage}
                        page={this.state.page}
                        onClick={(e) => this.changePage(e)}
                    />
                </div>}
                {this.props.type === "type-2" && !this.props.withFooter && this.props.withBtnAdd && this.renderBtn("mt-6")}
            </>
        );
    }
}

export default MoleculeTable;