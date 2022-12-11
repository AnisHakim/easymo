import { Select } from "../../Molecules";
import { Button, Text } from "../../Atoms";
import React, { useState } from "react";
import { viewError } from "../../common";
import translator from "../../lang/translator";
import OrganismModalAddContact from "../OrganismModalAddContact/OrganismModalAddContact";
const lang = translator("fr");
OrganismAddAgent.defaultProps = {
    typeContactToAdd: ["all"],
    withRow: true
}
function OrganismAddAgent(props) {
    const [isAddModelOpened, setIsAddModelOpened] = useState(false);
    const getNewContact = (contact) => {
        if (props.typeContactToAdd?.length) {
            let type = contact.serviceProviderSubCategory
            if (contact.clientSubCategory) {
                type = contact.clientSubCategory
            }
            if (props.typeContactToAdd.indexOf(type) !== -1 || props.typeContactToAdd[0] === "all") {
                const value = [...props.value]
                value.push({ value: contact._id, label: contact.firstName + " " + contact.lastName })
                props.onChange && props.onChange(value)
            }
        }
    }

    const onHideModal = (e) => {
        setIsAddModelOpened(e);
    };
    const firstClassName = props.withoutRow ? [''] : [props.full ? "col-12" : "col-9 col-lg-6"];
    const containerClassName = [props.withoutRow ? '' : "row"];
    if (props.firstClassName) {
        firstClassName.push(props.firstClassName);
    }
    const secondClassName = ["add-agent-separator-text pt-5"];
    if (props.secondClassName) {
        secondClassName.push(props.secondClassName);
    }
    const thirdClassName = ["col-1 col-lg-4 flex  item-center pt-4"];
    if (props.thirdClassName) {
        thirdClassName.push(props.thirdClassName);
    }
    const inputErrorClassName = [];
    if (props.withBtn) {
        if (props.inputError) {
            inputErrorClassName.push("mb-3");
        }
        containerClassName.push("item-center");
    } else {
        if (!props.inputError && !props.notMb) {
            containerClassName.push('mb-3')
        }
    }
    if (props.containerClassName)
        containerClassName.push(props.containerClassName);
    if (props.withRow)
        return (
            <>
                <div className={containerClassName.join(" ")}>
                    <div className={firstClassName.join(" ")}>
                        <Select
                            placeholder={props.placeholder}
                            onChange={props.onChange}
                            value={props.value}
                            options={props.options}
                            className={props.selectClassName}
                            isMulti
                            isAgentSelect
                            noOptionText={lang.noOptionText}
                            isOptionwithAvatar
                            iconsWithTooltipList={props.listIcons}
                            labelWithTooltipIcon={props.labelWithTooltipIcon}
                            onClickNoDataButton={
                                props.outsideModal
                                    ? () => props.changeModalVisibility(true)
                                    : () => setIsAddModelOpened(true)
                            }
                            {...props}
                            inputError={!props.withBtn ? props.inputError : null}
                        />
                    </div>
                    {props.withBtn && (
                        <>
                            <div className="col-1 col-lg-1 h-100  flex item-center justify-center">
                                <Text
                                    text={props.separatorText}
                                    type="h5"
                                    className={secondClassName.join(" ")}
                                />
                            </div>
                            <div className={thirdClassName.join(" ")}>
                                <Button
                                    className="btn-add-agent mt-1"
                                    type="secondary"
                                    icon="user_add"
                                    text={props.buttonText}
                                    onClick={() => setIsAddModelOpened(true)}
                                />
                            </div>
                        </>
                    )}
                </div>
                {props.withBtn &&
                    viewError({
                        text: props.inputError,
                        className: inputErrorClassName.join(" "),
                    })}
                {isAddModelOpened && (
                    <OrganismModalAddContact
                        contentClassName={props.contentClassName}
                        isModalOpen={isAddModelOpened}
                        onHideModal={(e) => onHideModal(e)}
                        getNewContact={getNewContact}
                        typeContactToAdd={props.typeContactToAdd}
                    />
                )}
            </>
        );
    return <Select
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
        options={props.options}
        className={props.selectClassName}
        isMulti
        isAgentSelect
        noOptionText={lang.noOptionText}
        isOptionwithAvatar
        iconsWithTooltipList={props.listIcons}
        labelWithTooltipIcon={props.labelWithTooltipIcon}
        onClickNoDataButton={
            props.outsideModal
                ? () => props.changeModalVisibility(true)
                : () => setIsAddModelOpened(true)
        }
        {...props}
        inputError={!props.withBtn ? props.inputError : null}
    />
}

export default OrganismAddAgent;
