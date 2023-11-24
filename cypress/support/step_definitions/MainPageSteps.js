import { Then, When } from "@badeball/cypress-cucumber-preprocessor";
import MainPagePO from "../pageObjects/MainPagePO";

const mainPage = new MainPagePO();

Then("I should be presented with a greeting text {}", (greeting) =>
{
    cy.get("[data-testid=\"customer_Label\"]").contains(greeting);
});
When("I click on Konto erstellen button", () =>
{
    // cy.get("[data-testid=\"erstellen\"]").click();
    mainPage.clickOnKontoErstellenButton();
});
When("I click on Giro-Konto button", () =>
{
    //cy.get("div#outer > button:nth-of-type(1)").click();
    mainPage.clickOnGiroKontoButton();
});
When("I click on Festgeld-Konto button", () =>
{
    mainPage.clickOnFestgeldKontoButton();
});
When("I click on Tagesgeld-Konto button", () =>
{
    mainPage.clickOnTagesgeldKontoButton();

});
When("I click on Immobilien-Finanzierungskonto button", () =>
{
    mainPage.clickOnImmobilienFinanzierungskontoButton();

});
Then("I should be presented with a Konto type text {}", (kontoTyp) =>
{

    cy.get("[id='4\\.kontotyp']").contains(kontoTyp);
});
