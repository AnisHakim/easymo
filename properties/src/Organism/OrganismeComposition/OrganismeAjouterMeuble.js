import React, { useEffect, useState } from "react";
import {
  MoleculeInput,
  GroupeInput,
  viewLabel,
  isNumber,
} from "@easymo/designSystem";
import translator from "../../lang/translator";
import { meubleRowData } from "../../data/data";
const lang = translator("fr");

function OrganismeAjouterMeuble(props) {
  const [state, setState] = useState({ ...meubleRowData });
  useEffect(() => {
    props.setData && props.setData(state);
  }, [state]);
  useEffect(() => { }, [props.updateState]);
  const onChangeInput = (e, key) => {
    const newState = { ...state };
    if (key === "price") {
      if (isNumber(e.target.value)) {
        newState[key].value = e.target.value;
      }
    } else {
      newState[key].value = e.target.value;
    }

    newState.updateState = true;
    setState(newState);
  };
  return (
    <>
      <div className='row' >
        <div className="col-sm-4 mb-5" >
          <MoleculeInput
            inputLabel={lang.meuble}
            placeholder={lang.meuble}
            inputClassname={'input-mandat'}
            labelTextType='h5'
            onchangeInput={(e) => onChangeInput(e, 'furniture')}
            inputValue={state.furniture.value}
            isValid={state.furniture.isValid}
            isInvalid={state.furniture.isInValid}
          />
        </div>
        <div className="col-sm-4 mb-5" >
          <MoleculeInput
            inputLabel={lang.description}
            placeholder={lang.description}
            inputClassname={'input-mandat'}
            labelTextType='h5'
            onchangeInput={(e) => onChangeInput(e, 'description')}
            inputValue={state.description.value}
            isValid={state.description.isValid}
            isInvalid={state.description.isInValid}
          />
        </div>
        <div className="col-sm-4 mb-5" >
          {viewLabel({
            label: props.propertie.forSale ? lang.prixVente : lang.loyerMensuel
          })}
          <GroupeInput
            withSelect={false}
            onchangeInput={(e) => onChangeInput(e, 'price')}
            inputValue={state.price.value}
            isValidInput={state.price.isValid}
            isInvalidInput={state.price.isInValid}
            suffix={props.Devise}
            containerInput="w-100"
            placeHolderInput='321'
          />
        </div>
      </div>
    </>
  );
}

export default OrganismeAjouterMeuble;
