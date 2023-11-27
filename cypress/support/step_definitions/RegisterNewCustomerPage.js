import { When } from "@badeball/cypress-cucumber-preprocessor";
import RegisterNewCustomerPagePO from "../pageObjects/RegisterNewCustomerPagePO";

const registerNewCustomerPage = new RegisterNewCustomerPagePO();

When("I type a first name {string} and a last name {string}", (firstName, lastName) =>
{
    registerNewCustomerPage.typeFirstName(firstName);
    registerNewCustomerPage.typeLastName(lastName);
});
When("I type a password {}", (password) =>
{
    registerNewCustomerPage.typePassword(password);
});
When("I enter street name {} a house number {}", (street, house) =>
{
    registerNewCustomerPage.typeStreet(street);
    registerNewCustomerPage.typeHouse(house);
});
When("I enter a postcode {} a city {} and a country {}", (zipCode, city, country) =>
{
    registerNewCustomerPage.typeZipCode(zipCode);
    registerNewCustomerPage.typeCity(city);
    registerNewCustomerPage.typeCountry(country);
});
When("I enter an email {}", (email) =>
{
    registerNewCustomerPage.typeEmail(email);
});
When("I enter a birthDate {}", (birthDate) =>
{
    registerNewCustomerPage.typeBirthDate(birthDate);
});
When("When I click on Registrieren button again", () =>
{
    registerNewCustomerPage.clickOnRegistrierenButtonAgain();
});
