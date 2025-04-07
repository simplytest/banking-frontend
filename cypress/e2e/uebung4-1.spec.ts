describe("Übung 4-1, Anmelden mit Backend", () =>
{

    const contractInput = "input#contract_input";
    const passwordInput = "input#password_input";
    const loginButton = "button#login_button";

    beforeEach(() =>
    {
        cy.visit("http://localhost:4200/dashboard");
        cy.url().should("include", "/dashboard");
        cy.get("h1").should("contain", "Smart Money");
    });

    it("Anmelden mit den Vertragsid 00001 und Passwort demo", () =>
    {
        cy.get(contractInput).type("00001");
        cy.get(passwordInput).type("demo");
        cy.get(loginButton).click();
        cy.url().should("include", "/mainPage");
        cy.get("label[data-testid=\"customer_Label\"]").should("contain", "demo");
    });
    it("Anmelden mit den Vertragsid 00044 und Passwort demo", () =>
    {
        cy.intercept("POST", "**/login/00044").as("loginRequest");

        cy.get(contractInput).type("00044");
        cy.get(passwordInput).type("demo");
        cy.get(loginButton).click();
        cy.url().should("include", "/mainPage");
        cy.wait("@loginRequest").then((interception) =>
        {
            expect(interception.response.statusCode).to.equal(200);
        });
        cy.get("label[data-testid=\"customer_Label\"]").should("contain", "Hanibal");
    });
});