import { Icon } from "../../Atoms"
import translator from "../../lang/translator"
import { Select, MoleculeInput } from "../../Molecules"
const lang = translator('fr')
MoleculeGrpInput.defaultProps = {
    onChangeSelect: null,
    selectError: '',
    isValid: false,
    isInValid: false,
    selectClassName: '',
    valueSelect: '',
    option: [],
    withSelect: true,
    placeHolderInput: '',
    inputClassName: '',
    onchangeInput: null,
    inputValue: '',
    isValidInput: false,
    isInvalidInput: false,
    inputError: '',
    containerInput: '',
    containerInputGrp: '',
    suffix: '€',
    withSuffixe: true,
    isOptionwithIcon: false,
    placeholderSelect: ''
}

function MoleculeGrpInput(props) {
    return (
        <div className={props.containerInputGrp + ' flex'} >
            {
                props.withSelect &&
                <Select
                    className={`${props.selectClassName} select-grp`}
                    options={props.option}
                    onChange={props.onChangeSelect}
                    inputError={props.selectError}
                    isValid={props.isValid}
                    isInvalid={props.isInValid}
                    value={props.valueSelect}
                    isOptionwithIcon={props.isOptionwithIcon}
                    placeholder={props.placeholderSelect}
                />
            }
            <MoleculeInput
                placeholder={props.placeHolderInput}
                inputClassname={`${props.withSelect ? 'with-select' : 'no-select'} ${props.withSuffixe ? '' : 'no-suffixe'} ${props.inputClassName}`}
                containerClassName={props.containerInput}
                onchangeInput={props.onchangeInput}
                inputValue={props.inputValue}
                isValid={props.isValidInput}
                isInvalid={props.isInvalidInput}
                inputError={props.inputError}
            />
            {
                props.withSuffixe &&
                <div className="suffix-grp-input" >
                    {props.suffix}
                </div>
            }
        </div>
    )
}

export default MoleculeGrpInput
