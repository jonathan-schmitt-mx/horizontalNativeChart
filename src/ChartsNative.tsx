// @ts-ignore
import { ReactNode, createElement, useState, useEffect } from "react";
import { TextStyle, ViewStyle, View, Text } from "react-native";

import { Style } from "@mendix/pluggable-widgets-tools";

import { ChartsNativeProps } from "../typings/ChartsNativeProps";
import { ObjectItem } from "mendix";

export interface CustomStyle extends Style {
    container: ViewStyle;
    label: TextStyle;
}

export const ChartsNative = (props: ChartsNativeProps<CustomStyle>): ReactNode => {
    const { data, bignessAttribute, qualAttribute } = props;
    //return (<View><Text style={{color: "#787", fontSize: 200}}>{JSON.stringify(data) + JSON.stringify(bignessAttribute)}</Text></View>);
    const [maxBigness, setMaxBigness] = useState(1);

    useEffect(() => {
        setMaxBigness(
            data.items
                ?.map(item => bignessAttribute.get(item).value)
                .reduce((max, item) => (item?.gt(max || 0) ? item : max))
                ?.toNumber() || 1
        );
    }, [data.status]);

    function getPercentOfParent(listObject: ObjectItem): number {
        return (bignessAttribute.get(listObject).value?.toNumber() || 0) / maxBigness;
    }

    return (
        <View >
            {data.items?.map(item => (
                <View key={item.id} style={{ flexDirection: "row", margin: 5 }}>
                    <View
                        style={{
                            backgroundColor: "#0CC",
                            borderRadius: 10,
                            flex: getPercentOfParent(item),
                            padding: 5,
                            flexDirection: "row-reverse"
                        }}
                    >
                        {getPercentOfParent(item) > 0.5 && (
                            <Text style={{ color: "#333", fontSize: 16 }}>{qualAttribute.get(item).displayValue}</Text>
                        )}
                    </View>
                    <View style={{ padding: 5, flexDirection: "row-reverse"}}>
                        {getPercentOfParent(item) <= 0.5 && (
                            <Text style={{ color: "#CCC", fontSize: 16 }}>{qualAttribute.get(item).displayValue}</Text>
                        )}
                    </View>
                </View>
            ))}
        </View>
    );
};
