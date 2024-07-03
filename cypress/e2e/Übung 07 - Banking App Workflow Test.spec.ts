/// <reference types="cypress"/>

describe("Übung 7 - Banking Workflow", () => {

    beforeEach(() => {
        // Anmeldung mit Testuser als Preroutine
        cy.fixture("loginData").then((loginData) => {

            const dashboardUrl = `${Cypress.config("baseUrl")}${Cypress.env("dashboard_page")}`;
            cy.visit(Cypress.config("baseUrl"));
            cy.url().should("eq", dashboardUrl);

            // Interception für die erfolgreiche Anmeldung
            cy.intercept("POST", `${Cypress.env("backendUrl")}/api/contracts/login/00025`, {
                statusCode: 200,
                body: {
                    result: loginData.loginResponse.JWT
                }
            }).as("loginRequest");

            
            cy.fixture("contracts").then( (contracts) => {
                cy.intercept("GET", `${Cypress.env("backendUrl")}/api/contracts`, {
                    statusCode: 200,
                    body: contracts.initial
                }).as("contractsRequest");
            });
            

            cy.get("#contract_input").type("00025");
            cy.get("#password_input").type(loginData.password);
            cy.get("#login_button").click();

            cy.wait("@loginRequest").its('response.statusCode').should('eq', 200);

            cy.wait("@contractsRequest");

        });
    });

    it("Unhappy Path: Geld empfangen und überweisen mit ungültiger IBAN", () => {
        cy.fixture("contracts").then((contracts) => {

            cy.get('label[data-testid="customer_Label"]').should('contain.text', "Willkommen Max!");

            // Interception für Geld empfangen
            cy.fixture("transactionData").then((transactionData) => {
                cy.intercept("GET", `${Cypress.env("backendUrl")}/api/accounts/1/receive?amount=${transactionData.receiveMoney.amount}`, {
                    statusCode: 200,
                    body: {
                        result: transactionData.receiveMoney.result
                    }
                }).as("receiveMoney");
            });

            // Interception für Kontodetails nach Geldempfang
            cy.intercept("GET", `${Cypress.env("backendUrl")}/api/contracts`, {
                statusCode: 200,
                body: contracts.initial
            }).as("accountDetails");

            cy.get("button[id='0-empfangen']").click();
            cy.get("h1[data-testid='receiveMoney_title']").should("have.text", "Geld empfangen");
            cy.get("input[data-testid='receiveMoney_input']").focus().type("10000"); // focus() call important here for proper typing !!!
            cy.get("button[data-testid='send_money_button']").click();

            cy.wait("@receiveMoney").then((interception) => {
                expect(interception.response.statusCode).to.equal(200);
                expect(interception.response.body.result).to.equal(true);
            });

            cy.get("h1[data-testid='title']").should("have.text", "Geld erhalten");

            cy.wait("@accountDetails").then((interception) => {
                expect(interception.response.statusCode).to.equal(200);
                expect(interception.response.body.customer.data.firstName).to.equal("Max");
            });

            cy.get("button[data-testid='close_button']").click();

            // Interception für gescheiterte Überweisung
            cy.fixture("transactionData").then((transactionData) => {
                cy.intercept("POST", `${Cypress.env("backendUrl")}/api/accounts/1/send`, {
                    statusCode: 400,
                    body: {
                        error: transactionData.sendMoney.invalidIbanError
                    }
                }).as("failedTransaction");
            });

            cy.get("button[id='0-ueberweisen']").click();
            cy.get("h1[data-testid='title']").should("have.text", "Geld überweisen");
            cy.get("input[data-testid='send_amount']").focus().type("100");
            cy.get("input[data-testid='send_iban']").click().type("invalid");
            cy.get("button[data-testid='send_money_button']").click();

            cy.wait("@failedTransaction").its('response.statusCode').should('eq', 400);

            cy.on("window:alert", (text) => {
                expect(text).to.equal('{"error":{"error":"BadIban"}}');
            });
            
        });
    });

    it("Happy Path: Geld empfangen und überweisen mit gültiger IBAN", () => {
        cy.fixture("contracts").then((contracts) => {

            cy.get('label[data-testid="customer_Label"]').should('contain.text', "Willkommen Max!");

            // Interception für Geld empfangen
            cy.fixture("transactionData").then((transactionData) => {
                cy.intercept("GET", `${Cypress.env("backendUrl")}/api/accounts/1/receive?amount=${transactionData.receiveMoney.amount}`, {
                    statusCode: 200,
                    body: {
                        result: transactionData.receiveMoney.result
                    }
                }).as("receiveMoney");
            });

            // Interception für Kontodetails nach Geldempfang
            cy.intercept("GET", `${Cypress.env("backendUrl")}/api/contracts`, {
                statusCode: 200,
                body: contracts.initial
            }).as("accountDetails");

            cy.get("button[id='0-empfangen']").click();
            cy.get("h1[data-testid='receiveMoney_title']").should("have.text", "Geld empfangen");
            cy.get("input[data-testid='receiveMoney_input']").focus().type("10000");
            cy.get("button[data-testid='send_money_button']").click();

            cy.wait("@receiveMoney").then((interception) => {
                expect(interception.response.statusCode).to.equal(200);
                expect(interception.response.body.result).to.equal(true);
            });

            cy.get("h1[data-testid='title']").should("have.text", "Geld erhalten");


            cy.wait("@accountDetails").then((interception) => {
                expect(interception.response.statusCode).to.equal(200);
                expect(interception.response.body.customer.data.firstName).to.equal("Max");
            });

            cy.get("button[data-testid='close_button']").click();

            // Interception für erfolgreiche Überweisung
            cy.fixture("transactionData").then((transactionData) => {
                cy.intercept("POST", `${Cypress.env("backendUrl")}/api/accounts/1/send`, {
                    statusCode: 200,
                    body: {
                        result: transactionData.sendMoney.result
                    }
                }).as("sendMoney");
            });

            cy.get("button[id='0-ueberweisen']").click();
            cy.get("h1[data-testid='title']").should("have.text", "Geld überweisen");
            cy.get("input[data-testid='send_amount']").focus().type("100");
            cy.get("input[data-testid='send_iban']").click().type("DE12500105170648489890");
            cy.get("button[data-testid='send_money_button']").click();

            cy.wait("@sendMoney").its('response.statusCode').should('eq', 200);

            cy.get("h1[data-testid='title']").should("contain.text", "Geld gesendet");
        });
    });

    //Optional - in Arbeit
    it.skip("Festgeld Konto erstellen und Geld transferieren2", () => {
        // Alle notwendigen Fixtures laden
        cy.fixture("contracts").then((contracts) => {
            cy.fixture("transactionData").then((transactionData) => {

                // Alle Interceptions am Anfang des Tests setzen
                // Interception für Kontodetails vor Kontoerstellung
                cy.intercept("GET", "http://localhost:5005/api/contracts", {
                    statusCode: 200,
                    body: contracts.initial
                }).as("accountDetailsBefore");

                // Interception für Kontoerstellung
                cy.intercept("POST", "http://localhost:5005/api/contracts/accounts/FixedRateAccount", {
                    statusCode: 201,
                    body: contracts.createFixedRateAccount
                }).as("createFixedRateAccount");

                // Interception für Kontodetails nach Kontoerstellung
                cy.intercept("GET", "http://localhost:5005/api/contracts", {
                    statusCode: 200,
                    body: contracts.afterFixedRateAccountCreation
                }).as("accountDetailsAfter");

                // Interception für Geld empfangen
                cy.intercept("GET", `http://localhost:5005/api/accounts/1/receive?amount=${transactionData.receiveMoney.amount}`, {
                    statusCode: 200,
                    body: {
                        result: transactionData.receiveMoney.result
                    }
                }).as("receiveMoney");

                // Interception für Geld transferieren
                cy.intercept("POST", "http://localhost:5005/api/accounts/1/transfer", {
                    statusCode: 200,
                    body: {
                        result: transactionData.transferMoney.result
                    }
                }).as("transferMoney");

                // Interception für Kontodetails nach Geldtransfer
                cy.intercept("GET", "http://localhost:5005/api/contracts", {
                    statusCode: 200,
                    body: contracts.afterTransfer
                }).as("accountDetailsAfterTransfer");

                // Testschritte ausführen
                // Überprüfung der Willkommensnachricht
                cy.get('label[data-testid="customer_Label"]')
                    .invoke("text")
                    .then((text) => {
                        expect(text).to.include("Willkommen Max!");
                    });

                // Klick auf den "Konto erstellen" Button
                cy.get('button[data-testid="erstellen_button"]').click();

                // Überprüfung, ob die Kontoauswahlseite geladen wurde
                cy.get('div.container h3').should("have.text", "Wählen sie den Konto Typ");

                // Klick auf den "Festgeld" Button
                cy.get('button[test-dataid="fixed_rate_button"]').click();

                // Warte auf den accountDetailsBefore Request
                cy.wait("@accountDetailsBefore").then((interception) => {
                    expect(interception.response.statusCode).to.equal(200);
                    expect(interception.response.body.accounts["00036:00001"].data.balance).to.equal(9900.0);
                });

                // Warte auf den createFixedRateAccount Request und validiere
                cy.wait("@createFixedRateAccount").then((interception) => {
                    expect(interception.response.statusCode).to.equal(201);
                });

                // Warte auf den accountDetailsAfter Request und validiere
                cy.wait("@accountDetailsAfter").then((interception) => {
                    expect(interception.response.statusCode).to.equal(200);
                    expect(interception.response.body.accounts["00036:00002"].type).to.equal("com.simplytest.core.accounts.AccountFixedRate");
                });

                cy.get('th[id="1.kontotyp"]').should("have.text", "FixedRate");

                // Klick auf den "Geld empfangen" Button
                cy.get('button[id="0-empfangen"]').click();
                cy.get('h1[data-testid="receiveMoney_title"]').should("have.text", "Geld empfangen");
                cy.get('input[data-testid="receiveMoney_input"]').focus().type("10000");
                cy.get('button[data-testid="send_money_button"]').click();

                // Warte auf den receiveMoney Request und validiere
                cy.wait("@receiveMoney").then((interception) => {
                    expect(interception.response.statusCode).to.equal(200);
                    expect(interception.response.body.result).to.equal(true);
                    cy.get('h1[data-testid="title"]').should("have.text", "Geld erhalten");
                });
                cy.get('button[data-testid="close_button"]').click();

                // Klick auf den "Geld transferieren" Button
                cy.get('button[id="0-transferieren"]').click();
                cy.get('h1[id="mat-mdc-dialog-title-8"]').should("have.text", "Geld übertragen");
                cy.get('input[id="00036:00007-input"]').click();
                cy.get('input[data-testid="amount_input"]').focus().type("1000");
                cy.get('button[data-testid="transfer_money_button"]').click();

                // Warte auf den transferMoney Request und validiere
                cy.wait("@transferMoney").then((interception) => {
                    expect(interception.response.statusCode).to.equal(200);
                    cy.get('h1[data-testid="title"]').should("have.text", "Geld übertragen");
                });

                // Warte auf den accountDetailsAfterTransfer Request und validiere
                cy.wait("@accountDetailsAfterTransfer").then((interception) => {
                    expect(interception.response.statusCode).to.equal(200);
                    expect(interception.response.body.accounts["00036:00001"].data.balance).to.equal(8900.0);
                    expect(interception.response.body.accounts["00036:00002"].data.balance).to.equal(1000.0);
                });

                cy.get('button[data-testid="close_button"]').click();
                cy.get('th[id="1.kontostand"]').should("have.text", "1000€");
            });
        });
    });

    it.skip("Festgeld Konto erstellen und Geld transferieren", () => {
        cy.fixture("contracts").then((contracts) => {
            cy.get('label[data-testid="customer_Label"]')
                .invoke("text")
                .then((text) => {
                    expect(text).to.include("Willkommen Max!");
                });

            // Interception für Kontodetails vor Kontoerstellung
            cy.intercept("GET", "http://localhost:5005/api/contracts", {
                statusCode: 200,
                body: contracts.initial
            }).as("accountDetailsBefore");

            // Interception für Kontoerstellung
            cy.intercept("POST", "http://localhost:5005/api/contracts/accounts/FixedRateAccount", {
                statusCode: 201,
                body: contracts.createFixedRateAccount
            }).as("createFixedRateAccount");

            // Interception für Kontodetails nach Kontoerstellung
            cy.intercept("GET", "http://localhost:5005/api/contracts", {
                statusCode: 200,
                body: contracts.afterFixedRateAccountCreation
            }).as("accountDetailsAfter");

            cy.get('button[data-testid="erstellen_button"]').click();
            cy.get('div.container h3').should("have.text", "Wählen sie den Konto Typ");
            cy.get('button[test-dataid="fixed_rate_button"]').click();

            // Warte auf den accountDetailsBefore Request
            cy.wait("@accountDetailsBefore").then((interception) => {
                expect(interception.response.statusCode).to.equal(200);
                expect(interception.response.body.accounts["00036:00001"].data.balance).to.equal(9900.0);
            });


            // Warte auf den createFixedRateAccount Request
            cy.wait("@createFixedRateAccount").then((interception) => {
                expect(interception.response.statusCode).to.equal(201);
            });

            // Warte auf den accountDetailsAfter Request
            cy.wait("@accountDetailsAfter").then((interception) => {
                expect(interception.response.statusCode).to.equal(200);
                expect(interception.response.body.accounts["00036:00002"].type).to.equal("com.simplytest.core.accounts.AccountFixedRate");
            });

            cy.get('th[id="1.kontotyp"]').should("have.text", "FixedRate");

            // Interception für Geld empfangen
            cy.fixture("transactionData").then((transactionData) => {
                cy.intercept("GET", `http://localhost:5005/api/accounts/1/receive?amount=${transactionData.receiveMoney.amount}`, {
                    statusCode: 200,
                    body: {
                        result: transactionData.receiveMoney.result
                    }
                }).as("receiveMoney");
            });

            cy.get('button[id="0-empfangen"]').click();
            cy.get('h1[data-testid="receiveMoney_title"]').should("have.text", "Geld empfangen");
            cy.get('input[data-testid="receiveMoney_input"]').click().type("10000");
            cy.get('button[data-testid="send_money_button"]').click();

            cy.wait("@receiveMoney").then((interception) => {
                expect(interception.response.statusCode).to.equal(200);
                expect(interception.response.body.result).to.equal(true);
                cy.get('h1[data-testid="title"]').should("have.text", "Geld erhalten");
            });
            cy.get('button[data-testid="close_button"]').click();

            // Interception für Geld transferieren
            cy.fixture("transactionData").then((transactionData) => {
                cy.intercept("POST", "http://localhost:5005/api/accounts/1/transfer", {
                    statusCode: 200,
                    body: {
                        result: transactionData.transferMoney.result
                    }
                }).as("transferMoney");
            });

            cy.get('button[id="0-transferieren"]').click();
            cy.get('h1[id="mat-mdc-dialog-title-8"]').should("have.text", "Geld übertragen");
            cy.get('input[id="00036:00007-input"]').click();
            cy.get('input[data-testid="amount_input"]').focus().type("1000");
            cy.get('button[data-testid="transfer_money_button"]').click();

            // Interception für Kontodetails nach Geldtransfer
            cy.intercept("GET", "http://localhost:5005/api/contracts", {
                statusCode: 200,
                body: contracts.afterTransfer
            }).as("accountDetailsAfterTransfer");

            cy.wait("@transferMoney").then((interception) => {
                expect(interception.response.statusCode).to.equal(200);
                cy.get('h1[data-testid="title"]').should("have.text", "Geld übertragen");
            });

            cy.wait("@accountDetailsAfterTransfer").then((interception) => {
                expect(interception.response.statusCode).to.equal(200);
                expect(interception.response.body.accounts["00036:00001"].data.balance).to.equal(8900.0);
                expect(interception.response.body.accounts["00036:00002"].data.balance).to.equal(1000.0);
            });

            cy.get('button[data-testid="close_button"]').click();
            cy.get('th[id="1.kontostand"]').should("have.text", "1000€");
        });
    });
});
