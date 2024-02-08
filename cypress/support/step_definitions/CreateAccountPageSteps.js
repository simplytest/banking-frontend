/// <reference types="cypress" />
import { Then, When } from "@badeball/cypress-cucumber-preprocessor";
import CreateAccountPagePO from "../pageObjects/CreateAccountPagePO";

const createAccountPage = new CreateAccountPagePO();

/*      When        */

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

When("I click on Kredit Anfordern Button", () =>
{
    createAccountPage.typeKreditBeitrag("1000");
    createAccountPage.typeTilgungRate("100");
    createAccountPage.clickKreditAnfordernButton();
});

/*      Then        */

Then("I should be presented an alert box with text Immobilien-Finanzierungskonto Erstellen", () =>
{
    cy.get("[data-testid='title']").contains("Immobilien-Finanzierungskonto Erstellen");
});

Then("I should be presented with a created Giro Konto", () =>
{
    cy.get("[id=\"1.kontotyp\"]").contains("Giro");
});
Then("I should be presented with a created Festgeld-Konto called FixedRate", () =>
{
    cy.get("[id=\"2.kontotyp\"]").contains("FixedRate");
});
Then("I should be presented with a created Tagesgeld-Konto called OnCall", () =>
{
    cy.get("[id=\"3.kontotyp\"]").contains("OnCall");
});

Then("I should be presented with a created  Immobilien-Finanzierungskonto called RealEstate", () =>
{
    cy.get("[id=\"4.kontotyp\"]").contains("RealEstate");
});
