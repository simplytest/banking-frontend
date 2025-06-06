import DashboardPagePO from "../../support/pageObjects/DashboardPagePO";

class LoginPage extends DashboardPagePO
{
    visit()
    {
        cy.visit("/");
        cy.url().should("include", "/dashboard");
        cy.get("h1").should("contain", "Smart Money");
    }

    login(contract, password)
    {
        super.typeContractID(contract);
        super.typePassword(password);
        super.clickOnLoginButton();
    }
}

export default new LoginPage();