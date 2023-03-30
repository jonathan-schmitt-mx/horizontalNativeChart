const base = require("@mendix/pluggable-widgets-tools/configs/eslint.ts.base.json");

module.exports = {
    ...base,
    rules: {
        ...base.rules,
        "react-hooks/exhaustive-deps": "off"
    },
    globals: {
        JSX: true
    }
};
