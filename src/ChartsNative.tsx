import { Component, ReactNode, createElement } from "react";
import { TextStyle, ViewStyle } from "react-native";

import { Style } from "@mendix/pluggable-widgets-tools";

import { HelloWorld } from "./components/HelloWorld";
import { ChartsNativeProps } from "../typings/ChartsNativeProps";

export interface CustomStyle extends Style {
    container: ViewStyle;
    label: TextStyle;
}

export class ChartsNative extends Component<ChartsNativeProps<CustomStyle>> {
    render(): ReactNode {
        return <HelloWorld name={this.props.yourName} style={this.props.style} />;
    }
}
