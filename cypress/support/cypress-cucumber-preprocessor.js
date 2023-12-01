// cypress/support/cypress-cucumber-preprocessor.js

import cucumber from "cypress-cucumber-preprocessor";

export default (on, config) =>
{
    on("file:preprocessor", cucumber());

    config.stepDefinitions = [
        "cypress/support/step_definitions/**/*.{js,ts}",
    ];

    return config;
};

