import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import MainPagePO from "../pageObjects/MainPagePO";


const mainPage = new MainPagePO();

Given("I navigate to the Banking App main page",() => {
     mainPage.navigateToMainPage();
})
Then("I should be presented with a greeting text {}", (greeting) => {
    cy.get("[data-testid=\"customer_Label\"]").contains(greeting);
});
When("I click on Konto erstellen button", () => {
    mainPage.clickOnKontoErstellenButton();
});
When("I click on Giro-Konto button", () => {
    mainPage.clickOnGiroKontoButton();
});
When("I click on Festgeld-Konto button", () => {
    mainPage.clickOnFestgeldKontoButton();
});
When("I click on Tagesgeld-Konto button", () => {
    mainPage.clickOnTagesgeldKontoButton();

});
When("I click on Immobilien-Finanzierungskonto button", () => {
    mainPage.clickOnImmobilienFinanzierungskontoButton();

});
When("I type Kredit Beitrag {} and Tilgung Rate {}",(kreditBeitrag,tilgungRate)=> {
    mainPage.typeKreditBeitrag(kreditBeitrag);
    mainPage.typeTilgungRate(tilgungRate);
})
Then("I should be presented with an Immobilien-Finanzierungskonto Erstellen alert box containing text {}",(expectedAlertText) => {
    cy.get("#mat-mdc-dialog-title-1").contains(expectedAlertText);
})
Then("I should be presented with a Konto type text {}", (kontoTyp) => {
    cy.get("[id=\"1.kontotyp\"]").contains(kontoTyp);
});
When("I click on Kredit Anfordern Button",() => {
    cy.get("").click();
})
