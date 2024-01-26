/// <reference types="cypress" />

import { When } from "@badeball/cypress-cucumber-preprocessor";
import RegisterNewCustomerPagePO from "../pageObjects/RegisterNewCustomerPagePO";

const registerNewCustomerSteps = new RegisterNewCustomerPagePO();

/*      When        */

When ("I click on Business Kunde button", () =>
{
    cy.get("[data-testid=\"business_customer_button\"]").click();
});

When("I type a first name {string} and a last name {string}", (firstName, lastName) =>
{
    registerNewCustomerSteps.typeFirstName(firstName);
    registerNewCustomerSteps.typeLastName(lastName);
});

When("I type a password {}", (password) =>
{
    registerNewCustomerSteps.typePassword(password);
});

When("I enter street name {} a house number {}", (street, house) =>
{
    registerNewCustomerSteps.typeStreet(street);
    registerNewCustomerSteps.typeHouse(house);
});

When("I enter a postcode {} a city {} and a country {}", (zipCode, city, country) =>
{
    registerNewCustomerSteps.typeZipCode(zipCode);
    registerNewCustomerSteps.typeCity(city);
    registerNewCustomerSteps.typeCountry(country);
});

When("I enter an email {}", (email) =>
{
    registerNewCustomerSteps.typeEmail(email);
});

When("I enter a birthDate {}", (birthDate) =>
{
    registerNewCustomerSteps.typeBirthDate(birthDate);
});

When("I enter a companyName {}", (companyName) =>
{
    cy.get("[data-testid=\"company_input\"]").type(companyName);
});
When("I enter a ustNumber {}", (ustNumber) =>
{
    cy.get("[data-testid=\"taxnumber_input\"]").type(ustNumber);
});
When("I enter a revenue {}", (companyName) =>
{
    cy.get("[data-testid=\"annual_sales_input\"]").type(companyName);
});

When("When I click on Registrieren button again", () =>
{
    registerNewCustomerSteps.clickOnRegistrierenButtonAgain();
});

