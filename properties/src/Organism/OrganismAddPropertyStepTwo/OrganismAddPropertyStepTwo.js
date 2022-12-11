import React from "react";
import translator from "../../lang/translator";
import {
  AddAgent,
  Button,
  MoleculeInput,
  Select,
  DarkBlue,
  Green,
  lightBlue,
  LightGreen,
  Orange,
  RougeBordeau,
  SecondDarkBlue,
  SecondLightBlue,
} from "@easymo/designSystem";
import { useSelector } from "react-redux";
import { renderIconTooltipObject } from "../../data/data";
const OrganismAddPropertyStepTwo = (props) => {
  const contact = useSelector((state) => state.contacts);
  const lang = translator("fr");
  const options = [
    {
      value: "prospect",
      label: lang.prospect,
      withcolor: true,
      color: DarkBlue,
    },
    {
      value: "mondat",
      label: lang.mandat,
      withcolor: true,
      color: SecondDarkBlue,
    },
    { value: "onSale", label: lang.onSale, withcolor: true, color: lightBlue },
    {
      value: "offer",
      label: lang.offer,
      withcolor: true,
      color: SecondLightBlue,
    },
    { value: "option", label: lang.option, withcolor: true, color: LightGreen },
    { value: "sold", label: lang.sold, withcolor: true, color: Green },
    {
      value: "suspended",
      label: lang.suspended,
      withcolor: true,
      color: Orange,
    },
    { value: "lost", label: lang.lost, withcolor: true, color: RougeBordeau },
  ];
  function inputprops({
    tooltip,
    value,
    handleChange,
    labelText,
    placeholderText,
  }) {
    return {
      withBtn: false,
      isMulti: true,
      isAgentSelect: true,
      isOptionwithAvatar: true,
      placeholder: placeholderText,
      className: "input-identification-step-two",
      optionClassName: "option-select-status-identification",
      noOptionText: lang.noOptionText,
      onChange: handleChange,
      value: value,
      inputLabel: labelText,
      labelClassname: "text-modal-organism-step-one",
      listIcons: [
        renderIconTooltipObject(
          "help_outlined",
          true,
          tooltip,
          "icon-help-second-step"
        ),
      ],
    };
  }
  return (
    <div className="modal-organism-container">
      <div className="mb-5">
        <MoleculeInput
          inputClassname="inputs-step-three"
          labelClassname="text-modal-organism-step-one"
          placeholder={lang.internIdentificationPlaceHolder}
          inputLabel={lang.internIdentification}
          labelTextType="h5"
          onchangeInput={props.onChangeName}
          inputValue={props.name.value}
          isValid={props.name.isValid}
          isInvalid={props.name.isInValid}
          inputError={props.name.errorMessage}
          errorClassname="error-msg-inputs"
        />
      </div>
      <div className="w-100 mb-5">
        <Select
          labelClassname="text-modal-organism-step-one"
          inputLabel={lang.mandatStatus}
          placeholder={lang.seelctStatus}
          className="select-status-identification-step-two"
          options={options}
          isValid={props.status.isValid}
          isInvalid={props.status.isInValid}
          value={props.status.value}
          onChange={props.onChangeStatus}
          inputError={props.status.errorMessage}
          optionClassName="option-select-status-identification"
          withDots
        />
      </div>
      <AddAgent
        firstClassName="col-12 col-lg-6"
        {...inputprops({
          tooltip: lang.tootltipMessageOwner,
          value: props.owner.value,
          handleChange: props.onChangeOwner,
          labelText: lang.oneOrManyProperty,
          placeholderText: lang.placeHolderOwnerText,
        })}
        isInvalid={props.owner.isInValid}
        isValid={props.owner.isValid}
        inputError={props.owner.errorMessage}
        buttonText={lang.createNewContact}
        withBtn
        separatorText={lang.or}
        contentClassName="box-shadow-modal"
        options={contact.listOwner.map((el) => {
          return { value: el._id, label: el.firstName + " " + el.lastName };
        })}
        typeContactToAdd={["seller"]}
      />
      <div className="mb-1">
        <AddAgent
          firstClassName="col-12 col-lg-6"
          {...inputprops({
            tooltip: lang.tootltipMessageAgent,
            value: props.agent.value,
            handleChange: props.onChangeAgent,
            labelText: lang.oneOrManyAgent,
            placeholderText: lang.placeHolderAgentText,
          })}
          isInvalid={props.agent.isInValid}
          isValid={props.agent.isValid}
          inputError={props.agent.errorMessage}
          options={contact.listAgentUser.map((el) => {
            return { value: el._id, label: el.firstName + " " + el.lastName };
          })}
        />
      </div>
      <div className="flex flex-direction-row justify-space-between item-center">
        <Button
          text={lang.back}
          type="ghost"
          className="button-next-modal-organism-stepone"
          icon="chevron_left"
          onClick={() => props.onChooseStep(props.index, 0)}
        />
        <Button
          text={lang.next}
          type="primary"
          className="button-next-modal-organism-stepone"
          icon="chevron_right"
          iconRight
          onClick={() => props.onChooseStep(props.index, 2)}
        />
      </div>
    </div>
  );
};

export default OrganismAddPropertyStepTwo;
