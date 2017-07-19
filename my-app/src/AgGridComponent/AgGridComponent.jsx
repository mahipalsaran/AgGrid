import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import requestCreator from './../FetchApi/request-creator';

export default class AgGridComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [],
            rowData: [],
            response: {},
            gridData: []
        }
    }

    componentDidMount() {
        debugger;
        let _this = this;
        let req_SampleJSON = requestCreator.createNewRequest('../Fixtures/data.json', 'GET');

        Promise.all([req_SampleJSON]).then(function(response) {
            debugger;
            _this.state.gridData = response;
            _this.createColumnDefs();
            _this.createRowData();
        }).catch(function(error) {
            //do error handling here
            console.log(error);
        });

    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;

        this.gridApi.sizeColumnsToFit();
        // const paginationPanel = '#productHierarchyGridWrapper .ag-paging-page-summary-panel';
        // commonFn.paginationButtonsEnableDisable(paginationPanel);
    }

    createColumnDefs() {
        debugger;
        let gridData = Object.keys(this.state.gridData[0][0].main.DATA_RECORD[0]);
        let finalColDef = [];
        for (var i = 0; i < gridData.length; i++) {
            finalColDef.push({ headerName: gridData[i], field: gridData[i] });
        }
        this.setState({
            columnDefs: finalColDef
        });
    }

    createRowData() {
        this.setState({
            rowData: this.state.gridData[0][0].main.DATA_RECORD
        });
    }

    // onModelUpdated(params) {
    //     debugger;
    //     const paginationPanel = '#agGridId .ag-paging-page-summary-panel';
    //     commonFn.paginationButtonsEnableDisable(paginationPanel);
    // }


    render() {
        console.log("Data is : ", this.state.response);
        let agGrid = (
            <div className="ag-fresh sampleGrid">
				<AgGridReact
                    isScrollLag={false}
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}
                    enableSorting= {true}
                    onGridReady={this.onGridReady}
                    rowHeight = {20}
                    rowBuffer = {20}
                    suppressSorting = {true}
                    suppressScrollLag = {true}
                    suppressMovableColumns = {false}
                    enableColResize = {true}
                    rowSelection = "single"
                    rowModelType= 'infinite'
                    paginationPageSize= {100}/>
			</div>
        );

        return (
            <div className="agGridWrapper">
                {agGrid}
            </div>
        )
    }
}
