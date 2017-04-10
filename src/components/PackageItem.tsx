import * as React from "react";

export interface SetSelectionFunc
{
    (index:number):void
}

export interface PackageItemProps 
{ 
    data:any,
    index : number,
    selectionFunc : SetSelectionFunc,
    selected : boolean
}

export interface PackageItemState 
{
     expanded:boolean
}

export class PackageItem extends React.Component<PackageItemProps, PackageItemState> {
    constructor(props:PackageItemProps){
        super(props);
        this.state = {expanded:false};
        this.toggleExpandedState = this.toggleExpandedState.bind(this);
        this.packageItemClicked = this.packageItemClicked.bind(this);
    }

    toggleExpandedState()
    {
        let currentState = this.state.expanded;
        this.setState({expanded: !currentState});
    }

    packageItemClicked() {
        this.props.selectionFunc(this.props.index);
    }

    render() {
        let pkg = this.props.data;
        let desc:string = pkg.description;

        let expandString = "";
        if(desc.length > 140) {
            if(!this.state.expanded) {
                desc = desc.substr(0,140) + "...";
                expandString = "[Expand]";
            }
            else{
                desc=pkg.description;
                expandString = "[Collapse]";
            }
        }
        let panelSelected = this.props.selected ? "ItemLeftPanelSelected" : "ItemLeftPanel";

        return (<div className="ItemContainer" onClick={this.packageItemClicked}>
                <div className={panelSelected}>
                    <img className="PackageIcon" src="resources/icons/package.png" />
                </div>
                <div className="ItemRightPanel">
                    <div className="PackageCaption">{pkg.name}
                        <span className="PackageVersion">{pkg.versions[0].version}</span>
                    </div>
                    <div className="PackageAuthor">{pkg.maintainers[0].username}</div>
                    <div className="PackageDescription">{desc}</div>
                    <div className="ExpandToggle" onClick={this.toggleExpandedState}>{expandString}</div>
                </div>
            </div>);
    }
}