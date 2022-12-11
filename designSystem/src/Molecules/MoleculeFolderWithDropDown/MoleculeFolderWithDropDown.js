import React from 'react'
import PropTypes from 'prop-types';
import { Icon, Text } from '../../Atoms';
import { Dropdown } from '..';

MoleculeFolderWithDropDown.propTypes = {
    icon: PropTypes.string,
    iconClassName: PropTypes.string,
    selectedView: PropTypes.string,
    containerClassName: PropTypes.string,
    options: PropTypes.array,
};
MoleculeFolderWithDropDown.defaultProps = {
    icon: 'folder',
    iconClassName: '',
    selectedView: 'column',
    containerClassName: '',
    options: [],
};
function MoleculeFolderWithDropDown(props) {
    const iconClassName = ['default-folder-icon mr-2']
    if (props.iconClassName) {
        iconClassName.push(props.iconClassName)
    }
    const containerClassName = [`${props.selectedView === "row" ? 'folder-row-view-container' : 'shadowContainer folder-container'} pointer flex justify-space-between`]
    if (props.containerClassName) {
        containerClassName.push(props.containerClassName)
    }
    return (
        <div className='relative w-100' >
            <div className={containerClassName.join(' ')}
                onClick={props.onAccessFolder}
            >
                <div className='folder-container-view'>
                    <div className={`flex item-center w-100 `} >
                        <Icon icon={props.icon} className={iconClassName.join(' ')} />
                        <Text text={props.title} type="h5" className={`${props.selectedView === "row" && 'ml-3'} default-folder-title mb-0`} />
                    </div>
                </div>
            </div>
            <div className={`absolute ${props.selectedView === "row" ? 'r-22 t-26' : 'r-16 t-16'}`} >
                <Dropdown
                    animated
                    onPickItem={props.onPickFolder}
                    iconStartClass={'folder-drop-down-icon'}
                    dropdownBtn={props.selectedView === "column" ? 'drop-down-filterTable-btn' : 'drop-down-export-btn'}
                    withStartIcon={props.selectedView === "column" ? true : false}
                    iconStart='more_vertical'
                    text={props.selectedView === "column" ? '' : 'Options'}
                    withEndIcon={props.selectedView === "column" ? false : true}
                    options={props.options}
                    dropDownListStyle="folder-drop-down-container"
                />
            </div>
        </div>
    )
}
export default MoleculeFolderWithDropDown