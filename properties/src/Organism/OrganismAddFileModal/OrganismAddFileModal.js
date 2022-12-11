import React, { useEffect, useState } from 'react'
import { Modal, Table, Text, AddAgent, Button, Select, CheckBox, Icon, MoleculeInput, ProgressBar, Orange, Red, Green } from "@easymo/designSystem";
import translator from '../../lang/translator';
import { doc, excel, image, pdf, text } from '../../svg/svg';
import { useSelector } from 'react-redux';
import { apiUploadFile, apiDeleteFile, apiUpdateFile } from '../../Api/document';
const lang = translator('fr')

const categories = [
    { value: lang.Administratif, label: lang.Administratif },
    { value: lang.Conformite, label: lang.Conformite },
    { value: lang.divers, label: lang.divers },
    { value: lang.Energie, label: lang.Energie },
    { value: lang.Juridique, label: lang.Juridique },
    { value: lang.Juridique, label: lang.Juridique },
]

function OrganismAddFileModal(props) {
    const contact = useSelector((state) => state.contacts)
    const [tabData, setTabData] = useState([])
    const [selectOptions, setSelectOptions] = useState([])
    const [api, setApi] = useState(false)
    const [listFilesToDeleted, setListFilesToDeleted] = useState([])
    const renderFolderList = () => {
        return props.folderList.map(el => { return { value: el._id, label: el.name } })
    }
    const getOwner = () => {
        let propertyOwner = []
        contact.listOwner.filter(el => {
            return props.owner.forEach(element => {
                el._id === element && propertyOwner.push(el)
            })
        }
        )
        let list = propertyOwner.map(el => { return { value: el._id, label: el.firstName + " " + el.lastName } })
        return list
    }
    const formatData = () => {
        let newData = [...props.uploadedFileList && props.uploadedFileList]
        let arr = newData.map(el => { return { percent: 0, color: Orange, doc: el, file: el.name, fileName: getFileName(el.name), contact: getOwner(), category: props.parentFolder, public: false, size: el.size } })
        return arr
    }
    const getFileName = (name) => {
        const list = name.split('.')
        list.splice(list.length - 1, 1)
        return list.join('')
    }
    useEffect(() => {
        setTabData(formatData())
        setSelectOptions(renderFolderList())
        setApi(true)
    }, [])
    useEffect(() => {
        if (api) {
            postData()
        }
    }, [api])
    const postData = async () => {
        for (let index = 0; index < tabData.length; index++) {
            const element = tabData[index];
            const options = {
                onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent
                    let percent = Math.floor((loaded * 100) / total)
                    if (percent < 100) {
                        const list = [...tabData]
                        list[index].percent = percent
                        setTabData(list)
                    }
                }
            }
            let data = new FormData()
            if (props.propertieId)
                data.append("propertieId", props.propertieId)
            if (props.parentFolder != "" && props.parentFolder)
                data.append("folderId", props.parentFolder)
            element.contact.forEach(el => {
                data.append("contactId", el.value)
            });
            data.append("isPublic", false)
            data.append("name", element.fileName)
            data.append('file', element.doc)
            const response = await apiUploadFile(data, options)
            const list = [...tabData]
            if (response?.status === 200) {
                list[index].percent = 100
                list[index].color = Green
                list[index] = { ...list[index], percent: 100, color: Green, ...response.data.data }
                props.updateFileList()
            } else {
                list[index].color = Red
            }
            setTabData(list)
        }
    }
    const onChangeContact = (e, el, index) => {
        let newFileList = [...tabData]
        newFileList[index].contact = e
        setTabData(newFileList)
    }
    const renderContactInput = (e, el, index) => {
        return <AddAgent
            notMb
            containerClassName='doc-upload-tab-auto-complete mb-0'
            selectClassName="select-agent-doc"
            full
            placeholder={lang.nomDuContact}
            value={el.contact}
            onChange={(e) => onChangeContact(e, el, index)}
            options={contact.listOwner.map(el => { return { value: el._id, label: el.firstName + " " + el.lastName } })}
            withRow={false}
        />
    }
    const renderFileExtensionImage = (name) => {
        const list = name.split('.')
        let type = list[1]
        if (type === "pdf") {
            return pdf
        }
        else if (type === "png" || type === "svg" || type === "jpeg" || type === "jpg") {
            return image
        }
        else if (type === "csv" || type === "xlsx") {
            return excel
        }
        else if (type === "txt") {
            return text
        } else if (type === "docx") {
            return doc
        }
    }
    const renderFileProgress = (e, element) => {
        return <div className='w-100'>
            <div className='flex item-center w-100 mb-2'>
                <Icon icon="checkmark_circle" className="check-mark-sucess mr-2" />
                <div className='file-tab-image flex item-center mr-1'>
                    {renderFileExtensionImage(element.file)}
                </div>
                <Text text={element.file} className="mb-0 tab-file-name" />
                <Text text={`-${element.size}${lang.kb}`} className="mb-0 tab-file-size" />
            </div>
            <ProgressBar
                percent={element.percent}
                progressColor={element.color}
                withPercentage={true}
                progressBarClass="flex item-center justify-center progress-bar-file-upload"
            />
        </div>
    }
    const onChangeName = (e, el, index) => {
        let newFileList = [...tabData]
        newFileList[index].fileName = e.target.value
        setTabData(newFileList)
    }
    const renderNameInput = (e, el, index) => {
        return <MoleculeInput
            placeholder={lang.entrez_email}
            inputError={lang.invalid_mail_error}
            inputClassname='doc-upload-tab-select doc-upload-input'
            containerClassName="w-100"
            inputValue={el.fileName}
            onchangeInput={(e) => onChangeName(e, el, index)}
        />
    }
    const onSelectChange = (e, el, index) => {
        let newFileList = [...tabData]
        newFileList[index].category = e.value
        setTabData(newFileList)
    }
    const renderCategorySelect = (e, el, index) => {
        return <Select
            style={{ position: 'inherit' }}
            placeholder={lang.category}
            className='doc-upload-tab-select doc-upload-input'
            options={selectOptions && selectOptions}
            value={el.category}
            onChange={(e) => onSelectChange(e, el, index)}
            optionClassName='option-select-status-identification'
            menuPlacement={'top'}
        />

    }
    const onCheckPublic = (el, index) => {
        let newFileList = [...tabData]
        newFileList[index].public = !tabData[index].public
        setTabData(newFileList)
    }
    const renderCheckBox = (e, el, index) => {
        return <div className='flex justify-center item-center'>
            <CheckBox
                checked={el.public}
                onClick={() => onCheckPublic(el, index)}
                checkInput={false}
            />
        </div>
    }
    const updateFile = async () => {
        let fileUpdated = 0
        for (let index = 0; index < tabData.length; index++) {
            let file = {}
            const element = tabData[index]
            file['id'] = element._id
            file['propertieId'] = element.propertieId
            file['folderId'] = element.category
            file['contactId'] = element.contact.map(el => el.value)
            file['userId'] = element.userId
            file['isPublic'] = !element.public
            file['name'] = element.fileName
            const response = await apiUpdateFile(JSON.stringify(file))
            if (response.statusCode === 200) {
                fileUpdated = fileUpdated + 1
            }
        }
        if (tabData.length === fileUpdated) {
            props.onChangeAddFileModalSave()
        }
    }
    const getNewTableData = async (data) => {
        const list = data.filter(el => el.isDeleted)
        for (let index = 0; index < list.length; index++) {
            const elIndex = listFilesToDeleted.indexOf(list[index]._id)
            if (elIndex === -1) {
                await apiDeleteFile(list[index]._id)
            }
        }
        setListFilesToDeleted(list.map(el => el._id))
        if (list.length === tabData.length) {
            props.onChangeAddFileModalSave()
        }
    }
    return (
        <Modal
            show={props.isModalFileTabOpen}
            onHide={props.onChangeUploadFileModal}
            centered={true}
            contentClassName="add-file-modal-container"
            dialogClassName='upload-file-tab-modal-container'
        >
            <div className='mx-6 mt-6 flex justify-space-between'>
                <Text text={lang.ajouterDesFichiers} type="h5" className='mb-0 modal-add-contact-title' />
                <div className="close-modal-historique-container" >
                    <Icon className='close-modal-historique-icon' icon='clear' onClick={props.onChangeAddFileModal} />
                </div>
            </div>
            <div className='p-6'>
                <Table
                    tableClassName="add-file-tab"
                    actionFirst={false}
                    withAction
                    withValidation={false}
                    type="type-2"
                    listAction={["delete"]}
                    listCol={[
                        { key: "file", name: lang.fichier, sort: true, type: "array", renderFunction: (e, el) => renderFileProgress(e, el) },
                        { key: "name", name: lang.name, type: "array", renderFunction: (e, el, i) => renderNameInput(e, el, i) },
                        { key: "contact", name: lang.Contact, sort: true, type: "array", renderFunction: (e, el, i) => renderContactInput(e, el, i) },
                        { key: "category", name: lang.category, sort: true, type: "array", renderFunction: (e, el, i) => renderCategorySelect(e, el, i) },
                        { key: "puclic", name: lang.publicInter, sort: true, type: "array", renderFunction: (e, el, i) => renderCheckBox(e, el, i), className: "flex justify-center item-center" },
                    ]}
                    data={tabData}
                    getdata={(e) => getNewTableData(e)}
                    padding={20}
                    sortAccepted
                    maxFormContainer
                    withBtnAdd={false}
                />
            </div>
            <div className='flex justify-end border-top-container padding' >
                <Button type='filter' text={lang.cancel} className='mr-2 add-contact-cancel-button' onClick={props.onChangeAddFileModal} />
                <Button text={lang.Envoyer} onClick={updateFile} />
            </div>
        </Modal>
    )
}

export default OrganismAddFileModal