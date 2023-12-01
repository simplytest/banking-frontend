// cypress/support/cypress-cucumber-preprocessor.js

import cucumber from "cypress-cucumber-preprocessor";

export default (on, config) => {
  on("file:preprocessor", cucumber());

  config.stepDefinitions = [
    "cypress/e2e/Login.feature/**/*.{js,ts}",
    "cypress/e2e/feature2/**/*.{js,ts}",
    "cypress/e2e/feature3/**/*.{js,ts}",
    "cypress/e2e/feature4/**/*.{js,ts}",
    "cypress/support/step_definitions/**/*.{js,ts}"
  ];

  return config;
};

