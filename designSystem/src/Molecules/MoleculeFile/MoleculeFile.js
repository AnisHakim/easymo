import React from 'react'
import PropTypes from 'prop-types';
import { CheckBox, Icon, Text } from '../../Atoms';
import { Dropdown, TextIcon } from '..';
import { pdf } from './svg';
import { doc, excel, image, text } from '../../assets/svg/svg';
import moment from 'moment'
import translator from '../../lang/translator';


MoleculeFile.propTypes = {
    userName: PropTypes.string,
    fileTitle: PropTypes.string,
    fileCategory: PropTypes.string,
    fileDate: PropTypes.string,
    filePublic: PropTypes.string,
    selectedView: PropTypes.string,
    isCheck: PropTypes.bool,
    fileType: PropTypes.string,
    containerClassname: PropTypes.string,
};
MoleculeFile.defaultProps = {
    userName: '',
    fileTitle: 'Document title',
    fileCategory: 'Energie',
    fileDate: '',
    filePublic: 'Publique',
    selectedView: 'column',
    isCheck: false,
    fileType: "pdf",
    containerClassname: ''
};
function MoleculeFile(props) {
    const lang = translator('fr')
    const renderFileExtensionImage = (type) => {
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
    const containerClassname = ['flex justify-space-between item-center file-row-view-container']
    if (props.containerClassname) {
        containerClassname.push(props.containerClassname)
    }

    function renderRowView() {
        return <div className='relative w-100' >
            <div className={containerClassname.join(' ')} onClick={props.onViewFile}>
                <div className='flex justify-center item-center file-row-view'>
                    {props.isCheck ? <CheckBox className='mr-2'
                        onClick={props.onCheck} checked={props.checked} checkInput={false} /> : <div className='row-file-image w-auto mr-3' >{renderFileExtensionImage(props.fileType)}</div>}
                    <div className='pointer w-100'>
                        <Text text={props.fileTitle} className='file-title mb-0 default-file-title-row' />
                        <Text text={props.fileCategory} className='text-username mb-0' />
                        <div className='flex item-center flex-wrap'>
                            <Icon icon="update" className="file-user" />
                            <Text text={moment(props.fileDate).format('DD/MM/YYYY, hh:mm')} className='text-username mb-0 mr-2' />
                            <div className='flex justify-center item-center mr-2'>
                                <Icon icon="user" className="file-user ml-2" />
                                <Text type="h6" className='text-username mb-0' text={props.userName} />
                            </div>
                            <TextIcon
                                iconStartClass="file-user mr-1"
                                textclassName="text-username"
                                onClickContainer={props.updateFilePrivacy}
                                withStartIcon
                                iconStart={props.filePublic ? "visible_outlined" : "hidden_outlined"}
                                text={props.filePublic ? lang.Publique : lang.Privee} />
                        </div>
                    </div>
                </div>

            </div>
            <div className={`absolute r-22 t-26`} >
                <Dropdown
                    animated
                    onPickItem={props.onPickFile}
                    iconStartClass={'icon-table'}
                    dropdownBtn={'drop-down-export-btn'}
                    withStartIcon={false}
                    iconStart='more_vertical'
                    text={'Options'}
                    withEndIcon={true}
                    options={props.options}
                    dropDownListStyle="folder-drop-down-container"
                />
            </div>
        </div>
    }
    function renderColumnView() {

        return <div className='relative'>
            <div className='shadowContainer pointer min-folder-container relative' onClick={props.onViewFile}>
                <div className='flex item-center'>
                    <Icon icon="user" className="file-user mr-1" />
                    <Text type="h6" className='text-username mb-0' text={props.userName} />
                </div>
                <div className='flex flex-direction-column item-center'>
                    <div className='mb-3 file-image mt-3 w-auto' >{renderFileExtensionImage(props.fileType)}</div>
                    <Text text={props.fileTitle} className='file-title mb-0 default-file-title text-center' />
                    <Text text={props.fileCategory} className='text-username mb-3' />
                    <div className='flex justify-center item-center'>
                        <Icon icon="update" className="file-user mr-1" />
                        <Text text={moment(props.fileDate).format('DD/MM/YYYY, hh:mm')} className='text-username mb-0' />
                    </div>
                    <TextIcon
                        iconStartClass="file-user mr-1"
                        textclassName="text-username"
                        onClickContainer={props.updateFilePrivacy}
                        withStartIcon
                        iconStart={props.filePublic ? "visible_outlined" : "hidden_outlined"}
                        text={props.filePublic ? lang.Publique : lang.Privee} />
                </div>
            </div>
            {props.isCheck ?
                <div className={`absolute r-15 t-17`} >
                    <CheckBox className='mr-2' onClick={props.onCheck} checked={props.checked} checkInput={false} />
                </div>
                :
                <div className={`absolute r-14 t-10`} >
                    <Dropdown
                        animated
                        onPickItem={props.onPickFile}
                        iconStartClass={'icon-table'}
                        dropdownBtn={'drop-down-filterTable-btn'}
                        withStartIcon={true}
                        iconStart='more_vertical'
                        text={''}
                        withEndIcon={false}
                        options={props.options}
                        dropDownListStyle="folder-drop-down-container"
                    />
                </div>}
        </div>
    }
    if (props.selectedView === 'column')
        return renderColumnView()
    return renderRowView()

}
export default MoleculeFile
