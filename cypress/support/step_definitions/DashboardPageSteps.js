import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import BasePO from "../pageObjects/BasePO";
import DashboardPagePO from "../pageObjects/DashboardPagePO";


const dashboardPage = new DashboardPagePO();

Given ("I navigate to the Banking App dashboard page", () =>
{
    // cy.visit("http://localhost:4200/")
    //basePage.navigate("");
    dashboardPage.navigate("");
});
When("When I click on Registrieren button", () =>
{
    //cy.get("#registerButton").click();
    dashboardPage.clickOnRegistrierenButton();
});
When("I type a Contract ID {}", (contractID) =>
{
    cy.get("[name='contractID']").type(contractID);
});
When("I type a Password {}", (password) =>
{
    cy.get("[name='password']").type(password);
});
When("I click on login button", () =>
{
    //cy.get("[type='submit']").invoke("removeAttr","target").click();
    dashboardPage.clickOnLoginButton();
});
When("I type an invalid Password {}", (password) =>
{
    cy.get("[name='password']").type(password);
});

Then("I should be presented with an alert box containing text {}", (expectedAlertText) =>
{
    cy.get("#mat-mdc-dialog-title-0").contains(expectedAlertText);
    //expect(stub).to.have.been.calledWith(expectedAlertText)
});

