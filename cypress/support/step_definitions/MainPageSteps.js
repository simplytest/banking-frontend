/// <reference types="cypress" />

import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import MainPagePO from "../pageObjects/MainPagePO";

const mainPage = new MainPagePO();

Given("I navigate to the Banking App main page", () =>
{
    mainPage.navigateToMainPage();
});

Then("I should be presented with a greeting text {}", (greeting) =>
{
    cy.get("[data-testid=\"customer_Label\"]").contains(greeting);
});

When("I click on Konto erstellen button", () =>
{
    mainPage.clickOnKontoErstellenButton();
});

Then("I should be presented with a Konto type text {}", (kontoTyp) =>
{
    cy.get("[id=\"1.kontotyp\"]").contains(kontoTyp);
});

When("I click on Double Arrows button", () =>
{
    cy.get("[id=\"0-transferieren\"]").click();
});

Then("I should be presented with an alert box containing \"Geld übertragen\" text", () =>
{
    cy.get("[data-testid=\"title\"]").contains("Geld übertragen");
});

When("I type a Betrag {}", (betrag) =>
{
    cy.get("[id=\"mat-input-0\"]").type(betrag);
});

When("I select the desired account", () =>
{
    cy.get("id=\"00001:00005-input\"").click();
});

When("I click on Geld übertragen button", () =>
{
    cy.get("data-testid=\"transfer_money_button\"").click();
});

Then("I should be presented with an alert box containing \"Geld übertragen!\" text", () =>
{
    cy.get("#mat-mdc-dialog-title-0").contains("Geld übertragen!");
});

When("I click on Close button", () =>
{
    cy.get("[class=\"mdc-button mat-mdc-button mat-unthemed mat-mdc-button-base\"]").click();
});

Then("my account balance is updated with the amount {}", (betrag) =>
{
    cy.get("[id=\"1.kontostand\"]").contains(betrag);
});

When("I click on Arrow button", () =>
{
    cy.get("[id=\"0-empfangen\"]").click();
});

Then("I should be presented with an alert box containing \"Geld empfangen\" text", () =>
{
    cy.get("[id=\"mat-mdc-dialog-title-4\"]").contains("Geld empfangen");
});

When("I type a Geldbetrag {}", (geldbetrag) =>
{
    cy.get("[id=mat-input-2]").type(geldbetrag);
});

When("I click on Geld empfangen button", () =>
{
    cy.get("#mat-mdc-dialog-4 > div > div > dialog-overview-receive-money-dialog > div.mat-mdc-dialog-actions.mdc-dialog__actions.mat-mdc-dialog-actions-align-end > button:nth-child(2) > span.mdc-button__label").click();
});

Then("I should be presented with an alert box containing \"Geld empfangen!\" text", () =>
{
    cy.get("[id=\"mat-mdc-dialog-title-5\"]").contains("Geld empfangen!");
});

When("I click on money button", () =>
{
    cy.get("[id=\"0-ueberweisen\"]").click();
});

Then("I should be presented with an alert box containing \"Geld überweisen\"", () =>
{
    cy.get("#mat-mdc-dialog-title-0").contains("Geld überweisen");
});

When("I type a desired Geldbetrag {}", (geldbetrag) =>
{
    cy.get("[id=\"mat-input-8\"]").type(geldbetrag);
});

When("I type a Ziel IBAN {}", (iban) =>
{
    cy.get("[id=\"mat-mdc-form-field-label-18\"]").type(iban);
});

When("I click on Geld überweisen button", () =>
{
    cy.get("#mat-mdc-dialog-10 > div > div > dialog-overview-send-money-dialog > div.mat-mdc-dialog-actions.mdc-dialog__actions.mat-mdc-dialog-actions-align-end > button:nth-child(2) > span.mdc-button__label").click();
});

Then("I should be presented with an alert box containing \"Geld gesendet!\" text", () =>
{
    cy.get("[id=\"mat-mdc-dialog-title-13\"]").contains("Geld gesendet!");
});
