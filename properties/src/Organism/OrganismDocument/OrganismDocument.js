import React, { Component } from 'react';
import { Collapse, FolderWithDropDown, MoleculeFile, MoleculeInput, SwitchDocumentButton, Button, Dropdown, HeaderGreyIcon, Icon, UploadFile } from "@easymo/designSystem";
import translator from '../../lang/translator';
import { documentOptions, fileOptions, uploadOptions } from '../../data/data';

const lang = translator('fr')

export default class OrganismDocument extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedView: 'row',
            folderList: ['Intervenants', 'Identification', 'Mandat', 'Transactions', 'Description du bâtiment'
            ],
            fileList: [{ title: 'Intervenants', checked: false },
            { title: 'Identification', checked: false },
            { title: 'Mandat', checked: false },
            { title: 'Transactions', checked: false },
            { title: 'Description du bâtiment', checked: false }
            ],
            inputSearch: '',
            isSelection: false,
            isCheck: false,
            isUploadfileOpened: false
        }
    }
    onChangeDocumentNav = (item) => {
        this.setState({
            selectedView: item,
        })
    }
    onClickSelection = () => {
        this.setState({
            isSelection: !this.state.isSelection,
            isCheck: !this.state.isCheck
        })
    }
    onOpenUploadFile = () => {
        this.setState({
            isUploadfileOpened: true
        })
    }
    render() {
        return (
            <div className='document-collapse'>
                <Collapse
                    iconStart="attachment"
                    title={lang.Documents}
                // renderCustomizeHeader={this.renderCustomizeHeader}
                // customizeHeader
                >
                    <div className='flex justify-space-between item-center document-header-container'>
                        <Button className="add-document_btn" type="secondary" icon="upload_on_cloud" text={lang.add} />
                        <div className='flex justify-center item-center'>
                            <Button onClick={this.onOpenUploadFile} className="add-document_btn" type="secondary" icon="upload_on_cloud" text={lang.add} />
                            <Dropdown
                                // onPickItem={props.onPickItem}
                                iconEndClass={'icon-table ml-0'}
                                dropdownBtn={'btn-secondary upload-list-button'}
                                withStartIcon={false}
                                text={''}
                                withEndIcon={true}
                                options={uploadOptions}
                                dropDownListStyle="folder-drop-down-container"
                            />
                        </div>
                    </div>
                    <div className='mb-6 mt-4 document-header-container flex justify-space-between item-center'>
                        <SwitchDocumentButton onChangeDocumentNav={(item) => this.onChangeDocumentNav(item)} selectedView={this.state.selectedView} />
                        <div
                        // className={`flex flex-wrap justify-space-between ${!props.listElementSelected.length && 'justify-end'} pr-5 pl-5`}
                        >
                            <div className="flex flex-wrap">
                                {this.state.isSelection && <>
                                    <span className="font-size-sm" style={{ color: HeaderGreyIcon, paddingTop: 7 }}>
                                        <Icon icon="clear" size="18px" className="pointer" />
                                        {lang.selection}
                                    </span>
                                    <Button
                                        type="third"
                                        text={lang.btnDeleted}
                                        icon="delete_outlined"
                                        className="btn-table-properties btn-delete-properties ml-3"
                                        iconClassName="btn-delete-properties"
                                    // onClick={() => props.onAction("delete")}
                                    />
                                    <Button
                                        type="third"
                                        text={lang.btnArchited}
                                        icon="archive"
                                        iconClassName='btn-archived-properties'
                                        className="btn-table-properties btn-archived-properties ml-3 mr-3"
                                    // onClick={() => props.onAction("archive")}
                                    />
                                </>}
                                <Button
                                    onClick={() => this.onClickSelection()}
                                    className="ml-3 mr-4 document-selection-btn"
                                    type="filter"
                                    icon={this.state.isSelection ? "clear" : "checkmark_square_outlined"}
                                    text={!this.state.isSelection ? lang.selection : lang.cancel}
                                />
                                <MoleculeInput
                                    withBorder
                                    isSearch
                                    inputValue={this.state.inputSearch}
                                    placeholder={lang.rechercher}
                                    inputClassname="h-35-5 search-input-35"
                                    // containerClassName={container}
                                    // onchangeInput={(e) => setSearch(e.target.value)}
                                    // onClearSearchInput={() => this.setState({""})}
                                    iconSearchClassName="serach-icon-35 absolute"
                                    iconClearClassName="document-search-clear-icon"
                                />

                            </div>
                        </div>
                    </div>
                    <div className='document-collapse-body'></div>

                    <div className='p-5'>

                        <div className={`${this.state.selectedView === "column" && 'mb-5'} row`}>

                            {this.state.folderList && this.state.folderList.map((el, index) =>
                                <div className={this.state.selectedView === "column" ? 'col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-5' : "col-12"}>
                                    <FolderWithDropDown
                                        options={documentOptions}
                                        containerClassName={this.state.folderList.length === 1 ? 'folder-row-view-top-radius folder-row-view-bottom-radius'
                                            : index === 0 ? 'folder-row-view-top-radius'
                                                : index === this.state.folderList.length - 1 ? 'folder-row-view-bottom-radius'
                                                    : null}
                                        selectedView={this.state.selectedView} title={el} />
                                </div>
                            )}
                        </div>
                        <div className='row'>
                            {this.state.fileList.map(el =>
                                <div className={this.state.selectedView === "column" ? 'col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-3' : "col-12"}>
                                    <MoleculeFile
                                        isCheck={this.state.isCheck}
                                        userName={el.title}
                                        selectedView={this.state.selectedView}
                                        options={fileOptions}
                                        onClick={() => this.onCheckFile()}
                                        checked={el.checked}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </Collapse>
                <UploadFile isModalOpen={this.state.isUploadfileOpened} />
            </div>
        );
    }
}
