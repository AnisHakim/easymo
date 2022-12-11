import { Text } from '../../Atoms'
import propTypes from 'prop-types';
import translator from '../../lang/translator';
const lang = translator('fr')
MoleculeStepper.propTypes = {
    steps: propTypes.array,
    isStepperRegister: propTypes.bool,
    onClick: propTypes.any,
    index: propTypes.string,
    stepprType: propTypes.string,
    isClickable: propTypes.bool,
    className: propTypes.string,
    containerClassName: propTypes.string,
    textClassName: propTypes.string,
};
MoleculeStepper.defaultProps = {
    steps: [lang.email, lang.agence, lang.profile, lang.validation],
    isStepperRegister: true,
    onClick: null,
    index: 0,
    isClickable: true,
    stepprType: '',
};
function MoleculeStepper(props) {
    const onChooseStep = (value, index) => {
        props.onClick && props.onClick(value, index)
    }
    return (   
        <div className={`flex ${props.stepprType !== 'signUp' && 'xs-column'} ${props.stepprType === 'signUp' && 'justify-center'} ${props.containerClassName}`}>
            {
                props.steps.map((el, i) =>
                    < >
                        {props.stepprType === 'signUp'
                            ?
                            <div key={i} className='flex item-center stepper-item signUp' onClick={props.isClickable ? () => onChooseStep(el, i) : null} >
                                <span className={`stepper-number pointer ${props.index >= i && 'active'}`} >
                                    {i + 1}
                                </span>
                                {props.isStepperRegister ?
                                    props.index == i && <Text text={el} className={`stepper-txt signUp pointer mb-0 ${props.index >= i && 'active'}`} />
                                    :
                                    <div className='flex text-divider-container'>
                                        <Text text={el} className={`stepper-txt pointer ${props.index >= i && 'active'}`} />
                                        {i !== props.steps.length - 1 &&
                                            <div className='divider xs-none' ></div>
                                        }
                                    </div>
                                }
                            </div>
                            :
                            <div key={i} className={`flex item-center stepper-item w-100 ${props.className}`} onClick={props.isClickable ? () => onChooseStep(el, i) : null} >
                                <span className={`stepper-number pointer ${props.index >= i && 'active'} mr-0`} >
                                    {i + 1}
                                </span>
                                {props.isStepperRegister ?
                                    props.index == i && <Text text={el} className={`stepper-txt pointer mb-0 ${props.index >= i && 'active'}`} />
                                    :
                                    <div className='flex text-divider-container pl-3'>
                                        <Text text={el} className={`stepper-txt pointer ${props.textClassName} ${props.index >= i && 'active'}`} />
                                        {i !== props.steps.length - 1 &&
                                            <div className='divider xs-none' ></div>
                                        }
                                    </div>
                                }
                            </div>
                        }
                        {props.stepprType !== 'signUp' && <div className='divider-phone' ></div>}
                    </>
                )
            }
        </div>
    )
}

export default MoleculeStepper
