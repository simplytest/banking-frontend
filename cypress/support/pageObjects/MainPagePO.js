/// <reference types="cypress" />

import BasePO from "./BasePO";

class MainPagePO extends BasePO {

    elements = {
        kontoErstellenButton : () => cy.get('[data-testid="erstellen_button"]'),
        giroKontoButton : () => cy.get("[test-dataid=\"giro_account_button\"]"),
        festgeldKontoButton: () => cy.get("[test-dataid=\"fixed_rate_button\"]"),
        tagesgeldKontoButton : () => cy.get("[test-dataid=\"onCall_button\"]"),
        immobilienFinanzierungskontoButton : () => cy.get("[test-dataid=\"realEstate_button\"]"),
        //kontoTypeText : () =>
    }

    navigateToMainPage () {
        super.navigate("mainPage/eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzAxMDc4MTg4fQ.qR0ONmc72xgvYUqmys4c80Pp0asGu7Icp0DF6kAk0TKO88uI5mbkLGiaIMowa65myYkFOwU4P8NHO3c7gaCcJg");
    }

    clickOnKontoErstellenButton()
    {
        this.elements.kontoErstellenButton().click();

    }
    clickOnGiroKontoButton()
    {
        this.elements.giroKontoButton().click();
    }
    clickOnFestgeldKontoButton()
    {
        this.elements.festgeldKontoButton().click();
    }
    clickOnTagesgeldKontoButton()
    {
        this.elements.tagesgeldKontoButton().click();
    }
    clickOnImmobilienFinanzierungskontoButton()
    {
        this.elements.immobilienFinanzierungskontoButton.click();
    }
    typeKreditBeitrag(kreditBeitrag){
        cy.get("#mat-input-0").type(kreditBeitrag);
    }
    typeTilgungRate(tilgungRate) {
        cy.get("#mat-input-1").type(tilgungRate);
    }


}

export default MainPagePO;
