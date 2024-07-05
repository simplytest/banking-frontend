import LoginPage from "./PageObjects/LoginPage";
import DashboardPage from "./PageObjects/DashboardPage";
import LoginIntercepts from "./FunctionLibraries/LoginIntercepts";
import ResponseUtility from "./FunctionLibraries/ResponseUtility";

describe("Übung 4.2 - Anmeldung", () => {
    
    beforeEach(() => {
        // Visit the dashboard URL before each test
        const dashboardUrl = "http://localhost:4200/dashboard";
        cy.visit(dashboardUrl);
        cy.url().should("eq", dashboardUrl);

        LoginIntercepts.interceptAccountDetailsAfterSuccessfulLoginAs("contractsRequest");
    });
    
    it("Erfolgreiche Anmeldung", () => {

        LoginIntercepts.registerExemplaryLoginAs("loginRequest", "00025");

        LoginPage.login("00025", "admin");
        ResponseUtility.waitForStatus200On("loginRequest00025");

        DashboardPage.checkForRedirectionAndAccountDetails();
        ResponseUtility.waitForStatus200On("contractsRequest");
        DashboardPage.checkWelcomeMessage();
    });

    it("Erfolgreiche Anmeldung mit anderen Nutzerdaten", () => {

        LoginIntercepts.registerExemplaryLoginAs("loginRequest", "00026");

        LoginPage.login("00026", "password");
        ResponseUtility.waitForStatus200On("loginRequest00026");
        DashboardPage.checkForRedirectionAndAccountDetails();

        ResponseUtility.waitForStatus200On("contractsRequest");
        DashboardPage.checkWelcomeMessage();
    });

    it("Gescheiterte Anmeldung mit korrektem Vertragscode und falschem Passwort", () => {

        LoginIntercepts.registerFaultyLoginOn("00033");

        LoginPage.login("00033", "123456");
        ResponseUtility.waitForFailureOn("failedLoginRequest");
        DashboardPage.checkNoContractMessage();
    });

    it("Gescheiterte Anmeldung mit ungültigem Vertragscode", () => {

        LoginIntercepts.registerInvalidAccountRequestAs("invalidAccountRequest");
        LoginPage.login("111111", "1212");
        ResponseUtility.waitForInvalidAccountOn("invalidAccountRequest");
        DashboardPage.checkNoContractMessage();
    });
});
