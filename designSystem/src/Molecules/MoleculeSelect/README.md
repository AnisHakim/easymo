## Usage

# To use molecule of input (input with label or input with icon), just import it as described below:

import { InputMolecule } from '../../Molecules';

# Exemple input molecule ( input with icon and label)

      <Input
        inputLabel='Nom:'
        className='Form_Input_text2' // we can specify any className depending on the style
        icons={[
          <Icon
            icon='Valid'
            color='#000000'
            size='12px'
            className='First_Icon_Input_With_Label' // we con specify any className depending on the style
            // onClick={() => }
          />
        ]}
      />

# other props to pass

as: type input (default it takes input)
disabled: Make the control disabled (type:boolean)
isInvalid: Add "invalid" validation styles to the control and accompanying label (type:boolean)
isValid: Add "valid" validation styles to the control (type:boolean)
className: apply a style css
onChange: A callback fired when the value changed (type:function)
readOnly: Make the control readonly (type:boolean)
value: The value attribute of underlying input (type:string | json)
bsPrefix: change default class of input( default :form-control) (type:string)
id: unique identifier of control (type:string)
placeholder: placeholderof control (type:string)
defaultValue: default value of conrtrol (type:string)
onClick: A callback fired when the value changed (type:function)
checked: value of control (type:boolean)
feedback: Display feedback as a tooltip (type:boolean)
feedbackTooltip: {props.feedbackTooltip}
label: Label for the control (type:string | node)
type: The type of checkable (type:string) (value:'radio' | 'checkbox' | 'switch')
containerClassname: apply a style css,
labelClassName: apply a style css for label,
inputLabel: enter name of field,
icons: enter a list of icons,
ErrorMsg: define msg error when input fiels is wrong ,
ErrorMsgClassName: syle of error msg
options:list of options for select control
