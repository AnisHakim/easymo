import React, { Component } from 'react';
import { Collapse, TransactionNav, isNumber, isEmpty, jsonToFormData, formatInputNumber } from "@easymo/designSystem";
import translator from "../../lang/translator";
import { listNavAdministratif, stateAdministratif, cadastre, financier, getLegalBody, getComplianceBody } from '../../data/data';
import OrganismCadastre from './OrganismCadastre';
import OrganismEnergie from './OrganismEnergie';
import OrganismJuridique from './OrganismJuridique';
import OrganismConformity from './OrganismConformity';
import { apiUpdateAdministratif } from '../../Api/Properties/properties';
import OrganismFinancier from './OrganismFinancier';
const lang = translator('fr')

export default class OrganismAdministratif extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listNavAdministratif: listNavAdministratif(lang),
            stateAdministratif: { ...stateAdministratif },
            isCadastreAddClosed: false,
            cadastreTabData: [],
            cadastreNewTabData: [],
            updateCadastreState: false,
            cadastre: { ...cadastre },
            isFinancierAddClosed: false,
            financierTabData: [],
            financierNewTabData: [],
            updateFinancierState: false,
            financier: { ...financier },
            selectedNavItem: "",
            loadCadastre: false,
            loadFinance: false
        }
    }
    componentDidMount() {
        this.setState({
            selectedNavItem: "cadastre"
        })
    }
    onClickNavItem = (index, key) => {
        let newlist = this.state.listNavAdministratif.map(el => { return { ...el, isActive: false } })
        newlist[index].isActive = true
        this.setState({ listNavAdministratif: newlist, selectedNavItem: key })
    }

    formatCadastreData = (propertie = this.props.propertie, administratif = this.props.propertie?.administratif) => {
        if (propertie) {
            if (administratif) {
                this.setState({
                    cadastreTabData: administratif.listCadastre
                })
            }
        }
    }
    formatFinancierData = (propertie = this.props.propertie, administratif = this.props.propertie?.administratif) => {
        if (propertie) {
            if (administratif) {
                this.setState({
                    financierTabData: administratif.listFinancial
                })
            }
        }
    }
    formatData = (propertie = this.props.propertie, administratif = this.props.propertie.administratif) => {
        if (propertie) {
            if (administratif) {
                let newState = { ...this.state.stateAdministratif }
                if (administratif.energy) {
                    newState.energyFileId = administratif.energy.file
                    newState.energeticPerformance.value = administratif.energy.energeticPerformance
                    newState.certificateDate.value = administratif.energy.certificateDate
                    newState.uniqueCode.value = administratif.energy.number
                    newState.theoricalPrimaryEnergyConsumptionNumber.value = administratif.energy.theoreticalConsumption ? formatInputNumber(administratif.energy.theoreticalConsumption, lang.localNumber) : ''
                    newState.specificPrimaryEnergyConsumptionNumber.value = administratif.energy.specificConsumption ? formatInputNumber(administratif.energy.specificConsumption, lang.localNumber) : ''
                    newState.annualHousingCO2EmissionNumber.value = administratif.energy.annualEmissions ? formatInputNumber(administratif.energy.annualEmissions, lang.localNumber) : ''
                    newState.specificCO2EmissionNumber.value = administratif.energy.specificEmissions ? formatInputNumber(administratif.energy.specificEmissions, lang.localNumber) : ''
                    newState.isNewEnergyFile = false
                }
                if (administratif.legal) {
                    newState.constructionDate.value = administratif.legal.constructionDate
                    newState.urbanAffectation.value = administratif.legal.urbanAllocation ? administratif.legal.urbanAllocation : "notSpecific"
                    newState.inindationRisque.value = administratif.legal.floodRisk ? administratif.legal.floodRisk : "notSpecific"
                    newState.buildingLicense = administratif.legal.buildingPermit
                    newState.subdivisionLicense = administratif.legal.subdivisionPermit
                    newState.possibleProfession = administratif.legal.liberalProfessionPossible
                    newState.urbanInfraction = administratif.legal.townPlanningOffense
                    newState.declaredUninhabitable = administratif.legal.declaredUninhabitableUnsanitary
                    newState.rightOfFirstRefusal = administratif.legal.rightFirstRefusal
                    newState.rightOfPreference = administratif.legal.rightPreference
                    newState.expropriationPlan = administratif.legal.expropriationPlan
                    newState.untappedActivitySite = administratif.legal.untappedActivitySite
                    newState.buildingClass = administratif.legal.listedBuilding
                    newState.Servitude = administratif.legal.servitude
                    newState.JudgmentInProgress = administratif.legal.judgmentProgress
                    newState.townPlanningCertificate = administratif.legal.townPlanningCertificate
                    newState.legalNotice.value = administratif.legal.otherLegal
                    const list = ['constructionDate', "urbanAffectation", "inindationRisque", "buildingLicense", "subdivisionLicense", "possibleProfession",
                        "urbanInfraction", "declaredUninhabitable", "rightOfFirstRefusal", "rightOfPreference", "expropriationPlan",
                        "untappedActivitySite", "buildingClass", "Servitude", "JudgmentInProgress", "townPlanningCertificate", "legalNotice"]
                    for (let index = 0; index < list.length; index++) {
                        if (typeof newState[list[index]] === "object") {
                            newState[list[index]] = {
                                ...newState[list[index]], isNewFile: false
                            }
                        }
                    }
                }
                if (administratif.legal) {
                    newState.electricity = administratif.compliance.electricity
                    newState.gaz = administratif.compliance.gas
                    newState.eau = administratif.compliance.water
                    newState.fluxys = administratif.compliance.fluxys
                    newState.solCertificat = administratif.compliance.soilCertificate
                    newState.rapportAsBuilt = administratif.compliance.asBuiltReport
                    newState.oilTankCertificate = administratif.compliance.oilTankCertificate
                    newState.gasTankCertificate = administratif.compliance.gasTankCertificate
                    newState.lift = administratif.compliance.lift
                    newState.fire = administratif.compliance.fire
                    newState.environmentalDeclaration = administratif.compliance.environmentalStatement
                    const list = ['electricity', "gaz", "eau", "fluxys", "solCertificat", "rapportAsBuilt",
                        "oilTankCertificate", "gasTankCertificate", "lift", "fire", "environmentalDeclaration"]
                    for (let index = 0; index < list.length; index++) {
                        if (typeof newState[list[index]] === "object") {
                            newState[list[index]] = {
                                ...newState[list[index]], isNewFile: false
                            }
                        }
                    }
                }
                this.setState({
                    stateAdministratif: newState
                })
            }
        }
    }
    defineElementBody = (state) => {
        let detail = null
        if (state?.fileDetail?.name && state?.isNewFile) {
            detail = {
                name: state?.fileDetail?.name,
                size: state?.fileDetail?.size,
            }
        }
        return {
            file: state?.file,
            description: state?.description,
            type: state?.type,
            fileDetail: detail
        }
    }
    defineBody = ({ list, state }) => {
        let body = {}
        for (let index = 0; index < list.length; index++) {
            body[list[index].key] = this.defineElementBody(state[list[index].value])
        }
        return body
    }
    updateAdministratif = async () => {
        let formData = new FormData()
        this.props.setLoader(true)
        this.props.onChangeIdentificationError("Administratif", false)
        const cadastreTab = []
        for (let index = 0; index < this.state.cadastreNewTabData.length; index++) {
            const element = this.state.cadastreNewTabData[index];
            if (element.isUpdated || element.isNew) {
                let cadastre = {}
                if (element._id) {
                    cadastre['id'] = element._id
                }
                cadastre['customId'] = element.customId
                cadastre['division'] = element.division
                cadastre['matrice'] = element.matrice
                cadastre['surface'] = element.surface
                cadastre['revenu'] = element.revenu
                cadastre['revenuInd'] = element.revenuInd
                cadastre['preCompte'] = element.preCompte
                cadastre['isDeleted'] = element.isDeleted
                cadastreTab.push(cadastre)
            }
        }
        const financierTab = []
        for (let index = 0; index < this.state.financierNewTabData.length; index++) {
            const element = this.state.financierNewTabData[index];
            if (element.isUpdated || element.isNew) {
                let financier = {}
                if (element._id) {
                    financier['id'] = element._id
                }
                financier['nature'] = element.nature
                financier['description'] = element.description
                financier['cost'] = element.cost
                financier['isDeleted'] = element.isDeleted
                financierTab.push(financier)
            }

        }
        let energy = {}
        if (this.state.stateAdministratif.energeticPerformance.value && this.state.stateAdministratif.energeticPerformance.value !== "") {
            energy['energeticPerformance'] = this.state.stateAdministratif.energeticPerformance.value
        }
        if (this.state.stateAdministratif.certificateDate.value && this.state.stateAdministratif.certificateDate.value !== "") {
            energy['certificateDate'] = this.state.stateAdministratif.certificateDate.value ? new Date(this.state.stateAdministratif.certificateDate.value).toString() : null
        }
        if (this.state.stateAdministratif.uniqueCode.value && this.state.stateAdministratif.uniqueCode.value !== "") {
            energy['number'] = this.state.stateAdministratif.uniqueCode.value
        }
        if (this.state.stateAdministratif.theoricalPrimaryEnergyConsumptionNumber.value && this.state.stateAdministratif.theoricalPrimaryEnergyConsumptionNumber.value !== "") {
            energy['theoreticalConsumption'] = this.state.stateAdministratif.theoricalPrimaryEnergyConsumptionNumber.value.replaceAll(lang.localeSeparateur, '')
        }
        if (this.state.stateAdministratif.specificPrimaryEnergyConsumptionNumber.value && this.state.stateAdministratif.specificPrimaryEnergyConsumptionNumber.value !== "") {
            energy['specificConsumption'] = this.state.stateAdministratif.specificPrimaryEnergyConsumptionNumber.value.replaceAll(lang.localeSeparateur, '')
        }
        if (this.state.stateAdministratif.annualHousingCO2EmissionNumber.value && this.state.stateAdministratif.annualHousingCO2EmissionNumber.value !== "") {
            energy['annualEmissions'] = this.state.stateAdministratif.annualHousingCO2EmissionNumber.value.replaceAll(lang.localeSeparateur, '')
        }
        if (this.state.stateAdministratif.specificCO2EmissionNumber.value && this.state.stateAdministratif.specificCO2EmissionNumber.value !== "") {
            energy['specificEmissions'] = this.state.stateAdministratif.specificCO2EmissionNumber.value.replaceAll(lang.localeSeparateur, '')
        }
        energy = { ...energy, file: this.state.stateAdministratif.energyFileId }
        let legal = {}
        if (this.state.stateAdministratif.constructionDate.value && this.state.stateAdministratif.constructionDate.value !== "") {
            legal['constructionDate'] = this.state.stateAdministratif.constructionDate.value ? new Date(this.state.stateAdministratif.constructionDate.value).toString() : null
        }
        if (this.state.stateAdministratif.urbanAffectation.value && this.state.stateAdministratif.urbanAffectation.value !== "") {
            legal['urbanAllocation'] = this.state.stateAdministratif.urbanAffectation.value
        }
        if (this.state.stateAdministratif.inindationRisque.value && this.state.stateAdministratif.inindationRisque.value !== "") {
            legal['floodRisk'] = this.state.stateAdministratif.inindationRisque.value
        }

        legal = {
            ...legal,
            ...this.defineBody({
                list: getLegalBody,
                state: this.state.stateAdministratif
            }),
            "otherLegal": this.state.stateAdministratif.legalNotice.value
        }
        const compliance = {
            ...this.defineBody({
                list: getComplianceBody,
                state: this.state.stateAdministratif
            })
        }
        if (this.state.stateAdministratif.isNewEnergyFile && this.state.stateAdministratif.energyFile.length) {
            energy = { ...energy, fileDetail: this.state.stateAdministratif.energyFileDetails }
        }
        const body = {
            "id": this.props.propertie._id,
            "listCadastre": cadastreTab,
            "listFinancial": financierTab,
            "energy": energy,
            "legal": legal,
            "compliance": compliance
        }
        let formDataresult = jsonToFormData(formData, body)
        const listFilesForm = [...getLegalBody, ...getComplianceBody]
        for (let index = 0; index < listFilesForm.length; index++) {
            const element = listFilesForm[index];
            const state = this.state.stateAdministratif[element.value]
            if (state?.objectFile?.length) {
                const key = element.key + "File"
                formDataresult.append(key, state?.objectFile[0])
            }
        }
        if (this.state.stateAdministratif.isNewEnergyFile && this.state.stateAdministratif.energyFile.length) {
            formDataresult.append('energyFile', this.state.stateAdministratif.energyFile[0])
        }
        const response = await apiUpdateAdministratif(formDataresult)
        if (response.statusCode === 200) {
            this.props.updateFileList()
            this.formatData(this.props.propertie, response.data.administratif)
            this.formatCadastreData(this.props.propertie, response.data.administratif)
            this.formatFinancierData(this.props.propertie, response.data.administratif)
            let newState = { ...this.state.stateAdministratif }
            newState.isUpdated = false
            this.setState({ stateAdministratif: newState })
            this.props.dataUpdated("Administratif")
        } else {
            this.props.setLoader(false)
            this.props.onChangeIdentificationError("Administratif", true)
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.isPropertieLoaded !== prevProps.isPropertieLoaded) {
            this.formatData()
            this.formatFinancierData()
            this.formatCadastreData()
        }
        if (prevProps.isCallAPi !== this.props.isCallAPi
            && this.state.stateAdministratif.isUpdated
        ) {
            this.updateAdministratif()
        }
    }
    onChangeSelect = (e, key) => {
        let newState = { ...this.state.stateAdministratif }
        newState[key].value = e.value
        newState.isUpdated = true
        this.setState({
            stateAdministratif: newState
        })
    }
    onChangeDateRange = (start, key) => {
        let newState = { ...this.state.stateAdministratif }
        newState[key].value = new Date(start)
        newState.isUpdated = true
        this.setState({
            stateAdministratif: newState
        })
    }
    getRadioData = (data, key) => {
        let newState = { ...this.state.stateAdministratif }
        newState[key].type = data.radio
        newState[key].description = data.inputValue
        newState[key].file = data.file
        newState[key].objectFile = data.objectFile
        newState[key].fileDetail = data.fileDetail
        newState[key].isNewFile = data.isNewFile
        newState.isUpdated = true
        this.setState({
            stateAdministratif: newState
        })
    }
    onChangeInput = (e, key) => {
        let newState = { ...this.state.stateAdministratif }
        if (key.includes("Number")) {
            if (isNumber(e.target.value.replaceAll(lang.localeSeparateur, ''))) {
                if (e.target.value !== '') {
                    newState[key] = {
                        ...newState[key],
                        value: formatInputNumber(e.target.value, lang.localNumber),
                        errorMessage: "",
                        isValid: (isNumber(e.target.value) && !isEmpty(e.target.value))
                    }
                } else {
                    newState[key] = {
                        ...newState[key],
                        value: e.target.value,
                        errorMessage: "",
                        isValid: (isNumber(e.target.value) && !isEmpty(e.target.value))
                    }
                }

            }
        }
        else {
            newState[key].value = e.target.value
        }
        newState.isUpdated = true
        this.setState({
            stateAdministratif: newState
        })
    }
    setCadastreData = (e) => {
        this.setState({
            cadastre: e
        })
    }
    getCadastreToEdit = (data) => {
        if (data) {
            const newCadastre = { ...cadastre }
            newCadastre.customId.value = data.customId
            newCadastre.division.value = data.division
            newCadastre.matrice.value = data.matrice
            newCadastre.surface.value = formatInputNumber(data.surface, lang.localNumber)
            newCadastre.revenu.value = formatInputNumber(data.revenu, lang.localNumber)
            newCadastre.revenuInd.value = formatInputNumber(data.revenuInd, lang.localNumber)
            newCadastre.preCompte.value = formatInputNumber(data.preCompte, lang.localNumber)
            newCadastre._id = data._id
            this.setState({
                cadastre: { ...newCadastre },
                updateCadastreState: !this.state.updateCadastreState
            })
        }
        else {
            const newCadastre = { ...cadastre }
            newCadastre.customId.value = ""
            newCadastre.division.value = ""
            newCadastre.matrice.value = ""
            newCadastre.surface.value = 0
            newCadastre.revenu.value = 0
            newCadastre.revenuInd.value = 0
            newCadastre.preCompte.value = 0
            newCadastre._id = null

            this.setState({
                cadastre: { ...newCadastre },
                updateCadastreState: !this.state.updateCadastreState
            })
        }
    }
    onSaveCadastre = (index) => {
        if (
            !this.state.cadastre.customId.value && !this.state.cadastre.division.value && !this.state.cadastre.matrice.value &&
            !this.state.cadastre.surface.value && !this.state.cadastre.revenu.value && !this.state.cadastre.revenuInd.value && !this.state.cadastre.preCompte.value
        ) {
            this.setState({
                isCadastreAddClosed: !this.state.isCadastreAddClosed,
            })
        }
        else {
            const newData = [...this.state.cadastreNewTabData]
            const data = {
                customId: this.state.cadastre.customId.value && this.state.cadastre.customId.value,
                division: this.state.cadastre.division.value && this.state.cadastre.division.value.replaceAll(lang.localeSeparateur, ''),
                matrice: this.state.cadastre.matrice.value && this.state.cadastre.matrice.value.replaceAll(lang.localeSeparateur, ''),
                surface: this.state.cadastre.surface.value && this.state.cadastre.surface.value.replaceAll(lang.localeSeparateur, ''),
                revenu: this.state.cadastre.revenu.value && this.state.cadastre.revenu.value.replaceAll(lang.localeSeparateur, ''),
                revenuInd: this.state.cadastre.revenuInd.value && this.state.cadastre.revenuInd.value.replaceAll(lang.localeSeparateur, ''),
                preCompte: this.state.cadastre.preCompte.value && this.state.cadastre.preCompte.value.replaceAll(lang.localeSeparateur, ''),
                _id: this.state.cadastre._id && this.state.cadastre._id,
            }
            if (newData[index]) {
                newData[index] = data
                newData[index].isEditable = false
                newData[index].isUpdated = true
                newData[index].isNew = false
            } else {
                newData.push({
                    ...data,
                    isDeleted: false,
                    isNew: true,
                    newAdded: true,
                    isEditable: false,
                    isUpdated: true,
                })
            }
            this.setState({
                updateCadastreState: !this.state.updateCadastreState,
                isCadastreAddClosed: !this.state.isCadastreAddClosed,
                cadastre: { ...cadastre },
                cadastreTabData: newData,
                stateAdministratif: { ...this.state.stateAdministratif, isUpdated: true }
            })
        }
    }
    getDataCadastre = (e) => {
        this.setState({
            cadastreNewTabData: e,
            loadCadastre: true,
            stateAdministratif: {
                ...this.state.stateAdministratif,
                isUpdated: !this.state.loadCadastre ? false : true

            }
        })
    }
    setFinancierData = (e) => {
        this.setState({
            financier: e
        })
    }
    getFinancierToEdit = (data) => {
        if (data) {
            const newFinancier = { ...financier }
            newFinancier.nature.value = data.nature
            newFinancier.description.value = data.description
            newFinancier.cost.value = formatInputNumber(data.cost, lang.localNumber)
            newFinancier._id = data._id
            this.setState({
                financier: { ...newFinancier },
                updateFinancierState: !this.state.updateFinancierState
            })
        }
        else {
            const newFinancier = { ...financier }
            newFinancier.nature.value = ""
            newFinancier.description.value = ""
            newFinancier.cost.value = 0
            newFinancier._id = null
            this.setState({
                financier: { ...newFinancier },
                updateFinancierState: !this.state.updateFinancierState
            })
        }
    }
    onSaveFinancier = (index) => {
        if (!this.state.financier.nature.value && !this.state.financier.cost.value && !this.state.financier.description.value) {
            this.setState({
                isFinancierAddClosed: !this.state.isFinancierAddClosed,
            })
        }
        else {
            const newData = [...this.state.financierNewTabData]
            const data = {
                nature: this.state.financier.nature.value && this.state.financier.nature.value,
                description: this.state.financier.description.value && this.state.financier.description.value,
                cost: this.state.financier.cost.value && this.state.financier.cost.value.replaceAll(lang.localeSeparateur, ''),
                _id: this.state.financier._id && this.state.financier._id,
            }
            if (newData[index]) {
                newData[index] = data
                newData[index].isEditable = false
                newData[index].isUpdated = true
                newData[index].isNew = false
            } else {
                newData.push({
                    ...data,
                    isDeleted: false,
                    isNew: true,
                    newAdded: true,
                    isEditable: false,
                    isUpdated: true,
                })
            }
            this.setState({
                updateFinancierState: !this.state.updateFinancierState,
                isFinancierAddClosed: !this.state.isFinancierAddClosed,
                financier: { ...financier },
                financierTabData: newData,
                stateAdministratif: { ...this.state.stateAdministratif, isUpdated: true }
            })
        }
    }
    getDataFinancier = (e) => {
        this.setState({
            financierNewTabData: e,
            loadFinance: true,
            stateAdministratif: {
                ...this.state.stateAdministratif,
                isUpdated: !this.state.loadFinance ? false : true
            }

        })
    }
    onChangeUploadFile = (e) => {
        const files = Array.from(e.target.files)
        const file = files.length ? files[0] : null
        let fileDetail = { name: null, size: null }
        if (file) {
            fileDetail.size = file.size
            fileDetail.name = file.name
        } else {
            fileDetail.size = null
            fileDetail.name = null
        }

        this.setState({
            stateAdministratif: {
                ...this.state.stateAdministratif,
                energyFile: e.target.files,
                energyFileDetails: fileDetail,
                isNewEnergyFile: true,
                isUpdated: true,
            }
        })
    }
    render() {
        return (
            <div>
                <Collapse title={lang.Administratif} iconStart="files">
                    <div className="row">
                        <div className="col-sm-12 mb-7">
                            <TransactionNav listNav={this.state.listNavAdministratif} onClickNavItem={(index, key) => this.onClickNavItem(index, key)} />
                        </div>
                    </div>
                    <div className={`w-100  ${this.state.selectedNavItem !== "cadastre" && "diplay-none"}`}>
                        <OrganismCadastre
                            setCadastreData={(e) => this.setCadastreData(e)}
                            getDataCadastre={(e) => this.getDataCadastre(e)}
                            getCadastreToEdit={(data) => this.getCadastreToEdit(data)}
                            onSaveCadastre={(index) => this.onSaveCadastre(index)}
                            Devise={this.props.Devise}
                            {...this.state}
                        />
                    </div>

                    {
                        this.state.selectedNavItem === "energie" &&
                        < OrganismEnergie
                            {...this.state}
                            onChangeUploadFile={this.onChangeUploadFile}
                            onChange={(e, key) => this.onChangeSelect(e, key)}
                            onChangeDateRange={(start, key) => this.onChangeDateRange(start, key)}
                            onChangeInput={(e, key) => this.onChangeInput(e, key)}
                        />}

                    {this.state.selectedNavItem === "juridique" &&
                        <OrganismJuridique
                            {...this.state}
                            onChange={(e, key) => this.onChangeSelect(e, key)}
                            onChangeDateRange={(start, key) => this.onChangeDateRange(start, key)}
                            getData={(data, key) => this.getRadioData(data, key)}
                            onChangeInput={(e, key) => this.onChangeInput(e, key)}
                        />}

                    {this.state.selectedNavItem === "conformite" &&
                        <OrganismConformity
                            {...this.state}
                            getData={(data, key) => this.getRadioData(data, key)}
                        />}
                    <div className={`w-100  ${this.state.selectedNavItem !== "financier" && "diplay-none"}`}>
                        <OrganismFinancier
                            setFinancierData={(e) => this.setFinancierData(e)}
                            getDataFinancier={(e) => this.getDataFinancier(e)}
                            getFinancierToEdit={(data) => this.getFinancierToEdit(data)}
                            onSaveFinancier={(index) => this.onSaveFinancier(index)}
                            Devise={this.props.Devise}
                            {...this.state}

                        />
                    </div>
                </Collapse>
            </div>
        );
    }
}
