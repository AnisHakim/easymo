import React from "react";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
function BasicModal(props) {
    const ref = React.useRef()
    const onHide = () => {
        if (props.onHideAnnimation) {
            const className = "fade modal show"
            ref.current.dialog.className = className + " modal-static"
            setTimeout(() => {
                ref.current.dialog.className = className
            }, 200);
        }
        else {
            props.onHide && props.onHide()
        }
    }

    return <Modal
        show={props.show}
        onHide={onHide}
        centered={props.centered}
        dialogClassName={props.dialogClassName}
        contentClassName={props.contentClassName}
        ref={ref}
    >
        {props.children}
    </Modal>
}
BasicModal.defaultProps = {
    onHide: null,
    show: false,
    centered: false,
    dialogClassName: null,
    contentClassName: null,
}
export default BasicModal