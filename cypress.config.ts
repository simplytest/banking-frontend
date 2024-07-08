import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import registerCodeCoverageTasks from "@cypress/code-coverage/task";
import { defineConfig } from "cypress";
import coverageWebpack from "./cypress/coverage.webpack";

export default defineConfig({
    e2e: {
        specPattern: "**/e2e/*.{spec.ts,feature}",
        baseUrl: "http://localhost:4200/",
        blockHosts: "fonts.googleapis.com",

        async setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions)
        {
            registerCodeCoverageTasks(on, config);
            await addCucumberPreprocessorPlugin(on, config);

            on(
                "file:preprocessor",
                createBundler({
                    plugins: [createEsbuildPlugin(config)],
                })
            );

            return config;
        },
        env: {
            backendUrl: "http://localhost:5005",
            codeCoverageTasksRegistered: true,
            register_page : "registerNewCustomer",
            dashboard_page: "dashboard",//Anmeldung
            main_page: "mainPage",
            createAcconut_page: "createAccount",
            kundendatenAendern_page: "registerForm"
        },
    },

    component: {
        devServer: {
            webpackConfig: coverageWebpack,
            framework: "angular",
            bundler: "webpack",
        },
        specPattern: "**/*.cy.ts",

        setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions)
        {
            registerCodeCoverageTasks(on, config);
            return config;
        },

        env: {
            codeCoverageTasksRegistered: true,
        },
    },
});
