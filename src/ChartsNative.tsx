import { Component, ReactNode, createElement } from "react";

import { View } from "react-native";

import { Style } from "@mendix/pluggable-widgets-tools";

import { ChartsNativeProps } from "../typings/ChartsNativeProps";

export interface CustomStyle extends Style {
    container: ViewStyle;
    label: TextStyle;
}

export class ChartsNative extends Component<ChartsNativeProps<CustomStyle>> {
    render(): ReactNode {
        return <View>"Gobbledeegook."</View>;
    }
}
