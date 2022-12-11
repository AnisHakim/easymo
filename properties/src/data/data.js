import { DarkBlue, Green, lightBlue, LightGreen, Orange, RougeBordeau, SecondDarkBlue, SecondLightBlue, formatNumber } from "@easymo/designSystem";
import lang from "../lang/fr";
import { AuthStore } from "@easymo/auth"
import imagePropertie from '../assets/Images/logo/property.jpg'
const Devise = AuthStore.getState().auth?.user?.devise
const renderInputObject = (value, errorMessage, isValid, isInValid) => {
    return {
        value: value,
        errorMessage: errorMessage,
        isValid: isValid,
        isInValid: isInValid
    }
}
const renderIconTooltipObject = (icon, tooltip, tooltipTxt, iconClass) => {
    return {
        icon: icon,
        tooltip: tooltip,
        tooltipText: tooltipTxt,
        iconClassname: iconClass,
    }
}
const renderTypeFileDescription = (type, file, description) => {
    return {
        type: type,
        file: file,
        description: description,
        objectFile: null,
        fileDetail: {
            name: null,
            size: null,
        },
        isNewFile: false,
    }
}
const propertiesType = () => {
    return [
        { value: '', label: lang.tous },
        { value: "house", label: lang.maison },
        { value: 'apartment', label: lang.appartement },
        { value: "ground", label: lang.terrain },
        { value: "office", label: lang.bureau },
        { value: "trade", label: lang.commerce },
        { value: "building", label: lang.immeuble },
        { value: "parking", label: lang.parking_garage },
        { value: "various", label: lang.divers },
    ]
}
const optionsWithColor = (forSale) => {
    return [
        { value: "prospect", label: lang.prospect, withcolor: true, color: DarkBlue },
        { value: "mondat", label: lang.mandat, withcolor: true, color: SecondDarkBlue },
        { value: "onSale", label: lang.onSale, withcolor: true, color: lightBlue },
        { value: "offer", label: lang.offer, withcolor: true, color: SecondLightBlue },
        { value: "option", label: lang.option, withcolor: true, color: LightGreen },
        { value: 'sold', label: forSale ? lang.sold : lang.loue, withcolor: true, color: Green },
        { value: "suspended", label: lang.suspended, withcolor: true, color: Orange },
        { value: "lost", label: lang.lost, withcolor: true, color: RougeBordeau },
    ]
}
const optionsWithIconOrientation = (lang) => {
    return [
        { value: "nord-ouest", label: lang.nordOuest, iconClassSelect: 'transform-45-left', isOptionwithIcon: true, icon: 'arrow_upward' },
        { value: "nord", label: lang.nord, isOptionwithIcon: true, icon: 'arrow_upward' },
        { value: "nord-est", label: lang.nordEst, iconClassSelect: 'transform-45-right', isOptionwithIcon: true, icon: 'arrow_upward' },
        { value: "est", label: lang.est, isOptionwithIcon: true, icon: 'arrow_forward' },
        { value: "sud-est", label: lang.sudEst, iconClassSelect: 'transform-45-right', isOptionwithIcon: true, icon: 'arrow_forward' },
        { value: 'sud', label: lang.sud, isOptionwithIcon: true, icon: 'arrow_downward' },
        { value: "sud-ouest", label: lang.sudOuest, iconClassSelect: 'transform-45-right', isOptionwithIcon: true, icon: 'arrow_downward' },
        { value: "ouest", label: lang.ouest, isOptionwithIcon: true, icon: 'arrow_backward' },
    ]
}
const propertiesStatus = (lang) => {
    return [
        { value: '', label: lang.tous_les_bien },
        { value: "prospect", label: lang.prospect },
        { value: "mondat", label: lang.mandat },
        { value: "onSale", label: lang.en_vente },
        { value: "offer", label: lang.offre },
        { value: "option", label: lang.option },
        { value: 'sold', label: lang.vendu },
        { value: "suspended", label: lang.suspendu },
        { value: "lost", label: lang.perdu },
    ]
}
const listCol = [
    { key: "propertieName", className: "td-user", name: lang.name, sort: true, show: true },
    { key: "propertieStatus", className: 'td-status', name: lang.statut, sort: true, show: true },
    { key: "propertieType", className: 'td-type', name: lang.type, sort: true, show: true },
    { key: "address", className: 'th-address', name: lang.adresse, sort: true, show: true },
    { key: "propertietrans", className: 'td-trans', name: lang.trans, sort: true, show: true },
    { key: "price", className: 'td-prix', name: lang.prix, sort: true, show: true },
    { key: "date", className: 'td-date', name: lang.Date, sort: true, show: true },
    { key: "propertieAgent", className: 'td-agent', name: lang.Agent, sort: true, show: true },
    { key: "propertieOwner", className: 'td-proprio', name: lang.owner, sort: true, show: true },
]
const setDropDownColorAndText = (status, lang, forSale) => {
    let dropDownColor = null;
    let dropDownText = '';
    switch (status.toLowerCase()) {
        case "prospect":
            dropDownColor = DarkBlue;
            dropDownText = lang.prospect;
            break;
        case "mondat":
            dropDownColor = SecondDarkBlue;
            dropDownText = lang.mandat;
            break;
        case "onsale":
            dropDownText = lang.onSale;
            dropDownColor = lightBlue;
            break;
        case "offer":
            dropDownText = lang.offer;
            dropDownColor = SecondLightBlue;
            break;
        case "option":
            dropDownText = lang.option;
            dropDownColor = LightGreen;
            break;
        case "sold":
            dropDownText = forSale ? lang.sold : lang.loue;
            dropDownColor = Green;
            break;
        case "suspended":
            dropDownText = lang.suspended;
            dropDownColor = Orange;
            break;
        case "lost":
            dropDownText = lang.lost;
            dropDownColor = RougeBordeau;
            break;
        default: break;
    }
    return { 'dropDownColor': dropDownColor, 'dropDownText': dropDownText }
}
const menuData = (lang) => [
    { text: lang.Intervenants, icon: 'contact_notebook', href: "#Intervenants" },
    { text: lang.Identification, icon: 'search', href: "#Identification" },
    { text: lang.Mandat, icon: 'pen', href: "#Mandat" },
    { text: lang.Transactions, icon: 'swap_horizontal', href: "#Transactions" },
    { text: lang.DescriptionBatiment, icon: 'brick_wall', href: "#DescriptionBatiment" },
    { text: lang.Occupation, icon: 'group_equal', href: "#Occupation" },
    { text: lang.Composition, icon: 'layout', href: "#Composition" },
    { text: lang.Équipements, icon: 'all_done', href: "#Equipements" },
    { text: lang.Médias, icon: 'photo_gallery', href: "#Medias" },
    { text: lang.Administratif, icon: 'files', href: "#Administratif" },
    { text: lang.Documents, icon: 'attachment', href: "#Documents" },
    { text: lang.Diffusion, icon: 'globe', href: "#Diffusion" },
    { text: lang.Affichage, icon: 'visible', href: "#Affichage" },
    { text: lang.Visites, icon: 'standing', href: "#Visites" },
    { text: lang.aProximité, icon: 'my_location', href: "#proximite" },
    { text: lang.evaluation, icon: 'star_half', href: "#evaluation" }
]
const duréeMandat = (lang) => {
    return [
        { value: 'indéterminée', label: lang.Indéterminée },
        { value: '3', label: lang.troisMois },
        { value: '6', label: lang.sixMois },
        { value: '12', label: lang.douzeMois },
        { value: 'personalized', label: lang.Personalisée },
    ]
}
const transactionOption = (lang) => {
    return [
        { value: true, label: lang.aVendre },
        { value: false, label: lang.aLouer },
    ]
}
const prixType = (lang) => {
    return [
        { value: false, label: lang.montantFixe },
        { value: true, label: lang.prixApartir },
    ]
}
const comissionType = (lang) => {
    return [
        { value: false, label: lang.Pourcentage },
        { value: true, label: lang.Fixe },
    ]
}
const listNav = (lang) => {
    return [
        { key: 'offres', value: lang.offres, isActive: true, number: 0 },
        { key: 'compromis', value: lang.compromis, isActive: false },
        { key: 'acte-authentique', value: lang.acteAuthentique, isActive: false },
    ]
}
const listNavAdministratif = (lang) => {
    return [
        { key: 'cadastre', value: lang.Cadastre, isActive: true },
        { key: 'energie', value: lang.Energie, isActive: false },
        { key: 'juridique', value: lang.Juridique, isActive: false },
        { key: 'conformite', value: lang.Conformite, isActive: false },
        { key: 'financier', value: lang.Financier, isActive: false },
    ]
}
const renderRadioList = (lang, name) => [
    { id: "notSpecific", text: lang.nonSpecifie, name: name },
    { id: "yes", text: lang.oui, name: name },
    { id: "no", text: lang.non, name: name },
]
const renderRadioList5 = (lang, name) => [
    ...renderRadioList(lang, name),
    { id: "inProgress", text: lang.inProgress, name: name },
    { id: "exemption", text: lang.exemption, name: name },
]
const stateAdministratif = {
    isUpdated: false,
    energyFile: null,
    energyFileId: null,
    energyFileDetails: { name: null, size: null },
    isNewEnergyFile: false,
    urbanAffectation: renderInputObject('notSpecific', '', false, false),
    inindationRisque: renderInputObject('notSpecific', '', false, false),
    constructionDate: renderInputObject('', '', false, false),
    legalNotice: renderInputObject('', '', false, false),
    energeticPerformance: renderInputObject('', '', false, false),
    certificateDate: renderInputObject('', '', false, false),
    uniqueCode: renderInputObject('', '', false, false),
    theoricalPrimaryEnergyConsumptionNumber: renderInputObject('', '', false, false),
    specificPrimaryEnergyConsumptionNumber: renderInputObject('', '', false, false),
    annualHousingCO2EmissionNumber: renderInputObject('', '', false, false),
    specificCO2EmissionNumber: renderInputObject('', '', false, false),
    buildingLicense: renderTypeFileDescription("notSpecific", "", ""),
    subdivisionLicense: renderTypeFileDescription("notSpecific", "", ""),
    possibleProfession: renderTypeFileDescription("notSpecific", "", ""),
    urbanInfraction: renderTypeFileDescription("notSpecific", "", ""),
    declaredUninhabitable: renderTypeFileDescription("notSpecific", "", ""),
    rightOfFirstRefusal: renderTypeFileDescription("notSpecific", "", ""),
    rightOfPreference: renderTypeFileDescription("notSpecific", "", ""),
    expropriationPlan: renderTypeFileDescription("notSpecific", "", ""),
    untappedActivitySite: renderTypeFileDescription("notSpecific", "", ""),
    buildingClass: renderTypeFileDescription("notSpecific", "", ""),
    Servitude: renderTypeFileDescription("notSpecific", "", ""),
    JudgmentInProgress: renderTypeFileDescription("notSpecific", "", ""),
    townPlanningCertificate: renderTypeFileDescription("notSpecific", "", ""),
    electricity: renderTypeFileDescription("notSpecific", "", ""),
    gaz: renderTypeFileDescription("notSpecific", "", ""),
    eau: renderTypeFileDescription("notSpecific", "", ""),
    fluxys: renderTypeFileDescription("notSpecific", "", ""),
    solCertificat: renderTypeFileDescription("notSpecific", "", ""),
    rapportAsBuilt: renderTypeFileDescription("notSpecific", "", ""),
    oilTankCertificate: renderTypeFileDescription("notSpecific", "", ""),
    gasTankCertificate: renderTypeFileDescription("notSpecific", "", ""),
    lift: renderTypeFileDescription("notSpecific", "", ""),
    fire: renderTypeFileDescription("notSpecific", "", ""),
    environmentalDeclaration: renderTypeFileDescription("notSpecific", "", ""),
}


const cadastre = {
    _id: "",
    customId: renderInputObject('', '', false, false),
    division: renderInputObject('', '', false, false),
    matrice: renderInputObject('', '', false, false),
    surface: renderInputObject(0, '', false, false),
    revenu: renderInputObject(0, '', false, false),
    revenuInd: renderInputObject(0, '', false, false),
    preCompte: renderInputObject(0, '', false, false),
}
const financier = {
    _id: "",
    nature: renderInputObject('', '', false, false),
    description: renderInputObject('', '', false, false),
    cost: renderInputObject(0, '', false, false),
}
const infoPropriete = {
    isUpdated: false,
    isEnLigne: false,
    transaction: renderInputObject(true, '', false, false),
    status: renderInputObject('onSale', '', false, false),
    type: renderInputObject('house', '', false, false),
    name: renderInputObject('', '', false, false),
    price: renderInputObject(0, '', false, false),
    adresse: renderInputObject('', '', false, false),
    description: renderInputObject('', '', false, false),
    isEdit: [false, false, false, false]
}
const stateMondat = {
    isUpdated: false,
    motifVente: renderInputObject('', '', false, false),
    transaction: renderInputObject(true, '', false, false),
    status: renderInputObject('onSale', '', false, false),
    covendeur: renderInputObject('', '', false, false),
    concurent: renderInputObject('', '', false, false),
    mandatRadio: 'exclusif',
    startDate: null,
    endDate: null,
    durée: renderInputObject(null, '', false, false),
    prix: {
        type: true,
        visible: true,
        ...renderInputObject('', '', false, false)
    },
    minimumPrix: renderInputObject('', '', false, false),
    comission: {
        type: false,
        ...renderInputObject('', '', false, false)
    },
    tva: false,
    enregistrement: false
}
const stateIdentification = {
    getPosition: false,
    isPositionLoaded: false,
    isUpdated: false,
    identificationInterne: renderInputObject('', '', false, false),
    street: {
        isPublic: true,
        ...renderInputObject('', '', false, false)
    },
    streetNumber: {
        isPublic: true,
        ...renderInputObject('', '', false, false)
    },
    postalCode: {
        isPublic: true,
        ...renderInputObject('', '', false, false)
    },
    city: {
        isPublic: true,
        ...renderInputObject('', '', false, false)
    },
    country: {
        isPublic: true,
        ...renderInputObject('', '', false, false)
    },
    lat: "",
    lng: ""
}
const stateIntervenant = {
    isUpdated: false,
    originMandat: renderInputObject('unspecified', '', false, false),
    agent: renderInputObject([], '', false, false),
    owner: renderInputObject([], '', false, false),
    buyerAndTenant: renderInputObject([], '', false, false),
    contactRecommended: renderInputObject([], '', false, false),
    otherDescription: renderInputObject('', '', false, false)
}
const stateTransaction = {
    isUpdated: false,
    compromisPrix: renderInputObject('', '', false, false),
    compromisDate: renderInputObject('', '', false, false),
    compromisContact: renderInputObject([], '', false, false),
    compromisSignee: renderInputObject('', '', false, false),
    compromisBanque: renderInputObject('', '', false, false),
    compromisSigneeDetail: {
        name: null,
        size: null,
        isNew: false,
    },
    compromisBanqueDetail: {
        name: null,
        size: null,
        isNew: false,
    },
    acteSigneeDetail: {
        name: null,
        size: null,
        isNew: false,
    },
    actePrix: renderInputObject('', '', false, false),
    acteDate: renderInputObject('', '', false, false),
    acteContact: renderInputObject([], '', false, false),
    acteSignee: renderInputObject('', '', false, false),
    compromiseSignedId: null,
    bankJustificationId: null,
    actAuthenticSignedId: null,
}
const objectOffre = {
    id: '',
    price: renderInputObject('', '', false, false),
    date: renderInputObject('', '', false, false),
    contact: renderInputObject([], '', false, false),
    offerSignedId: null,
    identityCardId: null,
    offerSigned: renderInputObject('', '', false, false),
    identityCard: renderInputObject('', '', false, false),
    offerSignedDetail: {
        name: null,
        size: null,
        isNew: false,
    },
    identityCardDetail: {
        name: null,
        size: null,
        isNew: false,
    },

}
const originMandatOptions = (lang) => {
    return [
        { value: 'unspecified', label: lang.notSpecificated },
        { value: 'recommendation', label: lang.recommendation },
        { value: 'other', label: lang.other }
    ]
}
const sousCategoriOptions = (lang, type) => {
    if (type === 'house') {
        return [
            { value: 'villa', label: lang.villa },
            { value: 'toxnHouse', label: lang.maisonVille },
            { value: 'upperFloor', label: lang.belEtage },
            { value: 'mansion', label: lang.maisonMetre },
            { value: 'chalet', label: lang.chalet },
            { value: 'bungalow', label: lang.bungalow },
            { value: 'ferme', label: lang.ferme },
            { value: 'other', label: lang.autre },
        ]
    }
    if (type === 'apartment') {
        return [
            { value: 'standard', label: lang.Standard },
            { value: 'loft', label: lang.Loft },
            { value: 'penthouse', label: lang.Penthouse },
            { value: 'duplex', label: lang.Duplex },
            { value: 'triplex', label: lang.Triplex },
            { value: 'studio', label: lang.Studio },
            { lodging: 'other', label: lang.LogementEtud },
            { value: 'other', label: lang.autre },
        ]
    }
    if (type === 'ground') {
        return [
            { value: 'buildable', label: lang.Constructible },
            { value: 'agricultural', label: lang.Agricole },
            { value: "wood/forest", label: lang.BoisForet },
            { value: 'other', label: lang.autre },
        ]
    }
    if (type === 'office') {
        return [
            { value: 'standard', label: lang.Standard },
            { value: 'co-working', label: lang.coWorking },
            { value: 'open-space', label: lang.openSpace },
            { value: 'other', label: lang.autre },
        ]
    }
    if (type === 'trade') {
        return [
            { value: 'store', label: lang.Magasin },
            { value: 'shop', label: lang.Boutique },
            { value: 'restaurant/cafe', label: lang.restoCafe },
            { value: 'hotel', label: lang.Hotel },
            { value: 'industrial', label: lang.Industriel },
            { value: 'warehouse', label: lang.Entrepot },
            { lodging: 'medical', label: lang.Médical },
            { lodging: 'sports/leisure', label: lang.sportLoisir },
            { value: 'other', label: lang.autre },
        ]
    }
    if (type === 'parking') {
        return [
            { value: 'indoorcarpark', label: lang.ParkingInt },
            { value: 'outdoorcarpark', label: lang.ParkingExt },
            { value: 'opengrage', label: lang.garageOuvert },
            { value: 'closedparage', label: lang.GarageFerme },
            { value: 'carport', label: lang.CarPort },
            { value: 'boxclosed', label: lang.BoxFerme },
            { value: 'other', label: lang.autre },
        ]
    }
    if (type === 'building') {
        return [
            { value: 'investmentproperty', label: lang.immeuRapport },
            { value: 'residential', label: lang.Residentiel },
            { value: 'industrial', label: lang.Industriel },
            { value: 'other', label: lang.autre },
        ]
    }
}
const listColOccupation = ({ renderContact, renderChargeType, renderLeaseDuration, renderPrice }) => {
    return [
        { key: "name", name: lang.name, sort: true, type: "custom", renderFunction: (e) => renderContact(e) },
        { key: "startOflease", name: lang.startOflease, isDate: true },
        { key: "leastDuration", name: lang.leastDuration, type: "custom", renderFunction: (e) => renderLeaseDuration(e) },
        { key: "rent", name: lang.rent, type: "custom", renderFunction: (e) => renderPrice(e) },
        { key: "chargesCom", name: lang.chargesCom, type: "custom", renderFunction: (e) => renderPrice(e) },
        { key: "privCharges", name: lang.privCharges, type: "custom", renderFunction: (e) => renderPrice(e) },
        { key: "chargesTypes", name: lang.chargesTypes, type: "custom", renderFunction: (e) => renderChargeType(e) },
        { key: "guaranteeLoc", name: lang.guaranteeLoc, type: "custom", renderFunction: (e) => renderPrice(e) },
        { key: "guarantee", name: lang.guarantee },
        { key: "leaseEnergie", name: lang.leaseEnergie, },
        { key: "placesStatus", name: lang.placesStatus, },
        { key: "energPlacesStatus", name: lang.energPlacesStatus, },
    ]
}
const listInputOccupation = [
    { key: "name", type: "input" },
    { key: "startOflease", type: "input" },
    { key: "leastDuration", type: "input" },
    { key: "rent", type: "input" },
    { key: "chargesCom", type: "input" },
    { key: "privCharges", type: "input" },
    { key: "chargesTypes", type: "input" },
    { key: "guaranteeLoc", type: "input" },
    { key: "guarantee", type: "input" },
    { key: "leaseEnergie", type: "input" },
    { key: "placesStatus", type: "input" },
    { key: "energPlacesStatus", type: "input" },
]
const busyNatureOptions = (lang) => {
    return [
        { value: 'owner', label: lang.Propriétaire },
        { value: 'tenant', label: lang.tenant },
        { value: 'ownerAndTenant', label: lang.ownerAndTenant }
    ]
}
const propertyAvailablityOptions = (lang) => {
    return [
        { value: 'immediate', label: lang.immediate },
        { value: 'notAvailable', label: lang.notAvailable },
        { value: 'inAction', label: lang.inAction },
        { value: 'atTheDelivery', label: lang.atTheDelivery }
    ]
}
const stateDescription = {
    isUpdated: false,
    type: renderInputObject('house', '', false, false),
    sousCategorie: renderInputObject('', '', false, false),
    titre: renderInputObject('', '', false, false),
    descriptionLongue: renderInputObject('', '', false, false),
    descriptionCourte: renderInputObject('', '', false, false),
    constructionDate: renderInputObject('', '', false, false),
    enCours: false,
    renové: false,
    renovationDetail: [{
        renovationDate: renderInputObject('', '', false, false),
        renovationDetails: renderInputObject('', '', false, false)
    }],
    architecte: {
        value: [{
            label: "",
            value: ""
        }],
        errorMessage: '',
        isValid: false,
        isInValid: false
    },
    etatGeneral: 'new',
    façade: renderInputObject(2, '', false, false),
    revetFaçade: renderInputObject('', '', false, false),
    surface: renderInputObject('', '', false, false),
    environement: renderInputObject('', '', false, false),
    orientationBatiment: renderInputObject('', '', false, false),
    orientationTerrain: renderInputObject('', '', false, false),
    orientationTerrasse: renderInputObject('', '', false, false)

}
const OCCUPATION = {
    name: renderInputObject('', '', false, false),
    startOflease: renderInputObject('', '', false, false),
    leastDuration: renderInputObject('', '', false, false),
    rent: renderInputObject('', '', false, false),
    chargesCom: renderInputObject('', '', false, false),
    privCharges: renderInputObject('', '', false, false),
    chargesTypes: renderInputObject(false, '', false, false),
    guaranteeLoc: renderInputObject('', '', false, false),
    guarantee: false,
    leaseEnergie: false,
    placesStatus: false,
    energPlacesStatus: false,
    id: null,
}
const leastDurationOptions = (lang) => {
    return [
        { value: 12, label: `12 ${lang.month}` },
        { value: 24, label: `24 ${lang.month}` },
        { value: 36, label: `36 ${lang.month}` },
        { value: 48, label: `48 ${lang.month}` },
        { value: 60, label: `60 ${lang.month}` },
    ]
}
const chargesTypesOptions = (lang) => {
    return [
        { value: true, label: lang.fixed },
        { value: false, label: lang.flatRate },
    ]
}
const categoriesOptions = (lang) => {
    return [
        { value: 'confort', label: lang.confort },
        { value: 'energy', label: lang.energy },
        { value: 'heater', label: lang.heater },
        { value: 'hotWater', label: lang.hotWater },
        { value: 'ventilation', label: lang.ventilation },
        { value: 'carpentry', label: lang.carpentry },
        { value: 'security', label: lang.security },
        { value: 'outdoorSpaces', label: lang.outdoorSpaces },
        { value: 'connections', label: lang.connections }
    ]
}


const listConfortEquipement = (lang) => {
    return [
        { key: 'domotique', text: lang.automation, icon: 'home_vs', border: true },
        { key: 'firePlace', text: lang.firePlace, icon: 'home_vs', border: true },
        { key: 'domstoveCassetteotique', text: lang.stoveCassette, icon: 'home_vs', border: true },
        { key: 'dressing', text: lang.dressing, icon: 'home_vs', border: true },
        { key: 'WineCellar', text: lang.WineCellar, icon: 'home_vs', border: true },
        { key: '1', text: lang.automation, icon: 'home_vs', border: true },
        { key: '2', text: lang.automation, icon: 'home_vs', border: true },
        { key: '3', text: lang.automation, icon: 'home_vs', border: true },
        { key: '4', text: lang.automation, icon: 'home_vs', border: true },
        { key: '5', text: lang.automation, icon: 'home_vs', border: true },
        { key: '6', text: lang.automation, icon: 'home_vs', border: true },
        { key: '7', text: lang.automation, icon: 'home_vs', border: true },
        { key: '8', text: lang.automation, icon: 'home_vs', border: true },
    ]
}
const displayLabel = (type, list) => {
    if (type) {
        const index = list.findIndex(item => { return item.value === type })
        return list[index]?.label ? list[index]?.label : type
    }
}
const etatDuBien = (type) => {
    return [
        { value: "new", label: type === 'house' ? lang.neuve : lang.neuf },
        { value: "perfect", label: type === 'house' ? lang.parfaite : lang.parfait },
        { value: "well", label: lang.bon },
        { value: "toRefresh", label: lang.aRafraichir },
        { value: "toRenovate", label: lang.aRenover },
    ]
}
const listNavMedias = (lang) => {
    return [
        { key: 'img', value: lang.photos, isActive: true },
        { key: 'Video', value: lang.videos, isActive: false },
        { key: 'virtualVisites', value: lang.virtualVisites, isActive: false },
    ]
}
const optionsVisitsDays = (lang) => {
    return [
        { value: "monday", label: lang.monday },
        { value: "tuesday", label: lang.tuesday },
        { value: "wednesday", label: lang.wednesday },
        { value: "thursday", label: lang.thursday },
        { value: "friday", label: lang.friday },
        { value: "saturday", label: lang.saturday },
        { value: "sunday", label: lang.sunday },
    ]
}
const meubleRowData = {
    id: '',
    furniture: renderInputObject('', '', false, false),
    description: renderInputObject('', '', false, false),
    price: renderInputObject(0, '', false, false),
    updateState: false
}
const compositionGlobaleLeft = [
    {
        value: 'food', label: lang.food, icon: 'oven', isChecked: false, number: 1
    },
    {
        value: 'garage', label: lang.garage, icon: 'garage-car', isChecked: false, number: 1
    },
    {
        value: 'bedroom', label: lang.bedroom, icon: 'bed', isChecked: false, number: 1
    },
    {
        value: 'carport', label: lang.carport, icon: 'car-garage', isChecked: false, number: 1
    },
    {
        value: 'office', label: lang.office, icon: 'desktop', isChecked: false, number: 1
    },
    {
        value: 'indoorPark', label: lang.indoorPark, icon: 'parking', isChecked: false, number: 1
    },
    {
        value: 'bathroom', label: lang.bathroom, icon: 'bath', isChecked: false, number: 1
    },
    {
        value: 'outdoorPark', label: lang.outdoorPark, icon: 'parking', isChecked: false, number: 1
    },
    {
        value: 'cellar', label: lang.cellar, icon: 'archive1', isChecked: false, number: 1
    },
    {
        value: 'garden', label: lang.garden, icon: 'tree-alt', isChecked: false, number: 1
    },
    {
        value: 'attic', label: lang.attic, icon: 'box-full', isChecked: false, number: 1
    },
    {
        value: 'terrace', label: lang.terrace, icon: 'glass-cheers', isChecked: false, number: 1
    },
]
const compositionGlobaleRight = [
    {
        value: 'salon', label: lang.salon, icon: 'couch', isChecked: false, number: 1
    },
]

const urbanAllocation = (lang) => {
    return [
        { value: 'notSpecific', label: lang.nonSpecifie },
        { value: 'natureReserve', label: lang.reserveNaturelle },
        { value: 'habitatPark', label: lang.parcHabitat },
        { value: 'agriculturalArea', label: lang.zoneAgricole },
        { value: 'miningArea', label: lang.zoneExtraction },
        { value: 'habitatArea', label: lang.zoneHabitat },
        { value: 'recreationArea', label: lang.zoneLoisirs },
        { value: 'parkArea', label: lang.zoneParc },
        { value: 'landReserveArea', label: lang.zoneReserveFonciere },
        { value: 'mixedHousingZone', label: lang.zoneHabitatMixte },
        { value: 'forestArea', label: lang.zoneForestière },
        { value: 'IndustrialZone', label: lang.zoneIndustrielle },
        { value: 'naturalArea', label: lang.zoneNaturelle },
        { value: 'greenZone', label: lang.zoneVerte },
    ]
}
const floodRisk = (lang) => {
    return [
        { value: 'notSpecific', label: lang.nonSpecifie },
        { value: 'nonFloodZone', label: lang.zoneNonInondable },
        { value: 'potentiallyFloodZone', label: lang.zonePotentiellementInondable },
        { value: 'recognizedFloodZone', label: lang.zoneInondableReconnue },
    ]
}
const compoRowData = {
    name: renderInputObject('', '', false, false),
    description: renderInputObject('', '', false, false),
    etage: renderInputObject(0, '', false, false),
    length: renderInputObject(0, '', false, false),
    width: renderInputObject(0, '', false, false),
    height: renderInputObject(0, '', false, false),
    status: renderInputObject(1, '', false, false),
    comment: renderInputObject('', '', false, false),
    sol: renderInputObject('', '', false, false),
    icon: renderInputObject('', '', false, false),
    size: 0,
    Habitable: false,
    updateState: false
}
const etageOption = (etage) => etage > 0 ? [{ value: 0, label: lang.RDC }, ...[...Array.from({ length: etage }).map((el, i) => { return { value: i + 1, label: i + 1 } })]] : [{ value: 0, label: lang.RDC }]

const getLegalBody = [
    { key: "buildingPermit", value: "buildingLicense" },
    { key: "subdivisionPermit", value: "subdivisionLicense" },
    { key: "liberalProfessionPossible", value: "possibleProfession" },
    { key: "townPlanningOffense", value: "urbanInfraction" },
    { key: "declaredUninhabitableUnsanitary", value: "declaredUninhabitable" },
    { key: "rightFirstRefusal", value: "rightOfFirstRefusal" },
    { key: "rightPreference", value: "rightOfPreference" },
    { key: "expropriationPlan", value: "expropriationPlan" },
    { key: "untappedActivitySite", value: "untappedActivitySite" },
    { key: "listedBuilding", value: "buildingClass" },
    { key: "servitude", value: "Servitude" },
    { key: "judgmentProgress", value: "JudgmentInProgress" },
    { key: "townPlanningCertificate", value: "townPlanningCertificate" },
]
const getComplianceBody = [
    { key: "electricity", value: "electricity" },
    { key: "gas", value: "gaz" },
    { key: "water", value: "eau" },
    { key: "fluxys", value: "fluxys" },
    { key: "soilCertificate", value: "solCertificat" },
    { key: "asBuiltReport", value: "rapportAsBuilt" },
    { key: "oilTankCertificate", value: "oilTankCertificate" },
    { key: "gasTankCertificate", value: "gasTankCertificate" },
    { key: "lift", value: "lift" },
    { key: "fire", value: "fire" },
    { key: "environmentalStatement", value: "environmentalDeclaration" },
]
const isSpecificRadioList = (name) => [
    { id: "notSpecified", text: lang.nonSpecifie, name: name },
    { id: "yes", text: lang.oui, name: name },
    { id: "no", text: lang.non, name: name },
]

const dataAffichage = [
    {
        name: 'displayAllowed', label: lang.affichageAutorise, listIcons: [
            renderIconTooltipObject('help_outlined', true, lang.affichageAutoriseHelp, 'tooltip-icon-label'),
            renderIconTooltipObject('lock_outlined', true, lang.mandatTooltip, 'tooltip-icon-label'),

        ]
    },
    {
        name: 'panelInstalled', label: lang.panneauxInstalle, listIcons: [
            renderIconTooltipObject('help_outlined', true, lang.panneauxInstalleHelp, 'tooltip-icon-label'),
            renderIconTooltipObject('lock_outlined', true, lang.mandatTooltip, 'tooltip-icon-label'),

        ]
    },
    {
        name: 'bannerInstalled', label: lang.bandroleInstalle, listIcons: [
            renderIconTooltipObject('help_outlined', true, lang.bandroleInstalleHelp, 'tooltip-icon-label'),
            renderIconTooltipObject('lock_outlined', true, lang.mandatTooltip, 'tooltip-icon-label'),

        ]
    },
]
const documentOptions = (isProtected) => {
    let details = []
    if (isProtected) {
        details = [{ text: lang.partager, withStartIcon: true, iconStart: 'share' },
        { text: lang.telecharger, withStartIcon: true, iconStart: 'download_to' },]
    } else {
        details = [{ text: lang.partager, withStartIcon: true, iconStart: 'share' },
        { text: lang.deplacer, withStartIcon: true, iconStart: 'folder_add' },
        { text: lang.renommer, withStartIcon: true, iconStart: 'edit' },
        { text: lang.telecharger, withStartIcon: true, iconStart: 'download_to' },]
    }
    return isProtected ? [{
        title: lang.parametres,
        details: details
    }] : [
        {
            title: lang.parametres,
            details: details
        },
        {
            title: '',
            details:
                [
                    { text: lang.btnDeleted, withStartIcon: true, iconStart: 'delete_outlined' },
                ]
        }
    ]
}

const fileOptions = (isPublic) => [
    {
        title: lang.parametres,
        details:
            [
                { text: lang.partagerFichier, withStartIcon: true, iconStart: 'share' },
                { text: lang.renommer, withStartIcon: true, iconStart: 'edit' },
                { text: lang.telecharger, withStartIcon: true, iconStart: 'download_to' },
                { text: isPublic ? lang.afficherPubliquement : lang.afficherPrivee, withStartIcon: true, iconStart: isPublic ? 'visible_outlined' : "hidden_outlined" },
            ]
    },
    {
        title: '',
        details:
            [
                { text: lang.btnDeleted, withStartIcon: true, iconStart: 'delete_outlined' },
            ]
    }
]
const uploadOptions = [
    {
        title: '',
        details:
            [
                { text: lang.nouveauDossier, withStartIcon: true, iconStart: 'folder_add' },
            ],
        withBorder: true
    },
    {
        title: '',
        details:
            [
                { text: lang.telechargerFichier, withStartIcon: true, iconStart: 'file_add_outlined' },
                { text: lang.demanderFichier, withStartIcon: true, iconStart: 'publish' },
            ]
    }
]

const proximityOptions = (lang) => {
    return [
        { value: 'school', label: lang.school, iconClassSelect: 'icon-select-type-proximity', isOptionwithIcon: true, icon: 'school' },
        { value: 'publicTransport', label: lang.publicTransport, iconClassSelect: 'icon-select-type-proximity', isOptionwithIcon: true, icon: 'train-car' },
        { value: 'store', label: lang.store, iconClassSelect: 'icon-select-type-proximity', isOptionwithIcon: true, icon: 'shopping_cart' },
        { value: 'museum', label: lang.museum, iconClassSelect: 'icon-select-type-proximity', isOptionwithIcon: true, icon: 'museum-15' },
        { value: 'restaurant', label: lang.restaurant, iconClassSelect: 'icon-select-type-proximity', isOptionwithIcon: true, icon: 'restaurant' },
        { value: 'sportsHalls', label: lang.sportsHalls, iconClassSelect: 'icon-select-type-proximity', isOptionwithIcon: true, icon: 'dumbbell' },
        { value: 'park', label: lang.park, iconClassSelect: 'icon-select-type-proximity', isOptionwithIcon: true, icon: 'pine-tree' },
        { value: 'parking', label: lang.parking, iconClassSelect: 'icon-select-type-proximity', isOptionwithIcon: true, icon: 'parking' },
        { value: 'establishment', label: lang.establishment, iconClassSelect: 'icon-select-type-proximity', isOptionwithIcon: true, icon: 'home_vs' },
    ]
}
const stateProximity = {
    type: renderInputObject('', '', false, false),
    pointOfInterest: renderInputObject('', '', false, false),
    distance: renderInputObject('', '', false, false),
    time: renderInputObject('', '', false, false)
}
const tagOptions = (lang) => {
    return [
        { value: 'new', label: lang.Nouveauté },
        { value: 'crush', label: lang.coupCoeur },
        { value: 'monthProperty', label: lang.bienMois },
        { value: 'newPrice', label: lang.newPrice },
    ]
}
const documentTypeOptions = (lang) => {
    return [
        { value: 'Administratif', label: lang.Administratif },
        { value: 'energy', label: lang.Energie },
        { value: 'legal', label: lang.Juridique },
        { value: 'compliance', label: lang.Conformite },
        { value: 'plans', label: lang.plans },
        { value: 'divers', label: lang.divers },
    ]
}

const historiqueKey = () => {
    return [
        { value: 'sold', label: lang.bienVendu },
        { value: 'newOffre', label: lang.offreRecu },
        { value: 'phoneMeeting', label: lang.phoneMeeting },
        { value: 'onLine', label: lang.onLine },
        { value: 'identification', label: lang.Identification },
        { value: 'mandat', label: lang.mandat },
        { value: 'occupation', label: lang.Occupation },
        { value: 'building', label: lang.DescriptionBatiment },
        { value: 'equipment', label: lang.Équipements },
        { value: 'administratif', label: lang.Administratif },
        { value: 'composition', label: lang.Composition },
        { value: 'media', label: lang.Médias },
        { value: 'visit', label: lang.Visites },
        { value: 'display', label: lang.Affichage },
        { value: 'rating', label: lang.evaluation },
        { value: 'listPromixity', label: lang.aProximité },
        { value: 'minPrice', label: lang.minimumPrix },
        { value: 'price', label: lang.Prix },
        { value: 'name', label: lang.nomPropriete },
        { value: 'compromise', label: lang.compromis },
        { value: 'acteAuthentic', label: lang.acteAuthentique },
    ]
}
const offreObject = () => {
    return [
        { value: 'newOffre', label: lang.offre }
    ]
}
export {
    proximityOptions,
    floodRisk,
    urbanAllocation,
    propertiesType,
    propertiesStatus,
    listCol,
    setDropDownColorAndText,
    menuData,
    optionsWithColor,
    transactionOption,
    stateMondat,
    stateIdentification,
    stateIntervenant,
    originMandatOptions,
    duréeMandat,
    prixType,
    comissionType,
    infoPropriete,
    listColOccupation,
    listInputOccupation,
    busyNatureOptions,
    propertyAvailablityOptions,
    listNav,
    stateTransaction,
    stateDescription,
    sousCategoriOptions,
    optionsWithIconOrientation,
    objectOffre,
    OCCUPATION,
    leastDurationOptions,
    chargesTypesOptions,
    listNavMedias,
    categoriesOptions,
    listConfortEquipement,
    listNavAdministratif,
    stateAdministratif,
    displayLabel,
    etatDuBien,
    optionsVisitsDays,
    cadastre,
    financier,
    meubleRowData,
    compositionGlobaleLeft,
    compositionGlobaleRight,
    compoRowData,
    etageOption,
    getLegalBody,
    getComplianceBody,
    isSpecificRadioList,
    dataAffichage,
    uploadOptions,
    fileOptions,
    documentOptions,
    renderRadioList,
    renderRadioList5,
    renderInputObject,
    renderIconTooltipObject,
    stateProximity,
    tagOptions,
    documentTypeOptions,
    historiqueKey,
    offreObject
}