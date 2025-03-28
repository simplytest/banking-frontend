import LoginPage from "./PageObjects/LoginPage";
import CustomIntercepts from "./FunctionLibraries/CustomIntercepts";
import ResponseUtility from "./FunctionLibraries/ResponseUtility";
import DashboardPage from "./PageObjects/DashboardPage";
import ReceiveMoneyPage from "./PageObjects/ReceiveMoneyPage";
import ConfirmationPage from "./PageObjects/ConfirmationPage";
import SendMoneyPage from "./PageObjects/SendMoneyPage";

describe("Übung 8 - Banking Workflow (POM)", () =>
{

    beforeEach(() =>
    {
        // Interception für Geld empfangen
        CustomIntercepts.registerSuccessfulReceiveMoneyRequestAs("receiveMoney");

        // Interception für Kontendaten
        CustomIntercepts.registerSuccessfulAccountDataRequestAs("contractsRequest");
        // Interception für Anmeldung
        cy.fixture("loginData").then((loginData) =>
        {

            CustomIntercepts.registerSuccessfulLoginRequestAs("loginRequest", loginData.userid);

            // Vorbereitende Test Schritte
            LoginPage.visit();
            LoginPage.login(loginData.userid, loginData.password);

            ResponseUtility.waitForSuccessfulResponseOf(`loginRequest${loginData.userid}`);
            ResponseUtility.waitForSuccessfulResponseOf("contractsRequest");
        });

    });

    // First, we should create these additional Page Objects:
    // - DashboardPage.ts (for dashboard interactions)
    // - ReceiveMoneyPage.ts (for money receiving flow)
    // - SendMoneyPage.ts (for money sending flow)
    // - ConfirmationPage.ts (for confirmation screens)

    // Additional interceptors should be added to CustomIntercepts.ts:
    // - registerFailedSendMoneyRequestAs(alias)
    // - registerSuccessfulSendMoneyRequestAs(alias)

    it("Unhappy Path: Geld empfangen und überweisen mit ungültiger IBAN", () =>
    {
        // Register interception for failed transaction
        CustomIntercepts.registerFailedTransactionRequestAs("failedTransaction");

        // Verify dashboard shows correct welcome message
        DashboardPage.verifyWelcomeMessage("Willkommen Max!");

        // Send money flow
        DashboardPage.clickReceiveMoneyButton(0);
        ReceiveMoneyPage.verifyTitle("Geld empfangen");
        ReceiveMoneyPage.enterAmount("10000");
        ReceiveMoneyPage.clickSendButton();

        // Verify response
        ResponseUtility.verifyResponseOf("receiveMoney", (response) =>
        {
            expect(response.statusCode).to.equal(200);
            expect(response.body.result).to.equal(true);
        });

        // Confirm money received
        ConfirmationPage.verifyTitle("Geld erhalten");
        ConfirmationPage.clickCloseButton();

        // Verify contracts updated correctly
        ResponseUtility.verifyResponseOf("contractsRequest", (response) =>
        {
            expect(response.statusCode).to.equal(200);
            expect(response.body.customer.data.firstName).to.equal("Max");
        });

        // Try to send money with invalid IBAN
        DashboardPage.clickSendMoneyButton(0);
        SendMoneyPage.verifyTitle("Geld überweisen");
        SendMoneyPage.enterAmount("100");
        SendMoneyPage.enterIban("invalid");
        SendMoneyPage.clickSendButton();

        // Verify failed transaction
        ResponseUtility.verifyFailedResponseOf("failedTransaction", 400);

        // Verify alert message
        cy.on("window:alert", (text) =>
        {
            expect(text).to.equal("{\"error\":{\"error\":\"BadIban\"}}");
        });
    });

    it("Happy Path: Geld empfangen und überweisen mit gültiger IBAN", () =>
    {
        // Register interception for successful transaction
        CustomIntercepts.registerSuccessfulSendMoneyRequestAs("sendMoney");

        // Verify dashboard shows correct welcome message
        DashboardPage.verifyWelcomeMessage("Willkommen Max!");

        // Receive money flow
        DashboardPage.clickReceiveMoneyButton(0);
        ReceiveMoneyPage.verifyTitle("Geld empfangen");
        ReceiveMoneyPage.enterAmount("10000");
        ReceiveMoneyPage.clickSendButton();

        // Verify response
        ResponseUtility.verifyResponseOf("receiveMoney", (response) =>
        {
            expect(response.statusCode).to.equal(200);
            expect(response.body.result).to.equal(true);
        });

        // Confirm money received
        ConfirmationPage.verifyTitle("Geld erhalten");
        ConfirmationPage.clickCloseButton();

        // Verify contracts updated correctly
        ResponseUtility.verifyResponseOf("contractsRequest", (response) =>
        {
            expect(response.statusCode).to.equal(200);
            expect(response.body.customer.data.firstName).to.equal("Max");
        });

        // Send money with valid IBAN
        DashboardPage.clickSendMoneyButton(0);
        SendMoneyPage.verifyTitle("Geld überweisen");
        SendMoneyPage.enterAmount("100");
        SendMoneyPage.enterIban("DE12500105170648489890");
        SendMoneyPage.clickSendButton();

        // Verify successful transaction
        ResponseUtility.verifySuccessfulResponseOf("sendMoney");

        // Confirm money sent
        ConfirmationPage.verifyTitleContains("Geld gesendet");
    });
});