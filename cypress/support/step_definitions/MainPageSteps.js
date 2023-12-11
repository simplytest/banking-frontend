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

When("I click on Double Arrows button to sent money to my other account", () =>
{
    cy.get("[id=\"0-transferieren\"]").click();
});

Then("I should be presented with an alert box containing \"Geld übertragen\" text", () =>
{
    cy.get("[data-testid=\"title\"]").contains("Geld übertragen");
});

When("I type a Betrag {string}", (geldbetrag) =>
{   
    cy.get("[data-testid='amount_input']").focus().clear();
    const betrag = geldbetrag.split("");
    for(let part of betrag)
    {   
    cy.get("[data-testid='amount_input']")
    .focus()
    .type(part);
    }
});

When("I select the desired account", () =>
{
    cy.get("[id$=':00002']").click();
});

When("I click on Geld übertragen button", () =>
{
    cy.get("[data-testid=\"transfer_money_button\"]").click();
});

Then("I should be presented with an alert box containing \"Geld übertragen!\" text", () =>
{
    cy.get("[data-testid='title'").contains("Geld übertragen!");
});

When("I click on Close button", () =>
{
    cy.get("[data-testid='close_button']").click();
});

Then("my account balance is updated with the amount {string}", (betrag) =>
{
    cy.get("[id=\"0.kontostand\"]").should("have.text"," " + betrag + " $ ");
});

Then("my account balance at the end has an amount of {string}", (betrag) =>
{
    cy.get("[id=\"0.kontostand\"]").should("have.text"," " + betrag + " $ ");
});

Then("the account balance fromt my second account is updated with the amount {string}", (betrag) =>
{
    cy.get("[id=\"1.kontostand\"]").should("have.text"," " + betrag + " $ ");
});

When("I click on Arrow button to receive money into my account", () =>
{
    cy.get("[id=\"0-empfangen\"]").click();
});

Then("I should be presented with an alert box containing \"Geld empfangen\" text", () =>
{
    cy.get("#mat-mdc-dialog-title-0").contains("Geld empfangen");
});

Then("I should be presented with an alert box containing \"Geld überweisen\" text", () =>
{
    cy.get("[data-testid='title']").contains("Geld überweisen");
});


When("I type a Geldbetrag {}", (betrag) =>
{
    const amount = betrag.split(""); 
    for(let part of betrag) 
    {
    cy.get("[data-testid='receiveMoney_input']").focus().type(part);
    }
});

When("I click on Geld empfangen button", () =>
{
    cy.get(".mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-end.mdc-dialog__actions > button:nth-of-type(2) > .mdc-button__label").click();
});

Then("I should be presented with an alert box containing \"Geld empfangen!\" text", () =>
{
    cy.get("id=\"mat-mdc-dialog-title-3\"").contains("Geld empfangen!");
});

When("I click on money button to send money to someone else account", () =>
{
    cy.get("[id=\"0-ueberweisen\"]").click();
});

Then("I should be presented with an alert box containing \"Geld überweisen\"", () =>
{
    cy.get("#mat-mdc-dialog-title-0").contains("Geld überweisen");
});

When("I type a desired Geldbetrag {}", (geldbetrag) =>
{
    cy.get("[data-testid='send_amount']").focus().clear();
    const amount = geldbetrag.split(""); 
    for(let part of amount) 
    {
        cy.get("[data-testid='send_amount']").type(part);
    }
    
});

When("I type a Ziel IBAN {}", (iban) =>
{
    cy.get("[data-testid='send_iban']").type(iban);
});

When("I click on Geld überweisen button", () =>
{
    cy.get("[data-testid='send_money_button'").click();
});

Then("I should be presented with an alert box containing \"Geld gesendet!\" text", () =>
{
    cy.get("[data-testid='title']").contains("Geld gesendet!");
});

Then("I should be presented with an alert box containing \"Geld erhalten!\" text", () =>
{
    cy.get("[data-testid='title']").contains("Geld Erhalten!");
});


