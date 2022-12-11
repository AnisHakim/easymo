import { Modal, Text, Icon, Green, GreyPoint, Button, formatNumber } from "@easymo/designSystem";
import { useEffect, useState } from "react";
import lang from "../../lang/fr";
import { NavLink } from 'react-router-dom'
import moment from 'moment'
import { displayLabel, optionsWithColor, setDropDownColorAndText } from "../../data/data";
function OrganismeHistoriqueModal(props) {

    const [isAffiche, setAffiche] = useState(true)
    const [perPage, setPerPage] = useState(3)
    const [data, setData] = useState([])
    const onChangeFilter = () => {
        setAffiche(!isAffiche)
    }
    const language = 'fr'
    const getMoreResult = () => {
        let newPerPage = perPage < data?.length ? perPage + 3 : data?.length
        setPerPage(newPerPage)
    }
    useEffect(() => {
        if (props?.prix) {
            let originData = isAffiche ? [...props?.prixAffiche] : [...props?.prixSouhaite]
            let afficheData = originData
            afficheData = afficheData.map(el => { return { value: el?.value, createdAt: el?.createdAt, createdBy: el?.createdAt?.lengt ? el?.createdBy[0]?.firstName : null } })
            setData(afficheData)
        } else {
            setData(props.data)
        }
    }, [isAffiche])
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            centered={true}
            dialogClassName={'modal-historique'}
            contentClassName={'modal-historique-content'}
        >
            <>
                <div className="modal-historique-header" >
                    <Text text={props.title} type='h4' />
                    <div className="close-modal-historique-container" >
                        <Icon className='close-modal-historique-icon' icon='clear' onClick={props.onHide} />
                    </div>
                </div>
                <div className="modal-historique-body" >
                    {
                        props?.prix &&
                        <div className="price-filter-historique" >
                            <div onClick={onChangeFilter} className={`btn-filter-historique-first btn-filter-historique ${isAffiche ? 'active' : ''}`}>
                                {lang.prixAffiche}
                            </div>
                            <div onClick={onChangeFilter} className={`btn-filter-historique ${isAffiche ? '' : 'active'}`}>
                                {lang.prixSouhait}
                            </div>
                        </div>
                    }
                    <div className=" historique-content" >
                        {data?.filter((item, i) => i < perPage).map((el, i) => <div key={i}>
                            <div className="flex flex-direction-column" >
                                {
                                    props.prix ?
                                        <Text text={`${moment(el?.createdAt).locale(language).format('dddd')}, ${moment(el?.createdAt).locale(language).format('LL')} ${lang.à} ${moment(el?.createdAt).locale(language).format('LT')}`}

                                            type='' className='historique-date' />
                                        :
                                        <Text text={`${moment(el?.date).locale(language).format('dddd')}, ${moment(el?.date).locale(language).format('LL')} ${lang.à} ${moment(el?.date).locale(language).format('LT')}`}

                                            type='' className='historique-date' />
                                }
                                <div className="flex item-center" >
                                    <div>
                                        <div className="left-icon-border" ></div>
                                        <span className="color-historique-point" >
                                            <span className={props?.prix ? "point" : "point-color"} style={{ background: props?.prix ? GreyPoint : setDropDownColorAndText(el?.status, lang, props.propertie?.forSale)?.dropDownColor }} ></span>
                                        </span>
                                        <div className="left-icon-border second" ></div>
                                    </div>
                                    <div>
                                        <div className="flex item-center" >
                                            {
                                                props.prix ?
                                                    <Text text={el?.value && formatNumber(Number(el?.value), props?.devise, lang.localNumber)} className='second-title-historique' type='h5' />
                                                    :
                                                    <Text text={displayLabel(el?.status, optionsWithColor(props.propertie?.forSale))} className='second-title-historique' type='h5' />
                                            }
                                            {!props.prix && el?.to?.length !== 0 &&
                                                <NavLink className={'receiver-name'} to="#">
                                                    <div> {lang.à} </div>   <div className="capitalize" >{el?.to[0]?.firstName}</div>
                                                </NavLink>
                                            }
                                        </div>{
                                            props.prix ?
                                                <Text text={`${lang.par} ${el?.createdBy}`} type='' className='by-subtitle' />
                                                :
                                                el?.createdBy?.lengt ? <Text text={`${lang.par} ${el?.createdBy[0]?.firstName}`} type='' className='by-subtitle' /> : null

                                        }
                                    </div>
                                </div>
                            </div>
                        </div>)}
                    </div>
                    {perPage < data?.length && <Button onClick={getMoreResult} className='more-result-btn' icon='refresh' text={lang.plusResult} />}
                </div>
            </>
        </Modal>
    )
}

export default OrganismeHistoriqueModal
