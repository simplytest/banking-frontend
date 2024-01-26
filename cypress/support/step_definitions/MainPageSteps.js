/// <reference types="cypress" />

import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import MainPagePO from "../pageObjects/MainPagePO";

const mainPage = new MainPagePO();

function angularInputFieldHelperByDataTestID(value, identifier)
{
    const betrag = value.split("");

    cy.get("[data-testid='" + identifier + "']").focus();
    cy.get("[data-testid='" + identifier + "']").clear();

    for (let part of betrag)
    {
        cy.get("[data-testid='" + identifier + "']").type(part);
    }
}

/*      Given        */

Given("I navigate to the Banking App main page", () =>
{
    mainPage.navigateToMainPage();
});

/*      When        */

When("I click on Konto erstellen button", () =>
{
    mainPage.clickOnKontoErstellenButton();
});

When("I click on Double Arrows button to sent money to my other account", () =>
{
    cy.get("[id=\"0-transferieren\"]").click();
});

When("I type a Betrag {string}", (geldbetrag) =>
{
    angularInputFieldHelperByDataTestID(geldbetrag, "amount_input");
});

When("I select the desired account", () =>
{
    cy.get("[id$=':00002']").click();
});

When("I click on Geld übertragen button", () =>
{
    cy.get("[data-testid=\"transfer_money_button\"]").click();
});

When("I click on Close button", () =>
{
    cy.get("[data-testid='close_button']").click();
});

When("I click on Arrow button to receive money into my account", () =>
{
    cy.get("[id=\"0-empfangen\"]").click();
});

When("I type a Geldbetrag {string}", (betrag) =>
{
    angularInputFieldHelperByDataTestID(betrag, "receiveMoney_input");
});

When("I click on Geld empfangen button", () =>
{
    cy.get("[data-testid='send_money_button']").click();
});

When("I click on money button to send money to someone else account", () =>
{
    cy.get("[id=\"0-ueberweisen\"]").click();
});

When("I type a desired Geldbetrag {string}", (geldbetrag) =>
{
    angularInputFieldHelperByDataTestID(geldbetrag, "send_amount");
});

When("I type a Ziel IBAN {}", (iban) =>
{
    cy.get("[data-testid='send_iban']").type(iban);
});

When("I click on Geld überweisen button", () =>
{
    cy.get("[data-testid='send_money_button'").click();
});

/*      Then        */

Then("I should be presented with a greeting text {}", (greeting) =>
{
    cy.get("[data-testid=\"customer_Label\"]").contains(greeting);
});

Then("I should be presented with a Konto type text {}", (kontoTyp) =>
{
    cy.get("[id=\"1.kontotyp\"]").contains(kontoTyp);
});

Then("I should be presented with an alert box containing \"Geld übertragen\" text", () =>
{
    cy.get("[data-testid=\"title\"]").contains("Geld übertragen");
});

Then("I should be presented with an alert box containing \"Geld übertragen!\" text", () =>
{
    cy.get("[data-testid='title'").contains("Geld übertragen");
});

Then("my account balance is updated with the amount {string}", (betrag) =>
{
    cy.get("[id=\"0.kontostand\"]").should("contain.text", `${betrag}`);
});

Then("my account balance at the end has an amount of {string}", (betrag) =>
{
    cy.get("[id=\"0.kontostand\"]").should("contain.text", `${betrag}`);
});

Then("the account balance fromt my second account is updated with the amount {string}", (betrag) =>
{
    cy.get("[id=\"1.kontostand\"]").should("contain.text", `${betrag}`);
});

Then("I should be presented with an alert box containing \"Geld empfangen\" text", () =>
{
    cy.get("[data-testid='receiveMoney_title']").contains("Geld empfangen");
});

Then("I should be presented with an alert box containing \"Geld überweisen\" text", () =>
{
    cy.get("[data-testid='title']").contains("Geld überweisen");
});

Then("I should be presented with an alert box containing \"Geld empfangen!\" text", () =>
{
    cy.get("[data-testid='title']").contains("Geld empfangen");
});

Then("I should be presented with an alert box containing \"Geld überweisen\"", () =>
{
    cy.get("[data-testid='title']").contains("Geld überweisen");
});

Then("I should be presented with an alert box containing \"Geld gesendet!\" text", () =>
{
    cy.get("[data-testid='title']").contains("Geld gesendet");
});

Then("I should be presented with an alert box containing \"Geld erhalten!\" text", () =>
{
    cy.get("[data-testid='title']").contains("Geld erhalten");
});

