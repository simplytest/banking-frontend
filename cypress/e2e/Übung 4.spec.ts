describe("Übung 4", () => {

    // function-Keyword unbedingt notwendig für die Verwendung von this
    beforeEach(function () {
        cy.fixture("contractSampleResponse").then(function (response) {
            this.sampleResponse = response;
        });
        this.url = Cypress.env("baseUrl");
        cy.visit("/dashboard");
        cy.url().should("eq", this.url + "/dashboard");
    });

    it("Aufgabe 1.1", () => {
        cy.get("#contract_input").type("00001");
        cy.get("[data-testid='password_input']").type("demo");
        cy.get("[data-testid='login_button']").click();
        cy.url().should("eq", "http://localhost:4200/mainPage");
        cy.get("[data-testid='customer_Label']").should("contain.text", "Willkommen demo!");
    })

    // Wichtige Konzepte: Callback-Funktionen, Lambdas, Objektliterale, Chai Assertions, Asynchronität in Cypress
    it("Aufgabe 2.1", function () {

        const jwtToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzc5MjUwMTUwfQ.HS0GImQsxApVLaH1OyyMEQxfURF2IK0A6GkC-ZVh9m96lJbl4jATLY4AI70wOtLGe__zhBy4OOqvguss4WUwCQ";
        cy.intercept({ url: "http://localhost:5005/api/contracts/login/00025", method: "POST" }, req => {
            expect(req.body).to.eq("admin");
            req.reply({
                "result": jwtToken
            });
        }).as("loginRequest");

        // Die verschiedenen Arten Fixtures zu integrieren:
        // * https://docs.cypress.io/api/commands/fixture#this-context
        // * https://docs.cypress.io/api/commands/fixture#Using-then-to-access-fixture-data
        // * https://docs.cypress.io/api/commands/fixture#Using-the-fixture-StaticResponse-property
        cy.intercept({
            pathname: "/api/contracts",
            method: "GET",
            headers: {
                Authorization: jwtToken
            }
        }, { fixture: "contractSampleResponse" });

        cy.get("#contract_input").type("00025");
        cy.get("[data-testid='password_input']").type("admin");
        cy.get("[data-testid='login_button']").click();

        cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);
        cy.url().should("eq", "http://localhost:4200/mainPage");
        cy.get("[data-testid='customer_Label']").should("contain.text", `Willkommen ${this.sampleResponse.customer.data.firstName}!`);
    });

    it("Aufgabe 2.2", function () {

        cy.intercept({ url: "http://localhost:5005/api/contracts/login/00026", method: "POST" }, req => {
            expect(req.body).to.eq("password");
            req.reply({
                "result": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzc5MjcwNTA3fQ.lBbZwqvxVgOS_OepsZJJFtLe_7vIbwdh8MYjyIhSO5RpDMyE4gbleZChsWtxHQ3thnlBa5NiQ1LeSFOc_RRqKw"
            });
        }).as("loginRequest");

        cy.fixture("contractSampleResponse").then(sampleResponse => {
            cy.intercept("http://localhost:5005/api/contracts", sampleResponse);
        });
        cy.get("#contract_input").type("00026");
        cy.get("[data-testid='password_input']").type("password");
        cy.get("[data-testid='login_button']").click();

        cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);
        cy.url().should("eq", "http://localhost:4200/mainPage");
        cy.get("[data-testid='customer_Label']").should("contain.text", "Willkommen demo!");
    });

    it("Aufgabe 2.3", function () {
        cy.log(this.url);
        cy.intercept({ pathname: "/api/contracts/login/00033", method: "POST" }, req => {
            req.reply({
                statusCode: 400,
                body: {
                    "error": {
                        "error": "BadCredentials"
                    }
                }
            })
        }).as("invalidPasswordRequest");

        cy.get("#contract_input").type("00033", {timeout: 10000});
        cy.get("[data-testid='password_input']").type("password");
        cy.get("[data-testid='login_button']").click();
        cy.wait("@invalidPasswordRequest").its("response.statusCode").should("eq", 400);
        cy.get("dialog-contract-not-found [data-testid='title']").should("contain.text", "Vertrag nicht gefunden!");
    });
});