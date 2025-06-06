describe("Übung 4-2, Anmelden ohne Backend", () =>
{
    const contractInput = "input#contract_input";
    const passwordInput = "input#password_input";
    const loginButton = "button#login_button";

    beforeEach(() =>
    {
        cy.visit("/");
        cy.url().should("include", "/dashboard");
        cy.intercept("GET", "**/api/contracts", {
            statusCode: 200,
            fixture: "singleContract",
        }).as("contractsRequest");
    });

    it("should login with existing user 00025 and password admin ", () =>
    {
        const userId = "00025";
        cy.intercept("POST", `**/login/${userId}`, {
            statusCode: 200,
            body: {
                result: "7RvioDzaHM9nEMP3imlBghveUetX3dRiLYUXZW-9Pd71y7pmA2Bh2uBPXAwZ96GEztgDJ-jAdu9O3Af9aAyJGg",
            },
        }).as("loginRequest");

        cy.get(contractInput).type(userId);
        cy.get(passwordInput).type("admin");
        cy.get(loginButton).click();
        cy.wait("@loginRequest").then((interception) =>
        {
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.wait("@contractsRequest").then((interception) =>
        {
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.url().should("include", "/mainPage");
        cy.get("label[data-testid=\"customer_Label\"]").should("contain", "Max");
    });
});