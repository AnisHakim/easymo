
import { renderAction, renderContainerDetail, renderContainerNewElement, renderDataDetails, renderValidation } from "./TdFunction";
import { getColSpan } from "./common";

export const renderTrComponent = ({
    el, trAcceptedColor, withDataDetails, listColDetails, openDetails,
    onCancel, position, elementDetail, withValidation,
    onValid, withAction, actionFirst, listAction, data,
    onAction, renderTrEditable, listCol,
    renderContainerDetailprop, elementisEdit,
    onSave, onCancelAdd, editComponent,
    statewithDataDetails, lang,
    withIndex, indexToView,
    provider, padding, maxFormContainer,ref
}) => {
    const tr = []
    const trClassName = []
    if (el.trClassName) {
        trClassName.push(el.trClassName)
    }
    if (trAcceptedColor && el.isAccepted) {
        trClassName.push('tr-accepted')
    }
    if (!el.isDeleted) {
        tr.push(<>
            <tr
                ref={provider && provider.innerRef}
                {...provider?.draggableProps}
                className={trClassName.join(' ')}
                id={"tr-" + position}>
                {renderDataDetails({
                    withDataDetails: withDataDetails,
                    data: el,
                    listColDetails: listColDetails,
                    render: statewithDataDetails,
                    onClick: () => openDetails(el, position),
                    onCancel: () => onCancel(),
                    isOpen: position === elementDetail
                })}

                {withIndex && <td className="td-index">{indexToView}</td>}
                {renderValidation({
                    ligne: el,
                    index: position,
                    withValidation: withValidation,
                    onValid: (type, index, status) => onValid(type, index, status)
                })}
                {renderAction({
                    ligne: el,
                    index: position,
                    first: true,
                    withAction: withAction,
                    actionFirst: actionFirst,
                    listAction: listAction,
                    data: data,
                    onAction: (action, index) => onAction(action, index),
                    provider: provider,
                    isOpen: elementDetail !== null || !elementisEdit.isNew && elementisEdit.index != null
                })}
                {renderTrEditable(el, position)}
                {renderAction({
                    ligne: el,
                    index: position,
                    first: false,
                    withAction: withAction,
                    actionFirst: actionFirst,
                    listAction: listAction,
                    data: data,
                    onAction: (action, index) => onAction(action, index),
                    provider: provider,
                    isOpen: elementDetail !== null || !elementisEdit.isNew && elementisEdit.index != null

                })}
            </tr>
            {elementDetail === position &&
                renderContainerDetail({
                    colSpan: getColSpan({
                        numberCol: listCol.length,
                        withAction: withAction,
                        withValidation: withValidation,
                        withDataDetails: withDataDetails,
                        withIndex: withIndex
                    }),
                    detailsComponent: renderContainerDetailprop,
                    lang: lang
                })
            }
            
            {!elementisEdit.isNew && elementisEdit.index === position &&
                renderContainerNewElement({
                    colSpan: getColSpan({
                        numberCol: listCol.length,
                        withAction: withAction,
                        withValidation: withValidation,
                        withDataDetails: withDataDetails,
                        withIndex: withIndex
                    }),
                    editComponent: editComponent,
                    onCancel: () => onCancelAdd(),
                    onSave: () => onSave(),
                    lang: lang,
                    padding: padding,
                    form: elementisEdit.isNew ||
                        (elementisEdit.index !== null),
                    maxFormContainer: maxFormContainer,
                    ref:ref,
                })
            }
        </>
        )
    }
    return tr
}