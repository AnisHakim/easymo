import { Text, Icon, Button } from '../../Atoms'
import propTypes from 'prop-types';
import translator from '../../lang/translator'
const lang = translator('fr')
MoleculeDrawer.propTypes = {
    pageClassName: propTypes.string,
    className: propTypes.string,
    open: propTypes.bool,
    onClose: propTypes.any,
    onClickFooterButton: propTypes.any,
    direction: propTypes.string,
    headerClass: propTypes.string,
    footerClass: propTypes.string,
    textButton: propTypes.string,
    headerContent: propTypes.node,
    footerContent: propTypes.node,
    disabledButton: propTypes.bool,
    fixHeader: propTypes.bool,
    fixFooter: propTypes.bool,
    fixContent: propTypes.bool,
};
MoleculeDrawer.defaultProps = {
    pageClassName: null,
    className: null,
    open: false,
    onClose: null,
    direction: 'right',
    headerClass: 'filter-draw-header',
    drawerType: 'filter',
    headerContent: null,
    footerContent: null,
    drawerContentStyle: 'filter-drawer-content',
    footerClass: 'filter-drawer-footer',
    textButton: lang.appliquer,
    onClickFooterButton: null,
    disabledButton: false,
    fixHeader: true,
    fixFooter: true,
    fixContent: true,
}

function MoleculeDrawer(props) {
    const pageClassName = ['container-drawer-page', "flex"]
    if (props.direction === "top" || props.direction === 'bottom') {
        pageClassName.push('flex-direction-col')
    }
    if (props.pageClassName) {
        pageClassName.push(props.pageClassName)
    }
    const className = ['container-drawer']
    if (props.direction === 'right') {
        className.push('right-draw')
        className.push('slide-left')
    }
    if (props.direction === 'left') {
        className.push('left-draw')
        className.push('slide-right')
    }
    if (props.className) {
        className.push(props.className)
    }
    function renderSide() {
        return <div style={{ flexGrow: 1, background: "transpant" }} onClick={props.onClose} />
    }
    if (!props.open) {
        return null
    }
    return <div className={pageClassName.join(' ')} >
        {(props.direction === "right" || props.direction === "bottom") && renderSide()}
        <div className={className.join(' ')}>
            {props.fixHeader && <div className={props.headerClass} >
                {props.drawerType === 'filter'
                    ?
                    <>
                        <Text text='Filtres et options' type='h4' />
                        <Icon onClick={props.onClose} icon='clear' />
                    </>
                    :
                    props.headerContent

                }
            </div>}
            {props.fixContent ? <div className={'drawer-content ' + props.drawerContentStyle} >
                {props.children}
            </div> : props.children}
            {props.fixFooter && <div className={props.footerClass}>
                {props.drawerType === 'filter'
                    ?
                    <>
                        <Button
                            disabled={props.disabledButton}
                            onClick={props.onClickFooterButton}
                            text={props.textButton} />
                    </>
                    :
                    props.footerContent

                }
            </div>
            }
        </div>
        {(props.direction === "left" || props.direction === "top") && renderSide()}
    </div>
}

export default MoleculeDrawer
