import BasePO from "./BasePO";

class DashboardPagePO extends BasePO
{
    navigateToDashboardPage()
    {
        super.navigate("");
    }

    elements = {
        loginButton: () => cy.get('[data-testid="login_button"]'),
        registrierenButton: () => cy.get("#registerButton"),
        expectedAlertText: () => cy.get("#mat-mdc-dialog-title-0"),
    };

    clickOnRegistrierenButton()
    {
        this.elements.registrierenButton().click();
    }

    clickOnLoginButton()
    {
        this.elements.loginButton().invoke("removeAttr", "target").click();
    }

    typeContractID(contractID = "1")
    {
        cy.get("[name='contractID']").type(contractID);
    }

    typePassword(password = "demo")
    {
        cy.get("[name='password']").type(password);
    }

    validateAlertText(expectedAlertText)
    {
        this.elements.expectedAlertText().contains(expectedAlertText);
    }
}

export default DashboardPagePO;
