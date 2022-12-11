import { Button, Icon } from "../../Atoms"
import { DarkBlue, Red } from "../../Colors"
import { formatNumber } from "../../common"
import translator from "../../lang/translator"
const lang = translator('fr')
const returnStatus = (isAccepted, isRejected) => {
    if (!isAccepted && !isRejected)
        return "isPending"
    else {
        if (isAccepted) {
            return "isAccepted"
        } else {
            return "isRejected"
        }
    }
}
const renderBtnValidation = ({ icon, type, status, index, onValid }) => {
    let btnType = "inprogress"
    const className = ["btn-val-table"]
    if (type === "typeIsRejected") {
        className.push('mr-1')
    }
    if (status === "isPending") {
        if (type === "typeIsRejected") {
            btnType = "danger"
        } else {
            btnType = "success"
        }
    } else {
        if (status === "isAccepted") {
            if (type === "typeIsRejected") {
                btnType = "inprogress"
            } else {
                className.push('btn-table-isValid')
            }
        } else {
            if (status === "isRejected") {
                if (type === "typeIsRejected") {
                    className.push('btn-table-isInValid')
                } else {
                    btnType = "inprogress"
                }
            }
        }
    }

    return <Button
        type={btnType}
        icon={icon}
        className={className.join(' ')}
        onClick={() => onValid(type, index, status)}
    />
}
const renderValidation = ({ ligne, index, withValidation, onValid }) => {
    if (withValidation) {
        return <td className="td-validation">
            <div className="flex">
                {renderBtnValidation({
                    icon: "clear",
                    status: returnStatus(ligne.isAccepted, ligne.isRejected),
                    type: "typeIsRejected",
                    index: index,
                    onValid: onValid
                })}
                {renderBtnValidation({
                    icon: "done",
                    status: returnStatus(ligne.isAccepted, ligne.isRejected),
                    type: "typeIsAccepted",
                    index: index,
                    onValid: onValid
                })}
            </div>
        </td>
    }
    return null
}

const renderAction = ({ ligne, index, first, withAction, actionFirst, listAction, data, onAction, provider = null, isOpen }) => {
    if (withAction && ((actionFirst && first) || (!actionFirst && !first))) {
        const list = []
        for (let i = 0; i < listAction.length; i++) {
            list.push(renderBtnAction({
                action: listAction[i],
                indexLigne: index,
                data: data,
                onAction: onAction,
                provider: provider,
                isOpen: isOpen
            }))
        }
        return <td className="td-validation">
            <div className="flex w-100">{list}</div>
        </td>
    }
    return null
}
const renderBtnAction = ({ action, indexLigne, data, onAction, provider = null, isOpen = false }) => {
    if (action === "edit") {
        return <Button
            type={"inprogress"}
            icon={data[indexLigne].isEditable ? "save" : "edit"}
            className={"btn-action-table-edit"}
            iconColor={DarkBlue}
            onClick={() => onAction(data[indexLigne].isEditable ? "save" : action, indexLigne)}
        />
    } else {
        if (action === "delete") {
            return <Button
                type={"inprogress"}
                icon={"delete"}
                className={"btn-action-table-delete"}
                iconColor={Red}
                onClick={() => onAction(action, indexLigne)}
            />
        } else {
            if (action === "duplicate") {
                return <Button
                    type={"inprogress"}
                    icon={"copy"}
                    className={"btn-action-table"}
                    onClick={() => onAction(action, indexLigne)}
                />
            } else {
                if (action === "drag" && !isOpen) {
                    return <div
                        {...provider?.dragHandleProps}
                    >
                        <Button
                            type={"inprogress"}
                            icon={"move_page"}
                            className={"btn-action-table"}
                            {...provider?.dragHandleProps}
                        />
                    </div>
                }
            }
        }
    }

    return null
}
const renderContainerNewElement = ({ colSpan, editComponent, onCancel, onSave, lang, form, maxFormContainer, ref, padding }) => {
    let style = {}
    const className = ['p-2']
    if (form && maxFormContainer) {
        style['width'] = ref.current.offsetWidth - padding - 60
    } else {
        className.push('w-100')
    }
    return <tr>
        <td colSpan={colSpan}>
            <div className={className.join(' ')} style={style}>
                {editComponent}
                <div className="w-100 flex justify-flex-end mt-2">
                    <Button containerClassName='sticky editable-discard-btn' type="ghost" text={lang.tableCancel} onClick={onCancel} className="mr-3" />
                    <Button containerClassName='sticky editable-save-btn' type="primary" text={lang.tableOk} onClick={onSave} className="ml-d3" />
                </div>
            </div>
        </td>
    </tr>
}
const renderDataDetails = ({ withDataDetails, onClick, listColDetails, data, render, isOpen, onCancel }) => {
    let verif = false
    for (let index = 0; index < listColDetails.length; index++) {
        if (data[listColDetails[index]]) {
            verif = true
            break;
        }
    }
    if (withDataDetails && verif) {
        return <td style={{ width: "0px" }}>
            <Icon
                className="pointer"
                icon={isOpen ? "details-close" : "details-show"}
                onClick={isOpen ? onCancel : onClick}
                size="16px"
            />
        </td>
    }
    if (render)
        return <td></td>
    return null
}
const renderContainerDetail = ({ colSpan, detailsComponent, onCancel, lang }) => {
    return <tr>
        <td colSpan={colSpan}>
            <div className="w-100 p-2">
                {detailsComponent}
            </div>
        </td>
    </tr>
}
const getColBtn = ({
    withAction,
    withValidation,
    actionFirst,
    withDataDetails,
    withIndex
}) => {
    let number = 0
    if (withAction && actionFirst) number++
    if (withValidation) number++
    if (withDataDetails) number++
    if (withIndex) number++
    return number
}
const renderTotal = ({ col, data, devise }) => {
    if (col.sumText)
        return <th>{col.sumText}</th>
    else {
        let total = 0
        for (let i = 0; i < data.length; i++) {
            if (!data[i].isDeleted) {
                const parse = parseInt(data[i][col.key.toString()])
                if (!Number.isNaN(parse))
                    total += parse
            }
        }
        return <th>{formatNumber(total, devise, lang.localNumber)}</th>
    }
}
const renderTFoot = ({ listCol, data, renderBtn,
    withAction,
    withValidation,
    withDataDetails,
    actionFirst,
    devise,
    withIndex
}) => {
    let colBtnSpan = false
    const list = []
    for (let i = 0; i < listCol.length; i++) {
        if (listCol[i].withSum && !colBtnSpan) {
            colBtnSpan = true
            list.push(<th colSpan={i + getColBtn({
                withAction: withAction,
                withValidation: withValidation,
                actionFirst: actionFirst,
                withDataDetails: withDataDetails,
                withIndex: withIndex
            })}>{renderBtn}</th>)
            list.push(renderTotal({ col: listCol[i], data: data, devise: devise }))
        } else {
            if (listCol[i].withSum) {
                list.push(renderTotal({ col: listCol[i], data: data, devise: devise }))
            } else if (colBtnSpan) {
                list.push(<th></th>)
            }
        }
    }
    if (withAction && !actionFirst) {
        list.push(<th></th>)
    }
    return <tfoot className="bg-light">
        <tr>
            {list}
        </tr>
    </tfoot>
}
export {
    renderBtnValidation,
    renderValidation,
    returnStatus,
    renderAction,
    renderBtnAction,
    renderContainerNewElement,
    renderDataDetails,
    renderContainerDetail,
    renderTFoot,
}