import { RenderFile } from "../../Molecules"
import BasicModal from "../BasicModal/BasicModal";

export default function ModalFile(props) {
    return <BasicModal
        show={props.show}
        onHide={props.onHide}
        dialogClassName={" content-modal-file"}
    >
        <div className="w-100 container-modal-file">
            <RenderFile fileId={props.fileId} />
        </div>
    </BasicModal>
}