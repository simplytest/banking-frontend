import {When, Then} from "@badeball/cypress-cucumber-preprocessor";

When("I type first name", () => {
  cy.get("[name='first_name']").type("John");
})

When("I type last name", () => {
  cy.get("[name='last_name']").type("Doe");
})
When("I enter email address", () => {
  cy.get("[name='email']").type("john@doe.com");
})
When("I type a comment", () => {
  cy.get("textarea[name='message']").type("Hello there");
})
When("I click on submit button", () => {
  cy.get("[type=\"submit\"]").click();
})
Then("I should be presented with a successful contact us submission message", () => {
  cy.get("h1").should("have.text", "Thank You for your Message!")
})

Then("I should be presented with an unsuccessful contact us submission message", () => {
  cy.get("body").contains("Error: Invalid email address");
})

When("I type a specific first name {string}", (firstName) => {
  cy.get("[name='first_name']").type(firstName);
})

When("I type a specific last name {string}", (lastName) => {
  cy.get("[name='last_name']").type(lastName);
});

When("I type a specific email address {string}", (email) => {
  cy.get("[name='email']").type(email);
});

When("I type a specific word {string} and number {int} pieces {string} within the comment field", (word, number, pieces) => {
  cy.get("textarea[name='message']").type(word + number + " " + pieces);
});

When("I type a first name {word} and a last name {string}", (firstName, lastName) => {
  cy.get("[name='first_name']").type(firstName);
  cy.get("[name='last_name']").type(lastName);
})

When("I enter email {string} and a comment {string}", (email, comment) => {
  cy.get("[name='email']").type(email);
  cy.get("textarea[name='message']").type(comment);
})

Then("I should be presented with a header text {string}", (message) => {
  cy.contains("h1, body", message);
})
