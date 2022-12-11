import OrganismeAddProprieteInfo from "../../Organism/OrganismeAddProperties/OrganismeAddProprieteInfo"
import OrganismeAddProprieteMenu from "../../Organism/OrganismeAddProperties/organismeAddProprieteMenu"
import OrganismeHeaderAddProperties from "../../Organism/OrganismeAddProperties/OrganismeHeaderAddProperties"
import { Button, Collapse, Icon } from "@easymo/designSystem"
import translator from "../../lang/translator"
import {
    OrgnismEditIntervenant, OrganismEditOccupation, OrganismTransactions,
    OrganismIdentification, OrganismeDescription, OrganismeMandat, OrganismEquipements, OrganismMedia, OrganismVisits
} from "../../Organism"
import { useState, useEffect } from "react"
import { useIntersectionObserver } from '@researchgate/react-intersection-observer'
import { AuthStore } from "@easymo/auth"
import { useLocation } from 'react-router-dom'
import OrganismeComposition from "../../Organism/OrganismeComposition/OrganismeComposition"
import OrganismAdministratif from "../../Organism/OrganismAdministratif/OrganismAdministratif"
import OrganismeAffichage from "../../Organism/OrganismeAffichage/OrganismeAffichage"
import TemplateDocument from "../TemplateDocument/TemplateDocument"
import { OrganismProximity } from "../../Organism";
import OrganismeEvaluation from "../../Organism/OrganismeEvaluation/OrganismeEvaluation"
import OrganismeDiffusion from "../../Organism/OrganismeDiffusion/OrganismeDiffusion"
function TemplateAddProperties(props) {
    const location = useLocation()
    const Devise = AuthStore.getState().auth?.user?.devise
    const lang = translator('fr')
    const [menuChecked, setMenu] = useState('')
    const [menuClick, setMenuClick] = useState(false)
    useEffect(() => {
        if (menuClick) {
            setTimeout(() => {
                setMenuClick(false)
            }, 1500);
        }
    }, [menuClick])
    const onClickMenuItem = (item, click) => {
        setMenuClick(true)
        if (click) {
            setTimeout(() => {
                setMenu(item)
            }, 1500);
        } else {
            setMenu(item)
        }
    }
    const handleChange = (entry) => {
        if (!menuClick) {
            if (!entry.isIntersecting && entry.target.id === 'Intervenants' && entry.boundingClientRect.top > 0) {
                setMenu('')
            }
            if (entry.isIntersecting) {
                setMenu(entry.target.id)
            }
        }
    }
    function gotTo() {
        setMenu(location.hash.replace("#", ""))
        let element = document.getElementById(location.hash.replace("#", ""))
        element && element.scrollIntoView()
    }
    useEffect(() => {
        if (location.hash && props.propertie) {
            gotTo()
        }
    }, [location.hash])

    useEffect(() => {
        setTimeout(() => {
            gotTo()
        }, 2000)
    }, [props.propertie])

    const [ref1] = useIntersectionObserver(handleChange, { root: '#page-content', threshold: 0.3 })
    const [ref2] = useIntersectionObserver(handleChange, { root: '#page-content', threshold: 0.5 })
    const [ref3] = useIntersectionObserver(handleChange, { root: '#page-content', threshold: 0.5 })
    const [ref4] = useIntersectionObserver(handleChange, { root: '#page-content', threshold: 0.6 })
    const [ref5] = useIntersectionObserver(handleChange, { root: '#page-content', threshold: 0.4 })
    const [ref6] = useIntersectionObserver(handleChange, { root: '#page-content', threshold: 0.6 })
    const [ref7] = useIntersectionObserver(handleChange, { root: '#page-content', threshold: 0.5 })
    const [ref8] = useIntersectionObserver(handleChange, { root: '#page-content', threshold: 0.6 })
    const [ref9] = useIntersectionObserver(handleChange, { root: '#page-content', threshold: 0.6 })
    const [ref10] = useIntersectionObserver(handleChange, { root: '#page-content', threshold: 0.6 })
    const [ref11] = useIntersectionObserver(handleChange, { root: '#page-content', threshold: 0.7 })
    const [ref12] = useIntersectionObserver(handleChange, { root: '#page-content', threshold: 0.7 })
    const [ref13] = useIntersectionObserver(handleChange, { root: '#page-content', rootMargin: "0% 0% -25%", threshold: 1 })
    const [ref14] = useIntersectionObserver(handleChange, { root: '#page-content', threshold: 0.7 })
    const [ref15] = useIntersectionObserver(handleChange, { root: '#page-content', threshold: 0.6 })
    const [ref16] = useIntersectionObserver(handleChange, { root: '#page-content', threshold: 0.3 })
    return (
        <div className="w-100 sticky-24" style={{ paddingBottom: "200px" }}>
            <OrganismeHeaderAddProperties showAddModal={props.showAddModal}
                propertie={props.propertie}
                propertieName={props.propertieName}
                onToggleHistoriqueModal={props.onToggleHistoriqueModal}
                showAddPropertie={props.showAddPropertie}
            />
            <div className="row" >
                <div className="col-lg-3" >
                    <OrganismeAddProprieteMenu
                        onClickMenuItem={(item, click) => onClickMenuItem(item, click)}
                        menuChecked={menuChecked}
                        error={props.error} />
                </div>
                <div className="col-lg-9 relative" >
                    <OrganismeAddProprieteInfo
                        activitieHistorique={props.activitieHistorique}
                        isCallAPi={props.isCallAPi}
                        isPropertieLoaded={props.isPropertieLoaded}
                        propertie={props.propertie}
                        transaction={props.transaction}
                        status={props.status}
                        Devise={Devise}
                        onChangeSelectTransaction={props.onChangeSelectTransaction}
                        onChangeSelectInfoStatus={props.onChangeSelectInfoStatus}
                        setLoader={props.setLoader}
                        setPropertiesName={props.setPropertiesName}
                        onChangeInput={props.onChangeInput}
                        setPrice={props.setPrice}
                        setImages={props.setImages}
                        changeModalActivitieVisibility={props.changeModalActivitieVisibility}
                        getHistoriqueActivite={props.getHistoriqueActivite}
                        imageFeatured={props.imageFeatured}
                        showAddPropertie={props.showAddPropertie}
                    />

                    <div className="w-100">
                        <div ref={ref1} onClick={() => onClickMenuItem('Intervenants')} id="Intervenants" className="target-collapse" >
                            <OrgnismEditIntervenant
                                isCallAPi={props.isCallAPi}
                                propertie={props.propertie}
                                isPropertieLoaded={props.isPropertieLoaded}
                                onChangeIdentificationError={props.onChangeIdentificationError}
                                dataUpdated={props.dataUpdated}
                                setLoader={props.setLoader}
                            />
                        </div>
                        <div ref={ref2} onClick={() => onClickMenuItem('Identification')} id="Identification" className="target-collapse" >
                            <OrganismIdentification
                                isCallAPi={props.isCallAPi}
                                isPropertieLoaded={props.isPropertieLoaded}
                                onChangeIdentificationError={props.onChangeIdentificationError}
                                propertie={props.propertie}
                                dataUpdated={props.dataUpdated}
                                setLoader={props.setLoader}
                                getLatLng={props.getLatLng}
                                propertieName={props.propertieName}
                            />
                        </div>

                        <div ref={ref3} onClick={() => onClickMenuItem('Mandat')} id="Mandat" className="target-collapse scrolled-item" >
                            <OrganismeMandat
                                isCallAPi={props.isCallAPi}
                                getData={props.getData}
                                isPropertieLoaded={props.isPropertieLoaded}
                                propertie={props.propertie}
                                Devise={Devise}
                                onChangeIdentificationError={props.onChangeIdentificationError}
                                dataUpdated={props.dataUpdated}
                                transaction={props.transaction}
                                onChangeSelectTransaction={props.onChangeSelectTransaction}
                                onChangeSelectInfoStatus={props.onChangeSelectInfoStatus}
                                status={props.status}
                                setLoader={props.setLoader}
                                infoPrice={props.infoPrice}
                                onChangePrice={props.onChangePrice}
                                isMandatUpdated={props.isMandatUpdated}
                            />
                        </div>

                        <div ref={ref4} onClick={() => onClickMenuItem('Transactions')} id="Transactions" className="target-collapse">
                            <OrganismTransactions
                                updateFileList={props.updateFileList}
                                isCallAPi={props.isCallAPi}
                                isPropertieLoaded={props.isPropertieLoaded}
                                onChangeIdentificationError={props.onChangeIdentificationError}
                                propertie={props.propertie}
                                Devise={Devise}
                                dataUpdated={props.dataUpdated}
                                setLoader={props.setLoader}
                            />
                        </div>
                        <div ref={ref5} onClick={() => onClickMenuItem('DescriptionBatiment')} id="DescriptionBatiment" className="target-collapse">
                            <OrganismeDescription
                                isCallAPi={props.isCallAPi}
                                getData={props.getData}
                                isPropertieLoaded={props.isPropertieLoaded}
                                propertie={props.propertie}
                                Devise={Devise}
                                onChangeIdentificationError={props.onChangeIdentificationError}
                                dataUpdated={props.dataUpdated}
                                setLoader={props.setLoader}
                                titre={props.titre}
                                onChangeInput={props.onChangeInput}
                            />
                        </div>
                        <div
                            ref={ref6}
                            onClick={() => onClickMenuItem('Occupation')}
                            id="Occupation" className="target-collapse w-100"
                        >
                            <OrganismEditOccupation
                                isCallAPi={props.isCallAPi}
                                propertie={props.propertie}
                                isPropertieLoaded={props.isPropertieLoaded}
                                collapseStyle={"w-100"}
                                dataUpdated={props.dataUpdated}
                                onChangeIdentificationError={props.onChangeIdentificationError}
                                setLoader={props.setLoader}
                                Devise={Devise}
                            />
                        </div>
                        <div ref={ref7} onClick={() => onClickMenuItem('Composition')} id="Composition" className="target-collapse">
                            <OrganismeComposition
                                isCallAPi={props.isCallAPi}
                                getData={props.getData}
                                isPropertieLoaded={props.isPropertieLoaded}
                                propertie={props.propertie}
                                Devise={Devise}
                                onChangeIdentificationError={props.onChangeIdentificationError}
                                dataUpdated={props.dataUpdated}
                                setLoader={props.setLoader}
                            />
                        </div>
                        <div ref={ref8} onClick={() => onClickMenuItem('Equipements')} id="Equipements" className="target-collapse" >
                            <OrganismEquipements
                                isCallAPi={props.isCallAPi}
                                propertie={props.propertie}
                                isPropertieLoaded={props.isPropertieLoaded}
                                collapseStyle={"w-100"}
                                onChangeIdentificationError={props.onChangeIdentificationError}
                                dataUpdated={props.dataUpdated}
                                setLoader={props.setLoader}
                            />
                        </div>
                        <div ref={ref9} onClick={() => onClickMenuItem('Medias')} id="Medias" className="target-collapse">
                            <OrganismMedia
                                isCallAPi={props.isCallAPi}
                                propertie={props.propertie}
                                isPropertieLoaded={props.isPropertieLoaded}
                                dataUpdated={props.dataUpdated}
                                onChangeIdentificationError={props.onChangeIdentificationError}
                                collapseStyle={"w-100"}
                                setLoader={props.setLoader}
                                images={props.images}
                                updateHederFeatired={props.updateHederFeatired}
                            />
                        </div >
                        <div ref={ref10} onClick={() => onClickMenuItem('Administratif')} id="Administratif" className="target-collapse">
                            <OrganismAdministratif
                                updateFileList={props.updateFileList}
                                isCallAPi={props.isCallAPi}
                                propertie={props.propertie}
                                isPropertieLoaded={props.isPropertieLoaded}
                                onChangeIdentificationError={props.onChangeIdentificationError}
                                dataUpdated={props.dataUpdated}
                                Devise={Devise}
                                setLoader={props.setLoader}
                            />
                        </div>
                        <div ref={ref11} onClick={() => onClickMenuItem('Documents')} id="Documents" className="document-collapse target-collapse">
                            <Collapse
                                iconStart="attachment"
                                title={lang.Documents}
                            >
                                <TemplateDocument
                                    onKeyPress={props.onKeyPress}
                                    selectedView={props.selectedView}
                                    folderList={props.folderList}
                                    fileList={props.fileList}
                                    inputSearch={props.inputSearch}
                                    isSelection={props.isSelection}
                                    isCheck={props.isCheck}
                                    onChangeDocumentNav={(item) => props.onChangeDocumentNav(item)}
                                    onClickSelection={props.onClickSelection}
                                    onOpenUploadFile={props.onOpenUploadFile}
                                    onChangeInput={props.onChangeInputFolder}
                                    onClearSearchInput={props.onClearSearchInput}
                                    onCheck={props.onCheck}
                                    onPickItem={props.onPickItem}
                                    isAddFolderModal={props.isAddFolderModal}
                                    onHideAddFolderModal={props.onHideAddFolderModal}
                                    folder={props.folder}
                                    addNewFolder={props.addNewFolder}
                                    onPickFolder={props.onPickFolder}
                                    uploadFile={props.uploadFile}
                                    isUploadfileModal={props.isUploadfileModal}
                                    onChangeUploadFileModal={props.onChangeUploadFileModal}
                                    onAccessFolder={(el) => props.onAccessFolder(el)}
                                    currentPath={props.currentPath}
                                    onClickPath={props.onClickPath}
                                    sendFile={props.sendFile}
                                    isFilesListModal={props.isFilesListModal}
                                    uploadedFileList={props.uploadedFileList}
                                    onChangeAddFileModal={props.onChangeAddFileModal}
                                    uploadPercentage={props.uploadPercentage}
                                    onChangeSearchInput={props.onChangeSearchInput}
                                    owner={props.propertie?.speakers?.owner}
                                    parentFolder={props.parentFolder}
                                    propertieId={props.propertie?._id}
                                    onPickFile={props.onPickFile}
                                    updateFileList={props.updateFileList}
                                    isRenameFile={props.isRenameFile}
                                    updateFilePrivacy={props.updateFilePrivacy}
                                    isModalAskForFileOpen={props.isModalAskForFileOpen}
                                    onChangeAskForFileModal={props.onChangeAskForFileModal}
                                    selectedFiles={props.selectedFiles}
                                    onRemoveSelection={props.onRemoveSelection}
                                    onAction={props.onAction}
                                    onSearchDocument={props.onSearchDocument}
                                    onChangeMoveFolderModal={props.onChangeMoveFolderModal}
                                    selectedFolderToMove={props.selectedFolderToMove.value}
                                    isModalMoveFolderOpen={props.isModalMoveFolderOpen}
                                    onSelectMoveFolder={props.onSelectMoveFolder}
                                    isViewDocumentModalOpened={props.isViewDocumentModalOpened}
                                    onViewFile={props.onViewFile}
                                    onDeleteDocument={props.onDeleteDocument}
                                    onCloseViewModal={props.onCloseViewModal}
                                    updateDocumentStatus={props.updateDocumentStatus}
                                    fileToShow={props.fileToShow}
                                    onChangeDocumentName={props.onChangeDocumentName}
                                    onChangeDocumentUser={props.onChangeDocumentUser}
                                    onChangeFolder={props.onChangeFolder}
                                    onChangeContact={props.onChangeContact}
                                    updateDocument={props.updateDocument}
                                    onMoveFolder={props.onMoveFolder}
                                    folderToMove={props.folderToMove}
                                    allFolders={props.allFolders}
                                    onChangeAddFileModalSave={props.onChangeAddFileModalSave}
                                    isFolder={props.isFolder}
                                    onDragFiles={props.onDragFiles}
                                    onDragFolders={props.onDragFolders}
                                    onHideAskForFileModal={props.onHideAskForFileModal}
                                    isShareFile={props.isShareFile}
                                    isShareFolder={props.isShareFolder}
                                    sharedDocumentId={props.sharedDocumentId}
                                    allFiles={props.allFiles}
                                />
                            </Collapse>
                        </div>
                        <div ref={ref12} onClick={() => onClickMenuItem('Diffusion')} id="Diffusion" className="target-collapse">
                            <OrganismeDiffusion
                                isCallAPi={props.isCallAPi}
                                propertie={props.propertie}
                                collapseStyle={"w-100"}
                                isPropertieLoaded={props.isPropertieLoaded}
                                onChangeIdentificationError={props.onChangeIdentificationError}
                                dataUpdated={props.dataUpdated}
                                setLoader={props.setLoader}
                            />
                        </div>
                        <div ref={ref13} onClick={() => onClickMenuItem('Affichage')} id="Affichage" className="target-collapse">
                            <OrganismeAffichage
                                isCallAPi={props.isCallAPi}
                                getData={props.getData}
                                isPropertieLoaded={props.isPropertieLoaded}
                                propertie={props.propertie}
                                Devise={Devise}
                                onChangeIdentificationError={props.onChangeIdentificationError}
                                dataUpdated={props.dataUpdated}
                                setLoader={props.setLoader}
                            />
                        </div>
                        <div ref={ref14} onClick={() => onClickMenuItem('Visites')} id="Visites" className="target-collapse">
                            <OrganismVisits
                                isCallAPi={props.isCallAPi}
                                propertie={props.propertie}
                                collapseStyle={"w-100"}
                                isPropertieLoaded={props.isPropertieLoaded}
                                onChangeIdentificationError={props.onChangeIdentificationError}
                                dataUpdated={props.dataUpdated}
                                setLoader={props.setLoader}
                            />
                        </div>
                        <div ref={ref15} onClick={() => onClickMenuItem('proximite')} id="proximite" className="target-collapse">
                            <OrganismProximity
                                isCallAPi={props.isCallAPi}
                                propertie={props.propertie}
                                collapseStyle={"w-100"}
                                isPropertieLoaded={props.isPropertieLoaded}
                                onChangeIdentificationError={props.onChangeIdentificationError}
                                dataUpdated={props.dataUpdated}
                                setLoader={props.setLoader}
                                position={props.position}
                            />
                        </div>
                        <div ref={ref16} onClick={() => onClickMenuItem('evaluation')} id="evaluation" className="target-collapse">
                            <OrganismeEvaluation
                                isCallAPi={props.isCallAPi}
                                propertie={props.propertie}
                                collapseStyle={"w-100"}
                                isPropertieLoaded={props.isPropertieLoaded}
                                onChangeIdentificationError={props.onChangeIdentificationError}
                                dataUpdated={props.dataUpdated}
                                setLoader={props.setLoader}
                            />
                        </div>
                        {
                            props.showNotif &&
                            <div className="flex item-center justify-center notif-container slide-top-not">
                                <Icon icon="done" size="16px" className='mr-2' />
                                {props.notifText}</div>
                        }
                        <Button withLoader loading={props.loading} text={lang.Sauvgarder} icon='save-solid' containerClassName='savgarder-btn-container' className='sauvgarder-propertie-btn' onClick={props.submit} />

                    </div >

                </div >
            </div >
        </div >
    )
}
export default TemplateAddProperties
