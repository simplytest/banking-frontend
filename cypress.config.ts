import { defineConfig } from "cypress";
import * as createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";

export default defineConfig({
    e2e: {
        specPattern: "**/*.feature",

        async setupNodeEvents(
            on: Cypress.PluginEvents,
            config: Cypress.PluginConfigOptions
        ): Promise<Cypress.PluginConfigOptions>
        {
            await addCucumberPreprocessorPlugin(on, config);

            on("file:preprocessor", createBundler()
            );

            return config;
        },
    },

});
