import React from "react";
import { Modal } from "react-bootstrap"
import { sorry } from "../../assets/svg/svg";
import { Button, Text, Icon } from "../../Atoms";
import { Green, Red } from "../../Colors";
import translator from "../../lang/translator";
const lang = translator('fr')
function ModalInfo(props) {
    return <Modal
        show={props.show}
        onHide={props.onHide}
        centered
    >
        <div className="">
            <div className="container-modal-confirmation content-modal-info flex justify-center flex-direction-col item-center text-center">
                {props.type === "error" ?
                    <div className="flex justify-center item-center flex-direction-col" >
                        <div className="close-modal-container" >
                            <Icon className='close-modal-icon' icon='clear' onClick={props.onHide} />
                        </div>
                        <div className="error-modal-logo" >
                            {sorry}
                        </div>
                        <Text type='h4' text={lang.limiteOffre} />
                        <Text type='h5' className="pt-0 text-limit-description" text={lang.passeToAbonnement} />
                        <Text type='h5' className="pt-0 text-limit-description-nbr" text={`${lang.maximumProp} ${3}`} />
                    </div>
                    :
                    <> <Icon icon={"checkmark_circle"} size="26px" color={props.type === "error" ? Red : Green} />
                        <Text text={props.description} type="h5" /></>}

            </div>
            {props.type === "error" &&
                <Button containerClassName='w-100 container-btn-offre' text={lang.decouvreOffre} iconRight icon='launch_vs_outlined' className='btn-offre' iconClassName='ml-2' />}

        </div>
    </Modal>
}
ModalInfo.defaultProps = {
    onSubmit: null,
    onHide: null,
    description: null,
    show: false,
    type: "error",
}
export default ModalInfo