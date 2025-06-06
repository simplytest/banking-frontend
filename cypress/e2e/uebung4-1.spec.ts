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

    it("Anmelden mit der VertragsId 0001 und Passwort falsch -> erwarten Fehlschlag", () =>
    {
        cy.get(contractInput).type("0001");
        cy.get(passwordInput).type("falsch");
        cy.get(loginButton).click();
        cy.url().should("include", "/dashboard");
        cy.get("dialog-contract-not-found").should("be.visible");
        //cy.get("label[data-testid='customer_Label']").should("contain", "demo");
        cy.get("dialog-contract-not-found").find("button").click();

    });

    it("Netzwerk Responses", () =>
    {
        cy.intercept("**/api/contracts/login/*", (req) =>
        {
            req.continue((res) =>
            {
                expect(res.statusCode).to.equal(200);
            });
        });
        cy.get("#contract_input").type("00001");
        cy.get("#password_input").type("demo");
        cy.get("#login_button").click();

        cy.url().should("eq", "http://localhost:4200/mainPage");
        cy.get("label[data-testid=\"customer_Label\"]").as("willkommen");
        cy.get("@willkommen").contains("demo");
        cy.get("@willkommen").contains("00001 ");
    });
});
