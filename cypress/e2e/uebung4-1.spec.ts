describe("Übung 4-1, Anmelden mit Backend", () =>
{

    const contractInput = "input#contract_input";
    const passwordInput = "input#password_input";
    const loginButton = "button#login_button";

    beforeEach(() =>
    {
        cy.visit("/");
        cy.url().should("include", "/dashboard");
    });

    it("Anmelden mit der VertragsId 0001 und Passwort demo", () =>
    {
        cy.get(contractInput).type("0001");
        cy.get(passwordInput).type("demo");
        cy.get(loginButton).click();
        cy.url().should("include", "/mainPage");
        cy.get("label[data-testid='customer_Label']").should("contain", "demo");

    });

});
