import React from 'react'
import TemplateModalHistoriqueActivite from '../../Template/TemplateModalActivite/TemplateModalHistoriqueActivite'

function ModalHistoriqueActivite(props) {
    return (
        <TemplateModalHistoriqueActivite
            title={props.title}
            show={props.show}
            onHide={props.onHide}
        />
    )
}

export default ModalHistoriqueActivite