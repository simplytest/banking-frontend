describe("Übung 4.1 - Anmeldung über Backend", () => {

    beforeEach(() => {
        // Visit the dashboard URL before each test
        const dashboardUrl = "http://localhost:4200/dashboard"
        cy.visit(dashboardUrl);
        cy.url().should("eq", dashboardUrl);
   
    });

    
    it("Erfolgreiche Anmeldung ohne Interception - benötigt Backend", () => {
        cy.get("#contract_input").type("00001");
        cy.get("#password_input").type("demo");
        cy.get("#login_button").click();

        // Check for redirection and account details loading
        cy.url().should("include", "/mainPage");

        cy.get('label[data-testid="customer_Label"]').should('contain.text', "Willkommen demo!");

    });
    

});
