/**
 * This file was generated from ChartsNative.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { DynamicValue, ListValue, ListAttributeValue } from "mendix";
import { Big } from "big.js";

export interface ChartsNativeProps<Style> {
    name: string;
    style: Style[];
    data: ListValue;
    bignessAttribute: ListAttributeValue<Big>;
    qualAttribute: ListAttributeValue<string>;
    xAxisLabel: DynamicValue<string>;
    topBarColor: DynamicValue<string>;
    bottomBarColor: DynamicValue<string>;
    manualDomain: boolean;
    manualLowerBound?: DynamicValue<Big>;
    manualUpperBound?: DynamicValue<Big>;
}

export interface ChartsNativePreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    data: {} | { type: string } | null;
    bignessAttribute: string;
    qualAttribute: string;
    xAxisLabel: string;
    topBarColor: string;
    bottomBarColor: string;
    manualDomain: boolean;
    manualLowerBound: string;
    manualUpperBound: string;
}
