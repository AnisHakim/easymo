import React, { Component } from 'react';
import { Text, Table, formatNumber } from "@easymo/designSystem";
import translator from "../../lang/translator";
import OrganismAddCadastre from './OrganismAddCadastre';
import { renderSurface } from '../../Common/Common';
const lang = translator('fr')

export default class OrganismCadastre extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className='w-100'>
                <Text text={lang.parcellesCadastrales} type="h4" className="cadastre-header mb-4" />
                <Table
                    test="hello"
                    tableClassName="offre-table"
                    actionFirst={false}
                    withAction
                    withValidation={false}
                    btnText={lang.ajouterUneParcelle}
                    type="type-2"
                    listAction={["edit", "duplicate", "delete"]}
                    listCol={[
                        { key: "customId", name: lang.id, sort: true },
                        { key: "division", name: lang.division, sort: true },
                        { key: "matrice", name: lang.matrice, sort: true },
                        { key: "surface", name: lang.surface, sort: true, withSum: true, sumText: lang.total, type: "array", renderFunction: (e) => formatNumber(e && Number(e), "m²", lang.localNumber) },
                        { key: "revenu", name: lang.revenu, sort: true, withSum: true, type: "custom", renderFunction: (e) => formatNumber(e && Number(e), this.props.Devise, lang.localNumber) },
                        { key: "revenuInd", name: lang.revenuInd, sort: true, withSum: true, type: "custom", renderFunction: (e) => formatNumber(e && Number(e), this.props.Devise, lang.localNumber) },
                        { key: "preCompte", name: lang.precompte, sort: true, withSum: true, type: "custom", renderFunction: (e) => formatNumber(e && Number(e), this.props.Devise, lang.localNumber) },
                    ]}
                    editComponent={<OrganismAddCadastre
                        cadastre={this.props.cadastre}
                        setData={(e) => this.props.setCadastreData(e)}
                        updateState={this.props.updateCadastreState}
                    />}
                    closeElement={this.props.isCadastreAddClosed}
                    getElementToEdit={this.props.getCadastreToEdit}
                    onSave={this.props.onSaveCadastre}
                    data={this.props.cadastreTabData}
                    getdata={(e) => this.props.getDataCadastre(e)}
                    trAcceptedColor
                    withSizeControl
                    padding={20}
                    sortAccepted
                    acceptOneElement
                    emptyArrayText={lang.emptyCadastreTableText}
                    withFooter
                    withPagination
                    withIndex
                    maxFormContainer
                />
            </div>
        );
    }
}
