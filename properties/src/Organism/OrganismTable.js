import React, { useState } from "react";
import { Table, Button, MoleculeInput } from "@easymo/designSystem";
const LISTCOL = [
    { key: "name", name: "Nom", sort: true },
    { key: "status", name: "Status", sort: true },
    { key: "type", name: "Type", sort: true, withSum: true, sumText: "Total" },
    { key: "address", name: "Adresse", sort: true, withSum: true },
    { key: "number", name: "number", sort: true, withSum: true },
    { key: "file", name: "file", sort: true, type: "file" },
]
const TABLEDATA = [
    {
        name: "1",
        status: "status",
        type: "type",
        address: "address",
        file: 'file',
        id: "11",
        isAccepted: false,
        isDeleted: false,
        isRefused: false,
        date: "fjkjdf",
        number: 124
    },
    {
        name: "2",
        status: "status",
        type: "type",
        address: "address",
        file: 'file',
        id: "11",
        isAccepted: false,
        isDeleted: false,
        isRefused: false,
        number: "154"
    },
    {
        name: "3",
        status: "status",
        type: "type",
        address: "address",
        file: 'file',
        id: "11",
        isAccepted: false,
        isDeleted: true,
        isRefused: false,
        number: "154"
    },
    {
        name: "4",
        status: "status",
        type: "type",
        address: "address",
        file: 'file',
        id: "11",
        isAccepted: false,
        isDeleted: false,
        isRefused: false,
        number: "154"
    },
]
const OBJECT = { name: "", status: "", type: "", address: "", file: "" }
export default class OrganismTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            dataTable: [],
            object: { ...OBJECT },
            updateState: false,
            closeElement: false,
        }
    }
    setData = (e) => {
        this.setState({ object: e })
    }
    setDataTable = (e) => {
        this.setState({ dataTable: e })
    }
    getElementToEdit = (data) => {
        if (data) {
            this.setState({
                object: { ...data },
                updateState: !this.state.updateState
            })
        } else {
            this.setState({
                object: { ...OBJECT }
            })
        }
    }
    setTableData = () => {
        this.setState({ data: TABLEDATA })
    }
    onSave = (index) => {
        const newData = [...this.state.dataTable]
        if (newData[index]) {
            newData[index] = this.state.object
            newData[index].isEditable = false
        } else {
            newData.push({
                ...this.state.object,
                isAccepted: false,
                isRefused: false,
                isDeleted: false,
                isNew: true,
                newAdded: true,
                isEditable: false,
                isUpdated: true,
            })
        }
        this.setState({
            updateState: !this.state.updateState,
            closeElement: !this.state.closeElement,
            object: { ...OBJECT },
            data: newData
        })
    }
    render() {
        return <div className="p-4">
            <Table
                withAction
                type="type-2"
                btnText='Ajouter un offre'
                listAction={["edit", "duplicate", "delete", "drag"]}
                listCol={LISTCOL}
                editComponent={<Edit
                    object={this.state.object}
                    setData={(e) => this.setData(e)}
                    updateState={this.state.updateState}
                />}
                getElementToEdit={this.getElementToEdit}
                onSave={this.onSave}
                data={this.state.data}
                getdata={(e) => this.setDataTable(e)}
                closeElement={this.state.closeElement}
                withValidation
                withDataDetails
                listColDetails={["date"]}
                onGetElementToMoreDetails={(e) => console.log(e)}
                withFooter
                withDragAndDrop
            // withAction={false}
            // actionFirst
            />
            <Button
                text="get data"
                onClick={() => this.setTableData()}
            />
        </div>
    }
}
class Edit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            object: { ...OBJECT },
            isUpdated: false,
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.object !== prevState.object && this.state.isUpdated) {
            this.props.setData && this.props.setData(this.state.object)
        }
        if (this.props.updateState !== prevProps.updateState) {
            this.setState({
                object: this.props.object
            })
        }
    }
    onChange = (e, key) => {
        this.setState({
            isUpdated: true,
            object: { ...this.state.object, [key]: e.target.value }
        })
    }
    render() {
        return <div className="w-100">
            <div className="row mb-1">
                <div className="col">
                    <MoleculeInput
                        inputLabel="name"
                        inputValue={this.state.object.name}
                        onchangeInput={(e) => this.onChange(e, "name")}
                    />
                </div>
                <div className="col">
                    <MoleculeInput
                        inputLabel="status"
                        inputValue={this.state.object.status}
                        onchangeInput={(e) => this.onChange(e, "status")}
                    />
                </div>
            </div>
            <div className="row mb-1">
                <div className="col">
                    <MoleculeInput
                        inputLabel="type"
                        inputValue={this.state.object.type}
                        onchangeInput={(e) => this.onChange(e, "type")}
                    />
                </div>
                <div className="col">
                    <MoleculeInput
                        inputLabel="address"
                        inputValue={this.state.object.address}
                        onchangeInput={(e) => this.onChange(e, "address")}
                    />
                </div>
            </div>

        </div >
    }
}