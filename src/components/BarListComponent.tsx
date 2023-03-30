import { createElement } from "react";
import { View } from "react-native";
import * as chroma from "chroma.ts";
import { Bar } from "./Bar";

interface BarListComponentProps {
    barList: Array<{ bigness: number; name: string; id: string }>;
    topBarColor: string;
    bottomBarColor: string;
    upperBound: number;
    lowerBound: number;
}

export const BarListComponent = (props: BarListComponentProps): JSX.Element => {
    const { barList, topBarColor, bottomBarColor, upperBound, lowerBound } = props;

    function intersect(lower1: number, upper1: number, lower2: number, upper2: number): number {
        if (lower1 >= upper2 || lower2 >= upper1) {
            return 0;
        }
        return Math.min(upper1, upper2) - Math.max(lower1, lower2);
    }

    function getPercentOfParent(bigness: number): number {
        console.log(bigness);
        let lowerBoundBarValue;
        let highestBignessBarValue;
        if (bigness > 0) {
            lowerBoundBarValue = 0;
            highestBignessBarValue = bigness;
        } else {
            lowerBoundBarValue = bigness;
            highestBignessBarValue = 0;
        }
        return (
            intersect(lowerBoundBarValue, highestBignessBarValue, lowerBound, upperBound) /
            Math.abs(upperBound - lowerBound)
        );
    }

    function getStartPosition(bigness: number): number {
        const lowerBoundBarValue = bigness < 0 ? bigness : 0;
        const bignessDiff = lowerBoundBarValue - lowerBound;
        return bignessDiff > 0 ? bignessDiff / Math.abs(upperBound - lowerBound) : 0;
    }

    function getBarColor(totalItems: number, barIndex: number): string {
        const interpolation = chroma.scale([topBarColor, bottomBarColor]);
        return interpolation(barIndex / (totalItems - 1)).css();
    }

    return (
        <View style={{ position: "relative" }}>
            {barList.map((item, index) => {
                return (
                    <Bar
                        barFlex={getPercentOfParent(item.bigness)}
                        beginningFlex={getStartPosition(item.bigness)}
                        id={item.id}
                        key={item.id}
                        color={getBarColor(barList.length, index)}
                        name={item.name}
                        overflowLeft={item.bigness < lowerBound}
                        overflowRight={item.bigness > upperBound}
                    />
                );
            })}
        </View>
    );
};
