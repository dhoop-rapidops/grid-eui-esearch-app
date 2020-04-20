import React from "react";
import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiPopover,
    EuiPagination,
    EuiContextMenuItem,
    EuiButtonEmpty,
    EuiContextMenuPanel,
    EuiSpacer
} from "@elastic/eui";
import Grid from "./Grid";

class Pagination extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pageCount: 0,
            isPopoverOpen: false,
            activePage: 0,
            totalPages: 20,
            totalRows: 0
        }
    }

    onButtonClick = () => {
        this.setState({
            isPopoverOpen: !this.state.isPopoverOpen
        });
    }

    closePopover = () => {
        this.setState({
            isPopoverOpen: false
        })
    }

    goToPage = (pageNumber) => {
        console.log(pageNumber);
        this.setState({
            activePage: pageNumber
        });
    }

    button = () => {
        return (
            <EuiButtonEmpty
                size="s"
                color="text"
                iconType="arrowDown"
                iconSide="right"
                onClick={this.onButtonClick}>
                Rows per page: {this.state.totalPages}
            </EuiButtonEmpty>
        );
    }

    items = () => {
        const arr = [10, 20, 50, 100];
        return arr.map(cnt => {
            return (
                <EuiContextMenuItem
                    key={`${cnt} rows`}
                    icon={this.state.totalPages === cnt ? 'check' : 'empty'}
                    onClick={() => {
                        this.closePopover();
                        this.setState({
                            totalPages: cnt,
                            activePage: 0,
                            pageCount: parseInt(this.state.totalRows / cnt)
                        });
                    }}>
                    {cnt} rows
                </EuiContextMenuItem>
            );
        });
    }

    componentDidMount = async () => {
        try {
            const result = await fetch("http://localhost:3000/api/v1/bank/count");
            const data = await result.json();
            this.setState({
                totalRows: data.count,
                pageCount: parseInt(data.count / this.state.totalPages)
            });

        } catch (err) {

        }
    }

    render = () => {
        const _from = this.state.activePage * this.state.totalPages;
        const _size = this.state.totalPages;
        return (
            <React.Fragment>
                <Grid from={_from} size={_size} gridFilterData={this.props.gridFilterData} />
                <EuiSpacer />
                <EuiFlexGroup justifyContent="spaceBetween" alignItems="center">
                    <EuiFlexItem grow={false}>
                        <EuiPopover
                            button={this.button()}
                            isOpen={this.state.isPopoverOpen}
                            closePopover={this.closePopover}
                            panelPaddingSize="none">
                            <EuiContextMenuPanel items={this.items()} />
                        </EuiPopover>
                    </EuiFlexItem>

                    <EuiFlexItem grow={false}>
                        {
                            this.props.gridFilterData.fieldValue.length < 1 && <EuiPagination
                                pageCount={this.state.pageCount}
                                activePage={this.state.activePage}
                                onPageClick={this.goToPage}
                            />
                        }
                    </EuiFlexItem>
                </EuiFlexGroup>
            </React.Fragment>
        );
    }

}

export default Pagination;