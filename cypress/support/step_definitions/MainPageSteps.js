import {Then} from "@badeball/cypress-cucumber-preprocessor";

Then("I should be presented with a greeting text {}",(greeting) => {
  cy.get("#customerLabel").contains(greeting);
})


