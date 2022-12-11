import React from 'react'

import propTypes from 'prop-types';
import MoleculeTextIcon from '../MoleculeTextIcon/MoleculeTextIcon'
import { Icon, Text } from '../../Atoms';
MoleculeMenu.propTypes = {
    iconStartClass: propTypes.string,
    iconStart: propTypes.string,
    textclassName: propTypes.string,
    text: propTypes.string,
    active: propTypes.bool
}
MoleculeMenu.defaultProps = {
    textclassName: '',
    text: 'text',
    iconStart: '',
    iconStartClass: '',
    active: false
}

function MoleculeMenu(props) {
    let classNameMolecule = 'flex item-center molecule-sidebar molecule-color ';
    classNameMolecule = props.active ? classNameMolecule += 'active ' : classNameMolecule;
    classNameMolecule = classNameMolecule + props.classNameMolecule;
    function renderDivider(className) {
        return <div className={"nav-divider-sidebar w-100" + className}></div>
    }
    function renderSubTitleHover() {
        if (props.subTitle && props.open) {
            return <div className='icon-sidebar-with-subtitle relative'
                onClick={props.handleClick}
            >
                <MoleculeTextIcon
                    iconStart="circle1"
                    iconStartClass="icon-sub-menu-reduce"
                    withEndIcon={true}
                    iconEnd={props.iconStart}
                    iconEndClass={props.iconStartClass}
                />
                <div
                    className='icon-sidebar-with-subtitleHover absolute'
                >
                    <div className='container-subTitle-mobile'>
                        {props.subTitle.map((el, index) =>
                            <div key={index} className='subtitle relative'>
                                {el.active &&
                                    <div className="active-blue-line h-34px" >
                                    </div>}
                                <MoleculeTextIcon
                                    menuNavLink={props.menuNavLink}
                                    navLink
                                    iconStart="circle1" iconStartClass="icon-sub-menu"
                                    textclassName="side-bar-text decoration-no" text={el.title}
                                // onClickContainer={() => props.navigation(el.link)}
                                />

                            </div>
                        )}
                    </div>

                </div>
            </div>
        }
        return <div className={classNameMolecule} onClick={props.handleClick}>
            <MoleculeTextIcon iconStart={props.iconStart} iconStartClass={props.iconStartClass}
                textclassName={props.textclassName} text={props.text} />
            {!props.open && props.subTitle &&
                <Icon icon={props.isOpenSubTitle ? "chevron_up" : "chevron_down"} className={props.isOpenSubTitle ? "side-bar-arrow-up" : 'side-bar-arrow-down'} />
            }
        </div>

    }
    return (
        props.open && !props.link ?
            <div>
                {props.widhDividerReduce && renderDivider()}
                <div className='icon-horizontal-container'><Icon className='icon-horizontal' icon={props.iconShort} /></div>
            </div>
            :
            !props.link && props.withDivider ?
                <>
                    {renderDivider()}
                    <div className='side-bar-text nav-subtitle-sidebar'>{props.title} </div>
                </>
                :
                <>
                    {renderSubTitleHover()}
                    {!props.open && props.subTitle && props.isOpenSubTitle && <ul className="nav" style={{ display: 'block' }}>
                        <li>
                            {props.subTitle.map((el, i) =>
                                <div className="nav-link relative" key={i}>
                                    {
                                        <div className='flex item-center'>
                                            {el.active &&
                                                <div className="active-blue-line h-34px" >
                                                </div>}

                                            <MoleculeTextIcon iconStart="circle1"
                                                menuNavLink={() => props.menuNavLink(el.link, el.title, `side-bar-text decoration-no ${props.pathname === el.link && 'active'} ${el.withNotif ? 'w-max' : ''}`)}
                                                navLink
                                                iconStartClass={`icon-sub-menu ${props.pathname === el.link && 'active'}`}
                                                textclassName={`side-bar-text decoration-no ${props.pathname === el.link && 'active'} ${el.withNotif ? 'w-max' : ''}`} text={el.title}
                                            // onClickContainer={() => props.navigation(el.link)}
                                            />
                                            {el.withNotif && <div className='side-bar-notif-container ml-2'> <Text text={props.propertyNumber === 0 ? '' : props.propertyNumber} type="h-5" className='mb-0 pr-2 pl-2 side-bar-notif' /></div>}
                                        </div>
                                    }
                                </div>
                            )}
                        </li>
                    </ul>}
                </>


    )
}

export default MoleculeMenu
