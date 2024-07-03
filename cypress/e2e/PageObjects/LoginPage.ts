class LoginPage {
    locators = {
        contractInput: "#contract_input",
        passwordInput: "#password_input",
        loginButton: "#login_button",
    };

    visit() {
        const dashboardUrl = `${Cypress.config("baseUrl")}${Cypress.env("dashboard_page")}`;
        cy.visit(Cypress.config("baseUrl"));
        cy.url().should("eq", dashboardUrl);
    }

    login(contract, password) {

        cy.get(this.locators.contractInput).type(contract);
        cy.get(this.locators.passwordInput).type(password);
        cy.get(this.locators.loginButton).click();

    }
}

export default new LoginPage();