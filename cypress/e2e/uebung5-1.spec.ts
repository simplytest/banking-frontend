describe("Übung 5-1, Registeriung über Backend", () =>
{
    const dashboardUrl = "http://localhost:4200/dashboard";

    beforeEach(() =>
    {
        cy.visit(dashboardUrl);
        cy.get("h1").should("contain", "Smart Money");
        cy.url().should("eq", dashboardUrl);
    });

    it("5.1.1 Erfolgreiche Registrierung ohne Interception - benötigt Backend", function ()
    {
        // Klicken Sie auf den Registrierungsbutton
        cy.get("#registerButton").click();

        // Füllen Sie das Registrierungsformular mit den Fixture-Daten aus
        cy.get("#firstName").type("Max");
        cy.get("#lastName").type("Mustermann");
        cy.get("#password").type("123");
        cy.get("#street").type("Bahnhofstraße");
        cy.get("#house").type("10");
        cy.get("#zipCode").type("90403");
        cy.get("#city").type("Nürnberg");
        cy.get("#country").type("Deutschland");
        cy.get("#email").type("max@mustermann.de");
        cy.get("#birthDay").type("1990-01-01");

        cy.get("button[data-testid='register_button']").should("be.enabled");
        cy.get("button[data-testid='register_button']").click();

        // Überprüfen Sie die angezeigte Willkommensnachricht
        cy.get("label[data-testid=\"customer_Label\"]")
            .should("be.visible")
            .should("contain.text", "Willkommen Max!");

    });
});