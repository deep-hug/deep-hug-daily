module.exports = {
    root: true,
    extends: ["plugin:vue/essential"],
    parserOptions: {
        parser: "babel-eslint",
        sourceType: "module",
        allowImportExportEverywhere: true
    },
    rules: {
        semi: ["warn", "always"],
        quotes: ["warn", "single"],
        "no-unused-vars": [
            "warn",
            {
                args: "none",
                vars: "local",
                args: "none"
            }
        ],
        "require-jsdoc": [
            "warn",
            {
                require: {
                    FunctionDeclaration: true
                }
            }
        ]
    }
};