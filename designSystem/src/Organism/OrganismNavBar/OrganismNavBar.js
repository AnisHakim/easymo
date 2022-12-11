import React from "react";
import { Icon, Img, Tooltip, MoleculeInput, Drawer } from "@easymo/designSystem";
import Avatar from "../../assets/Images/bertrand.jpg"
import { ButtonBlue, DarkGrey, SiderbarItemBlack } from "../../Colors";
import logo from "../../assets/Images/logo.png";
import translator from "../../lang/translator";
import { AuthStore } from "@easymo/auth";
import ClickAwayListener from 'react-click-away-listener';
export default function OrganismNavBar(props) {
    const lang = translator("fr")
    const [search, setSearch] = React.useState(null)
    const [isOpen, setIsOpen] = React.useState(false)
    const [auth, setAuth] = React.useState(AuthStore.getState().auth)
    const { sideBar, width } = props
    const className = ["pl-3 pr-3 flex justify-space-between item-center container-nav-bar"]
    if (sideBar && width > 1199) {
        className.push('nav-bar-side-bar-colapsed')
    }
    if (!sideBar && width > 1199) {
        className.push('nav-bar-side-bar-open')

    }
    function renderInput({ container, className, close, iconsearch }) {
        return <MoleculeInput
            isSearch
            inputValue={search}
            placeholder={lang.Rechercher}
            inputClassname={className}
            containerClassName={container}
            onchangeInput={(e) => setSearch(e.target.value)}
            onClearSearchInput={() => setSearch("")}
            iconSearchClassName={iconsearch}
            iconClearClassName={close}
        />
    }
    function logOut() {
        props.publish('RESET_TOKEN')
    }
    return <div className={className.join(' ')}>
        {isOpen && <Drawer
            drawerType={"sideBar"}
            direction='top'
            onClose={() => setIsOpen(false)}
            open={isOpen}
            fixHeader={false}
            fixFooter={false}
            fixContent={false}
            className='container-small-input-navbar'
        >
            <div className="w-100 relative">
                <Icon icon={'clear'} size={'1.425rem'} className={"absolute pointer"} style={{ top: "15px", right: "12px", zIndex: 200 }} color={ButtonBlue} onClick={() => setIsOpen(false)} />
                {renderInput({
                    container: "container-small-input-navbar",
                    className: 'input-navbar-small w-100',
                    close: " icon-input-small-navbar icon-close-navbar",
                    iconsearch: 'icon-input-small-navbar icon-loop-input-navbar'
                })}
            </div>
        </Drawer>}
        <div className="flex item-center">
            <Img src={logo} type="LOGO MEDIUM" className="img-navBar" />
            <Tooltip
                icon='last_page'
                color={DarkGrey}
                onClick={props.setSideBar}
                iconClassname={`icon-open-side-bar ${width > 1199 ? !props.sideBar && 'isopen' : props.sideBar && 'isopen'} `}
                backgroundColor={SiderbarItemBlack}
                tooltipText={width > 1199 ? !props.sideBar ? lang.Réduire : lang.Étendre : null}
                place='right'
            />
            {renderInput({
                container: "container-input-navbar",
                className: 'input-navbar input-navbar-big',
                close: " icon-input-navbar ",
                iconsearch: 'icon-input-navbar icon-loop-input-navbar'
            })}
        </div>
        <div className="flex item-center">
            <Icon
                icon="search"
                size='18px'
                color={DarkGrey}
                className="navbar-icon-search-small"
                onClick={() => setIsOpen(true)}
            />
            <div className="flex block-icons-navBar">
                <span className="mr-2 navbar-icons">
                    <Icon
                        icon="notifications_on_outlined"

                    />
                </span>
                <span className="mr-2 navbar-icons">
                    <Icon
                        icon="menu_vs_outlined"
                    />
                </span>
                <span className="mr-2 navbar-icons">
                    <Icon
                        icon="voice_line"
                    />
                </span>

            </div>
            <div className="relative p-1" style={{ background: "transparant" }}>
                <Img src={Avatar} onClick={() => props.setNavBar(true)} />
                <div className="absolute active-user" />
                {props.showInfo &&
                    <ClickAwayListener onClickAway={() => props.setNavBar(false)}>
                        <div className="absolute container-user-info pt-3">
                            <div className="user-info-border-bottom">
                                <div className="user-info-hover pointer flex mb-2 item-center  pl-3">
                                    <Img src={Avatar} style={{ height: "2.1875rem", width: "2.1875rem" }} />
                                    <div className="pl-2">
                                        <div className="text-user-navbar">{auth?.user?.firstName + " " + auth?.user?.lastName}</div>
                                        <div className="" style={{ color: DarkGrey }}>{auth?.user?.mail}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="user-info-border-bottom mt-2 mb-2 pb-2">
                                <div className="user-info-hover pointer">{lang.profile}</div>
                                <div className="user-info-hover pointer">{lang.Compte}</div>
                                <div className="user-info-hover pointer">{lang.Paramétres}</div>
                            </div>
                            <div className="user-info-border-bottom mt-2 mb-2 pb-2">
                                <div className="user-info-hover pointer">{lang.compteMan}</div>
                                <div className="user-info-hover pointer">{lang.userMan}</div>
                            </div>
                            <div className="mt-2 mb-2 pb-2">
                                <div className="user-info-hover pointer" onClick={() => logOut()}>{lang.logout}</div>
                            </div>
                        </div>
                    </ClickAwayListener>
                }
            </div>

        </div>
    </div>
}