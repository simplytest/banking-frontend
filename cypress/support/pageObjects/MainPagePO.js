/// <reference types="cypress" />

import BasePO from "./BasePO";

class MainPagePO extends BasePO
{
    clickOnKontoErstellenButton()
    {
        cy.get("[data-testid=\"erstellen\"]").click();

    }
    clickOnGiroKontoButton()
    {
        cy.get("div#outer > button:nth-of-type(1)").click();
    }
    clickOnFestgeldKontoButton()
    {
        cy.get("div#outer > button:nth-of-type(2)").click();
    }
    clickOnTagesgeldKontoButton()
    {
        cy.get("div#outer > button:nth-of-type(3)").click();
    }
    clickOnImmobilienFinanzierungskontoButton()
    {
        cy.get("div#outer > button:nth-of-type(4)").click();
    }

}

export default MainPagePO;
