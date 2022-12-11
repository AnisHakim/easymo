import React, { useEffect, useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './function';
import { Button } from '../Atoms';
import { Modal } from 'react-bootstrap';
import { isNumber } from '../Validation';
import { MoleculeInput } from '../Molecules';
import translator from '../lang/translator';
CropImage.defaultProps = {
    zoom: 1,
    cropSizeWidth: 311,
    cropSizeHeight: 215,
}
export function CropImage(props) {
    const lang = translator('fr')
    const [state, setState] = useState({
        listImages: [],
        listSrc: [],
        listCropedImg: [],
        index: 0,
        src: null,
        crop: { x: 0, y: 0 },
        zoom: props.zoom,
        cropSize: { width: props.cropSizeWidth, height: props.cropSizeHeight }
    })
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);
    const submit = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(state.src, croppedAreaPixels, 0);
            let list = [...state.listCropedImg]
            list[state.index] = croppedImage
            if (state.listImages.length - 1 === state.index) {
                props.getCroppedImg && props.getCroppedImg(list);
            } else {
                const index = state.index + 1
                setState({
                    ...state,
                    listCropedImg: list,
                    index: index,
                    src: state.listImages[index]
                })
            }
        } catch (e) {
            console.error(e);
        }
    }, [croppedAreaPixels]);
    useEffect(() => {
        setState({
            ...state,
            listImages: props.listImages,
            index: props.listImages.length ? 0 : null,
            src: props.listImages.length ? props.listImages[0] : null
        })
    }, [props.listImages])
    function setCrop(e) {
        setState({ ...state, crop: e });
    }
    function setZoom(e) {
        setState({ ...state, zoom: e });
    }
    function onChangeSize(key, value) {
        if (isNumber(value)) {
            setState({ ...state, cropSize: { ...state.cropSize, [key]: parseInt(value) ? parseInt(value) : 0 } })
        }
    }
    function increment(key, increment) {
        let value = state.cropSize[key]
        if (increment) {
            value = value + 1
        } else {
            value = value - 1
        }
        setState({ ...state, cropSize: { ...state.cropSize, [key]: value } })
    }
    return (
        <Modal
            show={props.show}
            centered
            onHide={props.onHide}
            contentClassName={'small-modal-content'}
            dialogClassName={'modal-dialog'}
        >
            <Cropper
                image={state.src}
                crop={state.crop}
                zoom={state.zoom}
                cropSize={state.cropSize}
                onCropChange={(e) => setCrop(e)}
                onCropComplete={onCropComplete}
                onZoomChange={(e) => setZoom(e)}
                classes={{ containerClassName: 'container-crop-img w-100' }}
                cropShape={"rect"}
            />
            <div className='flex justify-space-between mt-2'>
                <MoleculeInput inputLabel={lang.labelheight}
                    inputValue={state.cropSize.height}
                    onchangeInput={(e) => onChangeSize("height", e.target.value)}
                    withCounter
                    decrement={() => increment("height", false)}
                    increment={() => increment("height", true)}
                    inputClassname={"crop-increment"}
                />
                <MoleculeInput inputLabel={lang.labelwidth}
                    inputValue={state.cropSize.width}
                    onchangeInput={(e) => onChangeSize("width", e.target.value)}
                    withCounter
                    decrement={() => increment("width", false)}
                    increment={() => increment("width", true)}
                    inputClassname={"crop-increment"}
                />
            </div>
            <div className='container-btn-validation container-margin flex justify-space-between mt-4'>
                <Button className={`'btn-validation-modal ' ${state.listImages.length > 0 ? "vis-hidden" : ""}`}
                    onClick={() => setState({ ...state, index: state.index - 1, src: state.listImages[state.index - 1] })}
                    text={lang.prev}
                    disabled={state.index === 0}
                    type='filter'
                />
                <Button className='btn-validation-modal btn-crop'
                    onClick={() => submit()}
                    type="primary"
                    text={state.listImages.length - 1 === state.index ? lang.done : lang.next}
                />
            </div>
        </Modal>
    )
}