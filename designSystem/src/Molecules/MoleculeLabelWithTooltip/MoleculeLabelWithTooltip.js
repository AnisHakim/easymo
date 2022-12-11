import React from 'react'
import propTypes from 'prop-types';
import { SiderbarItemBlack } from '../../Colors';
import MoleculeTooltip from '../MoleculeTooltip/MoleculeTooltip';
import { Text } from '../../Atoms';

MoleculeLabelWithTooltip.PropTypeses = {
    iconList: propTypes.array,
    iconClassname: propTypes.string,
    textClassname: propTypes.string,
    label: propTypes.string,

};
MoleculeLabelWithTooltip.defaultProps = {
    iconList: ['lock_outlined'],
    iconClassname: "drawer-title-icon header ml-1 mb-2",
    textClassname: "header-select-label mandat",
    label: ''
}
function MoleculeLabelWithTooltip(props) {
    return (
        <div className="flex item-center input-mandat-row" >
            <Text text={props.label} className={props.textClassname} />
            {props.iconList && props.iconList.map((el, index) =>
                <MoleculeTooltip
                    backgroundColor={SiderbarItemBlack}
                    tooltipText={el.tooltipText}
                    icon={el.icon}
                    onClick={el.onClick}
                    iconClassname={props.iconClassname} />)}
        </div>
    )
}

export default MoleculeLabelWithTooltip
