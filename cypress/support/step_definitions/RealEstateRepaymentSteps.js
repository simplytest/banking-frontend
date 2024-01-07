/// <reference types="cypress" />

import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import MainPagePO from "../pageObjects/MainPagePO";
import DashboardPagePO from "../pageObjects/DashboardPagePO";
import RegisterNewCustomerPagePO from "../pageObjects/RegisterNewCustomerPagePO";
import CreateAccountPagePO from "../pageObjects/CreateAccountPagePO";
import ReceiveMoneyPage from "../pageObjects/ReceiveMoneyPage";
import TransferMoneyPage from "../pageObjects/TransferMoneyPage";
import ConfirmationDialogPage from "../pageObjects/ConfirmationDialogPage";

const mainPage = new MainPagePO();
const dashboardPage = new DashboardPagePO();
const registerNewCustomerPage = new RegisterNewCustomerPagePO();
const createAccountPage = new CreateAccountPagePO();
const receiveMoneyPage = new ReceiveMoneyPage();
const transerMoneyPage = new TransferMoneyPage();
const confirmDialog = new ConfirmationDialogPage();

Given("Ich bin registrierter Privatkunde mit Konto von Typ Giro Konto mit aktuellem Kontostand {string} €", (giroAccountValue) =>
{
    dashboardPage.navigate("");

    dashboardPage.clickOnRegistrierenButton();
    registerNewCustomerPage.registerStandardPrivateCustomer();

    mainPage.clickOnReceiveButton("0");

    receiveMoneyPage.receiveMoney(giroAccountValue);
});

Given("Ich habe ein neues Immobilien-Finanzierungskonto mit Kredit von {string} €", (creditValue) =>
{
    mainPage.clickOnKontoErstellenButton();

    createAccountPage.addRealEstateAccount(creditValue, "100");
});

/*      When        */

When("Ich von Giro Konto {string} € auf ein Immobilien-Finanzierungskonto übertrage", (rate) =>
{
    mainPage.clickOnTransferButton("0");
    transerMoneyPage.prepareTransfer(rate, "2");
    transerMoneyPage.executeTransfer();
});

When("Ich versuche von Giro Konto {string} € auf ein Immobilien-Finanzierungskonto zu übertragen", (rate) =>
{
    mainPage.clickOnTransferButton("0");
    transerMoneyPage.prepareTransfer(rate, "2");
});

/*      Then        */

Then("beträgt der aktuelle Kontostand von Giro Konto {string} €", (newBalance) =>
{
    mainPage.checkAccountBalance("0", newBalance);
});

Then("beträgt der aktuelle Kontostand von Immobilien-Finanzierungskonto {string} €", (newBalance) =>
{
    mainPage.checkAccountBalance("1", "-" + newBalance);
});

Then("Ich sehe die Erfolgsmeldung {string}", (message) =>
{
    confirmDialog.elements.confirmMessage().should("have.text", message);
    confirmDialog.close();
});

Then("Ich sehe die Fehlermeldung {string}", (errorMessage) =>
{
    transerMoneyPage.elements.transferErrorLabel().should("have.text", errorMessage);
    transerMoneyPage.elements.transferErrorLabel().should("have.css", "color").and("eq", "rgb(244, 67, 54)");
    transerMoneyPage.elements.transferButton().should("be.disabled");
    transerMoneyPage.cancelTransfer();
});
