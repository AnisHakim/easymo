import React from 'react';
import { Spinner } from 'react-bootstrap'

Spinnerr.defaultProps = {
    size: 'sm',
    animation: "border",
    className:'grey-spin'
};
function Spinnerr(props) {
    return <Spinner animation={props.animation} size={props.size} className={props.className} />

        ;
}

export default Spinnerr;
