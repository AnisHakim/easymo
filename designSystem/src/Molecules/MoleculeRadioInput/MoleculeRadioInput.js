import React, { useEffect, useState } from 'react'
import propTypes from 'prop-types';
import { Button, Input } from '../../Atoms';
import { RadioButton } from '..';
import translator from '../../lang/translator';
import { viewLabel } from '../../common';
import * as uuid from 'uuid'
const lang = translator('fr')


MoleculeRadioInput.propTypes = {
    radioList: propTypes.array,
    inputClassname: propTypes.string,
    label: propTypes.string,
    radioType: propTypes.string,
    listIcons: propTypes.array,
};
MoleculeRadioInput.defaultProps = {
    inputClassname: '',
    label: '',
    radioList: [],
    radioType: 'type-1',
    listIcons: []
};
function MoleculeRadioInput(props) {
    const [id, setId] = useState(uuid.v4());
    const [radioList, setRadioList] = useState([]);
    const [state, setState] = useState({
        inputValue: props?.value?.description ? props.value.description : '',
        checkedRadio: props?.value?.type ? props.value.type : 'notSpecific',
        uploadedFile: props?.value?.file ? props.value.file : "",
        listFiles: null,
        fileDetail: {
            name: props?.value?.fileDetail?.name,
            size: props?.value?.fileDetail?.size,
        },
        loading: false,
        isNewFile: false

    })
    useEffect(() => {
        if (state.loading) {
            props.getData && props.getData({
                radio: state.checkedRadio,
                inputValue: state.inputValue,
                file: state.uploadedFile,
                objectFile: state.listFiles,
                fileDetail: state.fileDetail,
                isNewFile: state.isNewFile
            })
        }
    }, [state]);
    useEffect(() => {
        setRadioList(props.radioList)
    }, [props.radioList])
    useEffect(() => {
        if (state.inputValue !== props.value.description || state.checkedRadio !== props.value.type || state.uploadedFile !== props.value.file) {
            setState({
                checkedRadio: props.value.type,
                uploadedFile: props.value.file,
                inputValue: props.value.description,
            })
        }
    }, [props.value.type, props.value.file, props.value.description])
    const onCheckRadio = (e) => {
        setState({
            ...state,
            checkedRadio: e.target.id,
            inputValue: '',
            loading: true
        })
    }
    const onChangeInput = (e) => {
        setState({
            ...state,
            inputValue: e.target.value,
            loading: true
        })
    }
    const className = ["energie-input-header"]
    if (props.className) {
        className.push(props.className)
    }
    if (props.radioType !== 'type-1') {
        className.push('block')
    }
    const renderRadio = () => {
        return radioList && radioList.map((el, index) =>
            <RadioButton
                key={index}
                id={el.id}
                radioText={el.text}
                isChecked={el.id === state.checkedRadio}
                onCheck={(e) => onCheckRadio(e)}
                radioClassName="mb-2 radio-drawer"
                name={el.name}
            />
        )
    }
    const onChangeUploadFile = (e) => {
        const files = Array.from(e.target.files)
        const file = files.length ? files[0] : null
        let fileDetail = { ...state.fileDetail }
        if (file) {
            fileDetail.size = file.size
            fileDetail.name = file.name
        } else {
            fileDetail.size = null
            fileDetail.name = null
        }
        setState({
            ...state,
            listFiles: file ? e.target.files : null,
            fileDetail: fileDetail,
            loading: true,
            isNewFile: true
        })
    }
    const renderButtonText = () => {
        if (state?.fileDetail?.name) {
            return state.fileDetail.name
        }
        return lang.joindreLeDocument
    }
    return (
        <div className={`${props.radioType === 'type-1' ? 'w-100' : 'row mb-4'}`}>
            {props.radioType === 'type-1' && viewLabel({
                label: props.label,
                labelClass: className.join(' '),
                listIcons: props.listIcons
            })}
            <div className={`${props.radioType === 'type-1' ? ' flex flex-wrap item-center ' : ' col-auto'}`} >
                {props.radioType !== 'type-1' && viewLabel({
                    label: props.label,
                    labelClass: className.join(' '),
                    listIcons: props.listIcons
                })}
                {props.radioType !== 'type-1' ?
                    <div className='flex' > {renderRadio()} </div>
                    :
                    renderRadio()}
                {props.radioType === 'type-1' && state.checkedRadio === "yes" && <Button
                    type='upload'
                    text={renderButtonText()}
                    icon='attachment'
                    className="upload-compromis mb-2"
                    onChangeFile={(e) => onChangeUploadFile(e)}
                    id={id}
                />}
            </div>
            {props.radioType === "type-1" ?
                <>
                    {state.checkedRadio !== "notSpecific" && <Input
                        placeholder={lang.noteComplementaire}
                        className="radio-search"
                        onChange={(e) => onChangeInput(e)}
                        value={state.inputValue}
                    />}
                </> :
                <div className='col-sm-4 baseline-content-col' >

                    {state.checkedRadio !== "notSpecified" &&
                        <Input
                            placeholder={lang.noteComplementaire}
                            className="mb-2 h-35-5 fake-disabled input"
                            onChange={(e) => onChangeInput(e)}
                            value={state.inputValue}
                        />
                    }
                </div>
            }
        </div>
    );

}
export default MoleculeRadioInput
