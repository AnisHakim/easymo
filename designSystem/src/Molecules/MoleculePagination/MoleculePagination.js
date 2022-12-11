import React from "react";
import propTypes from 'prop-types';
import translator from '../../lang/translator';
import { Icon } from "../../Atoms"
MoleculePagination.defaultProps = {
    page: null,
    numberOfPage: null,
    onClick: null,
    containerClassName: null,
    iconNavigation: false
}
MoleculePagination.propTypes = {
    page: propTypes.number,
    numberOfPage: propTypes.number,
    onClick: propTypes.any,
    containerClassName: propTypes.string,
    iconNavigation: propTypes.bool
}
function MoleculePagination(props) {
    const lang = translator('fr')
    const containerClassName = ["flex", "container-pagination"]
    if (props.containerClassName) {
        containerClassName.push(props.containerClassName)
    }
    function renderItem(withIcon, data, onClick, hover = true, disabled) {
        const itemClassName = ["item-pagination"]
        if (hover) {
            itemClassName.push('item-hover')
            itemClassName.push('pointer')
        }
        if (props.page === data) {
            itemClassName.push('item-pagination-active')
        }
        if (props.iconNavigation && disabled) {
            itemClassName.push('disabled')
        }
        return <div className={itemClassName.join(' ')} onClick={onClick}>
            {withIcon ? <Icon className='icon-pagination' icon={data} /> : data}
        </div>
    }
    function renderItems() {
        const numberOfBlock = Math.ceil(props.numberOfPage / 5)
        const pageBlock = Math.ceil(props.page / 5)
        const data = []
        if (pageBlock > 1) {
            data.push(renderItem(false, 1, () => props.onClick && props.onClick(1)))
            data.push(renderItem(false, "...", null, false))
        }

        let index = 0
        for (index = (pageBlock - 1) * 5; index < (pageBlock - 1) * 5 + 5; index++) {
            if (index >= 0 && index < props.numberOfPage) {
                const value = index + 1
                data.push(
                    renderItem(false, value, () => props.onClick && props.onClick(value))
                )
            }
        }
        if (pageBlock < numberOfBlock) {
            data.push(renderItem(false, "...", null, false))
            data.push(renderItem(false, props.numberOfPage, () => props.onClick && props.onClick(props.numberOfPage)))
        }
        return data
    }
    return <div className={containerClassName.join(' ')}>
        {renderItem(props.iconNavigation, props.iconNavigation ? 'chevron_left' : lang.prev, () => props.onClick && props.page > 1 && props.onClick(props.page - 1), true, props.page == 1)}
        {renderItems()}
        {renderItem(props.iconNavigation, props.iconNavigation ? 'chevron_right' : lang.next, () => props.onClick && props.page < props.numberOfPage && props.onClick(props.page + 1), true, props.page == props.numberOfPage)}
    </div>
}
export default MoleculePagination