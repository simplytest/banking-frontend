import DashboardPage from "./PageObjects/DashboardPage";
import LoginPage from "./PageObjects/LoginPage";


describe("Übung 8 - Banking Workflow", () => {
    
    beforeEach(() => {

         // Interception für Geld empfangen
         cy.fixture("transactionData").then((transactionData) => {
            cy.intercept("GET", `${Cypress.env("backendUrl")}/api/accounts/1/receive?amount=${transactionData.receiveMoney.amount}`, {
                statusCode: 200,
                body: {
                    result: transactionData.receiveMoney.result
                }
            }).as("receiveMoney");
        });


        // Interception für Kontendaten
        cy.fixture("contracts").then( (contracts) => {
           
            cy.intercept("GET", `${Cypress.env("backendUrl")}/api/contracts`, {
                statusCode: 200,
                body: contracts.initial
            }).as("contractsRequest");
            
        });


        // Interception für Anmeldung
        cy.fixture("loginData").then((loginData) => {
            cy.intercept("POST", `${Cypress.env("backendUrl")}/api/contracts/login/${loginData.userid}`, {
                statusCode: 200,
                body: {
                    result: loginData.loginResponse.JW
                }
            }).as("loginRequest");


            LoginPage.visit();
            LoginPage.login(loginData.userid, loginData.password);


            cy.wait("@loginRequest").then((interception) => {
                expect(interception.response.statusCode).equals(200);
            });

            cy.wait("@contractsRequest");
        });
    });


    it("Unhappy Path: Geld empfangen und überweisen mit ungültiger IBAN", () => {
        
         // Interception für gescheiterte Überweisung

         cy.fixture("transactionData").then((transactionData) => {
            cy.intercept("POST", `${Cypress.env("backendUrl")}/api/accounts/1/send`, {
                statusCode: 400,
                body: {
                    error: transactionData.sendMoney.invalidIbanError
                }
            }).as("failedTransaction");
        });


        // Test Case workflow

            DashboardPage.verifyWelcomeMessage("Willkommen Max!");

            DashboardPage.receiveMoney("10000");
            cy.wait("@receiveMoney").then((interception) => {
                expect(interception.response.statusCode).to.equal(200);
                expect(interception.response.body.result).to.equal(true);
            });
    
            DashboardPage.verifyReceiveMoney();
            cy.wait("@contractsRequest").then((interception) => {
                expect(interception.response.statusCode).to.equal(200);
                expect(interception.response.body.customer.data.firstName).to.equal("Max");
            }); 

            DashboardPage.sendMoney("100", "invalid");
            cy.wait("@failedTransaction").its('response.statusCode').should('eq', 400);

            DashboardPage.verifyFailedSendMoney();
        
    });

    it("Happy Path: Geld empfangen und überweisen mit gültiger IBAN", () => {
            
        // Interception für erfolgreiche Überweisung
        cy.fixture("transactionData").then((transactionData) => {
            cy.intercept("POST", `${Cypress.env("backendUrl")}/api/accounts/1/send`, {
                statusCode: 200,
                body: {
                    result: transactionData.sendMoney.result
                }
            }).as("sendMoney");
        });

        
        // Test Case workflow

        DashboardPage.verifyWelcomeMessage("Willkommen Max!");
        DashboardPage.receiveMoney("10000");
        cy.wait("@receiveMoney").then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            expect(interception.response.body.result).to.equal(true);
        });

        DashboardPage.verifyReceiveMoney();
        cy.wait("@contractsRequest").then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            expect(interception.response.body.customer.data.firstName).to.equal("Max");
        });

        DashboardPage.sendMoney("100", "DE12500105170648489890");
        cy.wait("@sendMoney").its('response.statusCode').should('eq', 200);

        DashboardPage.verifySendMoney();
    });
});