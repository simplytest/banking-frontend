import DashboardPage from "./PageObjects/DashboardPage";
import LoginPage from "./PageObjects/LoginPage";


describe("Übung 8 - Banking Workflow", () => {
    beforeEach(() => {
        cy.fixture("loginData").then((loginData) => {
            LoginPage.visit();
            LoginPage.login("00025", loginData.password, loginData.loginResponse.JWT);
        });
    });

    it("Unhappy Path: Geld empfangen und überweisen mit ungültiger IBAN", () => {
        cy.fixture("contracts").then((contracts) => {
            DashboardPage.verifyWelcomeMessage("Willkommen Max!");

            // Interception für Geld empfangen
            cy.fixture("transactionData").then((transactionData) => {
                cy.intercept("GET", `http://localhost:5005/api/accounts/1/receive?amount=${transactionData.receiveMoney.amount}`, {
                    statusCode: 200,
                    body: {
                        result: transactionData.receiveMoney.result
                    }
                }).as("receiveMoney");
            });

            // Interception für Kontodetails nach Geldempfang
            cy.intercept("GET", "http://localhost:5005/api/contracts", {
                statusCode: 200,
                body: contracts.initial
            }).as("accountDetails");

            DashboardPage.receiveMoney("10000");
            DashboardPage.verifyReceiveMoney();

            cy.wait("@accountDetails").then((interception) => {
                expect(interception.response.statusCode).to.equal(200);
                expect(interception.response.body.customer.data.firstName).to.equal("Max");
            });

            // Interception für gescheiterte Überweisung
            cy.fixture("transactionData").then((transactionData) => {
                cy.intercept("POST", "http://localhost:5005/api/accounts/1/send", {
                    statusCode: 400,
                    body: {
                        error: transactionData.sendMoney.invalidIbanError
                    }
                }).as("failedTransaction");
            });

            DashboardPage.sendMoney("100", "invalid");
            DashboardPage.verifyFailedSendMoney();
        });
    });

    it("Happy Path: Geld empfangen und überweisen mit gültiger IBAN", () => {
        cy.fixture("contracts").then((contracts) => {
            DashboardPage.verifyWelcomeMessage("Willkommen Max!");

            // Interception für Geld empfangen
            cy.fixture("transactionData").then((transactionData) => {
                cy.intercept("GET", `http://localhost:5005/api/accounts/1/receive?amount=${transactionData.receiveMoney.amount}`, {
                    statusCode: 200,
                    body: {
                        result: transactionData.receiveMoney.result
                    }
                }).as("receiveMoney");
            });

            // Interception für Kontodetails nach Geldempfang
            cy.intercept("GET", "http://localhost:5005/api/contracts", {
                statusCode: 200,
                body: contracts.initial
            }).as("accountDetails");

            DashboardPage.receiveMoney("10000");
            DashboardPage.verifyReceiveMoney();

            cy.wait("@accountDetails").then((interception) => {
                expect(interception.response.statusCode).to.equal(200);
                expect(interception.response.body.customer.data.firstName).to.equal("Max");
            });

            // Interception für erfolgreiche Überweisung
            cy.fixture("transactionData").then((transactionData) => {
                cy.intercept("POST", "http://localhost:5005/api/accounts/1/send", {
                    statusCode: 200,
                    body: {
                        result: transactionData.sendMoney.result
                    }
                }).as("sendMoney");
            });

            DashboardPage.sendMoney("100", "DE12500105170648489890");
            DashboardPage.verifySendMoney();
        });
    });
});