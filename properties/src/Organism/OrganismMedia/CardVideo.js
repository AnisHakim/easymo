import { Tooltip, Iframe, Img, Icon, Spinner } from '@easymo/designSystem';
const style = {
    cursor: "move",
};
export default function CardVideo({ el, listAction, index, getIcon, onClick, moveCard, id, imgCard, src, handleClickIcon, isFeatured, ...props }) {
    function renderIndex(index) {
        if (index < 10)
            return '#0' + (index + 1)
        return '#' + (index + 1)
    }
    function getIconClassName() {
        const classNames = ["absolute", "icon-star-img-media-container", "icon-star-img-media"]
        if (isFeatured) {
            classNames.push('bg-yellow')
        }
        return classNames.join(' ')
    }
    return <div className={props.className}>
        <div
            className='card-media'
            style={style}
        >
            <div className='flex w-100'>
                {imgCard ? <div className='relative  w-100'>
                    <span className='absolute mt-3 ml-3 number-img-media text-center'>{renderIndex(index)}</span>
                    <div className='absolute icon-star-img-media-container' >
                        <Icon icon={!isFeatured ? 'star_outlined' : 'star'} onClick={handleClickIcon} className={getIconClassName()} />
                    </div>
                    <div className='img-media w-100 flex item-center justify-center'>
                        {src ? <Img src={src} className='img-media w-100' /> : <Spinner className={"mt-4"} />}
                    </div>
                </div>
                    : <Iframe className='iframe-media'
                        src={el.videoLink} />}
            </div>
            <div className='p-3 row text-center'>
                {listAction.map(element =>
                    <div className={'col ' + element.colClassName}>
                        <Tooltip
                            onClick={() => onClick(index, el, element.onClick)}
                            tooltipText={element.tooltipText}
                            icon={element.icon ? element.icon : getIcon(index, el)}
                            iconClassname={element.iconClassname}
                        />
                    </div>
                )}
            </div>
        </div>
    </div>
}