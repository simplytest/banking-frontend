/// <reference types="cypress" />

import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import CreateAccountPagePO from "../pageObjects/CreateAccountPagePO";
import DashboardPagePO from "../pageObjects/DashboardPagePO";
import MainPagePO from "../pageObjects/MainPagePO";
import RegisterNewCustomerPagePO from "../pageObjects/RegisterNewCustomerPagePO";

const mainPage = new MainPagePO();
const dashboardPage = new DashboardPagePO();
const createAccountPage = new CreateAccountPagePO();
const registerNewCustomerPage = new RegisterNewCustomerPagePO();

const registerNewCustomer = () =>
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
};

// ugly workaround because cypress finds to find the element when re-rendered by angular due to controlled inputs
const type = (value, identifier) =>
{
    cy.get(`[data-testid='${identifier}']`).as("component");

    cy.get("@component").focus();
    cy.get("@component").clear();

    [...value].forEach(c =>
    {
        cy.get("@component").click();
        cy.get("@component").type(c);
    });
};

const testAmount = (component, amount) =>
{
    cy.get(component).invoke("text").should("match", new RegExp(`[^0-9]*${amount}[^0-9]*$`, "ig"));
};

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

    type(giroAccountValue, "receiveMoney_input");

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

    type(giroAccountValue, "receiveMoney_input");

    cy.get("[data-testid='send_money_button'").click();
    cy.get("[data-testid='close_button'").click();
});

When("User recieve {string} money from outside", (recieveAmount) =>
{
    cy.get("[id='0-empfangen']").click();
    type(recieveAmount, "receiveMoney_input");

    cy.get("[data-testid='send_money_button'").click();
    cy.get("[data-testid='close_button'").click();
});

When("User transfer {string} from giro to fixedRate", (recieveAmount) =>
{
    cy.get("[id='0-transferieren']").click();

    type(recieveAmount, "amount_input");

    cy.get("[id$=':00002'").click();

    cy.get("[data-testid='transfer_money_button'").click();
    cy.get("[data-testid='close_button'").click();
});

When("User send {string} outside to another account", (recieveAmount) =>
{
    cy.get("[id=0-ueberweisen]").click();

    type(recieveAmount, "send_amount");

    cy.get("[data-testid='send_iban'").type("DE02120300000000202051");
    cy.get("[data-testid='send_money_button'").click();
    cy.get("[data-testid='close_button'").click();
});

Then("GiroAccountValue has the value {string}", (recieveAmount) =>
{
    testAmount("[id='0.kontostand']", recieveAmount);
});

Then("{string} is lowered by the {string}", (giroAccountValue, transferAmount) =>
{
    testAmount("[id='0.kontostand']", giroAccountValue - transferAmount);
});

Then("FixedRateAccountValue is raised by the {string}", (transferAmount) =>
{
    testAmount("[id='1.kontostand']", transferAmount);
});

Then("{string} is lowered by {string}", (giroAccountValue, sendAmount) =>
{
    testAmount("[id='0.kontostand']", giroAccountValue - sendAmount);
});
