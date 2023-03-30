import { createElement, useState, useEffect } from "react";
import { TextStyle, ViewStyle, View, Text } from "react-native";
// use react native animated library?
import { Style } from "@mendix/pluggable-widgets-tools";
import { ChartsNativeProps } from "../typings/ChartsNativeProps";
import { ChartXAxisComponent } from "./components/ChartXAxisComponent";
import { BarListComponent } from "./components/BarListComponent";

export interface CustomStyle extends Style {
    container: ViewStyle;
    label: TextStyle;
}

export const ChartsNative = (props: ChartsNativeProps<CustomStyle>): JSX.Element => {
    const {
        data,
        bignessAttribute,
        qualAttribute,
        topBarColor,
        bottomBarColor,
        xAxisLabel,
        manualUpperBound,
        manualLowerBound
    } = props;

    const [upperBound, setupperBound] = useState(1);
    const [lowerBound, setlowerBound] = useState(0);
    const [rangeCalculated, setRangeCalculated] = useState(false);

    useEffect(() => {
        if (data?.items) {
            const numbersOfAmbigousRelativeBigness = data?.items.map(
                item => bignessAttribute.get(item).value?.toNumber() || 0
            );
            setupperBound(
                manualUpperBound?.value
                    ? manualUpperBound.value?.toNumber()
                    : Math.max(...numbersOfAmbigousRelativeBigness, 0)
            );
            setlowerBound(
                manualLowerBound?.value
                    ? manualLowerBound.value?.toNumber()
                    : Math.min(...numbersOfAmbigousRelativeBigness, 0)
            );
            setRangeCalculated(true);
        }
    }, [data, data.items, bignessAttribute, manualLowerBound?.value, manualUpperBound?.value]);

    return (
        <View style={{ padding: 20 }}>
            {data.items?.length === 0 && (
                <Text style={{ color: "#333", fontSize: 16, textAlign: "center", padding: 3 }}>No items found...</Text>
            )}
            {data.items && rangeCalculated && (
                <BarListComponent
                    barList={data.items.map(item => {
                        return {
                            bigness:
                                bignessAttribute.get(item).status === "available"
                                    ? bignessAttribute.get(item).value?.toNumber() || 0
                                    : 0,
                            name: qualAttribute.get(item).value || "",
                            id: item.id.toString() || ""
                        };
                    })}
                    bottomBarColor={bottomBarColor.value?.toString() || "#0CC"}
                    topBarColor={topBarColor.value?.toString() || "#C0C"}
                    upperBound={upperBound}
                    lowerBound={lowerBound}
                />
            )}
            {(data.items?.length || 0) > 0 && (
                <View>
                    <ChartXAxisComponent lowerBound={lowerBound} upperBound={upperBound} />
                    <Text style={{ color: "#333", fontSize: 16, textAlign: "center", padding: 3 }}>
                        {xAxisLabel.value}
                    </Text>
                </View>
            )}
        </View>
    );
};
