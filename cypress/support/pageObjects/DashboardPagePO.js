/// <reference types="cypress" />

import BasePO from "./BasePO";

class DashboardPagePO extends BasePO {
    navigateToDashboardPage()
    {
        super.navigate("");
    }
    clickOnRegistrierenButton()
    {
        cy.get("#registerButton").click();
    }

    clickOnLoginButton()
    {
        cy.get("[data-testid=\"login_button\"]").invoke("removeAttr", "target").click();
    }

}
export default DashboardPagePO;
