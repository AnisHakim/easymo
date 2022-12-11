import React, { Component } from "react";
import { stateIdentification, stateMondat, infoPropriete, renderInputObject } from "../../data/data";
import ModalAddProperty from "../../Modal/ModalAddProperty/ModalAddProperty";
import TemplateAddProperties from "../../Template/TemplateAddProperties/TemplateAddProperties";
import { apiGetActivityHistoric, apiGetPropertieById, apiListContacts } from "../../Api/Properties/properties";
import { AddContact, isNotEmpty } from "@easymo/designSystem";
import { connect } from 'react-redux';
import { getAgentList } from "../../Api/Agent";
import OrganismeModalStatus from "../../Organism/OrganismeModalStatus/OrganismeModalStatus";
import { AuthStore } from "@easymo/auth"
import translator from "../../lang/translator";
import { apiCreateFolder, apiUpdateFolder, apiDeleteFolder, apiListDocument, apiDeleteFile, apiRenameFile, apiSearchDocument, apiUpdateFile, apiUpdatePublicFile, apiDownloadFolder, apiArchiveUpdateFiles, apiMoveDocument, } from "../../Api/document";
import { apiGetFileById } from "../../Api/File";
import TemplateModalHistoriqueActivite from "../../Template/TemplateModalActivite/TemplateModalHistoriqueActivite";
import { TemplateHistoriqueModification } from "../../Template";
class AddProperties extends Component {
    constructor(props) {
        super(props);
        this.lang = translator('fr')
        this.state = {
            searchWord: "",
            isCallAPi: false,
            mandat: { ...stateMondat },
            identification: { ...stateIdentification },
            info: { ...infoPropriete },
            showAddPropertie: false,
            error: { Identification: false, Mandat: false, Transactions: false },
            isPropertieLoaded: false,
            propertie: null,
            showNotif: false,
            loading: false,
            notifText: "",
            transaction: renderInputObject(false, '', false, false),
            status: renderInputObject('prospect', '', false, false),
            isModalStatusVisible: false,
            currentStatus: {},
            prevStatus: '',
            isAddContactVisible: false,
            selectedView: 'column',
            folderList: [],
            fileList: [],
            inputSearch: '',
            isSelection: false,
            isCheck: false,
            isUploadfileModal: false,
            isAddFolderModal: false,
            folder: {
                value: "",
                isValid: false,
                isInValid: false,
                errorMessage: ""
            },
            file: {
                value: "",
                isValid: false,
                isInValid: false,
                errorMessage: ""
            },
            isRenameFodler: false,
            uploadedFileList: [],
            uploadedFileListTab: [],
            currentPath: [{ text: this.lang.Documents, value: 'root' }],
            parentFolder: null,
            folderToRenameId: '',
            fileToRenameId: '',
            isFilesListModal: false,
            uploadPercentage: 0,
            position: { lat: null, lng: null },
            isRenameFile: false,
            selectedFiles: [],
            isModalAskForFileOpen: false,
            isModalMoveFolderOpen: false,
            selectedFolderToMove: {},
            isViewDocumentModalOpened: false,
            fileToShow: {},
            fileIndexToShow: 0,
            folderToMove: {},
            position: { lat: null, lng: null },
            propertieName: '',
            titre: renderInputObject('', '', false, false),
            infoPrice: null,
            images: null,
            isFolder: false,
            isMandatUpdated: false,
            isShareFolder: false,
            isShareFile: false,
            sharedDocumentId: '',
            isModalStatusVisible: false,
            currentStatus: {},
            prevStatus: '',
            isAddContactVisible: false,
            isActivitieModalShow: false,
            activitieHistorique: {},
            activitieHistoriquePages: { page: 1, perPage: 4 },
            isHistoriqueModificationModalOpened: false,
            imageFeatured: null
        }
    }
    componentWillUnmount() {
        this.setState({
            propertie: null,
            isPropertieLoaded: false,
            propertieName: ''
        })
    }
    setActivitiesPage = (page) => {
        this.setState({
            activitieHistoriquePages: { ...this.state.activitieHistoriquePages, page: page }
        })
    }

    onToggleHistoriqueModal = () => {
        this.setState({
            isHistoriqueModificationModalOpened: !this.state.isHistoriqueModificationModalOpened
        })
    }
    setImages = (file) => {
        this.setState({
            images: file
        })
    }
    setPrice = (price) => {
        this.setState({
            infoPrice: price
        })
    }
    onChangeModalActivitieVisibility = () => {
        this.setState((prevState) => ({
            isActivitieModalShow: !prevState.isActivitieModalShow,
            activitieHistoriquePages: { ...this.state.activitieHistoriquePages, page: 1 }
        })

        )
    }
    changeContactVisibility = (status) => {
        this.setState({
            isAddContactVisible: status,
            isModalStatusVisible: !this.state.isModalStatusVisible
        })
    }
    onChangeModalStatusVisibility = (status, prevStatus) => {
        if (prevStatus) {
            this.setState({
                isModalStatusVisible: status,
                prevStatus: prevStatus
            })
        } else {
            this.setState({
                isModalStatusVisible: status
            })
        }
    }
    onChangeSelectTransaction = (e) => {
        let newInfo = { ...this.state.transaction }
        let newPropertie = { ...this.state.propertie }
        newInfo.value = e.value
        newPropertie.forSale = e.value
        this.setState({
            transaction: newInfo,
            propertie: newPropertie
        });


    }
    onChangeSelectInfoStatus = (e, status) => {
        let newInfo = { ...this.state.status }
        newInfo.value = e.value
        if (e.value === "onSale" || e.value === "prospect" || e.value === "mondat") {
            this.setState({
                status: newInfo,
                isMandatUpdated: true
            });
        }
        else {
            this.onChangeModalStatusVisibility(true, this.state.status.value)
            this.setState({
                currentStatus: e,
                status: newInfo,
            })
        }
    }
    onSaveStatusChangement = (value) => {
        let newInfo = { ...this.state.status }
        newInfo.value = value
        this.setState({ status: newInfo });
    }
    cancelChangeStatus = () => {
        this.onChangeModalStatusVisibility(false)
        this.setState({
            status: { ...this.state.status, value: this.state.prevStatus }
        })
    }
    dataUpdated = (element) => {
        this.setState({
            showNotif: true,
            loading: true,
            notifText: "Formulaire sauvegardé"
        })
        this.props.dispatch({ type: "DEINCREMENT_NUMBER" })

        setTimeout(() => {
            this.setState({ showNotif: false, notifText: "" })
            this.getHistoriqueActivite()
        }, 2000);
    }
    onChangeIdentificationError = (key, status) => {
        let newError = { ... this.state.error }
        newError[key] = status
        this.setState({
            error: newError,
        })
        if (status) {
            this.props.dispatch({ type: "DEINCREMENT_NUMBER" })
        }
    }
    getData = (key, data) => {
        this.setState({
            [key]: data
        })
    }
    getListContact = async () => {
        const response = await apiListContacts();
        if (response.statusCode === 200) {
            this.props.dispatch({ type: "SET_CONTACTS", payload: response.data })
        }
    }
    getHistoriqueActivite = async () => {
        const response = await apiGetActivityHistoric(this.props.propertie.id, this.state.activitieHistoriquePages.page, this.state.activitieHistoriquePages.perPage)
        if (response.statusCode === 200) {
            this.setState({
                activitieHistorique: response.data
            })
        }
    }
    getPropertieById = async () => {
        const response = await apiGetPropertieById(this.props.propertie.id)
        if (response.statusCode === 200) {
            this.setState({
                propertie: response.data,
                isPropertieLoaded: !this.state.isPropertieLoaded,
                transaction: renderInputObject(response.data.forSale, '', false, false),
                status: renderInputObject(response.data.status && response.data.status !== '' ? response.data.status : 'prospect', '', false, false),
                propertieName: response.data.name,
                titre: { ...this.state.titre, value: response.data.building?.title }
            })
        } else {
            this.setState({
                showAddPropertie: true
            })
            this.deleteId()
        }
    }
    showAddModal = () => {
        this.setState({
            showAddPropertie: true
        })
    }
    getListAgent = async () => {
        const response = await getAgentList()
        if (response.statusCode === 200) {
            this.props.dispatch({ type: "SET_AGENTS", payload: response.data })
        }
    }
    onChangeAddFileModalSave = () => {
        this.onChangeAddFileModal()
        this.getDocuments()
    }
    componentDidMount() {
        this.props.dispatch({ type: "RESET_NUMBER" })
        document.title = this.lang.addNewProperty
        this.getListContact()
        this.getListAgent()
        if (this.props.propertie.id) {
            this.getDocuments()
            this.getPropertieById()
            this.getHistoriqueActivite()
        } else {
            this.setState({
                showAddPropertie: true
            })
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.propertie.id !== this.props.propertie.id) {
            this.getPropertieById()
        }
        if (this.state.parentFolder !== prevState.parentFolder || this.state.allFolders != prevState.allFolders || this.state.allFiles != prevState.allFiles) {
            this.setState({
                folderList: this.state.allFolders.filter(el => this.state.parentFolder ? el.parentFolder === this.state.parentFolder : !el.parentFolder),
                fileList: this.state.allFiles.filter(el => this.state.parentFolder ? el.folderId === this.state.parentFolder : !el.folderId),
            })
        }
        if (this.state.inputSearch !== prevState.inputSearch && this.state.inputSearch === "") {
            this.getDocuments()
        }
        if (prevState.activitieHistoriquePages.page !== this.state.activitieHistoriquePages.page) {
            this.getHistoriqueActivite()
        }
        if (this.props.numberOfSubmit !== prevProps.numberOfSubmit && this.props.numberOfSubmit === 0) {
            this.setState({ loading: false })
        }
    }
    deleteId = () => {
        this.props.dispatch({ type: "SAVE_ID", payload: null })
    }
    submit = () => {
        this.setState({ isCallAPi: !this.state.isCallAPi })
    }
    getNewPropertieData = (data) => {
        this.setState({
            propertie: null
        })
        this.props.dispatch({ type: "SAVE_ID", payload: data._id })
    }
    setLoader = (status) => {
        this.setState({
            loading: status,
        })
        this.props.dispatch({ type: status ? "INCREMENT_NUMBER" : "DEINCREMENT_NUMBER" })

    }
    onChangeDocumentNav = (item) => {
        this.setState({
            selectedView: item,
        })
    }
    onClickSelection = () => {
        let newList = this.state.fileList.map(el => { return { ...el, checked: false } })
        this.setState({
            isSelection: !this.state.isSelection,
            isCheck: !this.state.isCheck,
            selectedFiles: [],
            fileList: newList
        })
    }
    onOpenUploadFile = () => {
        this.setState({
            isUploadfileModal: true
        })
    }
    onHandleKeypress = (e) => {
        if (e.key === 'Enter') {
            this.addNewFolder()
        }
    }
    onChangeInputFolder = (e, item) => {
        this.setState({
            folder: {
                value: e.target.value,
                isInValid: !isNotEmpty(e.target.value),
                isValid: isNotEmpty(e.target.value),
                errorMessage: this.lang.folderError
            }
        })
    }
    onClearSearchInput = () => {
        this.setState({
            inputSearch: ''
        })
    }
    onChangeSearchInput = (e) => {
        this.setState({
            inputSearch: e.target.value
        })
    }
    onSearchDocument = async (e) => {
        if (e.key === "Enter") {
            this.getDocuments()
            this.setState({
                parentFolder: null
            })
        }
    }
    onCheck = (id, index) => {
        let newList = []
        let newFileList = [...this.state.fileList]
        if (this.state.selectedFiles.filter(el => el === id).length > 0) {
            newList = this.state.selectedFiles.filter(el => el !== id)
            newFileList[index].checked = false
        } else {
            newList = [...this.state.selectedFiles, id]
            newFileList[index].checked = true
        }
        this.setState({
            selectedFiles: newList,
            fileList: newFileList
        })
    }
    onPickItem = (item, i) => {
        if (item.text === this.lang.nouveauDossier) {
            this.setState({
                isAddFolderModal: true,
                isFolder: true
            })
        }
        if (item.text === this.lang.telechargerFichier) {
            this.onChangeUploadFileModal()
        }
        if (item.text === this.lang.demanderFichier) {
            this.onChangeAskForFileModal()
        }
    }
    onChangeAskForFileModal = () => {
        this.setState({
            isModalAskForFileOpen: true
        })
    }
    onHideAskForFileModal = () => {
        this.setState({
            isModalAskForFileOpen: false,
            isShareFile: false,
            isShareFolder: false,
            sharedDocumentId: ''
        })
    }
    onHideAddFolderModal = () => {
        this.setState({
            isAddFolderModal: false,
            folder: {
                value: '',
                isInValid: false,
                isValid: false,
                errorMessage: ''
            },
            isRenameFodler: false,
            isRenameFile: false,
            folderToRenameId: '',
            fileToRenameId: '',
            isFolder: false
        })
    }
    addNewFolder = () => {
        if (!this.state.isRenameFile) {
            if (!this.state.isRenameFodler) {
                this.createFolder()
            } else {
                this.updateFolder()
            }
        } else {
            this.renameFile()
        }
    }
    updateFolder = async () => {
        const body = {
            "id": this.state.folderToRenameId,
            "propertieId": this.props.propertie.id,
            "parentFolder": this.state.parentFolder,
            "folderName": this.state.folder.value,
        }
        let valid = false
        if (this.state.folder.isValid) {
            valid = true
        }
        if (valid) {
            const response = await apiUpdateFolder(JSON.stringify(body))
            if (response.statusCode === 200) {
                this.getDocuments()
                this.onHideAddFolderModal()
            } else {
                if (response.statusCode === 400 && response.error === "folder exist !") {
                    this.setState({
                        folder: {
                            ...this.state.folder,
                            isInValid: true,
                            isValid: false,
                            errorMessage: this.lang.folderNameError
                        }
                    })
                }
            }
        } else {
            this.setState({
                folder: {
                    ...this.state.folder,
                    isInValid: true,
                    isValid: false,
                    errorMessage: this.lang.folderError
                }
            })
        }

    }
    createFolder = async () => {
        const body = {
            "propertieId": this.props.propertie.id,
            "parentFolder": this.state.parentFolder,
            "folderName": this.state.folder.value,
        }
        let valid = false
        if (this.state.folder.isValid) {
            valid = true
        }
        if (valid) {
            const response = await apiCreateFolder(JSON.stringify(body))
            if (response.statusCode === 200) {
                this.setState({ folderList: [...this.state.folderList, response.data], allFolders: [...this.state.allFolders, response.data] })
                this.onHideAddFolderModal()
            } else {
                if (response.statusCode === 400 && response.error === "folder exist !") {
                    this.setState({
                        folder: {
                            ...this.state.folder,
                            isInValid: true,
                            isValid: false,
                            errorMessage: this.lang.folderNameError
                        }
                    })
                }
            }
        } else {
            this.setState({
                folder: {
                    ...this.state.folder,
                    isInValid: true,
                    isValid: false,
                    errorMessage: this.lang.folderError
                }
            })
        }

    }
    onPickFolder = (item, i, folder, folderIndex) => {
        if (item.text === this.lang.renommer) {
            this.setState({
                isAddFolderModal: true,
                isRenameFodler: true,
                folder: { ...this.state.folder, value: folder.name },
                folderToRenameId: folder._id
            })
        }
        if (item.text === this.lang.btnDeleted) {
            this.deleteFolder(folder._id)
        }
        if (item.text === this.lang.telecharger) {
            this.downloadfolder(folder)
        }
        if (item.text === this.lang.deplacer) {
            this.onChangeMoveFolderModal(folder)
        }
        if (item.text === this.lang.partager) {
            this.setState({
                isShareFolder: true,
                isModalAskForFileOpen: true,
                sharedDocumentId: folder._id
            })
        }
    }
    downloadfolder = async (folder) => {
        const response = await apiDownloadFolder(folder._id)
        this.dwonloadFile(response, folder.name + ".zip")
    }
    deleteFolder = async (id) => {
        const response = await apiDeleteFolder(id)
        if (response.statusCode === 200) {
            this.getDocuments()
        }
    }
    uploadFile = (e) => {
        this.setState({
            uploadedFileList: [...this.state.uploadedFileList, ...e],
        })

    }
    onChangeUploadFileModal = () => {
        this.setState({
            isUploadfileModal: !this.state.isUploadfileModal,
            uploadedFileList: []
        })

    }
    onAccessFolder = (folder) => {
        this.setState({
            parentFolder: folder._id,
            currentPath: [...this.state.currentPath, { text: folder.name, value: folder._id }]
        })

    }
    getDocuments = async (searchWord) => {
        const response = await apiSearchDocument(this.props.propertie.id, this.state.inputSearch)
        if (response.statusCode === 200) {
            this.setState({
                allFolders: response.data.listFolder,
                allFiles: response.data.listFile,
                isSelection: this.state.isSelection && response.data.listFile.length ? true : false
            })
        }
    }
    onClickPath = (path, index) => {
        if (path.value === "root") {
            this.setState({
                parentFolder: null,
                currentPath: [{ text: this.lang.Documents, value: 'root' }]
            })
        } else if (path.value !== this.state.folder) {
            let newList = [...this.state.currentPath]
            newList.splice(index + 1)
            this.setState({
                currentPath: newList,
                parentFolder: path.value,
            })
        }
    }
    sendFile = async () => {
        this.setState({
            isUploadfileModal: false,
            isFilesListModal: true
        })

    }
    onChangeAddFileModal = () => {
        this.setState({
            isFilesListModal: !this.state.isFilesListModal,
            uploadedFileList: []
        })
    }
    getLatLng = (lat, lng) => {
        this.setState({
            position: {
                lat: lat,
                lng: lng
            }
        })
    }
    onPickFile = async (item, i, file, fileIndex) => {
        if (item.text === this.lang.renommer) {
            this.setState({
                isAddFolderModal: true,
                isRenameFile: true,
                fileToRenameId: file._id,
                folder: { ...this.state.folder, value: file.name },
            })
        }
        if (item.text === this.lang.btnDeleted) {
            this.deleteFile(file._id)
        }
        if (item.text === this.lang.telecharger) {
            const response = await apiGetFileById(file._id)
            this.dwonloadFile(response, file.name + "." + file.type)
        }
        if (item.text === this.lang.afficherPubliquement || item.text === this.lang.afficherPrivee) {
            this.updateFilePrivacy(file, fileIndex)
        }
        if (item.text === this.lang.partagerFichier) {
            this.setState({
                isShareFile: true,
                isModalAskForFileOpen: true,
                sharedDocumentId: file._id
            })
        }
    }
    dwonloadFile = (fileUrl, fileName) => {
        var a = document.createElement("a");
        a.href = fileUrl;
        a.setAttribute("download", fileName);
        a.click();
    }
    renameFile = async () => {
        const body = {
            "id": this.state.fileToRenameId,
            "name": this.state.folder.value
        }
        let valid = false
        if (this.state.folder.isValid) {
            valid = true
        }
        if (valid) {
            const response = await apiRenameFile(JSON.stringify(body))
            if (response.statusCode === 200) {
                this.getDocuments()
                this.onHideAddFolderModal()
            }
        } else {
            this.setState({
                folder: {
                    isInValid: true,
                    isValid: false,
                    errorMessage: this.lang.folderError
                }
            })
        }
    }
    deleteFile = async (id) => {
        const response = await apiDeleteFile(id)
        if (response.statusCode === 200) {
            this.getDocuments()
        }
    }

    updateFileList = () => {
        this.getDocuments()
    }
    updateFilePrivacy = async (file, index) => {
        const body = {
            "id": file._id,
            "isPublic": !file.isPublic
        }
        const response = await apiUpdatePublicFile(JSON.stringify(body))
        if (response.statusCode === 200) {
            let newFiles = [...this.state.fileList]
            newFiles[index].isPublic = !file.isPublic
            this.setState({
                fileList: newFiles
            })
        }
    }
    onRemoveSelection = () => {
        let newList = this.state.fileList.map(el => { return { ...el, checked: false } })
        this.setState({
            selectedFiles: [],
            fileList: newList
        })
    }
    onAction = async (action) => {
        let body = {}
        if (action === "delete") {
            body = { "ids": this.state.selectedFiles, "isDeleted": true, "isArchived": false }
        }
        if (action === "archive") {
            body = { "ids": this.state.selectedFiles, "isDeleted": false, "isArchived": true }
        }
        const response = await apiArchiveUpdateFiles(JSON.stringify(body))
        if (response.statusCode === 200) {
            this.getDocuments()
            let newList = this.state.fileList.map(el => { return { ...el, checked: false } })
            this.setState({
                selectedFiles: [],
                isSelection: false,
                fileList: newList,
                isCheck: false
            })
        }
    }
    onChangeMoveFolderModal = (folder) => {
        this.setState({
            isModalMoveFolderOpen: !this.state.isModalMoveFolderOpen,
            folderToMove: folder
        })
    }
    onSelectMoveFolder = (e) => {
        this.setState({
            selectedFolderToMove: e,
        })
    }
    onMoveFolder = async () => {
        const body = {
            "id": this.state.folderToMove._id,
            "propertieId": this.props.propertie.id,
            "parentFolder": this.state.selectedFolderToMove.value != "root" ? this.state.selectedFolderToMove.value : null,
            "folderName": this.state.folderToMove.name,
        }
        let valid = false
        if (this.state.selectedFolderToMove) {
            valid = true
        }
        if (valid) {
            const response = await apiUpdateFolder(JSON.stringify(body))
            if (response.statusCode === 200) {
                this.getDocuments()
                this.onChangeMoveFolderModal()
            }
        }
    }
    onViewFile = (file, index) => {
        let newFile = { ...file }
        let newList = []
        this.props?.contact?.listOwner?.forEach(el => {
            if (file.contactId.includes(el._id)) {
                newList.push({ value: el._id, label: el.firstName + " " + el.lastName })
            }
            newFile.documentContact = newList
        });
        this.setState({
            fileToShow: newFile,
            fileIndexToShow: index,
            isViewDocumentModalOpened: true
        })
    }
    onDeleteDocument = async () => {
        const response = await apiDeleteFile(this.state.fileToShow._id)
        if (response.statusCode === 200) {
            let list = this.state.fileList.filter(el => el._id !== this.state.fileToShow._id)
            this.setState({ fileList: [...list] })
            this.onCloseViewModal()
        }
    }
    updateDocumentStatus = async () => {
        const body = {
            "id": this.state.fileToShow._id,
            "isPublic": !this.state.fileToShow.isPublic
        }
        const response = await apiUpdatePublicFile(JSON.stringify(body))
        if (response.statusCode === 200) {
            let newFile = { ...this.state.fileToShow }
            newFile.isPublic = !response.data.isPublic
            let newFiles = [...this.state.fileList]
            newFiles[this.state.fileIndexToShow].isPublic = !response.data.isPublic
            this.setState({
                fileList: newFiles,
                fileToShow: newFile
            })
        }
    }
    onCloseViewModal = () => {
        this.setState({
            isViewDocumentModalOpened: false,
            fileToShow: {},
            fileIndexToShow: ""
        })
    }
    onChangeDocumentName = (e) => {
        let newFile = { ...this.state.fileToShow }
        newFile.name = e.target.value
        this.setState({
            fileToShow: newFile
        })
    }
    onChangeDocumentUser = (e) => {
        let newFile = { ...this.state.fileToShow }
        newFile.userId = e.value
        this.setState({
            fileToShow: newFile
        })
    }
    onChangeFolder = (e) => {
        let newFile = { ...this.state.fileToShow }
        newFile.folderId = e.value
        this.setState({
            fileToShow: newFile
        })
    }
    updateDocument = async () => {
        let file = {}
        file['id'] = this.state.fileToShow._id
        file['propertieId'] = this.props.propertie.id
        file['folderId'] = this.state.fileToShow.folderId !== "root" ? this.state.fileToShow.folderId : null
        file['contactId'] = this.state.fileToShow.documentContact.map(el => el.value)
        file['userId'] = this.state.fileToShow.userId
        file['isPublic'] = this.state.fileToShow.isPublic
        file['name'] = this.state.fileToShow.name

        const response = await apiUpdateFile(JSON.stringify(file))
        if (response.statusCode === 200) {
            this.getDocuments()
            this.onCloseViewModal()
        }
    }
    onChangeContact = (e) => {
        let newFile = { ...this.state.fileToShow }
        newFile.documentContact = e
        this.setState({
            fileToShow: newFile
        })
    }
    setPropertiesName = (name) => {
        this.setState({
            propertieName: name
        })
    }
    onChangeInput = (e, key, key2) => {
        this.setState({
            [key]: { ...this.state[key], value: key2 ? e : e.target.value }
        })
    }
    closeModal = () => {
        this.setState({ showAddPropertie: false })
        this.props.navigation('/properties')
    }
    closeModalWithoutNav = () => {
        this.setState({ showAddPropertie: false })
    }
    onChangePrice = (value) => {
        value = value?.replaceAll(this.lang.localeSeparateur, '')
        if (parseInt(value)) {
            this.setState({
                propertie: {
                    ...this.state.propertie,
                    mandat: {
                        ...this.state.propertie.mandat,
                        price: { ...this.state.propertie.mandat.price, value: parseInt(value) }
                    }
                }
            })
        }
    }
    onDragFiles = async (source, destination) => {
        let body = {
            "id": source,
            "folderId": destination
        }
        const response = await apiMoveDocument(JSON.stringify(body))
        if (response.statusCode === 200) {
            let fileIndex = this.state.allFiles.findIndex(el => { return el._id === source })
            let newFileList = [...this.state.allFiles]
            newFileList[fileIndex].folderId = destination
            this.setState({ allFiles: newFileList })
        }
    }
    onDragFolders = async (source, destination) => {
        let folder = this.state.allFolders.filter(el => el._id === source)
        const body = {
            "id": source,
            "propertieId": this.props.propertie.id,
            "parentFolder": destination,
            "folderName": folder[0].name
        }
        const response = await apiUpdateFolder(JSON.stringify(body))
        if (response.statusCode === 200) {
            let folderIndex = this.state.allFolders.findIndex(el => { return el._id === source })
            let newFolderList = [...this.state.allFolders]
            newFolderList[folderIndex].parentFolder = destination
            this.setState({ allFolders: newFolderList })
        }

    }
    updateHederFeatired = (e) => {
        this.setState({
            imageFeatured: e.image
        })
    }
    render() {
        const Devise = AuthStore.getState().auth?.user?.devise
        return (
            <div className="container-fluide propriete-list-container w-100" >
                {this.state.showAddPropertie && <ModalAddProperty
                    show={this.state.showAddPropertie}
                    getNewPropertieData={this.getNewPropertieData}
                    onHide={this.closeModal}
                    onHideOnly={this.closeModalWithoutNav}
                />}
                <TemplateAddProperties
                    {...this.state}
                    onCheck={(id, index) => this.onCheck(id, index)}
                    onKeyPress={this.onHandleKeypress}
                    getData={this.getData}
                    submit={this.submit}
                    onChangeIdentificationError={this.onChangeIdentificationError}
                    showAddModal={this.showAddModal}
                    dataUpdated={this.dataUpdated}
                    onChangeSelectTransaction={this.onChangeSelectTransaction}
                    getPropertieById={this.getPropertieById}
                    onChangeSelectInfoStatus={this.onChangeSelectInfoStatus}
                    setLoader={this.setLoader}
                    onChangeDocumentNav={(item) => this.onChangeDocumentNav(item)}
                    onClickSelection={this.onClickSelection}
                    onOpenUploadFile={this.onOpenUploadFile}
                    onChangeInputFolder={(e, item) => this.onChangeInputFolder(e, item)}
                    onClearSearchInput={this.onClearSearchInput}
                    onPickItem={(item, i) => this.onPickItem(item, i)}
                    onHideAddFolderModal={this.onHideAddFolderModal}
                    addNewFolder={this.addNewFolder}
                    renameFolder={(name) => this.renamefolder(name)}
                    onPickFolder={(item, i, name, folderIndex) => this.onPickFolder(item, i, name, folderIndex)}
                    uploadFile={this.uploadFile}
                    onChangeUploadFileModal={this.onChangeUploadFileModal}
                    onAccessFolder={(folder) => this.onAccessFolder(folder)}
                    onClickPath={(path, index) => this.onClickPath(path, index)}
                    sendFile={this.sendFile}
                    onChangeAddFileModal={this.onChangeAddFileModal}
                    onChangeSearchInput={this.onChangeSearchInput}
                    getLatLng={this.getLatLng}
                    onPickFile={(item, i, file, fileIndex) => this.onPickFile(item, i, file, fileIndex)}
                    updateFileList={this.updateFileList}
                    updateFilePrivacy={(file, index) => this.updateFilePrivacy(file, index)}
                    onChangeAskForFileModal={this.onChangeAskForFileModal}
                    onRemoveSelection={this.onRemoveSelection}
                    onAction={(action) => this.onAction(action)}
                    onSearchDocument={this.onSearchDocument}
                    onChangeMoveFolderModal={this.onChangeMoveFolderModal}
                    onSelectMoveFolder={(e) => this.onSelectMoveFolder(e)}
                    onViewFile={(file, index) => this.onViewFile(file, index)}
                    onDeleteDocument={this.onDeleteDocument}
                    onCloseViewModal={this.onCloseViewModal}
                    updateDocumentStatus={this.updateDocumentStatus}
                    onChangeDocumentName={this.onChangeDocumentName}
                    onChangeDocumentUser={this.onChangeDocumentUser}
                    onChangeFolder={this.onChangeFolder}
                    onChangeContact={this.onChangeContact}
                    updateDocument={this.updateDocument}
                    onMoveFolder={this.onMoveFolder}
                    onChangeAddFileModalSave={this.onChangeAddFileModalSave}
                    setPropertiesName={this.setPropertiesName}
                    onChangeInput={this.onChangeInput}
                    setPrice={this.setPrice}
                    setImages={this.setImages}
                    onChangePrice={this.onChangePrice}
                    onDragFiles={(source, destination) => this.onDragFiles(source, destination)}
                    onDragFolders={(source, destination) => this.onDragFolders(source, destination)}
                    onHideAskForFileModal={this.onHideAskForFileModal}
                    changeModalActivitieVisibility={this.onChangeModalActivitieVisibility}
                    onToggleHistoriqueModal={this.onToggleHistoriqueModal}
                    getHistoriqueActivite={this.getHistoriqueActivite}
                    updateHederFeatired={this.updateHederFeatired}
                />
                {this.state.isModalStatusVisible &&
                    <OrganismeModalStatus
                        onHide={this.cancelChangeStatus}
                        show={this.state.isModalStatusVisible}
                        devise={Devise}
                        prevStatus={this.state.prevStatus}
                        currentStatus={this.state.currentStatus}
                        onSave={this.onSaveStatusChangement}
                        changeContactVisibility={this.changeContactVisibility}
                        contact={this.props.contact}
                        id={this.props.propertie.id}
                        subscribe={this.props.subscribe}
                        updateFileList={this.updateFileList}
                        getHistoriqueActivite={this.getHistoriqueActivite}
                        propertie={this.state.propertie}
                    />
                }
                {
                    this.state.isAddContactVisible &&
                    <AddContact
                        isModalOpen={this.state.isAddContactVisible}
                        onHideModal={() => this.changeContactVisibility(false)} />
                }
                {
                    this.state.isActivitieModalShow &&
                    <TemplateModalHistoriqueActivite
                        show={this.state.isActivitieModalShow}
                        onHide={this.onChangeModalActivitieVisibility}
                        devise={Devise}
                        setActivitiesPage={this.setActivitiesPage}
                        activitieHistoriquePages={this.state.activitieHistoriquePages}
                        activitieHistorique={this.state.activitieHistorique}
                        propertie={this.state.propertie}
                    />
                }
                {this.state.isHistoriqueModificationModalOpened &&
                    <TemplateHistoriqueModification
                        show={this.state.isHistoriqueModificationModalOpened}
                        onToggleHistoriqueModal={this.onToggleHistoriqueModal}
                        id={this.props.propertie.id}
                        devise={Devise}
                        propertie={this.state.propertie}
                    />}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        propertie: state.properties,
        numberOfSubmit: state.properties.numberOfSubmit,
        contact: state.contacts,
        state: state
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => {
            dispatch(action);
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddProperties)
