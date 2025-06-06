import LoginPage from "./pageObject/LoginPage";
import CustomIntercepts from "./FucntionLibraries/CustomIntercepts";
import ResponseUtility from "./FucntionLibraries/ResponseUtility";
import DashboardPage from "./pageObject/DashboardPage";
import ReceiveMoneyPage from "./pageObject/ReceiveMoneyPage";
import ConfirmationPage from "./pageObject/ConfirmationPage";
import SendMoneyPage from "./pageObject/SendMoneyPage";

describe("Übung 8 - Banking Workflow (POM)", () =>
{

    beforeEach(() =>
    {
        // Interception für Geld empfangen
        CustomIntercepts.registerSuccessfulReceiveMoneyRequestAs("receiveMoney");
        // Interception für Kontendaten
        CustomIntercepts.registerSuccessfulAccountDataRequestAs("contractsRequest");
        cy.fixture("loginData").then((loginData) =>
        {
            // Vorbereitende Test Schritte
            CustomIntercepts.registerSuccessfulLoginRequestAs("loginRequest", loginData.userid);
            LoginPage.visit();
            LoginPage.login(loginData.userid, loginData.password);
            ResponseUtility.waitForSuccessfulResponseOf(`loginRequest${loginData.userid}`);
            ResponseUtility.waitForSuccessfulResponseOf("contractsRequest");
        });
    });

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