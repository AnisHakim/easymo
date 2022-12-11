import { useEffect, useState } from "react"
import { Button, TextIcon } from "@easymo/designSystem";
import translator from "../../lang/translator";
import { menuData } from "../../data/data";
function organismeAddProprieteMenu(props) {
    const lang = translator('fr')
    const [show, setShow] = useState(window.innerWidth < 992 ? false : true)
    const [width, setWidth] = useState(window.innerWidth)
    const [resize, setResize] = useState(true)
    const [menuDataItem, setMenuData] = useState(menuData(lang))
    useEffect(() => {
        window.addEventListener('resize', (e) => setWidth(window.innerWidth));
        if (width < 992 && resize) {
            setShow(false)
            setResize(false)
        } else if (width > 992 && !resize) {
            setShow(true)
            setResize(true)
        }
    }, [width])
    useEffect(() => {
        let newMenuData = menuDataItem.map(el => { return { ...el, error: props.error[el.href.substring(1)] } })
        setMenuData(newMenuData)
    }, [props.error])
    const toggleNavMenu = () => {
        setShow(!show)
        setResize(false)
    }
    return (
        <div className="nav-item-container" >
            {width < 992 && <Button
                onClick={toggleNavMenu} className='section-nav-btn mb-3'
                text={lang.Sections} iconRight icon={show ? 'clear' : 'menu_hamburger'}
            />}
            <div id='targer-nav-menu' className={`pt-3 pb-3 shadowContainer navbar-collapse  ${show ? 'show' : 'collapse'}`} >
                {
                    menuDataItem.map((el, i) =>
                        <a href={el.href} className='nav-menu-link--text none-decoration' >
                            <div key={i} className={`mb-0`} onClick={() => props.onClickMenuItem(el.href.substring(1), true)} data-to-scrollspy-id={el.href.substring(1)}>
                                <TextIcon withStartIcon iconStart={el.icon}
                                    iconStartClass='iconStartClass mr-2'
                                    linkText href={el.href} text={el.text}
                                    textclassName='nav-menu-link--text'
                                    containerClassName={`nav-menu-link flex justify-start ${props.menuChecked !== "" ? props.menuChecked === el.href.substring(1) ? 'active' : '' : ''}  ${el.error ? 'error-red' : ''} `}
                                />
                            </div>
                        </a>
                    )
                }
            </div>
            <div>
            </div>
        </div>
    )
}

export default organismeAddProprieteMenu
