/// <reference types="cypress" />
import { Then, When } from "@badeball/cypress-cucumber-preprocessor";
import CreateAccountPagePO from "../pageObjects/CreateAccountPagePO";

const createAccountPage = new CreateAccountPagePO();


Then("I should be presented with a header text {}", (headerText) =>
{
    cy.get("[body > div.container > h3]").contains(headerText);
});

When("I click on Giro-Konto button", () =>
{
    createAccountPage.clickOnGiroKontoButton();

});

When("I click on Festgeld-Konto button", () =>
{
    createAccountPage.clickOnFestgeldKontoButton();
});

When("I click on Tagesgeld-Konto button", () =>
{
    createAccountPage.clickOnTagesgeldKontoButton();
});

When("I click on Immobilien-Finanzierungskonto button", () =>
{
    createAccountPage.clickOnImmobilienFinanzierungskontoButton();
});

When("I type Kredit Beitrag {} and Tilgung Rate {}", (kreditBeitrag, tilgungRate) =>
{
    createAccountPage.typeKreditBeitrag(kreditBeitrag);
    createAccountPage.typeTilgungRate(tilgungRate);
});

Then("I should be presented an alert box with text Immobilien-Finanzierungskonto Erstellen", () =>
{
    cy.get("[id=\"mat-mdc-dialog-title-0\"]").contains("Immobilien-Finanzierungskonto Erstellen");
});

Then("I should be presented with a created Giro Konto", () =>
{
    cy.get("[id=\"1.kontotyp\"]").contains("Giro");
});
Then("I should be presented with a created Festgeld-Konto called FixedRate", () => {
    cy.get("[id=\"2.kontotyp\"]").contains("FixedRate");
});
Then("I should be presented with a created Tagesgeld-Konto called OnCall", () => {
    cy.get("[id=\"3.kontotyp\"]").contains("OnCall");
});

When("I click on Kredit Anfordern Button", () =>
{
    cy.get("[data-testid=\"create_real_estate_button\"]").click();
});

Then("I should be presented with a created  Immobilien-Finanzierungskonto called RealEstate", () => {
    cy.get("[id=\"4.kontotyp\"]").contains("RealEstate");
});
Then("Kontostand amount is {} $", () => {
    cy.get("id=\"4.kontostand\"]").contains(kreditBeitrag);
});
Then("I click on delete konto button",() => {
    cy.get("[id=\"1-kontoschließen\"]").click();
})
