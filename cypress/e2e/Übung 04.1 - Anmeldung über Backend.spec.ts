/// <reference types="cypress" />

describe("Übung 4.1 - Anmeldung über Backend", () => {
    const apiBaseUrl = "http://localhost:5005/api/contracts";
    const dashboardUrl = `${Cypress.config("baseUrl")}${Cypress.env("dashboard_page")}`;
    const loginUrl = `${Cypress.config("baseUrl")}${Cypress.env("login_page")}`;

    beforeEach(() => {
        // Visit the dashboard URL before each test
        cy.visit(dashboardUrl);
        cy.url().should("eq", dashboardUrl);
   
    });

    
    it("Erfolgreiche Anmeldung ohne Interception - benötigt Backend", () => {
        cy.get("#contract_input").type("00001");
        cy.get("#password_input").type("demo");
        cy.get("#login_button").click();

        // Check for redirection and account details loading
        cy.url().should("include", "/mainPage");

        cy.get('label[data-testid="customer_Label"]', { timeout: 10000 })
            .invoke("text")
            .then((text) => {
                expect(text).to.include("Willkommen demo!");
            });
    });
    

});
