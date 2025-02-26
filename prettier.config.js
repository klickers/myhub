// https://prettier.io/docs/en/options.html
/** @type {import('prettier').RequiredOptions} */
module.exports = {
    trailingComma: "es5",
    bracketSpacing: true,
    tabWidth: 4,
    semi: false,
    singleQuote: false,
    arrowParens: "always",
    options: {
        printWidth: 80,
    },
    overrides: [
        {
            files: "Routes.*",
            options: {
                printWidth: 999,
            },
        },
    ],
}
