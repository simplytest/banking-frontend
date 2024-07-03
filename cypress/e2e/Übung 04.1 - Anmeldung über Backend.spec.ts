describe("Übung 4.1 - Anmeldung über Backend", () => {

    beforeEach(() => {
        // Visit the dashboard URL before each test
        const dashboardUrl = "http://localhost:4200/dashboard"
        cy.visit(dashboardUrl);
        cy.url().should("eq", dashboardUrl);
   
    });

    
    it("4.1.1 Erfolgreiche Anmeldung ohne Interception - benötigt Backend", () => {
        
        cy.get("#contract_input").type("00001");
        cy.get("#password_input").type("demo");
        cy.get("#login_button").click();

        // Check for redirection and account details loading
        cy.url().should("include", "/mainPage");

        cy.get('label[data-testid="customer_Label"]').should('contain.text', "Willkommen demo!");

    });


    it("4.1.2 Erfolgreiche Anmeldung ohne Interception - benötigt Backend", () => {
        
        cy.intercept("POST", `http://localhost:5005/api/contracts/login/00001`).as("loginRequest");

        cy.get("#contract_input").type("00001");
        cy.get("#password_input").type("demo");
        cy.get("#login_button").click();

        // Check for redirection and account details loading
        cy.url().should("include", "/mainPage");

        cy.wait("@loginRequest").then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
        });

        cy.get('label[data-testid="customer_Label"]').should('contain.text', "Willkommen demo!");

    });

});
