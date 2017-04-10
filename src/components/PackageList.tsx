import * as React from "react";
import { PackageItem } from "./PackageItem";

export interface PackageListProps {
    packages: any
    
}
export interface PackageListState {
    selectionIndex : number
}
export class PackageList extends React.Component<PackageListProps, PackageListState> {
    constructor(props : PackageListProps) {
        super(props);
        this.state = {selectionIndex : -1};
        this.setSelectionIndex = this.setSelectionIndex.bind(this);
    }

    setSelectionIndex(idx : number)
    {
        this.setState({selectionIndex:idx});
    }

    render() {
        let pkgs = this.props.packages;
        let index = 0;
        let pkgElements = pkgs.map((item: any) => 
        <PackageItem data={item} selectionFunc={this.setSelectionIndex} selected={index == this.state.selectionIndex} index={index++} />);
        return (<div>{pkgElements}</div>);
    }
}
