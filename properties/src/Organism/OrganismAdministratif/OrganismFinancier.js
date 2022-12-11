import React, { Component } from 'react';
import { Text, Table, formatNumber } from "@easymo/designSystem";
import translator from "../../lang/translator";
import OrganismAddFinancier from './OrganismAddFinancier';
const lang = translator('fr')

export default class OrganismFinancier extends Component {
    render() {
        return (
            <div>
                <Text text={lang.fraisEtTaxesAdditionnels} type="h4" className="cadastre-header mb-4" />
                <Table
                    tableClassName="offre-table"
                    actionFirst={false}
                    withAction
                    withValidation={false}
                    btnText={lang.ajouterDesFrais}
                    type="type-2"
                    listAction={["edit", "duplicate", "delete"]}
                    listCol={[
                        { key: "nature", name: lang.nature, sort: true },
                        { key: "description", name: lang.description, sort: true, withSum: true, sumText: lang.total },
                        { key: "cost", name: lang.cout, sort: true, withSum: true, type: "custom", renderFunction: (e) => formatNumber(e && Number(e), this.props.Devise, lang.localNumber) },
                    ]}
                    editComponent={<OrganismAddFinancier
                        financier={this.props.financier}
                        setData={(e) => this.props.setFinancierData(e)}
                        updateState={this.props.updateFinancierState}
                    />}
                    closeElement={this.props.isFinancierAddClosed}
                    getElementToEdit={this.props.getFinancierToEdit}
                    onSave={this.props.onSaveFinancier}
                    data={this.props.financierTabData}
                    getdata={(e) => this.props.getDataFinancier(e)}
                    trAcceptedColor
                    withSizeControl
                    sortAccepted
                    acceptOneElement
                    emptyArrayText={lang.emptyFinancierTableText}
                    withPagination
                    withFooter
                    withIndex
                    maxFormContainer
                />
            </div>
        );
    }
}
