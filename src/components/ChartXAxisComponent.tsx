import { createElement } from "react";
import { View, Text } from "react-native";
import "intl";
import "intl/locale-data/jsonp/en";

interface ChartXAxisComponentProps {
    lowerBound: number;
    upperBound: number;
}

export const ChartXAxisComponent = (props: ChartXAxisComponentProps): JSX.Element => {
    const { lowerBound, upperBound } = props;

    function getStepList(lowerBound: number, upperBound: number): number[] {
        const stepList = [];
        for (let i = 0; i < 7; i++) {
            stepList.push(((upperBound - lowerBound) * i) / 6 + lowerBound);
        }
        return stepList;
    }

    function getItemVanity(item: number): string {
        return Intl.NumberFormat("en", { notation: "compact" }).format(item);
    }

    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", height: 21 }}>
            {getStepList(lowerBound, upperBound).map((item, index) => (
                <View key={index} style={{ backgroundColor: "blue" }}>
                    <View
                        style={{
                            position: "absolute"
                        }}
                    >
                        <Text
                            key={index}
                            style={{
                                color: "#333",
                                fontSize: 16,
                                left: "-50%",
                                alignSelf: "center"
                            }}
                        >
                            {getItemVanity(item)}
                        </Text>
                    </View>
                </View>
            ))}
        </View>
    );
};
