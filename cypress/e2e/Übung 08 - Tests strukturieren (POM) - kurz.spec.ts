import LoginPage from "./PageObjects/LoginPage";
import DashboardPage from "./PageObjects/DashboardPage";
import CustomIntercepts from "./FunctionLibraries/CustomIntercepts";
import ResponseUtility from "./FunctionLibraries/ResponseUtility";

describe("Übung 4.2 - Anmeldung (POM)", () => {
    
    beforeEach(() => {
        // Visit the dashboard URL before each test
        const dashboardUrl = "http://localhost:4200/dashboard";
        cy.visit(dashboardUrl);
        cy.url().should("eq", dashboardUrl);

        CustomIntercepts.interceptAccountDetailsAfterSuccessfulLoginAs("contractsRequest");
    });
    
    it("Erfolgreiche Anmeldung", () => {

        CustomIntercepts.registerSuccessfulLoginRequestAs("loginRequest", "00025");

        LoginPage.login("00025", "admin");
        ResponseUtility.waitForSuccessfulResponseOf("loginRequest00025");

        DashboardPage.checkForRedirectionAndAccountDetails();
        ResponseUtility.waitForSuccessfulResponseOf("contractsRequest");
        DashboardPage.checkWelcomeMessage();
    });

    it("Erfolgreiche Anmeldung mit anderen Nutzerdaten", () => {

        CustomIntercepts.registerSuccessfulLoginRequestAs("loginRequest", "00026");

        LoginPage.login("00026", "password");
        ResponseUtility.waitForSuccessfulResponseOf("loginRequest00026");
        DashboardPage.checkForRedirectionAndAccountDetails();

        ResponseUtility.waitForSuccessfulResponseOf("contractsRequest");
        DashboardPage.checkWelcomeMessage();
    });

    it("Gescheiterte Anmeldung mit korrektem Vertragscode und falschem Passwort", () => {

        CustomIntercepts.registerFaultyLoginRequestAs("failedLoginRequest", "00033");

        LoginPage.login("00033", "123456");
        ResponseUtility.waitForFailureResponseOf("failedLoginRequest00033", 400);
        DashboardPage.checkNoContractMessage();
    });

    it("Gescheiterte Anmeldung mit ungültigem Vertragscode", () => {

        CustomIntercepts.registerInvalidLoginAccountRequestAs("invalidAccountRequest");
        LoginPage.login("111111", "1212");
        ResponseUtility.waitForFailureResponseOf("invalidAccountRequest", 404);
        DashboardPage.checkNoContractMessage();
    });
});
