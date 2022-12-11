import propTypes from 'prop-types';
import { Icon } from '../../Atoms'
import { Tooltip, Overlay } from "react-bootstrap"
import { useEffect, useRef, useState } from 'react';
import * as uuid from 'uuid'
MoleculeTooltip.propTypes = {
    tooltipClassName: propTypes.string,
    backgroundColor: propTypes.string,
    tooltipText: propTypes.string,
    iconClassname: propTypes.string,
    className: propTypes.string,
    icon: propTypes.string,
    place: propTypes.string,
    text: propTypes.string,
    element: propTypes.any,
    onClick: propTypes.any,
    withIcon: propTypes.bool,
    multiline: propTypes.bool,
    isClickable: propTypes.bool
};
MoleculeTooltip.defaultProps = {
    tooltipClassName: '',
    backgroundColor: '',
    tooltipText: '',
    iconClassname: '',
    icon: 'help_outlined',
    onClick: null,
    place: 'top',
    text: '',
    withIcon: true,
    multiline: true,
    isClickable: false,
    className: ''
};


function MoleculeTooltip(props) {
    const [show, setShow] = useState(false);
    const [containerId, setcontainerId] = useState(uuid.v4());
    const [tooltipId, settooltipId] = useState(uuid.v4());
    const target = useRef(null);
    const { tooltipText } = props
    const bsPrefix = []
    if (props.place !== "top") {
        bsPrefix.push("custom-tooltip")
    }
    if (props.tooltipClassName) {
        bsPrefix.push(props.tooltipClassName)
    }
    useEffect(() => {
        let tooltip = document.getElementById(containerId);

        if (!props.isClickable) {
            tooltip.addEventListener("mouseenter", function (event) {
                setShow(true)
            }, false);
        }
        tooltip.addEventListener("mouseleave", function (event) {
            setShow(false)
        }, false);
        return () => {
            tooltip.removeEventListener("mouseenter", () => { })
            tooltip.removeEventListener("mouseleave", () => { })
        }
    }, [])
    bsPrefix.push('tooltip')
    if (!containerId) return null
    return (
        < >
            <div id={containerId} ref={target} onClick={() => props.isClickable && setShow(!show)}>
                {
                    props.withIcon
                        ?
                        <Icon size={props.iconSize}
                            icon={props.icon}
                            data-tip={props.tooltipText}
                            onClick={props.onClick}
                            className={props.iconClassname}
                            color={props.iconColor}
                            ref={target}

                        />
                        : props.element ?
                            props.element()
                            :
                            <div data-tip={props.tooltipText} onClick={props.onClick} ref={target} id={containerId}>
                                {props.text}
                            </div>
                }
            </div>
            {tooltipText && <Overlay target={target.current} show={show} placement={props.place}>
                {(rest) => (
                    <Tooltip id={tooltipId}
                        {...rest}
                        placement={props.place}
                        bsPrefix={bsPrefix.join(' ')}
                        className={props.className}

                    >
                        {tooltipText}
                    </Tooltip>
                )}
            </Overlay>
            }
        </>
    )
}

export default MoleculeTooltip