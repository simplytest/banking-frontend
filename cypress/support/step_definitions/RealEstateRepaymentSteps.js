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

function registerNewRealEstate(creditValue, repaymentRate)
{
    createAccountPage.clickOnImmobilienFinanzierungskontoButton();
    createAccountPage.typeKreditBeitrag(creditValue);
    createAccountPage.typeTilgungRate(repaymentRate);
    cy.get("[data-testid='create_real_estate_button']").click();
}

function angularInputFieldHelperByDataTestID(value, identifier)
{

    const betrag = value.split("");
    for (let part of betrag)
    {
        cy.get("[data-testid='" + identifier + "']").type(part);
    }
}

Given("User with {string} and {string}", (giroAccountValue, creditValue) =>
{
    dashboardPage.navigate("");

    dashboardPage.clickOnRegistrierenButton();
    registerNewCustomer();

    cy.get("[id='0-empfangen']").click();

    cy.get("[data-testid='receiveMoney_input']").focus();
    cy.get("[data-testid='receiveMoney_input']").clear();

    angularInputFieldHelperByDataTestID( giroAccountValue, "receiveMoney_input");

    cy.get("[data-testid='send_money_button']").click();

    cy.get("[data-testid='close_button']").click();

    mainPage.clickOnKontoErstellenButton();

    registerNewRealEstate(creditValue, "100");
});

/*      When        */

When("User pays a {string} that is not higher than 5% of the total credit value", (rate) =>
{
    cy.get("[id='0-transferieren'").click();
    cy.get("[data-testid='amount_input']").focus();
    cy.get("[data-testid='amount_input']").clear();
    angularInputFieldHelperByDataTestID(rate, "amount_input");
    cy.get("[id$=':00002'").click();
    cy.get("[data-testid='transfer_money_button'").click();
    cy.get("[data-testid='close_button'").click();
});

When("User try to pay a {string} that is higher than 5% of the total credit value", (rate) =>
{
    cy.get("[id='0-transferieren'").click();

    cy.get("[data-testid='amount_input']").focus();
    cy.get("[data-testid='amount_input']").clear();
    angularInputFieldHelperByDataTestID(rate, "amount_input");
    cy.get("[id$=':00002'").click();
});

/*      Then        */

Then("{string} lowers by the amount of the {string}", (creditValue, rate) =>
{
    const newRealEstateValue = (+creditValue - +rate);
    cy.get("[id='1.kontostand']").should("have.text", " -" + newRealEstateValue + " $ ");
});

Then("{string} is lowered by the amount of the {string}", (giroAccountValue, rate) =>
{
    const newRealEstateValue = (+giroAccountValue - +rate);
    cy.get("[id='0.kontostand']").should("have.text", " " + newRealEstateValue + " $ ");
});

Then("User gets an ErrorMessage 'Betrag ist nicht zulässig'", () =>
{
    cy.get("[data-testid='error_label']").should("have.text", " Betrag ist nicht zulässig ");
    cy.get("[data-testid='error_label']").should("have.css", "color").and("eq", "rgb(244, 67, 54)");
    cy.get("[data-testid='transfer_money_button']").should("be.disabled");
});
