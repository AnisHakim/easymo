import { Text, Icon, Img } from '../../Atoms'
import propTypes from 'prop-types';
import { Red } from '../../Colors/index'
import { NavLink } from 'react-router-dom'
MoleculeTextIcon.propTypes = {
    className: propTypes.string,
    classNameImg: propTypes.string,
    textclassName: propTypes.string,
    color: propTypes.string,
    iconStart: propTypes.string,
    iconEndClass: propTypes.string,
    iconStartClass: propTypes.string,
    iconEnd: propTypes.string,
    text: propTypes.string,
    type: propTypes.oneOf(['', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
    src: propTypes.any,
    alt: propTypes.string,
    onClick: propTypes.any,
    onClickContainer: propTypes.any,
    typeImg: propTypes.string,
    containerClassName: propTypes.string,
    withImg: propTypes.bool,
    withcolor: propTypes.bool,
    withStartIcon: propTypes.bool,
    withEndIcon: propTypes.bool,
    svg: propTypes.bool,
    linkText: propTypes.bool,
    showLoading: propTypes.bool,
    href: propTypes.string,
    navLink: propTypes.bool
};
MoleculeTextIcon.defaultProps = {
    className: '',
    classNameImg: 'img-txt-logo',
    textclassName: '',
    text: '',
    type: 'h4',
    src: '',
    alt: '',
    onClick: null,
    onClickContainer: null,
    typeImg: 'avatar',
    withImg: false,
    withcolor: false,
    withStartIcon: true,
    withEndIcon: false,
    iconStart: '',
    iconEnd: '',
    iconEndClass: 'iconStartClass',
    iconStartClass: 'iconStartClass',
    containerClassName: '',
    color: Red,
    svg: false,
    linkText: false,
    showLoading: false,
    href: '',
    navLink: false
};
function MoleculeTextIcon(props) {
    return (
        <div onClick={props.onClickContainer} className={'flex justify-center item-center pointer ' + props.containerClassName} >
            {
                props.withImg ?
                    !props.svg ?
                        <Img
                            src={props.src}
                            alt={props.alt}
                            onClick={props.onClick}
                            className={props.classNameImg}
                            type={props.typeImg}
                        />
                        :
                        props.src
                    :
                    props.withcolor ?
                        <span className={'color-span-text'} style={{ backgroundColor: props.color }} ></span>
                        :
                        props.withStartIcon ?
                            <Icon icon={props.iconStart} className={props.iconStartClass} />
                            : null
            }
            {
                props.linkText
                    ?
                    <a href={props.href} className={'mb-0 ' + props.textclassName} >
                        {props.text}
                    </a>
                    :
                    props.navLink ?
                        props.menuNavLink(props.href, props.text, props.textclassName)
                        :
                        <Text
                            text={props.text}
                            type={props.type}
                            className={'mb-0 ' + props.textclassName}
                            showLoading={props.showLoading}
                        />
            }
            {props.withEndIcon ? <Icon icon={props.iconEnd} className={props.iconEndClass} /> : null}
        </div>
    )
}

export default MoleculeTextIcon
