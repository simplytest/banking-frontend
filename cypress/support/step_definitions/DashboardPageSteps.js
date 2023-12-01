import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

import DashboardPagePO from "../pageObjects/DashboardPagePO";

const dashboardPage = new DashboardPagePO();

Given("I navigate to the Banking App dashboard page", () =>
{

    dashboardPage.navigate("");
});
When("When I click on Registrieren button", () =>
{
    dashboardPage.clickOnRegistrierenButton();
});
When("I type a Contract ID {}", (contractID) =>
{
  dashboardPage.typeContractID()
});
When("I type a Password {}", (password) =>
{
  dashboardPage.typePassword();
});
When("I click on login button", () =>
{
    dashboardPage.clickOnLoginButton();
});
When("I type an invalid Password {}", (password) =>
{

    dashboardPage.typeInvalidPassword();
});

Then("I should be presented with an alert box containing text {}", (expectedAlertText) =>
{
    dashboardPage.validateAlertText();

});
When("I have logged in with my credentials", (contractID,password) => {
  dashboardPage.typeContractID();
  dashboardPage.typePassword();
});

