import {Given, Then, When} from "@badeball/cypress-cucumber-preprocessor";

let stub;

Given ("I navigate to the Banking App dashboard page", () => {
  cy.visit("http://localhost:4200/")
})
When("When I click on Registrieren button", () => {
  cy.get("#registerButton").invoke("removeAttr","target").click();
})
When("I type a Contract ID {}",(contractID) => {
  cy.get("[name='contractID']").type(contractID);
})
When("I type a Password {}",(password) => {
  cy.get("[name='password']").type(password)
})
When("I click on login button", () => {
  cy.get("[type='submit']").invoke("removeAttr","target").click();
})
When("I type an invalid Password {}", (password) => {
  cy.get("[name='password']").type(password)
})

Then("I should be presented with an alert box containing text {}", (expectedAlertText) => {
  cy.get("#mat-mdc-dialog-title-0").contains(expectedAlertText);
  //expect(stub).to.have.been.calledWith(expectedAlertText)
});

