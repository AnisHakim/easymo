import React, { useEffect, useState } from "react";
import { Icon } from "../../Atoms";
import { MoleculeMenu, MoleculeTextIcon, Dropdown } from "../../Molecules";
import logo from "../../assets/Images/logo.png";
import shortLogo from "../../assets/svg/logo-short.png"
import translator from "../../lang/translator";
import { DE, EN, FR, LU } from "./svg";
import { apiGetPropertyNumber } from "../../Api/Property";

function OrganismSideBar(props) {
    const [propertyNumber, setPropertyNumber] = useState(0)
    const lang = translator('fr')
    useEffect(() => {
        getPropertyNumber()
        props.subscribe('REFRESH_LIST_PROPERTY', (msg, data) => {
            getPropertyNumber()
        })
    }, [])
    const getPropertyNumber = async () => {
        const response = await apiGetPropertyNumber()
        if (response.statusCode === 200) {
            setPropertyNumber(response.data)
        }
    }
    const [optionsHelp, setHelpOption] = useState([
        {
            title: lang.AIDE,
            details:
                [
                    { text: lang.ressource, withStartIcon: true, iconStart: 'book_outlined' },
                    { text: lang.raccoursir, withStartIcon: true, iconStart: 'command_key' },
                    { text: lang.koi9, withStartIcon: true, iconStart: 'gift' },
                ]
        },
        {
            title: lang.contacts,
            details:
                [
                    { text: lang.support, withStartIcon: true, iconStart: 'chat_outlined' },
                ]
        }
    ])
    const [optionsLang, setLangOption] = useState([
        {
            title: lang.langues,
            details:
                [
                    { text: lang.Français, withImg: true, src: FR, svg: true },
                    { text: lang.anglais, withImg: true, src: EN, svg: true },
                    {
                        text: lang.deutsh, withImg: true, src: DE, svg: true
                    },
                    {
                        text: lang.Luxembourgish, withImg: true, src: LU, svg: true
                    }
                ]
        }
    ])

    const listSideNav = () => {
        return [{
            title: lang.dashboard,
            link: "/dashboard",
            icon: "home_vs_1_outlined",
            active: props.location.pathname === '/dashboard'
        },
        {
            title: lang.gestion,
            active: false,
            iconShort: 'more_horizontal',
            widhDividerReduce: false,
            style: "nav-subtitle-sidebar "
        },
        {
            title: lang.Propriétés,
            link: "/properties",
            icon: "key",
            subTitle: [
                { id: 0, title: lang.liste, link: "/properties", active: props.location.pathname === '/properties', withNotif: true, },
                { id: 1, title: lang.Ajouter, link: "/properties/add", active: props.location.pathname === '/properties/add' }
            ],
            active: props.location.pathname === '/properties' || props.location.pathname.includes('/properties/'),
            open: false
        },
        {
            title: lang.Contacts,
            link: "/contacts",
            icon: "contacts",
            subTitle: [
                { id: 0, title: lang.liste, link: "/contacts", active: props.location.pathname === '/contacts' },
                { id: 1, title: lang.Ajouter, link: "/contacts/add", active: props.location.pathname === '/contacts/add' }
            ],
            active: props.location.pathname === '/contacts' || props.location.pathname.includes('/contacts/'),
            open: false
        },
        {
            title: lang.Documents,
            link: "/documents",
            icon: "files_labeled_outlined",
            active: props.location.pathname === '/documents',
        },
        {
            title: lang.Outils,
            link: "/outils",
            icon: "tools",
            active: props.location.pathname === '/outils',
        },
        {
            title: lang.suivis,
            active: false,
            iconShort: 'more_horizontal',
            widhDividerReduce: false,
            style: "nav-subtitle-sidebar "
        },
        {
            title: lang.Tàches,
            link: "/taches",
            icon: "appointment",
            subTitle: [
                { id: 0, title: lang.listeTache, link: "/taches", active: props.location.pathname === '/taches' },
                { id: 1, title: lang.créerTache, link: "/taches/add", active: props.location.pathname === '/taches/add' }
            ],
            active: props.location.pathname === '/taches' || props.location.pathname.includes('/taches/'),
            open: false
        }, {
            title: lang.Calendrier,
            link: "/calendrier",
            icon: "calendar_note",
            active: props.location.pathname === '/calendrier',
        },
        {
            title: lang.Statistiques,
            link: "/properties",
            icon: "chart_bar_2",
            active: props.location.pathname === '/statistique',
        },
        {
            title: lang.adminstration,
            active: false,
            iconShort: 'more_horizontal',
            withDivider: true,
            widhDividerReduce: true
        },
        {
            title: lang.Paramétres,
            link: "/parametre",
            icon: "settings_outlined",
            subTitle: [
                { id: 0, title: lang.Utilisateur, link: "/parametre/utilisateur", active: props.location.pathname === '/parametre/utilisateur' },
                { id: 1, title: lang.Agence, link: "/parametre/agence", active: props.location.pathname === '/parametre/agence' },
                { id: 1, title: lang.Application, link: "/parametre/application", active: props.location.pathname === '/parametre/application' }
            ],
            active: props.location.pathname === '/parametre' || props.location.pathname.includes('/parametre/'),
            open: false
        },
        {
            title: lang.equipe,
            link: "/equipe",
            icon: "group_senior",
            active: props.location.pathname === '/equipe',
        }
        ]
    }
    useEffect(() => {
        let myList = listSideNav()
        let index = myList.findIndex((element) => props.location.pathname.includes(element.link))
        let data = myList.map(el => { return { ...el, open: false } })
        data[index].open = !myList[index].open
        setList(data)
    }, [props.location.pathname])
    const [list, setList] = useState(listSideNav())

    const [listFooter, setListFooter] = useState([{
        icon: 'home_vs_1_outlined',
        link: "/properties/add",
        active: false
    },

    {
        icon: 'tune',
        link: "/properties/add",
        active: false
    }])
    const handleClick = (index) => {
        if (!list[index].subTitle) {
            props.navigation(list[index].link)
        }
        const data = list.map(el => { return { ...el, open: false } })
        data[index].open = !list[index].open
        setList(data)

    }

    const renderSmall = () => {
        return <div className="small-side-content" >
            <MoleculeTextIcon containerClassName="short-img-sidebar" withImg={true} typeImg="AVATAR" src={props.shortLogo}
                classNameImg="pointer"
                text="" />
            {list.map((el, index) =>
                <div key={index} className="relative" >
                    {el.active &&
                        <div className="active-blue-line" >
                        </div>
                    }
                    <MoleculeMenu
                        index={index}
                        classNameMolecule='molecule-sidebar-short'
                        iconStart={el.icon}
                        iconStartClass="side-bar-footer molecule-color"
                        link={el.link}
                        subTitle={el.subTitle}
                        navigation={props.navigation}
                        handleClick={() => handleClick(index)}
                        active={el.active}
                        pathname={props.location.pathname}
                        title=''
                        text=''
                        withDivider={el.withDivider}
                        open={props.open}
                        isOpenSubTitle={el.open}
                        iconShort={el.iconShort}
                        widhDividerReduce={el.widhDividerReduce}
                        propertyNumber={propertyNumber}
                        menuNavLink={props.menuNavLink}
                    />
                </div>
            )}
            {listFooter.map((el, index) =>

                <MoleculeMenu
                    iconStart={el.icon}
                    iconStartClass="side-bar-footer molecule-color"
                    link={el.link}
                    subTitle={el.subTitle}
                    navigation={props.navigation}
                    handleClick={() => handleClick(index)}
                    active={el.active}
                    isOpenSubTitle={el.open}
                    pathname={props.location.pathname}
                    title=''
                    text=''
                    withDivider={el.withDivider}
                    open={props.open}
                    key={index}
                    menuNavLink={props.menuNavLink}
                />
            )
            }

        </div>
    }
    const renderStandart = () => {
        return <div className="v-100">
            <MoleculeTextIcon containerClassName="img-sidebar" withImg={true} typeImg="LOGO MEDIUM" src={props.logo} withEndIcon={true}
                classNameImg="pointer"
                text="" />
            <div className="vh-100-minus-footer" >

                {list.map((el, index) =>
                    <div className="relative" key={index} >
                        {el.active && !el.subTitle &&
                            <div className="active-blue-line">
                            </div>
                        }
                        <MoleculeMenu
                            iconStart={el.icon}
                            iconStartClass="side-bar-footer molecule-color"
                            textclassName={el.style ? el.style + 'pl-0' : 'side-bar-text molecule-color '}
                            text={el.title}
                            link={el.link}
                            subTitle={el.subTitle}
                            isOpenSubTitle={el.open}
                            navigation={props.navigation}
                            handleClick={() => handleClick(index)}
                            active={el.active}
                            pathname={props.location.pathname}
                            title={el.title}
                            withDivider={el.withDivider}
                            propertyNumber={propertyNumber}
                            menuNavLink={props.menuNavLink}
                        />
                    </div>
                )}
            </div>
            <div className="nav-divider-sidebar"></div>
            <div className="navbar-vertical-footer flex">
                <div className="icon-footer-sidebar-container"><Icon icon="tune" className="side-bar-footer icon-footer-sidebar" /></div>

                <div className="icon-footer-sidebar-container">
                    <Dropdown animated
                        dropdownBtn={'drop-down-filterTable-btn help'}
                        withStartIcon={true}
                        iconStart='help_outlined'
                        text={''}
                        withEndIcon={false}
                        options={optionsHelp}
                        containerDropClass='help-sidebar'
                    />
                </div>
                <div className="icon-footer-sidebar-container">
                    <Dropdown animated
                        dropdownBtn={'drop-down-filterTable-btn help lang'}
                        src={FR}
                        withSVG={true}
                        classNameImg='change-lang-img'
                        options={optionsLang}
                        containerDropClass='help-sidebar lang'
                    />
                </div>
            </div>
        </div>
    }
    return (
        <div className={`vh-100 border-right-container flex easymo-sidebar ${props.open ? "small-side" : 'large-side'}`} >

            {props.open
                ?
                renderSmall()
                :

                renderStandart()
            }
        </div>
    )
}

export default OrganismSideBar
