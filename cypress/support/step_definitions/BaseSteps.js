import {When,Before,After} from "@badeball/cypress-cucumber-preprocessor";

Before(() => {
  cy.log("executes before scenario");
  cy.clearLocalStorage();
});

After(()=> {
  cy.log("executes after scenario");

})
