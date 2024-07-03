describe("Übung 4.2 - Anmeldung", () => {
    const apiBaseUrl = `${Cypress.env("backendUrl")}/api/contracts`;
    const dashboardUrl = `${Cypress.config("baseUrl")}${Cypress.env("dashboard_page")}`;

    beforeEach(() => {
        // Visit the dashboard URL before each test
        cy.visit(dashboardUrl);
        cy.url().should("eq", dashboardUrl);


        // Intercept for account details after successful login
        cy.intercept("GET", apiBaseUrl, {
            statusCode: 200,
            body: {
                id: {
                    counter: 7,
                    parent: 33,
                    child: 0
                },
                customer: {
                    type: "com.simplytest.core.customers.CustomerPrivate",
                    data: {
                        birthDay: "Oct 10, 1980, 12:00:00 AM",
                        schufaScore: 0.0,
                        transactionFee: 0.0,
                        monthlyFee: 2.99,
                        firstName: "Max",
                        lastName: "Wendeley",
                        address: {
                            country: "Deutschland",
                            zipCode: "897897",
                            street: "Hauptstraße",
                            house: "1",
                            city: "Musterstadt",
                            email: "art@muster.de"
                        }
                    }
                },
                accounts: {
                    "00033:00001": {
                        type: "com.simplytest.core.accounts.AccountGiro",
                        data: {
                            sendLimit: 3000.0,
                            dispoLimit: 0.0,
                            dispoRate: 0.0,
                            balance: 9000.0,
                            boundPeriod: 0.0,
                            interestRate: 0.0
                        }
                    },
                    "00033:00007": {
                        type: "com.simplytest.core.accounts.AccountFixedRate",
                        data: {
                            runtime: 0.0,
                            balance: 1000.0,
                            boundPeriod: 0.0,
                            interestRate: 0.0
                        }
                    }
                }
            }
        }).as("accountDetails");
    });
    

    it("Erfolgreiche Anmeldung", () => {

        // Set up the necessary intercepts for all tests
        cy.intercept("POST", `${apiBaseUrl}/login/00025`, {
            statusCode: 200,
            body: {
                result: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyNSIsImlhdCI6MTcxNDY1NDI5Nn0.7RvioDzaHM9nEMP3imlBghveUetX3dRiLYUXZW-9Pd71y7pmA2Bh2uBPXAwZ96GEztgDJ-jAdu9O3Af9aAyJGg"
            }
        }).as("loginRequest00025");

        cy.get("#contract_input").type("00025");
        cy.get("#password_input").type("admin");
        cy.get("#login_button").click();

        cy.wait("@loginRequest00025").then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
        });

        // Check for redirection and account details loading
        cy.url().should("include", "/mainPage");

        cy.wait("@accountDetails").then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
        });

        cy.get('label[data-testid="customer_Label"]').should('contain.text', "Willkommen Max!");
    });


    it("Erfolgreiche Anmeldung mit anderen Nutzerdaten", () => {

        // Set up the necessary intercepts for all tests
        cy.intercept("POST", `${apiBaseUrl}/login/00026`, {
            statusCode: 200,
            body: {
                result: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyNiIsImlhdCI6MTcxNDY1NDI5Nn0.8UvioDzaHM9nEMP3imlBghveUetX3dRiLYUXZW-9Pd71y7pmA2Bh2uBPXAwZ96GEztgDJ-jAdu9O3Af9aAyJGg"
            }
        }).as("loginRequest00026");

        cy.get("#contract_input").type("00026");
        cy.get("#password_input").type("password");
        cy.get("#login_button").click();

        cy.wait("@loginRequest00026").then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
        });

        // Check for redirection and account details loading
        cy.url().should("include", "/mainPage");

        cy.wait("@accountDetails").then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
        });

        cy.get('label[data-testid="customer_Label"]', { timeout: 10000 })
            .should("contain.text", "Willkommen Max!");
    });


    it("Gescheiterte Anmeldung mit korrektem Vertragscode und falschem Passwort", () => {

        // Set up the necessary intercepts for all tests
        cy.intercept("POST", `${apiBaseUrl}/login/00033`, {
            statusCode: 400,
            body: {
                error: {
                    error: "BadCredentials"
                }
            }
        }).as("failedLoginRequest");

        cy.get("#contract_input").type("00033");
        cy.get("#password_input").type("123456");
        cy.get("#login_button").click();

        cy.wait("@failedLoginRequest").then((interception) => {
            expect(interception.response.statusCode).to.equal(400);
            expect(interception.request.url).to.equal(`${apiBaseUrl}/login/00033`);
            expect(interception.request.method).to.equal("POST");
        });

        cy.get("dialog-contract-not-found").should("be.visible")
              .and("contain.text", "Vertrag nicht gefunden!");
    });


    it("Gescheiterte Anmeldung mit ungültigem Vertragscode", () => {

        // Set up the necessary intercepts for all tests
        cy.intercept("POST", `${apiBaseUrl}/login/111111`, {
            statusCode: 404,
            body: {
                timestamp: "May 20, 2024, 6:43:31 PM",
                status: 404,
                error: "Not Found",
                message: "404 NOT_FOUND",
                path: "/api/contracts/login/111111"
            }
        }).as("invalidAccountRequest");

        cy.get("#contract_input").type("111111");
        cy.get("#password_input").type("1212");
        cy.get("#login_button").click();

        cy.wait("@invalidAccountRequest").then((interception) => {
            expect(interception.response.statusCode).to.equal(404);
            expect(interception.request.url).to.equal(`${apiBaseUrl}/login/111111`);
            expect(interception.request.method).to.equal("POST");
        });

        cy.get("dialog-contract-not-found").should("be.visible")
              .and("contain.text", "Vertrag nicht gefunden!");
    });

});
