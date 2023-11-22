import {Given, When} from "@badeball/cypress-cucumber-preprocessor";

const url = "https://www.webdriveruniversity.com/"

Given(`I navigate to the webdriveruniversity homepage`, function () {
  cy.visit(url);

});
When("I click on the contact us button", () => {
  cy.get("#contact-us").invoke("removeAttr","target").click();
})
