import React, { useState, useEffect } from 'react';
import Select, { components, NoticeProps } from 'react-select';
import { Button, Icon, Img, Text } from "../../Atoms"
import translator from '../../lang/translator';
import { BlackText, ButtonBlue, DarkBlue, Grey, InputFilterBorder } from '../../Colors';
import MoleculeTooltip from '../MoleculeTooltip/MoleculeTooltip';
import { viewError, viewLabel } from '../../common';
import avatarImg from '../../assets/Images/img1.jpg'

const lang = translator('fr')

MoleculeSelect.defaultProps = {
  disabled: false,
  isMulti: false,
  placeholder: lang.select,
  className: null,
  optionClassName: null,
  withDots: false,
  isOptionwithIcon: false,
  optionContentClassName: null,
  defaultMenuIsOpen: false,
  defaultInputValue: null,
  defaultValue: null,
  options: null,
  onChange: null,
  value: null,
  inputError: '',
  errorClassname: '',
  isInvalid: false,
  isValid: false,
  inputLabel: null,
  labelClassname: '',
  leftLabelIcon: '',
  rightLabelIcon: '',
  isAgentSelect: false,
  avatar: '',
  noOptionText: '',
  onClickNoDataButton: null,
  isOptionwithAvatar: false,
  labelWithTooltipIcon: '',
  labelWithTooltipIconClassname: '',
  iconsWithTooltipList: [],
  listIcons: null,
  isSearchable: false,

}
function MoleculeSelect(props) {
  const defaultAvatar = avatarImg
  const { withDots, optionContentClassName, avatar, noOptionText, onClickNoDataButton, isOptionwithAvatar, isOptionwithIcon } = props
  const [selectedOption, setSelectOption] = useState(null)
  useEffect(() => {
    const values = props.isMulti ? props.value : props.options.filter(el => el.value === props.value)
    if (values) {
      if (props.isMulti) {
        setSelectOption(values)
      } else {
        setSelectOption(values[0])
      }
    }
  }, [props.value])
  const handleChange = (selectedOption) => {
    setSelectOption(selectedOption)
    props.onChange && props.onChange(selectedOption)
  };
  const className = ["default-select"]
  if (props.isInvalid === true) {
    className.push('invalid-input');
  }
  if (props.isValid === true) {
    className.push('valid-input');
  }
  const optionClassName = ['default-select-option flex item-center']
  if (props.className) {
    className.push(props.className)
  }
  if (props.isAgentSelect === true) {
    className.push('agent-input');
  }
  if (props.optionClassName) {
    optionClassName.push(props.optionClassName)
  }

  function renderDot(props) {
    if (withDots) {
      const optionContents = []
      optionContents.push("cloor-span-text")
      if (optionContentClassName) {
        optionContents.push(optionContentClassName)
      }
      return <div className={optionContents.join(' ')} style={{ backgroundColor: props.data.color ? props.data.color : DarkBlue }} ></div>
    }
    return null
  }

  function renderAvatar(props) {
    if (isOptionwithAvatar) {
      return <Img className="default-avatar-agent mr-2" src={props.data.avatar ? props.data.avatar : defaultAvatar} />
    }
    return null
  }
  function renderIcon(props) {
    if (isOptionwithIcon) {
      return <Icon className={"icon-select " + props.data.iconClassSelect} icon={props.data.icon} />
    }
    return null
  }

  const renderOption = (props) => {
    function renderTik(isSelected) {
      if (isSelected) {
        return <Icon icon="tick" size="18px" color={ButtonBlue} />
      }
      return null
    }
    const elementClassName = ['flex', 'item-center', "justify-space-between", "padding-element-select", "w-100", "h-100"]
    if (withDots) {
      elementClassName.push('label-with-dots')
    }
    let isSelected = false
    if (selectedOption) {
      if (props.isMulti) {
        if (selectedOption.filter(el => el.value === props.value).length) {
          isSelected = true
        }
      } else {
        if (selectedOption.value == props.value) {
          isSelected = true
        }
      }
    }
    if (isSelected) {
      elementClassName.push('default-element-selected')
    }
    return (
      <components.MenuList {...props} className={optionClassName.join(' ')} >
        <div className={elementClassName.join(' ')}  >
          <div className='flex item-center '  >
            {renderDot(props)}
            {renderAvatar(props)}
            {renderIcon(props)}
            {props.children}
          </div>
          {renderTik(isSelected)}
        </div>
      </components.MenuList>
    );
  };

  function multiValueContainer(props) {
    return <components.MultiValueContainer {...props} />
  }
  function multiValueRemove(props) {
    return <components.MultiValueRemove {...props}>
      <span className='delete-option pointer '>x</span>
    </components.MultiValueRemove>
  }
  function renderValue(props) {
    if (withDots) {
      return <components.SingleValue {...props}>
        <div className='flex item-center '  >
          {renderDot(props)}
          {props.children}
        </div>
      </components.SingleValue>
    } else if (isOptionwithIcon) {
      return <components.SingleValue {...props}>
        <div className='flex item-center '  >
          {renderIcon(props)}
          {props.children}
        </div>
      </components.SingleValue>

    } else {
      return <components.SingleValue {...props}>{props.children}</components.SingleValue>
    }
  }
  function renderError() {
    if (props.inputError && props.isInvalid) {
      return viewError({ text: props.inputError, className: props.errorClassname })
    }
  }
  function renderLabel() {
    if (props.inputLabel) {
      return viewLabel({
        label: props.inputLabel,
        labelClass: props.labelClassname,
        leftIconClass: props.leftIconlClassname,
        leftLabelIcon: props.leftLabelIcon,
        rightLabelIcon: props.rightLabelIcon,
        isForgotPasswordLabel: props.isForgotPasswordLabel,
        listIcons: props.listIcons,
        containerIconClassName: props.containerIconClassName
      })
    }
    return null
  }
  function renderLabelWithTooltipIcon() {
    const labelWithTooltipIconClassname = ['input-label-with-tooltip']
    if (props.labelWithTooltipIcon) {
      if (props.labelWithTooltipIconClassname) {
        labelWithTooltipIconClassname.push(props.labelWithTooltipIconClassname)
      }
      return (
        <div className='flex justify-space-between'>
          <div className='mb-2 flex item-center'>
            <div className={labelWithTooltipIconClassname.join(' ')} >{props.labelWithTooltipIcon} </div>
            {props.iconsWithTooltipList && props.iconsWithTooltipList.map((el, index) => {
              const iconClassname = ['icon-with-tooltip', 'ml-2', 'pointer']
              if (el.iconClassname) {
                iconClassname.push(el.iconClassname)
              }
              return < MoleculeTooltip
                key={index}
                withIcon
                icon={el.icon}
                tooltipText={el.tooltipText}
                tooltipClassName={el.tooltipClassName}
                iconClassname={iconClassname.join(' ')} />
            })}
          </div>
        </div>)
    }
    return null
  }
  function renderPlaceHolder(props) {
    const placeholderClassName = ["w-100", "v-100", "flex", "item-center"]
    if (props.placeholder) {
      placeholderClassName.push('default-placeholder')
    }
    return <components.Placeholder {...props} >
      <div className={placeholderClassName.join(' ')}>{props.children}</div>
    </components.Placeholder>;
  }
  function renderAgentIcon(props) {
    return (
      <components.Control {...props}>
        <Icon icon="account_square_outlined" size={'1.125rem'} className='ml-3 mr-2' color={Grey} />
        {props.children}
      </components.Control>
    );
  };
  const NoOptionsMessage = (props) => {
    return (
      <components.NoOptionsMessage {...props} className='no-option-container flex item-center'>
        <Text text={noOptionText} type='h5' className='no-data-text mr-1 mb-0' />
        <Text text={props.selectProps && props.selectProps.inputValue} type='h5' className='no-data-value mr-3 mb-0' />
        <Button type="secondary" icon="user_add" text={lang.textAddContact} onClick={onClickNoDataButton} />
      </components.NoOptionsMessage>
    );
  };
  function agentMultiValueContainer(props) {
    return <components.MultiValueContainer {...props}>
      <div className='flex item-center'>  <Img className="default-avatar-agent" src={props.data.avatar ? props.data.avatar : defaultAvatar} />
        {props.children}</div>
    </components.MultiValueContainer>
  }
  function DropdownIndicator() {
    return null;
  };
  const customSelect = {
    Option: renderOption,
    ClearIndicator: null,
    LoadingIndicator: null,
    MultiValueContainer: multiValueContainer,
    MultiValueRemove: multiValueRemove,
    SingleValue: renderValue,
    Placeholder: renderPlaceHolder,
  }
  if (props.isAgentSelect) {
    customSelect.Control = renderAgentIcon
    customSelect.NoOptionsMessage = NoOptionsMessage
    customSelect.MultiValueContainer = agentMultiValueContainer
    customSelect.DropdownIndicator = DropdownIndicator
  }


  return (

    <>
      {renderLabel()}
      {props.labelWithTooltipIcon && renderLabelWithTooltipIcon()}
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={props.options}
        components={customSelect}
        styles={
          {
            multiValue: (base) => ({
              ...base,
              color: BlackText,
              backgroundColor: InputFilterBorder,
              borderRadius: "4px",
              padding: "0.3125rem 0.375rem"
            })
            ,
            ...props.customStyles
          }}
        isMulti={props.isMulti}
        isDisabled={props.disabled}
        className={className.join(' ')}
        placeholder={props.placeholder}
        defaultMenuIsOpen={props.defaultMenuIsOpen}
        defaultValue={props.defaultValue}
        blurInputOnSelect
        autoFocus={false}
        maxMenuHeight={200}
        openMenuOnClick={props.isAgentSelect ? false : true}
        menuPlacement={props.menuPlacement}
        hideSelectedOptions={false}
        isSearchable={props.isMulti}
      />
      {renderError()}
    </>

  )
}

export default MoleculeSelect
