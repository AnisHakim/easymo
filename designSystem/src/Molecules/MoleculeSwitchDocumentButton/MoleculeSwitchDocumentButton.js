import React from 'react'
import { Icon } from '../../Atoms'
import PropTypes from 'prop-types';
MoleculeSwitchDocumentButton.propTypes = {
    selectedView: PropTypes.string,
};
MoleculeSwitchDocumentButton.defaultProps = {
    selectedView: 'column',
};
function MoleculeSwitchDocumentButton(props) {
    return (
        <div className='document-change-container flex item-center'>
            <div className={props.selectedView === "column" ? 'column-button pointer' : 'column-button-disabled pointer'}
                onClick={() => props.onChangeDocumentNav('column')}>
                <Icon icon="column_view_outlined" className="column-button-icon" />
            </div>
            <div className={props.selectedView === "row" ? 'column-button pointer' : 'column-button-disabled pointer'}
                onClick={() => props.onChangeDocumentNav('row')}>
                <Icon icon="agenda_view_outlined" className="column-button-icon" />
            </div>
        </div>
    )
}
export default MoleculeSwitchDocumentButton
