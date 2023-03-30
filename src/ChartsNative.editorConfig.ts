import { ChartsNativePreviewProps } from "../typings/ChartsNativeProps";

type Properties = PropertyGroup[];

type PropertyGroup = {
    caption: string;
    propertyGroups?: PropertyGroup[];
    properties?: Property[];
};

type Property = {
    key: string;
    caption: string;
    description?: string;
    objectHeaders?: string[]; // used for customizing object grids
    objects?: ObjectProperties[];
    properties?: Properties[];
};

type Problem = {
    property?: string; // key of the property, at which the problem exists
    severity?: "error" | "warning" | "deprecation"; // default = "error"
    message: string; // description of the problem
    studioMessage?: string; // studio-specific message, defaults to message
    url?: string; // link with more information about the problem
    studioUrl?: string; // studio-specific link
};

type ObjectProperties = {
    properties: PropertyGroup[];
    captions?: string[]; // used for customizing object grids
};

export function getProperties(_values: ChartsNativePreviewProps, defaultProperties: Properties): Properties {
    if (_values.manualDomain === false) {
        const configurationGroup = defaultProperties.find(property => property.caption === "Configuration");
        if (configurationGroup && configurationGroup.properties) {
            configurationGroup.properties = configurationGroup.properties.filter(
                property => !property.key.endsWith("Bound")
            );
        }
    }
    return defaultProperties;
}

export function check(_values: ChartsNativePreviewProps): Problem[] {
    const errors: Problem[] = [];
    if (
        _values.manualUpperBound !== "" &&
        _values.manualLowerBound !== "" &&
        _values.manualUpperBound <= _values.manualLowerBound
    ) {
        errors.push({
            property: `manualUpperBound`,
            message: `Upper bound must be strictly greater than the lower bound.`
        });
    }
    if (_values.manualDomain && (_values.manualLowerBound === "" || _values.manualUpperBound === "")) {
        errors.push({
            property: `manualDomain`,
            message: `Upper and Lower bound required if manual domain is specified.`
        });
    }
    return errors;
}
