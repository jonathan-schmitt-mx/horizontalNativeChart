import { createElement, useEffect, useRef, useState } from "react";
import { View, Animated } from "react-native";

interface BarContainerProps {
    barFlex: number;
    beginningFlex: number;
    name: string;
    id: string;
    color: string;
    overflowLeft: boolean;
    overflowRight: boolean;
}

export const Bar = (props: BarContainerProps): JSX.Element => {
    const { barFlex, beginningFlex, name, id, color, overflowLeft, overflowRight } = props;

    const [lastBarFlex, setLastBarFlex] = useState(0);
    const [lastBeginningFlex, setlastBeginningFlex] = useState(0);
    const [firstRender, setFirstRender] = useState(true);
    const FlexAnimationBeginning = useRef(new Animated.Value(0)).current;
    const FlexAnimation = useRef(new Animated.Value(0)).current;
    const FlexAnimationEnd = useRef(new Animated.Value(0)).current;
    const BarOpacityAnimation = useRef(new Animated.Value(0)).current;
    const TextOpacityAnimation = useRef(new Animated.Value(0)).current;

    function embiggenIn(lastBarFlex = 0, lastBeginningFlex = 0): void {
        FlexAnimation.setValue(lastBarFlex);
        FlexAnimationBeginning.setValue(lastBeginningFlex);
        FlexAnimationEnd.setValue(1 - lastBeginningFlex - lastBarFlex);
        TextOpacityAnimation.setValue(0);
        Animated.timing(FlexAnimation, {
            toValue: barFlex,
            duration: 3000,
            useNativeDriver: false
        }).start();
        Animated.timing(FlexAnimationBeginning, {
            toValue: beginningFlex,
            duration: 3000,
            useNativeDriver: false
        }).start();
        Animated.timing(FlexAnimationEnd, {
            toValue: 1 - beginningFlex - barFlex,
            duration: 3000,
            useNativeDriver: false
        }).start();
        Animated.timing(TextOpacityAnimation, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: false
        }).start();
    }

    function fadeIn(): void {
        BarOpacityAnimation.setValue(0);
        TextOpacityAnimation.setValue(0);
        Animated.timing(BarOpacityAnimation, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: false
        }).start();
    }

    useEffect(() => {
        console.log(barFlex);
        if (!Number.isNaN(barFlex) && FlexAnimation) {
            if (firstRender) {
                fadeIn();
                setFirstRender(false);
                embiggenIn(0, beginningFlex + barFlex / 2);
            } else {
                embiggenIn(lastBarFlex, lastBeginningFlex);
            }
            setLastBarFlex(barFlex);
            setlastBeginningFlex(beginningFlex);
        }
    }, [barFlex, beginningFlex]);

    return (
        <View
            key={id}
            style={{
                flexDirection: "row",
                marginTop: 4,
                marginBottom: 4,
                height: 21,
                flexBasis: 1
            }}
        >
            <Animated.View style={{ flex: FlexAnimationBeginning }}>
                {beginningFlex > barFlex && 2 * beginningFlex > 1 - barFlex && (
                    <Animated.Text
                        style={{
                            color: "#333",
                            fontSize: 16,
                            paddingRight: 5,
                            opacity: TextOpacityAnimation,
                            textAlign: "right"
                        }}
                    >
                        {name}
                    </Animated.Text>
                )}
            </Animated.View>
            <Animated.View
                style={{
                    backgroundColor: color,
                    borderRadius: 10,
                    flex: FlexAnimation,
                    opacity: BarOpacityAnimation,
                    flexDirection: "row",
                    minWidth: 1,
                    justifyContent: "center",
                    position: "relative"
                }}
            >
                {overflowLeft && (
                    <Animated.Text
                        style={{
                            color: "#EEE",
                            fontSize: 16,
                            fontWeight: "bold",
                            opacity: TextOpacityAnimation,
                            position: "absolute",
                            left: 4
                        }}
                    >
                        ←
                    </Animated.Text>
                )}
                {beginningFlex <= barFlex && 2 * barFlex >= 1 - beginningFlex && (
                    <Animated.Text
                        style={{
                            color: "#EEE",
                            fontSize: 16,
                            opacity: TextOpacityAnimation
                        }}
                    >
                        {name}
                    </Animated.Text>
                )}
                {overflowRight && (
                    <Animated.Text
                        style={{
                            color: "#EEE",
                            fontSize: 16,
                            fontWeight: "bold",
                            opacity: TextOpacityAnimation,
                            position: "absolute",
                            right: 4
                        }}
                    >
                        →
                    </Animated.Text>
                )}
            </Animated.View>
            <Animated.View style={{ flex: FlexAnimationEnd }}>
                {1 - beginningFlex > 2 * barFlex && 1 - barFlex > 2 * beginningFlex && (
                    <Animated.Text
                        style={{
                            color: "#333",
                            fontSize: 16,
                            paddingLeft: 5,
                            opacity: TextOpacityAnimation,
                            textAlign: "left"
                        }}
                    >
                        {name}
                    </Animated.Text>
                )}
            </Animated.View>
        </View>
    );
};
