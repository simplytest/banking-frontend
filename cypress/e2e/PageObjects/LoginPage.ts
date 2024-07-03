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

    login(contract, password, jwt) {
        cy.fixture("contracts").then( (contracts) => {
            cy.intercept("POST", "http://localhost:5005/api/contracts/login/00025", {
                statusCode: 200,
                body: {
                    result: jwt
                }
            }).as("loginRequest");

            cy.intercept("GET", "http://localhost:5005/api/contracts", {
                statusCode: 200,
                body: contracts.initial
            }).as("contractsRequest");
            

            cy.get(this.locators.contractInput).type(contract);
            cy.get(this.locators.passwordInput).type(password);
            cy.get(this.locators.loginButton).click();

            cy.wait("@loginRequest").then((interception) => {
                expect(interception.response.statusCode).equals(200);
            });

            cy.wait("@contractsRequest");
        });
    }
}

export default new LoginPage();