import LoginPage from "./pageObject/LoginPage";
import CustomIntercepts from "./FucntionLibraries/CustomIntercepts";
import ResponseUtility from "./FucntionLibraries/ResponseUtility";

describe("Übung 8 - Banking Workflow (POM)", () =>
{

    beforeEach(() =>
    {
        // Interception für Kontendaten
        CustomIntercepts.registerSuccessfulAccountDataRequestAs("contractsRequest");
        cy.fixture("loginData").then((loginData) => {
            // Vorbereitende Test Schritte
            CustomIntercepts.registerSuccessfulLoginRequestAs("loginRequest", loginData.userid);
            LoginPage.visit();
            LoginPage.login(loginData.userid, loginData.password);
            ResponseUtility.waitForSuccessfulResponseOf(`loginRequest${loginData.userid}`);
            ResponseUtility.waitForSuccessfulResponseOf("contractsRequest");
        });
    });


    it("Happy Path: Geld empfangen und überweisen mit gültiger IBAN", () =>
    {

    });
});