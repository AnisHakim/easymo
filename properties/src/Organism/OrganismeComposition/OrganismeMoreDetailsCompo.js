import React from 'react';
import { Text, Icon, CheckBox, formatInputNumber } from "@easymo/designSystem";
import translator from "../../lang/translator";
const lang = translator('fr')
function OrganismeMoreDetailsCompo(props) {
    return <div className='top-border-container' >
        <Text text={`${lang.infoSupplementaire} :`} type='' className='text-black-50 bolder-txt-14 mb-3' />
        <div className='row' >
            <div className='col-sm-3' >
                <div className='flex' >
                    <div className='w-132' >
                        <Text text={`${lang.length} :`} type='' className='text-black-50 mb-0 txt-13-normal p-array' />
                    </div>
                    <div className='' >
                        <Text text={`${formatInputNumber(props.data.length, lang.localNumber)} ${lang.m}`} type='' className='text-black-50 mb-0 txt-13-normal p-array' />
                    </div>
                </div>
                <div className='flex' >
                    <div className='w-132' >
                        <Text text={`${lang.width} :`} type='' className='text-black-50 mb-0 txt-13-normal p-array' />
                    </div>
                    <div className='' >
                        <Text text={`${formatInputNumber(props.data.width, lang.localNumber)} ${lang.m}`} type='' className='text-black-50 mb-0 txt-13-normal p-array' />
                    </div>
                </div>
                <div className='flex' >
                    <div className='w-132' >
                        <Text text={`${lang.height} :`} type='' className='text-black-50 mb-0 txt-13-normal p-array' />
                    </div>
                    <div className='' >
                        <Text text={`${formatInputNumber(props.data.height, lang.localNumber)} ${lang.m}`} type='' className='text-black-50 mb-0 txt-13-normal p-array' />
                    </div>
                </div>

            </div>
            <div className='col-sm-9 lef-border-col' >
                <div className='flex' >
                    <div className='w-189' >
                        <Text text={`${lang.habitable} :`} type='' className='text-black-50 txt-13-normal mb-0 p-array' />
                    </div>
                    <div className='p-array flex' >
                        <CheckBox
                            className={props.data.Habitable ? 'opacity-05 check-16' : 'check-16'}
                            checked={props.data.Habitable}
                        />
                        <Text text={props.data.Habitable ? lang.oui : lang.non} type='' className='ml-2 mb-0 text-black-50 txt-13-normal' />
                    </div>
                </div>
                <div className='flex' >
                    <div className='w-189' >
                        <Text text={`${lang.etatGeneral} :`} type='' className='text-black-50 txt-13-normal mb-0 p-array ' />
                    </div>
                    <div className='' >
                        <div className='flex p-array' >
                            {[...Array(5).keys()].map((index) => {
                                return (
                                    <div
                                        key={index}
                                        className="stars"
                                    >
                                        <Icon
                                            icon={index + 1 <= props.data.status ?
                                                'star' : 'star_outlined'}
                                            className="star"
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className='flex' >
                    <div className='w-189' >
                        <Text text={`${lang.commentaireEtat} :`} type='' className='text-black-50 mb-0 txt-13-normal p-array' />
                    </div>
                    <div className='' >
                        <Text text={`${props.data.comment}`} type='' className='text-black-50 mb-0 txt-13-normal p-array' />
                    </div>
                </div>
            </div>

        </div>
    </div>
        ;
}

export default OrganismeMoreDetailsCompo;
