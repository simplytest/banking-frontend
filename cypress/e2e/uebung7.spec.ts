describe("Übung 7 - Banking Workflow", () =>
{

    beforeEach(() =>
    {
        // Anmeldung mit Testuser als Preroutine
        cy.fixture("loginData").then((loginData) =>
        {

            const dashboardUrl = `${Cypress.config("baseUrl")}${Cypress.env("dashboard_page")}`;
            cy.visit(Cypress.config("baseUrl"));
            cy.url().should("eq", dashboardUrl);

            // Interception für die erfolgreiche Anmeldung
            cy.intercept("POST", `${Cypress.env("backendUrl")}/api/contracts/login/00025`, {
                statusCode: 200,
                body: {
                    result: loginData.loginResponse.JWT,
                },
            }).as("loginRequest");

            cy.fixture("contracts").then( (contracts) =>
            {
                cy.intercept("GET", `${Cypress.env("backendUrl")}/api/contracts`, {
                    statusCode: 200,
                    body: contracts.initial,
                }).as("contractsRequest");
            });

            cy.get("#contract_input").type("00025");
            cy.get("#password_input").type(loginData.password);
            cy.get("#login_button").click();

            cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);

            cy.wait("@contractsRequest");

        });
    });

    it("Unhappy Path: Geld empfangen und überweisen mit ungültiger IBAN", () =>
    {

        // Interception für Geld empfangen
        cy.fixture("transactionData").then((transactionData) =>
        {
            cy.intercept("GET", `${Cypress.env("backendUrl")}/api/accounts/1/receive?amount=${transactionData.receiveMoney.amount}`, {
                statusCode: 200,
                body: {
                    result: transactionData.receiveMoney.result,
                },
            }).as("receiveMoney");
        });

        // Interception für gescheiterte Überweisung
        cy.fixture("transactionData").then((transactionData) =>
        {
            cy.intercept("POST", `${Cypress.env("backendUrl")}/api/accounts/1/send`, {
                statusCode: 400,
                body: {
                    error: transactionData.sendMoney.invalidIbanError,
                },
            }).as("failedTransaction");
        });

        cy.get("label[data-testid=\"customer_Label\"]").should("contain.text", "Willkommen Max!");

        cy.get("button[id='0-empfangen']").click();
        cy.get("h1[data-testid='receiveMoney_title']").should("have.text", "Geld empfangen");
        cy.get("input[data-testid='receiveMoney_input']").focus().type("10000"); // focus() call important here for proper typing !!!
        cy.get("button[data-testid='send_money_button']").click();

        cy.wait("@receiveMoney").then((interception) =>
        {
            expect(interception.response.statusCode).to.equal(200);
            expect(interception.response.body.result).to.equal(true);
        });

        cy.get("h1[data-testid='title']").should("have.text", "Geld erhalten");
        cy.get("button[data-testid='close_button']").click();

        cy.wait("@contractsRequest").then((interception) =>
        {
            expect(interception.response.statusCode).to.equal(200);
            expect(interception.response.body.customer.data.firstName).to.equal("Max");
        });

        cy.get("button[id='0-ueberweisen']").click();
        cy.get("h1[data-testid='title']").should("have.text", "Geld überweisen");
        cy.get("input[data-testid='send_amount']").focus().type("100");
        cy.get("input[data-testid='send_iban']").click().type("invalid");
        cy.get("button[data-testid='send_money_button']").click();

        cy.wait("@failedTransaction").its("response.statusCode").should("eq", 400);

        cy.on("window:alert", (text) =>
        {
            expect(text).to.equal("{\"error\":{\"error\":\"BadIban\"}}");
        });

    });

    it("Happy Path: Geld empfangen und überweisen mit gültiger IBAN", () =>
    {

        // Interception für Geld empfangen
        cy.fixture("transactionData").then((transactionData) =>
        {
            cy.intercept("GET", `${Cypress.env("backendUrl")}/api/accounts/1/receive?amount=${transactionData.receiveMoney.amount}`, {
                statusCode: 200,
                body: {
                    result: transactionData.receiveMoney.result,
                },
            }).as("receiveMoney");
        });

        // Interception für erfolgreiche Überweisung
        cy.fixture("transactionData").then((transactionData) =>
        {
            cy.intercept("POST", `${Cypress.env("backendUrl")}/api/accounts/1/send`, {
                statusCode: 200,
                body: {
                    result: transactionData.sendMoney.result,
                },
            }).as("sendMoney");
        });

        cy.get("label[data-testid=\"customer_Label\"]").should("contain.text", "Willkommen Max!");

        cy.get("button[id='0-empfangen']").click();
        cy.get("h1[data-testid='receiveMoney_title']").should("have.text", "Geld empfangen");
        cy.get("input[data-testid='receiveMoney_input']").focus().type("10000");
        cy.get("button[data-testid='send_money_button']").click();

        cy.wait("@receiveMoney").then((interception) =>
        {
            expect(interception.response.statusCode).to.equal(200);
            expect(interception.response.body.result).to.equal(true);
        });

        cy.get("h1[data-testid='title']").should("have.text", "Geld erhalten");
        cy.get("button[data-testid='close_button']").click();

        cy.wait("@contractsRequest").then((interception) =>
        {
            expect(interception.response.statusCode).to.equal(200);
            expect(interception.response.body.customer.data.firstName).to.equal("Max");
        });

        cy.get("button[id='0-ueberweisen']").click();
        cy.get("h1[data-testid='title']").should("have.text", "Geld überweisen");
        cy.get("input[data-testid='send_amount']").focus().type("100");
        cy.get("input[data-testid='send_iban']").click().type("DE12500105170648489890");
        cy.get("button[data-testid='send_money_button']").click();

        cy.wait("@sendMoney").its("response.statusCode").should("eq", 200);

        cy.get("h1[data-testid='title']").should("contain.text", "Geld gesendet");

    });

});
