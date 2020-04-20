import React, { Component } from "react";
import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiFieldSearch,
    EuiFormRow,
    EuiSelect
} from "@elastic/eui"

class Filter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fieldOptions: []
        }
    }

    componentDidMount = () => {
        const fields = this.props.fields.map(field => {
            return { value: field, text: this.capitalize(field) }
        });
        this.setState({
            fieldOptions: fields
        });
    }

    capitalize = (value) => {
        return value.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    };

    render = () => {
        return (

            <EuiFlexGroup gutterSize="s" alignItems={"flexEnd"}>
                <EuiFlexItem grow={false}>
                    <EuiFormRow label="Filter data">
                        <EuiSelect
                            options={this.state.fieldOptions}
                            value={this.props.fieldKey}
                            onChange={this.props.fieldKeyHandler} />
                    </EuiFormRow>
                </EuiFlexItem>

                <EuiFlexItem grow={false}>
                    <EuiFieldSearch
                        placeholder="Type in your filter value.."
                        value={this.props.searchValue}
                        onChange={this.props.searchHandler}
                        isClearable={true}
                    />
                </EuiFlexItem>
            </EuiFlexGroup>

        );
    }

}

export default Filter;

