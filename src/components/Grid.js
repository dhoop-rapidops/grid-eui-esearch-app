import React from "react";

import { AgGridReact } from 'ag-grid-react';

class Grid extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            rowHeight: 40,
            tableHeight: 400,
            columnWidth: 150,
            columnDefs: [
                { headerName: "Firstname", field: "firstname", resizable: true, lockPosition: true, sortable: true },
                { headerName: "Lastname", field: "lastname", resizable: true, lockPosition: true, sortable: true },
                { headerName: "Age", field: "age", resizable: true, lockPosition: true, sortable: true },
                { headerName: "Email", field: "email", resizable: true, lockPosition: true, sortable: true },
                { headerName: "City", field: "city", resizable: true, lockPosition: true, sortable: true }
            ],
            rowData: []
        };

    }

    toggleColumns = (fields) => {
        this.gridColumnApi.setColumnsVisible(['firstname', 'lastname', 'age', 'email', 'city'], true);
        if(fields){
            this.gridColumnApi.setColumnsVisible(fields, false);
        }
    }

    fetchData = async (props) => {

        try {
            const { from, size } = props;
            console.log(from, size);

            const result = await fetch("http://localhost:3000/api/v1/bank/users", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    from: from,
                    size: size
                })
            });
            const data = await result.json();
            const rowData = data.map(index => {
                return index._source
            });
            this.setState({
                rowData: rowData
            });

        } catch (err) {
            console.log(err);
        }

    }

    fetchFilterdData = async (props) => {
        try {
            const { fieldKey, fieldValue } = props.gridFilterData;

            const result = await fetch("http://localhost:3000/api/v1/bank/users/search", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fieldKey: fieldKey,
                    fieldValue: fieldValue
                })
            });
            const data = await result.json();

            const rowData = data.map(index => {
                return index._source
            });
            this.setState({
                rowData: rowData
            });

        } catch (err) {
            console.log(err);
        }
    }

    onGridReady = (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        console.log(this.gridColumnApi.getColumnState());

        this.gridApi.sizeColumnsToFit();

        this.fetchData(this.props);
    }

    componentWillReceiveProps = (nextProps) => {

        this.toggleColumns(nextProps.gridFilterData.hiddenFields);

        const { from } = nextProps;
        if (from !== this.props.from) {
            this.fetchData(nextProps);
        }
        console.log(nextProps.gridFilterData);
        if (nextProps.gridFilterData.fieldValue !== "") {
            this.fetchFilterdData(nextProps);
        } else {
            this.fetchData(nextProps);
        }
    }

    render = () => {

        const { rowHeight, tableHeight } = this.state;
        let height = (this.state.rowData.length * rowHeight > tableHeight ? tableHeight : this.state.rowData.length * rowHeight) + rowHeight - 5;
        height = height === 35 ? 100 : height;

        return (
            <div
                className="ag-theme-balham"
                style={{
                    height: `${height}px`,
                    maxWidth: '100%'
                }}>
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}
                    rowHeight={rowHeight}
                    animateRows={true}
                    onGridReady={this.onGridReady}
                >
                </AgGridReact>
            </div>
        );
    }

}

export default Grid;
