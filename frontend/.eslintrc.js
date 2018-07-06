module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "parser": "babel-eslint",
    "plugins": [
        "react",
        "compat"
    ],
    "rules": {
        "compat/compat": "error",
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "comma-dangle": [
            "error",
            {
                "arrays": "ignore",
                "objects": "ignore",
                "imports": "ignore",
                "exports": "ignore"
            }
        ],
        "radix": [
            "error",
            "as-needed"
        ],
        "array-bracket-spacing": [
            "error",
            "always"
        ],
        "max-len": [
            "error",
            200
        ],
        "computed-property-spacing": [
            "error",
            "always"
        ]
    }
};