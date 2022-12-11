
import propTypes from 'prop-types';
import { useState } from 'react';
import TextIcon from '../MoleculeTextIcon/MoleculeTextIcon'
import { Switch, Text } from '../../Atoms'
import translator from '../../lang/translator'
import { Dropdown } from 'react-bootstrap'
import ClickAwayListener from 'react-click-away-listener';
const lang = translator('fr')
MoleculeDropDownBtn.propTypes = {
    className: propTypes.string,
    classNameImg: propTypes.string,
    textclassName: propTypes.string,
    iconStart: propTypes.string,
    iconEndClass: propTypes.string,
    iconStartClass: propTypes.string,
    iconEnd: propTypes.string,
    text: propTypes.string,
    type: propTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
    src: propTypes.any,
    alt: propTypes.string,
    onClick: propTypes.any,
    onPickItem: propTypes.any,
    onClickContainer: propTypes.any,
    color: propTypes.string,
    typeImg: propTypes.string,
    containerDropClass: propTypes.string,
    withImg: propTypes.bool,
    withcolor: propTypes.bool,
    withStartIcon: propTypes.bool,
    withEndIcon: propTypes.bool,
    animated: propTypes.bool,
    options: propTypes.array,
    dropDownListStyle: propTypes.string,
    containerClassName: propTypes.string,
    dropItemContainer: propTypes.string,
    dropdownBtnColor: propTypes.string,
    dropdownBtn: propTypes.string,
    svg: propTypes.bool,
    dropType: propTypes.string,
    withSVG: propTypes.bool,
    inTab: propTypes.bool,
    onChangeSwitch: propTypes.any,
};
MoleculeDropDownBtn.defaultProps = {
    className: '',
    classNameImg: 'img-txt-logo',
    textclassName: '',
    text: 'text',
    type: 'h4',
    src: '',
    alt: '',
    onClick: null,
    onClickContainer: null,
    typeImg: 'avatar',
    color: 'redpoint',
    withImg: false,
    withcolor: false,
    withStartIcon: false,
    withEndIcon: true,
    iconStart: '',
    iconEnd: 'chevron_down',
    iconEndClass: 'iconStartClass',
    iconStartClass: 'iconStartClass',
    options: [
        {
            title: 'Téléchargement',
            details:
                [
                    { text: 'blue' }
                ]
        },
        {
            title: 'Téléchargement',
            details:
                [
                    { text: 'blue' }
                ]
        }
    ],
    dropDownListStyle: '',
    animated: false,
    containerClassName: '',
    dropItemContainer: '',
    dropdownBtn: '',
    dropdownBtnColor: '',
    containerDropClass: '',
    onPickItem: null,
    svg: false,
    dropType: '',
    onChangeSwitch: null,
    clickAway: true,
    withSVG: false,
    inTab: false,
};
function MoleculeDropDownBtn(props) {
    const [index, setIndex] = useState({ titleIndex: '', detailIndex: '' })
    const onChooseItem = (item, i, index) => {
        props.onPickItem && props.onPickItem(item, i)
        setIndex({ titleIndex: index, detailIndex: i })

    }
    const handleClickAway = () => {
        setIndex({ titleIndex: '', detailIndex: '' })
    }
    const onChangeSwitch = (value, i, key) => {
        props.onChangeSwitch && props.onChangeSwitch(value, i, key)
    }
    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Dropdown onClick={handleClickAway} style={{ position: props.inTab ? 'inherit' : 'relative' }} autoClose={props.dropType !== 'switch' ? 'auto' : "outside"}>
                <Dropdown.Toggle variant='none' className={` ${props.dropdownBtn}`} style={{ backgroundColor: props.dropdownBtnColor }} id="dropdown-basic">
                    {
                        props.withSVG
                            ?
                            <div onClick={props.onClick} className={props.classNameImg} >
                                {props.src}
                            </div>
                            :
                            <TextIcon
                                text={props.text}
                                type={props.type}
                                textclassName={props.textclassName}
                                src={props.src}
                                alt={props.alt}
                                withImg={props.withImg}
                                onClick={props.onClick}
                                classNameImg={props.classNameImg}
                                typeImg={props.typeImg}
                                withcolor={props.withcolor}
                                color={props.color}
                                withStartIcon={props.withStartIcon}
                                iconStart={props.iconStart}
                                iconStartClass={'mr-1 ' + props.iconStartClass}
                                withEndIcon={props.withEndIcon}
                                iconEnd={props.iconEnd}
                                iconEndClass={'ml-5px ' + props.iconEndClass}
                                containerClassName={props.containerClassName}
                            />
                    }
                </Dropdown.Toggle>

                <Dropdown.Menu style={props.animated && { marginTop: '45px', marginBottom: '45px' }} className={`${props.animated && 'slideInUp'} dropdown-list ${props.dropDownListStyle}`}>
                    {
                        props.dropType !== 'switch' ?
                            props.options.map((el, position) =>
                                <div key={position} className={`${(el.title && position !== props.options.length - 1) || el.withBorder ? 'grey-bottom-border pb-2' : ''}`} >
                                    {el.title &&
                                        <div className='drop-down-header' >
                                            {el.title}
                                        </div>
                                    }
                                    <div >
                                        {

                                            el.details.map((item, i) =>
                                                <Dropdown.Item key={i} className={`dropDow-item-container ${((!el.title && index.detailIndex === i && index.titleIndex === position) || item.isActive || item.text === props.text) && 'active'} `} onClick={() => onChooseItem(item, i, position)} >
                                                    <TextIcon
                                                        containerClassName={'dropDow-item-container--item ' + props.dropItemContainer + item.textclassName}
                                                        text={item.text}
                                                        type={item.type}
                                                        textclassName={item.textclassName}
                                                        withImg={item.withImg}
                                                        src={item.src}
                                                        alt={item.alt}
                                                        onClick={item.onClick}
                                                        classNameImg={'drop-icon-start ' + item.classNameImg}
                                                        typeImg={item.typeImg}
                                                        withcolor={item.withcolor}
                                                        color={item.color}
                                                        withStartIcon={item.withStartIcon}
                                                        iconStart={item.iconStart}
                                                        iconStartClass={'drop-icon-start iconStartClass-size ' + item.iconStartClass}
                                                        withEndIcon={item.withEndIcon}
                                                        iconEnd={item.iconEnd}
                                                        iconEndClass={'ml-5px ' + item.iconEndClass}
                                                        svg={item.svg}
                                                        onClickContainer={item.onClickContainer}
                                                    />
                                                </Dropdown.Item>
                                            )
                                        }
                                    </div>
                                </div>
                            )
                            :
                            <div  >
                                <div className='drop-filterTab-header' >
                                    <Text text={lang.afficherMasquer} type='h5' className='pl-3' />
                                </div>
                                <div className='drop-filterTab-options' >
                                    {
                                        props.options.map((el, i) =>
                                            <Dropdown.Item key={i} className='drop-filterTab-item' >
                                                <Text text={el.text} type='h5' />
                                                <Switch
                                                    onChange={() => onChangeSwitch(el.checked, i, el.key)}
                                                    checked={el.checked}
                                                />
                                            </Dropdown.Item>)}
                                </div>
                            </div>
                    }
                </Dropdown.Menu>
            </Dropdown>
        </ClickAwayListener>
    )
}

export default MoleculeDropDownBtn