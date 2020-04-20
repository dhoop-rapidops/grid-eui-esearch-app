import React from "react";
import {
    EuiContextMenuItem,
    EuiButtonIcon,
    EuiPopover,
    EuiContextMenuPanel
} from "@elastic/eui"

class Gear extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isPopoverOpen: false,
        }
    }


    onGearClickHandler = (e) => {
        this.setState({
            isPopoverOpen: !this.state.isPopoverOpen
        });
    }

    closePopover = () => {
        this.setState({
            isPopoverOpen: false
        });
    }

    button = (
        <EuiButtonIcon
            color={'primary'}
            iconType="gear"
            onClick={this.onGearClickHandler}
        />
    )

    items = () => {
        const fieldsName = this.props.fields;

        return fieldsName.map(field => {
            return (
                <EuiContextMenuItem
                    key={field}
                    icon={ this.props.hiddenFields.includes(field) ? 'eyeClosed' : 'eye'}
                    onClick={() => {
                        this.closePopover();
                        this.props.toggleIncludeField(field);
                    }}>
                    {field}
                </EuiContextMenuItem>
            );
        });

    }

    render = () => {
        return (
            <EuiPopover
                button={this.button}
                isOpen={this.state.isPopoverOpen}
                closePopover={this.closePopover}
                panelPaddingSize="none"
                anchorPosition="downLeft">
                <EuiContextMenuPanel items={this.items()} />
            </EuiPopover>
        );
    }

}

export default Gear;