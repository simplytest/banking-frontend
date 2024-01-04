import BasePO from "./BasePO";

class DashboardPagePO extends BasePO
{
    navigateToDashboardPage()
    {
        super.navigate("");
    }

    elements = {
        loginButton: () => cy.get("[data-testid='login_button']"),
        registrierenButton: () => cy.get("#registerButton"),
        expectedAlertText: () => cy.get("[data-testid='title']"),
        contractIDInput: () => cy.get("[data-testid='contract_input']"),
        passwordInput: () => cy.get("[data-testid='password_input']")
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
        this.elements.contractIDInput().type(contractID);
    }

    typePassword(password = "demo")
    {
        this.elements.passwordInput().type(password);
    }

    validateAlertText(expectedAlertText)
    {
        this.elements.expectedAlertText().contains(expectedAlertText);
    }
}

export default DashboardPagePO;
