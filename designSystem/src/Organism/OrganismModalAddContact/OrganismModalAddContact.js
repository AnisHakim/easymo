import React, { Component } from "react";
import { Button, Text, Icon } from "../../Atoms";
import { Modal } from "../../Modal";
import translator from "../../lang/translator";
import { InputPhoneNumber, MoleculeInput, Select } from "../../Molecules";
import { viewLabel } from "../../common";
import {
  bgColor,
  closeModal,
  modalContactWhiteHeader,
} from "../../assets/svg/svg";
import { formValidation, isEmail, isEmpty } from "../../Validation";
import { apiAddContact } from "../../Api/Contact/contact";

const publish = (event, data) => PubSub.publish(event, data);
const lang = translator("fr");
const categorielist = [
  { value: "client", label: lang.Client },
  { value: "prestataire", label: lang.prestataire },
];
const subCategorieClientlist = [
  { value: "buyer", label: lang.Acheteur },
  { value: "lessor", label: lang.Bailleur },
  { value: "tenant", label: lang.Locataire },
  { value: "seller", label: lang.Vendeur },
];

const subCategoriePrestatairelist = [
  { value: "attorney", label: lang.Avocat },
  { value: "architect", label: lang.Architecte },
  { value: "assurance", label: lang.Assurence },
  { value: "accounting", label: lang.Comptable },
  { value: "construction", label: lang.Contsruction },
  { value: "movingHouse", label: lang.Déménagement },
  { value: "bailiff", label: lang.Divers },
  { value: "medias", label: lang.Médias },
  { value: "cleaning", label: lang.Nettoyage },
  { value: "notary", label: lang.Notaire },
  { value: "parks", label: lang.parcs_et_jardins },
  { value: "PEB", label: lang.PEB },
  { value: "promoter", label: lang.Promoteur },
  { value: "trustee", label: lang.Syndic },
  { value: "works", label: lang.Travaux },
];
class OrganismModalAddContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorielist: categorielist,
      subCategorylist: [],
      isModalOpen: true,
      categoryDisabled: false,
      subCategoryDisabled: false,
      mail: {
        value: "",
        isValid: false,
        isInvalid: false,
        errorMessage: "",
      },
      firstName: {
        value: "",
        isValid: false,
        isInvalid: false,
        errorMessage: "",
      },
      lastName: {
        value: "",
        isValid: false,
        isInvalid: false,
        errorMessage: "",
      },
      category: {
        value: "",
        isValid: false,
        isInvalid: false,
        errorMessage: "",
      },
      subCategory: {
        value: "",
        isValid: false,
        isInvalid: false,
        errorMessage: "",
      },
      phoneNumber: {
        value: "",
        isValid: false,
        isInvalid: false,
        errorMessage: "",
      },
    };
  }
  static defaultProps = {
    typeContactToAdd: ["all"]
  }
  componentDidMount() {
    this.defineSelectOption()
  }
  defineSelectOption = () => {
    if (this.props.typeContactToAdd == ['all']) {
      this.setState({
        categorielist: categorielist,
      })
    } else {
      if (this.props.typeContactToAdd.length) {
        const clientList = subCategorieClientlist.map(el => el.value)
        const prestataireList = subCategoriePrestatairelist.map(el => el.value)
        let list1 = []
        let list2 = []
        if (clientList.indexOf(this.props.typeContactToAdd[0]) !== -1) {
          list1 = categorielist.filter(el => el.value === "client")
          list2 = subCategorieClientlist.filter(el => this.props.typeContactToAdd.indexOf(el.value) !== -1)
          this.setState({
            categorielist: list1,
            subCategorylist: list2,
            category: { ...this.state.category, value: list1[0].value },
            subCategory: list2.length === 1 ? { ...this.state.subCategory, value: list2[0].value } : this.state.subCategory,
          })
        } else if (prestataireList.indexOf(this.props.typeContactToAdd[0]) !== -1) {
          list1 = categorielist.filter(el => el.value !== "client")
          list2 = subCategoriePrestatairelist.filter(el => this.props.typeContactToAdd.indexOf(el.value) !== -1)
          this.setState({
            categorielist: list1,
            subCategorylist: list2,
            category: { ...this.state.category, value: list1[0].value },
            subCategory: list2.length === 1 ? { ...this.state.subCategory, value: list2[0].value } : this.state.subCategory,
          })
        }
      }
    }
  }
  onCloseModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  renderError = (item) => {
    if (item === "mail") {
      return lang.invalid_mail_error;
    } else if (item === "lastName") {
      return lang.nom_error;
    } else if (item === "firstName") {
      return lang.prenom_error;
    } else if (item === "category") {
      return lang.categoryError;
    } else {
      return lang.subCategoryError;
    }
  };
  onChangeInput = (e, item) => {
    let newState = { ...this.state };
    newState[item].value = e.target.value;
    if (item.includes("mail")) {
      newState[item].isValid = isEmail(e.target.value);
      newState[item].isInvalid = !isEmail(e.target.value);
      newState[item].errorMessage =
        !isEmail(e.target.value) && this.renderError(item);
    } else {
      newState[item].isValid = !isEmpty(e.target.value);
      newState[item].isInvalid = isEmpty(e.target.value);
      newState[item].errorMessage =
        isEmpty(e.target.value) && this.renderError(item);
    }
    this.setState({
      state: newState,
    });
  };
  onChangePhoneNumber = (e, valid) => {
    this.setState({
      phoneNumber: {
        value: e,
        isValid: valid,
        isInvalid: !valid,
        // errorMessage: lang.numero_error
      },
    });
  };
  onSelectCategory = (e, item) => {
    let newState = { ...this.state };
    newState[item].value = e.value;
    newState[item].isValid = !isEmpty(e);
    newState[item].isInvalid = isEmpty(e);
    newState[item].errorMessage = isEmpty(e) && this.renderError(item);
    if (item === "category") {
      newState.subCategory.value = "";
    }
    this.setState({
      state: newState,
    });
  };
  onAddContact = async () => {
    const validation = [
      {
        value: "firstName",
        validation: [{ error: lang.prenom_error, type: "isNotEmpty" }],
      },
      {
        value: "lastName",
        validation: [{ error: lang.nom_error, type: "isNotEmpty" }],
      },
      {
        value: "category",
        validation: [{ error: lang.categoryError, type: "isNotEmpty" }],
      },
      {
        value: "subCategory",
        validation: [{ error: lang.subCategoryError, type: "isNotEmpty" }],
      },
    ];
    const { res, verif } = formValidation(validation, this.state);
    let verification = verif
    if (verification) {
      let body = {
        firstName: this.state.firstName.value,
        lastName: this.state.lastName.value,
        client: this.state.category.value === "client" ? true : false,
        serviceProvider:
          this.state.category.value === "prestataire" ? true : false,
      };
      if (this.state.mail.value !== '') {
        body['mail'] = this.state.mail.value
      }
      if (this.state.phoneNumber.value !== "") {
        body['phoneNumber'] = this.state.phoneNumber.value
      }
      this.state.category.value === "client"
        ? (body = { ...body, clientSubCategory: this.state.subCategory.value })
        : (body = {
          ...body,
          serviceProviderSubCategory: this.state.subCategory.value,
        });
      const res = await apiAddContact(JSON.stringify(body));
      if (res.statusCode === 200) {
        publish("ADD_CONTACT", res.data);
        this.props.getNewContact && this.props.getNewContact(res.data)
        this.props.onHideModal && this.props.onHideModal(false);
      } else {
        if (res.error.keyPattern.mail === 1) {
          this.setState({
            mail: {
              value: this.state.mail.value,
              isInValid: true,
              isValid: false,
              errorMessage: lang.invalid_mail_error,
            },
          });
        }
      }
    } else {
      this.setState({
        ...res,
      });
    }
  };
  renderBody = () => {
    return (
      <>
        <div className="add-contact-header">
          <div className="bg-blue-linear">{bgColor}</div>
          <div className="absolute white-contact-header">
            {modalContactWhiteHeader}
          </div>
          <div
            className="close-modal-contact"
            onClick={() => this.props.onHideModal(false)}
          >
            {closeModal}
          </div>
        </div>
        <div className="contact-header-icon">
          <Icon icon="contact_notebook" />
        </div>
        <div className="modal-add-contact-content">
          <Text
            text={lang.createNewContact}
            type="h5"
            className="mb-0 flex justify-center item-center modal-add-contact-title"
          />
          <div className="row mt-6">
            {viewLabel({
              label: lang.nom_prenom,
              labelClass: "modal-add-contact-label",
            })}
            <div className="col-6 mb-5 pr-3">
              <MoleculeInput
                placeholder={lang.Nom}
                inputClassname="add-contact-input"
                onchangeInput={(e) => this.onChangeInput(e, "lastName")}
                inputValue={this.state.lastName.value}
                isValid={this.state.lastName.isValid}
                isInvalid={this.state.lastName.isInValid}
                inputError={this.state.lastName.errorMessage}
              />
            </div>
            <div className="col-6 mb-5 pl-3">
              <MoleculeInput
                placeholder={lang.Prenom}
                inputClassname="add-contact-input"
                onchangeInput={(e) => this.onChangeInput(e, "firstName")}
                inputValue={this.state.firstName.value}
                isValid={this.state.firstName.isValid}
                isInvalid={this.state.firstName.isInValid}
                inputError={this.state.firstName.errorMessage}
              />
            </div>
          </div>
          <div>
            <div className="row ">
              {viewLabel({
                label: lang.Categorie,
                labelClass: "modal-add-contact-label",
              })}
              <div className="col-6 mb-5 pr-3">
                <Select
                  placeholder={lang.Categorie}
                  className="add-contact-select"
                  onChange={(e) => this.onSelectCategory(e, "category")}
                  inputError={this.state.category.errorMessage}
                  isValid={this.state.category.isValid}
                  isInvalid={this.state.category.isInvalid}
                  value={this.state.category.value}
                  options={this.state.categorielist}
                  disabled={this.state.categorielist.length === 1}
                />
              </div>
              <div className="col-6 mb-5 pl-3">
                {this.state.category.value && (
                  <Select
                    placeholder={lang.subCategory}
                    className="add-contact-select"
                    onChange={(e) => this.onSelectCategory(e, "subCategory")}
                    inputError={this.state.subCategory.errorMessage}
                    isValid={this.state.subCategory.isValid}
                    isInvalid={this.state.subCategory.isInvalid}
                    value={this.state.subCategory.value}
                    options={this.state.subCategorylist.length ? this.state.subCategorylist : this.state.category.value === "client"
                      ? subCategorieClientlist
                      : subCategoriePrestatairelist}
                    disabled={this.state.subCategorylist.length === 1}
                  />
                )}
              </div>
            </div>
            <div className="mb-5">
              {viewLabel({
                label: lang.adresseMail,
                labelClass: "modal-add-contact-label",
              })}

              <MoleculeInput
                placeholder="nathan.dubois@gmail.com"
                inputClassname="add-contact-input"
                onchangeInput={(e) => this.onChangeInput(e, "mail")}
                inputValue={this.state.mail.value}
                isValid={this.state.mail.isValid}
                isInvalid={this.state.mail.isInvalid}
                inputError={this.state.mail.errorMessage}
              />
            </div>
            <div className="mb-5">
              {viewLabel({
                label: lang.telephone,
                labelClass: "modal-add-contact-label",
              })}
              <InputPhoneNumber
                labelClassname="mb-2 pointer"
                className="add-contact-input"
                onChange={(e, valid) => this.onChangePhoneNumber(e, valid)}
                inputValue={this.state.phoneNumber.value}
                isValid={this.state.phoneNumber.isValid}
                isInvalid={this.state.phoneNumber.isInvalid}
                inputError={this.state.phoneNumber.errorMessage}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end border-top-container padding">
          <Button
            type="filter"
            text={lang.cancel}
            className="mr-2 add-contact-cancel-button"
            onClick={() => this.props.onHideModal(false)}
          />
          <Button
            icon="user_add"
            text={lang.ajouterLeContact}
            onClick={this.onAddContact}
          />
        </div>
      </>
    );
  };
  render() {
    return (
      <Modal
        show={this.props.isModalOpen}
        onHide={this.props.onHideModal}
        centered={true}
        dialogClassName={"modal-historique"}
        contentClassName={this.props.contentClassName}
        modalWithBackground
      >
        {this.renderBody()}
      </Modal>
    );
  }
}

export default OrganismModalAddContact;
