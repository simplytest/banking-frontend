/// <reference types="cypress" />

import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import MainPagePO from "../pageObjects/MainPagePO";
import DashboardPagePO from "../pageObjects/DashboardPagePO";
import RegisterNewCustomerPagePO from "../pageObjects/RegisterNewCustomerPagePO";
import CreateAccountPagePO from "../pageObjects/CreateAccountPagePO";

const mainPage = new MainPagePO();
const dashboardPage = new DashboardPagePO();
const registerNewCustomerPage = new RegisterNewCustomerPagePO();
const createAccountPage = new CreateAccountPagePO();

let GiroAccountValue;
let FixedRateAccountValue;

function registerNewCustomer()
{
    registerNewCustomerPage.typeFirstName("Demo");
    registerNewCustomerPage.typeLastName("User");
    registerNewCustomerPage.typePassword("test");
    registerNewCustomerPage.typeStreet("Teststraße");
    registerNewCustomerPage.typeHouse("1");
    registerNewCustomerPage.typeZipCode("12345");
    registerNewCustomerPage.typeCity("Testcity");
    registerNewCustomerPage.typeCountry("Testland");
    registerNewCustomerPage.typeEmail("test@email.com");
    registerNewCustomerPage.typeBirthDate("1999-12-14");
    registerNewCustomerPage.clickOnRegistrierenButtonAgain();
}

function angularInputFieldHelperByDataTestID(value, identifier)
{
    cy.get("[data-testid='" + identifier + "']").focus();
    cy.get("[data-testid='" + identifier + "']").clear();
    const betrag = value.split("");
    for (let part of betrag)
    {
        cy.get("[data-testid='" + identifier + "']").type(part);
    }
}

/* Given */

Given("User is created with giro", () =>
{
    dashboardPage.navigateToDashboardPage();
    dashboardPage.clickOnRegistrierenButton();
    registerNewCustomer();
});

Given("User is created with giro {string} and fixedRate", (giroAccountValue) =>
{
    dashboardPage.navigateToDashboardPage();
    dashboardPage.clickOnRegistrierenButton();
    registerNewCustomer();
    cy.get("[id='0-empfangen'").click();
    angularInputFieldHelperByDataTestID(giroAccountValue, "receiveMoney_input");
    cy.get("[data-testid='send_money_button'").click();
    cy.get("[data-testid='close_button'").click();

    mainPage.clickOnKontoErstellenButton();
    createAccountPage.clickOnFestgeldKontoButton();
});

Given("User is created with giro {string}", (giroAccountValue) =>
{
    dashboardPage.navigateToDashboardPage();
    dashboardPage.clickOnRegistrierenButton();
    registerNewCustomer();
    cy.get("[id='0-empfangen'").click();
    angularInputFieldHelperByDataTestID(giroAccountValue, "receiveMoney_input");
    cy.get("[data-testid='send_money_button'").click();
    cy.get("[data-testid='close_button'").click();
});

/*      When        */

When("User recieve {string} money from outside", (recieveAmount) =>
{
    cy.get("[id='0-empfangen']").click();
    angularInputFieldHelperByDataTestID(recieveAmount, "receiveMoney_input");
    cy.get("[data-testid='send_money_button'").click();
    cy.get("[data-testid='close_button'").click();
});

When("User transfer {string} from giro to fixedRate", (recieveAmount) =>
{
    cy.get("[id='0.kontostand']").invoke("text").then((text) =>
    {
        GiroAccountValue = parseInt(text.replace(/[^0-9]/g, ""));
    });

    cy.get("[id='1.kontostand']").invoke("text").then((text) =>
    {
        FixedRateAccountValue = parseInt(text.replace(/[^0-9]/g, ""));
    });

    cy.get("[id='0-transferieren']").click();
    angularInputFieldHelperByDataTestID(recieveAmount, "amount_input");
    cy.get("[id$=':00002'").click();
    cy.get("[data-testid='transfer_money_button'").click();
    cy.get("[data-testid='close_button'").click();
});

When("User send {string} outside to another account", (recieveAmount) =>
{
    cy.get("[id=0-ueberweisen]").click();
    angularInputFieldHelperByDataTestID(recieveAmount, "send_amount");
    cy.get("[data-testid='send_iban'").type("DE02120300000000202051");
    cy.get("[data-testid='send_money_button'").click();
    cy.get("[data-testid='close_button'").click();
});

/*      Then        */

Then("GiroAccountValue has the value {string}", (recieveAmount) =>
{
    cy.get("[id='0.kontostand']").should("have.text", " " + recieveAmount + " $ ");
});

Then("{string} is lowered by the {string}", (giroAccountValue, transferAmount) =>
{
    cy.get("[id='0.kontostand']").should("have.text", " " + (+giroAccountValue - +transferAmount ) + " $ ");
});

Then("FixedRateAccountValue is raised by the {string}", (transferAmount) =>
{
    cy.get("[id='1.kontostand']").should("have.text", " " + (transferAmount ) + " $ ");
});

Then("{string} is lowered by {string}", (giroAccountValue, sendAmount) =>
{
    cy.get("[id='0.kontostand']").should("have.text", " " + (+giroAccountValue - +sendAmount ) + " $ ");
});
