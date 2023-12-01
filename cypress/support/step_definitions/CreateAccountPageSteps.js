import { Then, When } from "@badeball/cypress-cucumber-preprocessor";
import CreateAccountPagePO from "../pageObjects/CreateAccountPagePO";

const createAccountPage = new CreateAccountPagePO();

Then("I should be presented with a header text {}", (headerText) =>
{
    cy.get("body > div.container > h3").contains(headerText);
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

Then("I should be presented with an Immobilien-Finanzierungskonto Erstellen alert box containing text {}", (expectedAlertText) =>
{
    cy.get("#mat-mdc-dialog-title-1").contains(expectedAlertText);
});

Then("I should be presented with a created Konto type text {}", (kontoTyp) =>
{
    cy.get("[id=\"1.kontotyp\"]").contains(kontoTyp);
});

When("I click on Kredit Anfordern Button", () =>
{
    cy.get("").click();
});
