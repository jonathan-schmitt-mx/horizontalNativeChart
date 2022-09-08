/**
 * This file was generated from ChartsNative.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { EditableValue, ListValue } from "mendix";
import { Big } from "big.js";

export interface ChartsNativeProps<Style> {
    name: string;
    style: Style[];
    listAttribute: EditableValue<Big>;
    data: ListValue;
}

export interface ChartsNativePreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    listAttribute: string;
    data: {} | { type: string } | null;
}
