const list = [{
    title: "Dashboard",
    link: "/dashboard",
    icon: "home_vs_1_outlined",
    active: true
}, {
    title: "Propriétés",
    link: "/properties",
    icon: "key",
    subTitle: [
        { id: 0, title: "liste", link: "/properties" },
        { id: 1, title: "Ajouter", link: "/properties/add" }
    ],
    active: false
},
{
    title: "Contacts",
    link: "/properties/add",
    icon: "contacts",
    subTitle: [
        { id: 0, title: "liste", link: "/properties" },
        { id: 1, title: "Ajouter", link: "/properties/add" }
    ],
    active: false
},
{
    title: "Documents",
    link: "/properties",
    icon: "files",
    active: false,
},
{
    title: "Outils",
    link: "/properties",
    icon: "tools",
    active: false,
},
{
    title: "suivis",
    active: false,
    iconShort: 'more_horizontal',
    widhDividerReduce: false
},
{
    title: "Tàches",
    link: "/properties/add",
    icon: "appointment",
    subTitle: [
        { id: 0, title: "Liste des taches", link: "/properties" },
        { id: 1, title: "Créer une tache", link: "/properties/add" }
    ],
    active: false
}, {
    title: "Calendrier",
    link: "/properties",
    icon: "calendar",
    active: false,
},
{
    title: "Statistiques",
    link: "/properties",
    icon: "calendar",
    active: false,
},
{
    title: "PARAMÈTRES",
    active: false,
    iconShort: 'more_horizontal',
    withDivider: true,
    widhDividerReduce: true
},
{
    title: "Paramètres",
    link: "/properties/add",
    icon: "settings",
    subTitle: [
        { id: 0, title: "Utilisateur", link: "/properties" },
        { id: 1, title: "Agence", link: "/properties/add" },
        { id: 1, title: "Application", link: "/properties/add" }
    ],
    active: false
}]
const footerList = [{
    icon: 'home_vs_1_outlined',
    link: "/properties/add",
    active: false
},

{
    icon: 'tune',
    link: "/properties/add",
    active: false
}]
export {
    list as sideBarList,
    footerList
}