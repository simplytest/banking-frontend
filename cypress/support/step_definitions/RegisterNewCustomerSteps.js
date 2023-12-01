import { When } from "@badeball/cypress-cucumber-preprocessor";
import RegisterNewCustomerPagePO from "../pageObjects/RegisterNewCustomerPagePO";

const registerNewCustomerSteps = new RegisterNewCustomerPagePO();

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
When("When I click on Registrieren button again", () =>
{
    registerNewCustomerSteps.clickOnRegistrierenButtonAgain();
});
