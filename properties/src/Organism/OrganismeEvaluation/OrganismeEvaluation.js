import React, { useEffect, useState } from 'react'
import { MoleculeInput, Collapse, Icon, viewLabel } from "@easymo/designSystem";
import translator from "../../lang/translator";
import { apiUpdateRating } from '../../Api/Properties/properties';
import { renderIconTooltipObject } from '../../data/data';
function OrganismeEvaluation(props) {
    const lang = translator('fr')
    const [isUpdated, setUpdated] = useState(false)
    const renderStateObject = (evaLabel, evalIcon, isEvalVisible, isDescriptionvisible, status, placeHolder, commentaire) => {
        return {
            evaLabel: evaLabel,
            evalIcon: evalIcon,
            isEvalVisible: isEvalVisible,
            isDescriptionvisible: isDescriptionvisible,
            status: status,
            placeHolder: placeHolder,
            commentaire: commentaire
        }
    }
    const [state, setState] = useState([
        {
            firstLabel: lang.noteInterne,
            firstListIcon: [
                renderIconTooltipObject("lock_outlined", true, lang.mandatTooltip, 'mb-3')
            ],
            ...renderStateObject(lang.evoPerso, false, true, true, { value: 0, hover: 0 }, lang.exSuperMaison, '')
        },
        {
            firstLabel: lang.notePubliques,
            ...renderStateObject(lang.etatGeneral, true, true, true, { value: 0, hover: 0 }, lang.exBonEtat, '')
        },
        renderStateObject(lang.etatToiture, true, true, true, { value: 0, hover: 0 }, lang.exBonEtat, ''),
        renderStateObject(lang.etatChassis, true, true, true, { value: 0, hover: 0 }, lang.exBonEtat, ''),
        renderStateObject(lang.etatSol, true, true, true, { value: 0, hover: 0 }, lang.exBonEtat, ''),
        renderStateObject(lang.etatIsolation, true, true, true, { value: 0, hover: 0 }, lang.exBonEtat, ''),
        renderStateObject(lang.etataDeFacade, true, true, true, { value: 0, hover: 0 }, lang.exBonEtat, ''),
        renderStateObject(lang.etataCommun, true, true, true, { value: 0, hover: 0 }, lang.exBonEtat, ''),
        renderStateObject(lang.evalEnvironnement, true, true, true, { value: 0, hover: 0 }, lang.exQuartierResidentiel, ''),
        renderStateObject(lang.evalSonore, true, true, true, { value: 0, hover: 0 }, lang.exEnvCalme, ''),
        renderStateObject(lang.evalStanding, true, true, true, { value: 0, hover: 0 }, lang.exProprietePrestige, ''),
        renderStateObject(lang.evalLuminosité, true, true, true, { value: 0, hover: 0 }, lang.exGrandeBaies, ''),

    ])
    useEffect(() => {
        if (props.propertie?.rating) {
            let rating = [
                'personalRating',
                'generalStatus',
                'roofStatus',
                'frameStatus',
                'floorStatus',
                'isolationStatus',
                'frontStatus',
                'commonStatus',
                'environmentRate',
                'soundRate',
                'standingRate',
                'brightnessRate'
            ]
            let newState = [...state]
            for (let index = 0; index < newState.length; index++) {
                const element = newState[index];
                element.status.value = props.propertie?.rating[rating[index]]?.rate
                element.isEvalVisible = props.propertie?.rating[rating[index]]?.isRateVisible
                element.isDescriptionvisible = props.propertie?.rating[rating[index]]?.isCommentVisible
                element.commentaire = props.propertie?.rating[rating[index]]?.comment ? props.propertie?.rating[rating[index]].comment : ''

            }
            setState(newState)
        }
    }, [props.isPropertieLoaded])
    useEffect(() => {
        isUpdated && updateRating()

    }, [props.isCallAPi])

    const defineRatingObject = (index) => {
        return {
            rate: state[index].status.value,
            comment: state[index].commentaire !== '' ? state[index].commentaire : null,
            isRateVisible: state[index].isEvalVisible,
            isCommentVisible: state[index].isEvalVisible
        }
    }
    const updateRating = async () => {
        props.onChangeIdentificationError("evaluation", false)

        props.setLoader(true)

        const response = await apiUpdateRating(JSON.stringify({

            id: props.propertie?._id,
            personalRating: defineRatingObject(0),
            generalStatus: defineRatingObject(1),
            roofStatus: defineRatingObject(2),
            frameStatus: defineRatingObject(3),
            floorStatus: defineRatingObject(4),
            isolationStatus: defineRatingObject(5),
            frontStatus: defineRatingObject(6),
            commonStatus: defineRatingObject(7),
            environmentRate: defineRatingObject(8),
            soundRate: defineRatingObject(9),
            standingRate: defineRatingObject(10),
            brightnessRate: defineRatingObject(11),

        }));
        if (response.statusCode === 200) {
            setUpdated(false)
            props.dataUpdated("evaluation")
        } else {
            props.setLoader(false)
            props.onChangeIdentificationError("evaluation", true)
        }
    }
    const onHover = (index, i) => {
        let newState = [...state]
        newState[i].status.hover = index
        setState(newState)
        setUpdated(true)
    }
    const onClickStar = (index, i) => {
        let newState = [...state]
        newState[i].status.value = index
        setState(newState)
        setUpdated(true)
    }
    const onChangeVisible = (key, index) => {
        let newState = [...state]
        newState[index][key] = !state[index][key]
        setState(newState)
        setUpdated(true)
    }
    const onChangeInput = (e, index) => {
        let newState = [...state]
        newState[index].commentaire = e.target.value
        setState(newState)
        setUpdated(true)
    }
    return (
        <Collapse title={lang.evaluation} iconStart="star_half">
            {state.map((el, j) => <div key={j} className={`row ${j === 0 && 'mb - 4'}`} >
                {el.firstLabel && viewLabel({
                    label: el.firstLabel,
                    labelClass: 'mb-3 bold-black-txt-16',
                    listIcons: el.firstListIcon
                })}
                <div className='col-sm-4 md-3 mb-5' >
                    {
                        viewLabel({
                            label: el.evaLabel, listIcons: el.evalIcon ? [
                                {
                                    ...renderIconTooltipObject(state[j].isEvalVisible ? 'visible_outlined' : 'hidden_outlined', true, state[j].isEvalVisible ? lang.visibleTooltip : lang.hiddenTooltip, 'tooltip-icon-label'),
                                    onClick: () => onChangeVisible('isEvalVisible', j)
                                }
                            ] : []
                        })
                    }
                    <div className='flex' >
                        {[...Array(5).keys()].map((index) => {
                            return (
                                <div
                                    key={index}
                                    className="large-stars"
                                    onClick={() => onClickStar(index + 1, j)}
                                    onMouseEnter={() => onHover(index + 1, j)}
                                    onMouseLeave={() => onHover(0, j)}
                                >
                                    <Icon
                                        icon={index + 1 <= state[j].status.value || index + 1 <= state[j].status.hover ?
                                            'star' : 'star_outlined'}
                                        className="large-star yellow"
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='col-sm-5 md-4 mb-5' >
                    {
                        viewLabel({
                            label: lang.persoComment
                        })
                    }
                    <MoleculeInput
                        placeholder={el.placeHolder}
                        onchangeInput={(e) => onChangeInput(e, j)}
                        inputValue={el.commentaire}
                        inputClassname={'input-mandat'}
                    />
                </div>
            </div>

            )}
        </Collapse>
    )
}

export default OrganismeEvaluation
