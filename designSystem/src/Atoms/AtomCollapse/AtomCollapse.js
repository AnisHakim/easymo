import React from 'react';
import { Accordion } from 'react-bootstrap'
import { TextIcon } from '../../Molecules'
import propTypes from 'prop-types';
AtomCollapse.propTypes = {
    collapseStyle: propTypes.string,
    title: propTypes.string,
    type: propTypes.string,
    textclassName: propTypes.string,
    withStartIcon: propTypes.bool,
    withEndIcon: propTypes.bool,
    iconStart: propTypes.string,
    iconEnd: propTypes.string,
    iconStartClass: propTypes.string,
    iconEndClass: propTypes.string,
    containerClassName: propTypes.string,
};
AtomCollapse.defaultProps = {
    collapseStyle: 'default-collapse',
    textclassName: '',
    title: 'title',
    type: 'h4',
    withStartIcon: true,
    withEndIcon: true,
    iconStart: 'pen',
    iconEnd: 'chevron_down',
    iconStartClass: 'iconStartCollapse',
    iconEndClass: 'collapseChevron',
    containerClassName: 'w-100',
    customizeHeader: false,
    renderCustomizeHeader: null
};

function AtomCollapse(props) {

    return (
        <Accordion className={props.collapseStyle} defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    <div>
                        <TextIcon
                            text={props.title}
                            withStartIcon={props.withStartIcon}
                            iconStart={props.iconStart}
                            iconStartClass={props.iconStartClass}
                            textclassName={props.textclassName}
                            type={props.type}
                            withEndIcon={props.withEndIcon}
                            iconEnd={props.iconEnd}
                            iconEndClass={props.iconEndClass}
                            containerClassName={props.containerClassName}
                        />
                    </div>
                    {/* <div className='customise-header'>
                        {props.customizeHeader && props.renderCustomizeHeader()}

                    </div> */}
                </Accordion.Header>
                <Accordion.Body>
                    {props.children}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default AtomCollapse;
