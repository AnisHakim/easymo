import React from 'react'
import { OrganismMoveFolder, FolderWithDropDown, MoleculeFile, MoleculeInput, SwitchDocumentButton, Button, Dropdown, HeaderGreyIcon, Icon, UploadFile, AddFolder, MoleculeHeader } from "@easymo/designSystem";
import translator from '../../lang/translator';
import { documentOptions, fileOptions, uploadOptions } from '../../data/data';
import OrganismAddFileModal from '../../Organism/OrganismAddFileModal/OrganismAddFileModal';
import ModalEditDocument from '../../Modal/ModalEditDocument/ModalEditDocument';
import { useSelector } from 'react-redux';
import ModalDemandeFile from '../../Modal/ModalDemandeFile/ModalDemandeFile';
import { Draggable, Droppable } from 'react-drag-and-drop'


const lang = translator('fr')
function TemplateDocument(props) {
    const contact = useSelector(state => state.contacts)
    const renderSelection = () => {
        if (props.selectedFiles.length === 0) {
            return lang.selectionne
        } else if (props.selectedFiles.length === 1) {
            return props.selectedFiles.length + " " + lang.selectionne
        } else {
            return props.selectedFiles.length + " " + lang.selectionnes
        }
    }
    const renderFolderContainerClassname = (index) => {
        if (props.folderList.length === 1 && props.fileList.length === 0) {
            return 'folder-row-view-top-radius folder-row-view-bottom-radius'
        } else {
            if (index === 0) {
                return 'folder-row-view-top-radius'
            } else if (index === props.folderList.length - 1 && props.fileList.length === 0) {
                return 'folder-row-view-bottom-radius'
            }
        }
    }
    const renderFileContainerClassname = (index) => {
        if (props.fileList.length === 1 && props.folderList.length === 0) {
            return 'folder-row-view-top-radius folder-row-view-bottom-radius'
        } else {
            if (index === props.fileList.length - 1) {
                return 'folder-row-view-bottom-radius'
            }
        }
    }
    const formatUser = (id) => {
        let user = contact?.listAgentUser.filter(el => el._id === id)
        if (user.length) {
            return user[0]?.firstName + " " + user[0]?.lastName
        } else {
            return
        }
    }
    const onDrop = (data, id) => {
        if (data.folders === '') {
            props.onDragFiles(data.files, id)
        } else {
            props.onDragFolders(data.folders, id)
        }
    }
    return (
        <div>
            <div className='flex justify-space-between item-center document-header-container'>
                <div className='flex item-center'>
                    <MoleculeHeader
                        textClassName='document-path-text flex item-center'
                        firstIcon="home"
                        text={props.currentPath}
                        onClick={props.onClickPath} />
                </div>
                <div className='flex justify-center item-center'>
                    <Button onClick={props.onChangeUploadFileModal} className="add-document_btn" type="secondary" icon="upload_on_cloud" text={lang.add} />
                    <Dropdown
                        animated
                        onPickItem={props.onPickItem}
                        iconEndClass={'icon-table ml-0'}
                        dropdownBtn={'btn-secondary upload-list-button'}
                        withStartIcon={false}
                        text={''}
                        withEndIcon={true}
                        options={uploadOptions}
                        dropDownListStyle="add-folder-drop-down-container"
                    />
                </div>
            </div>
            <div className='mb-6 mt-4 document-header-container flex flex-wrap justify-space-between item-center document-change-view-buttons-container'>
                <SwitchDocumentButton onChangeDocumentNav={(item) => props.onChangeDocumentNav(item)} selectedView={props.selectedView} />
                <div className="flex document-buttons-header-container flex-wrap">
                    {props.isSelection && <>
                        <span className="font-size-sm btn-doc-action flex item-center doc-selection" >
                            <Icon icon="clear" size="18px" className="pointer" onClick={props.onRemoveSelection} />
                            {renderSelection()}
                        </span>
                        <Button
                            type="third"
                            text={lang.btnDeleted}
                            icon="delete_outlined"
                            className="btn-table-properties btn-delete-properties ml-3 btn-doc-action"
                            iconClassName="btn-delete-properties"
                            onClick={() => props.onAction("delete")}
                        />
                        <Button
                            type="third"
                            text={lang.btnArchited}
                            icon="archive"
                            iconClassName='btn-archived-properties'
                            className="btn-table-properties btn-archived-properties ml-3 mr-3 btn-doc-action"
                            onClick={() => props.onAction("archive")}
                        />
                    </>}
                    <Button
                        onClick={props.onClickSelection}
                        className="ml-3 mr-4 document-selection-btn btn-doc-action"
                        type="filter"
                        icon={props.isSelection ? "clear" : "checkmark_circle_outlined"}
                        text={!props.isSelection ? lang.selection : lang.cancel}
                    />
                    <MoleculeInput
                        withBorder
                        isSearch
                        inputValue={props.inputSearch}
                        placeholder={lang.rechercher}
                        inputClassname="h-35-5 search-input-35"
                        containerClassName={"btn-doc-action"}
                        onchangeInput={props.onChangeSearchInput}
                        onClearSearchInput={props.onClearSearchInput}
                        iconSearchClassName="serach-icon-35 absolute"
                        iconClearClassName="document-search-clear-icon pointer"
                        onKeyPress={props.onSearchDocument}
                    />
                </div>
            </div>
            <div className='document-collapse-body'></div>
            {(props.folderList?.length || props.fileList?.length) ? <div className='p-5'>
                <div className={`${props.selectedView === "column" && 'mb-5'} row`}>
                    {props.folderList && props.folderList.map((el, index) =>
                        <div key={index} className={props.selectedView === "column" ? 'col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-5' : "col-12"}>
                            <Droppable
                                types={['files', 'folders']}
                                onDrop={(data) => onDrop(data, el._id)}>
                                {el.isProtected ? <FolderWithDropDown
                                    onPickFolder={(item, i) => props.onPickFolder(item, i, el, index)}
                                    options={documentOptions(el.isProtected && el.isProtected)}
                                    containerClassName={renderFolderContainerClassname(index)}
                                    selectedView={props.selectedView}
                                    title={el.name}
                                    onAccessFolder={() => props.onAccessFolder(el)} /> :
                                    <Draggable type="folders" data={el._id}>
                                        <FolderWithDropDown
                                            onPickFolder={(item, i) => props.onPickFolder(item, i, el, index)}
                                            options={documentOptions(el.isProtected && el.isProtected)}
                                            containerClassName={renderFolderContainerClassname(index)}
                                            selectedView={props.selectedView}
                                            title={el.name}
                                            onAccessFolder={() => props.onAccessFolder(el)} /></Draggable>}
                            </Droppable>
                        </div>
                    )}
                </div>
                <div className='row'>
                    {props.fileList && props.fileList.map((el, index) =>
                        <div key={index} className={props.selectedView === "column" ? 'col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-3' : "col-12"}>
                            <Draggable type="files" data={el._id}>
                                <MoleculeFile
                                    containerClassname={renderFileContainerClassname(index)}
                                    onPickFile={(item, i) => props.onPickFile(item, i, el, index)}
                                    checked={el.checked}
                                    filePublic={el.isPublic}
                                    onCheck={() => props.onCheck(el._id, index)}
                                    isCheck={props.isCheck}
                                    userName={formatUser(el.userId)}
                                    selectedView={props.selectedView}
                                    fileCategory={el.category}
                                    fileTitle={el.name}
                                    fileDate={el.createdAt}
                                    options={fileOptions(el.isPublic)}
                                    fileType={el.type}
                                    updateFilePrivacy={() => props.updateFilePrivacy(el, index)}
                                    onViewFile={() => props.onViewFile(el, index)}
                                />
                            </Draggable>
                        </div>
                    )}
                </div>
            </div>
                :
                <div className='p-5'>
                    <div className="empty-text-container flex item-center">
                        <Icon icon="warning" className="empty-tab-icon mr-2" />
                        {lang.aucunDocument}
                    </div>
                </div>}
            {props.isUploadfileModal && <UploadFile
                isModalOpen={props.isUploadfileModal}
                uploadFile={props.uploadFile}
                onChangeUploadFileModal={props.onChangeUploadFileModal}
                sendFile={props.sendFile}
            />}
            {props.isFilesListModal && <OrganismAddFileModal
                isModalFileTabOpen={props.isFilesListModal}
                uploadedFileList={props.uploadedFileList}
                onChangeAddFileModal={props.onChangeAddFileModal}
                uploadPercentage={props.uploadPercentage}
                owner={props.owner}
                parentFolder={props.parentFolder}
                propertieId={props.propertieId}
                updateFileList={props.updateFileList}
                folderList={props.allFolders}
                onChangeAddFileModalSave={props.onChangeAddFileModalSave}
            />}
            {props.isAddFolderModal && <AddFolder
                onKeyPress={props.onKeyPress}
                folder={props.folder}
                onChangeInput={props.onChangeInput}
                show={props.isAddFolderModal}
                onHide={props.onHideAddFolderModal}
                title={props.isRenameFile ? lang.renommerFichier : props.isFolder ? lang.ajouterNouveauDossier : lang.renommerDossier}
                addNewFolder={props.addNewFolder}
                isRenameFile={props.isRenameFile}
            />}
            {props.isModalAskForFileOpen && <ModalDemandeFile
                folderList={props.allFolders}
                owner={props.owner}
                isModalAskForFileOpen={props.isModalAskForFileOpen}
                onChangeAskForFileModal={props.onChangeAskForFileModal}
                onHideAskForFileModal={props.onHideAskForFileModal}
                isShareFile={props.isShareFile}
                isShareFolder={props.isShareFolder}
                sharedDocumentId={props.sharedDocumentId} />}


            {props.isModalMoveFolderOpen && <OrganismMoveFolder
                show={props.isModalMoveFolderOpen}
                onHide={props.onChangeMoveFolderModal}
                folderList={props.allFolders}
                selectedValue={props.selectedFolderToMove}
                onSelectChange={props.onSelectMoveFolder}
                onSubmit={props.onMoveFolder}
                folderToMove={props.folderToMove}
            />}
            {props.isViewDocumentModalOpened && <ModalEditDocument
                isViewDocumentModalOpened={props.isViewDocumentModalOpened}
                onViewFile={props.onViewFile}
                onDeleteDocument={props.onDeleteDocument}
                onCloseViewModal={props.onCloseViewModal}
                updateDocumentStatus={props.updateDocumentStatus}
                fileToShow={props.fileToShow}
                folderList={props.allFolders}
                onChangeFolder={props.onChangeFolder}
                onChangeDocumentName={props.onChangeDocumentName}
                onChangeDocumentUser={props.onChangeDocumentUser}
                onChangeContact={props.onChangeContact}
                updateDocument={props.updateDocument}
            />}
        </div>
    )
}

export default TemplateDocument