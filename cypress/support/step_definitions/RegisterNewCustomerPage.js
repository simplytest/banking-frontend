import {When} from "@badeball/cypress-cucumber-preprocessor";

When("I type a first name {string} and a last name {string}", (firstName,lastName) => {
  cy.get("#firstName").type(firstName);
  cy.get("#lastName").type(lastName);
})
When("I type a password {}", (password) => {
  cy.get("#password").type(password);
})
When("I enter street name {} a house number {}", (street,house) => {
  cy.get("#street").type(street);
  cy.get("#house").type(house);
})
When("I enter a postcode {} a city {} and a country {}", (zipCode, city,country) => {
  cy.get("#zipCode").type(zipCode);
  cy.get("#city").type(city);
  cy.get("#country").type(country);
})
When("I enter an email {}", (email) => {
  cy.get("#email").type(email);
})
When("I enter a birthDate {}", (birthDate) => {
  cy.get("#birthDay").type(birthDate);
})

When("When I click on Registrieren button again", () => {
  cy.get('[data-testid=\"register_button\"]').invoke("removeAttr","target").click();
})
