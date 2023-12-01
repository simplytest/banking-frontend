module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    overrides: [
        {
            env: {
                node: true,
            },
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["@typescript-eslint"],
    rules: {
        "object-curly-spacing": ["error", "always"],
        "brace-style": ["error", "allman"],
        quotes: ["error", "double"],
        semi: ["error", "always"],
        "linebreak-style": ["error", "unix"],
        indent: ["error", 4],
        "@typescript-eslint/no-explicit-any": "off",
        "no-else-return": 1,
        "space-unary-ops": 2,
        "keyword-spacing": ["error", {
            "before": true,
            "after": true,
        }],
        "arrow-spacing": "error",
        "comma-spacing": ["error", { "before": false, "after": true }],
        "space-infix-ops": ["error", { "int32Hint": false }],
        "space-before-blocks": ["error", { "functions": "always", "keywords": "always", "classes": "always" }],
        "no-multi-spaces": "error",
        "no-trailing-spaces": "error",
        "no-multiple-empty-lines": ["error", { "max": 1 }],
        "comma-dangle": ["error", {
            "arrays": "always-multiline",
            "objects": "always-multiline",
        }],
        "semi-spacing": "error",
        "key-spacing": [2, {
            "singleLine": {
                "beforeColon": false,
                "afterColon": true,
            },
            "multiLine": {
                "beforeColon": false,
                "afterColon": true,
            },
        }],
    },
};
