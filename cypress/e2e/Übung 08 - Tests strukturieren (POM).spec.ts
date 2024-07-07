import CustomIntercepts from "./FunctionLibraries/CustomIntercepts";
import ResponseUtility from "./FunctionLibraries/ResponseUtility";
import DashboardPage from "./PageObjects/DashboardPage";
import LoginPage from "./PageObjects/LoginPage";


describe("Übung 8 - Banking Workflow (POM)", () => {
    
    beforeEach(() => {

         // Interception für Geld empfangen
         CustomIntercepts.registerSuccessfulReceiveMoneyRequestAs("receiveMoney");

        // Interception für Kontendaten
        CustomIntercepts.registerSuccessfulAccountDataRequestAs("contractsRequest");

        // Interception für Anmeldung
        cy.fixture("loginData").then((loginData) => {

            CustomIntercepts.registerSuccessfulLoginRequestAs("loginRequest", loginData.userid);

            // Vorbereitende Test Schritte
            LoginPage.visit();
            LoginPage.login(loginData.userid, loginData.password);

            ResponseUtility.waitForSuccessfulResponseOf(`loginRequest${loginData.userid}`)
            ResponseUtility.waitForSuccessfulResponseOf("contractsRequest");
        });
    });


    it("Unhappy Path: Geld empfangen und überweisen mit ungültiger IBAN", () => {
        
        // Interception für gescheiterte Überweisung
        CustomIntercepts.registerFaultySendMoneyRequestAs("failedTransaction");


        // Test Case workflow

        DashboardPage.verifyWelcomeMessage("Willkommen Max!");

        DashboardPage.receiveMoney("10000");
        ResponseUtility.waitForSuccessfulResponseOf("receiveMoney");

        DashboardPage.verifyReceiveMoney();
        ResponseUtility.waitForSuccessfulResponseOf("contractsRequest");

        DashboardPage.sendMoney("100", "invalid");
        ResponseUtility.waitForFailureResponseOf("failedTransaction", 400);

        DashboardPage.verifyFailedSendMoney();
        
    });

    it("Happy Path: Geld empfangen und überweisen mit gültiger IBAN", () => {
            
        // Interception für erfolgreiche Überweisung
        CustomIntercepts.registerSuccessfulSendMoneyRequestAs("sendMoney");

        
        // Test Case workflow

        DashboardPage.verifyWelcomeMessage("Willkommen Max!");
        DashboardPage.receiveMoney("10000");
        ResponseUtility.waitForSuccessfulResponseOf("receiveMoney");

        DashboardPage.verifyReceiveMoney();
        ResponseUtility.waitForSuccessfulResponseOf("contractsRequest");

        DashboardPage.sendMoney("100", "DE12500105170648489890");
        ResponseUtility.waitForSuccessfulResponseOf("sendMoney");

        DashboardPage.verifySendMoney();
    });
});