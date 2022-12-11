import React from "react";
import { Modal } from "react-bootstrap"
import { Button, Text, Icon } from "../../Atoms";
import translator from "../../lang/translator";
const lang = translator('fr')
function ModalConfirmation(props) {
    return <Modal
        show={props.show}
        onHide={props.onHide}
        centered
    >
        <div className="container-modal-confirmation">
            <div className="header-modal-confirmation flex justify-center item-center">
                <Icon icon="warning" size="16px" />
                <Text text={props.confirm} type="h4" />
            </div>
            <div className="content-modal-confirmation flex justify-center">
                <Text text={props.textConfirm} type="h5" />
            </div>
            <div className="footer-modal-confirmation flex justify-flex-end">
                <Button text={lang.no} type="third"
                    icon="clear" containerClassName="mr-2"
                    iconClassName='btn-archived-properties'
                    className="btn-clear-modal-confirmation"
                    onClick={props.onHide}
                />
                <Button text={lang.yes} icon="done" onClick={props.onSubmit} />
            </div>
        </div>
    </Modal>
}
ModalConfirmation.defaultProps = {
    onSubmit: null,
    onHide: null,
    textConfirm: lang.textConfirm,
    confirm: lang.confirm,
    show: false
}
export default ModalConfirmation