import React, { useState } from "react";
import { AuthStore } from "@easymo/auth";
import { SideBar, NavBar, Drawer } from "@easymo/designSystem";
import CustomNavigation from "../../Navigation/Navigation";
import { Navigate, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
export default function PrivateRoute(props) {
    const [firstLoad, setFirstLoad] = useState(false)
    const location = useLocation()
    const navigation = useNavigate()
    const [width, setWidth] = useState(window.innerWidth)
    const sideBar = useSelector(state => state.sideBar)
    const navBarShowInfo = useSelector(state => state.navBar.showInfo)
    const dispath = useDispatch()
    const [accessToken, setAccessToken] = useState(AuthStore.getState().auth.accessToken)
    const [lastConnect, setlastConnect] = useState(AuthStore.getState().auth.lastConnect)
    const oneDay = (60 * 60 * 24 * 1000)
    if (oneDay < Date.now() - lastConnect) {
        props.publish("RESET_TOKEN")
    }

    function setSideBar(value = sideBar) {
        setFirstLoad(true)
        dispath({ type: "SET_SIDE_BAR", payload: !value })
    }
    const setNavBar = (value) => {
        dispath({ type: "SET_SHOW_INFO", payload: value })
    }
    const renderNavlink = (to, text, className) => {
        return <NavLink to={to} className={className}>{text}</NavLink>
    }
    React.useEffect(() => {
        props.subscribe('RESET_TOKEN', () => {
            setAccessToken(null)
        })
        props.subscribe('SET_LAST_CONNECT', (msg, data) => {
            setlastConnect(data)
        })
        window.addEventListener('resize', (e) => setWidth(window.innerWidth));
    }, [])
    if (accessToken) {
        return <div className='vw-100 vh-100 flex'>
            {width > 1199 ?
                <SideBar open={sideBar} location={location} navigation={navigation}
                    logo={props.logo} shortLogo={props.shortLogo}
                    subscribe={props.subscribe}
                    menuNavLink={(to, text, className) => renderNavlink(to, text, className)}
                />
                :
                <Drawer
                    open={firstLoad && sideBar}
                    drawerType={"sideBar"}
                    direction='left'
                    fixHeader={false}
                    fixFooter={false}
                    fixContent={false}
                    className="w-max-sideBar"
                    onClose={() => setSideBar(true)}
                >
                    <SideBar
                        open={false}
                        location={location}
                        navigation={navigation}
                        setSideBar={() => setSideBar(sideBar)}
                        logo={props.logo}
                        shortLogo={props.shortLogo}
                        subscribe={props.subscribe}
                    />
                </Drawer>
            }
            <div className='page-content over-y over-x' id="page-content">
                <NavBar dispath={dispath}
                    setSideBar={() => setSideBar(sideBar)}
                    sideBar={sideBar} width={width}
                    subscribe={props.subscribe} publish={props.publish}
                    showInfo={navBarShowInfo}
                    setNavBar={(payload) => setNavBar(payload)}
                />
                <CustomNavigation >
                    {props.children}
                </CustomNavigation>
            </div>
        </div>
    } else {
        return <Navigate to="/login" replace />
    }

}