import React, { Component } from "react";
import Filter from "./Filter";
import { EuiSpacer, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import Pagination from "./Pagination";
import Gear from "./Gear";

class User extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hiddenFields: [],
            searchValue: '',
            fieldKey: 'firstname',
            fields: ['firstname', 'lastname', 'age', 'email', 'city']
        }   
    }

    onFieldKeyHandler = (e) => {
        this.setState({
            fieldKey: e.target.value
        });
    }

    onSearchField = (e) => {
        this.setState({
            searchValue: e.target.value
        });
    }

    isIncluded = (key) => {
        return this.state.hiddenFields.includes(key);
    }


    toggleIncludeField = (key) => {
        if (this.isIncluded(key)) {
            const arr = this.state.hiddenFields;
            arr.splice(arr.findIndex(field => field === key), 1);
            this.setState({
                hiddenFields: arr
            });
        } else {
            this.setState(prev => ({
                hiddenFields: [...prev.hiddenFields, key]
            }));
        }
    }
    
    render = () => {
        return (
            <React.Fragment>
                <EuiFlexGroup gutterSize="s" alignItems={"center"} justifyContent="spaceBetween">
                    <Filter 
                        searchHandler={this.onSearchField} 
                        searchValue={this.state.searchValue}
                        fieldKey={this.state.fieldKey}
                        fieldKeyHandler={this.onFieldKeyHandler}
                        fields={this.state.fields}
                        />
                    <EuiFlexItem grow={false}>
                        <Gear 
                            fields={this.state.fields}
                            hiddenFields={this.state.hiddenFields}
                            toggleIncludeField={this.toggleIncludeField} />
                    </EuiFlexItem>
                </EuiFlexGroup>
                <EuiSpacer />
                <Pagination gridFilterData={{
                    fieldKey: this.state.fieldKey,
                    fieldValue: this.state.searchValue,
                    hiddenFields: this.state.hiddenFields
                }} />
            </React.Fragment>
        );
    }

}

export default User;

