import React from 'react'
import PropTypes from 'prop-types';
import { Text, Button } from '../../Atoms';
import { browseFile, mediaBrowse } from '../../assets/svg/svg';
import translator from '../../lang/translator';
import { useRef } from 'react';

MoleculeDragUpload.propTypes = {
    className: PropTypes.string,
    buttonType: PropTypes.string,
    isDocument: PropTypes.bool,
    accept: PropTypes.string,
};
MoleculeDragUpload.defaultProps = {
    className: '',
    buttonType: 'filter',
    isDocument: true,
    accept: "*/*"
};

const lang = translator('fr')
function MoleculeDragUpload(props) {
    const uploadRef = useRef()
    const uploadFile = (e) => {
        props.uploadFile(e.target.files)
    }
    const className = ['dashed-container']
    if (props.className) {
        className.push(props.className)
    }
    return (
        <div className={className.join(' ')}>
            <div className='input-drag-and-drop'>
                <div>
                    <div>
                        <div className='document-upload-img mb-3 mx-auto'>
                            {props.isDocument ? browseFile : mediaBrowse}
                        </div>
                        <Text text={lang.deposezVosFichier} className="document-upload-file-text mb-1" />
                        <Text text={lang.ou} className="document-upload-file-ou" />
                        <input multiple ref={uploadRef} type="file" accept={props.accept} onChange={uploadFile} className='absolute document-input-upload l-0' />
                    </div>
                    <div className='flex justify-center' >
                        <Button
                            onClick={() => uploadRef.current.click()}
                            type={props.buttonType}
                            text={lang.parcourezVosFichiers}
                            className='mr-2 document-upload-file'
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MoleculeDragUpload