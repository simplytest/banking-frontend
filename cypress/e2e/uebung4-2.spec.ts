import CustomIntercepts from "./FunctionLibraries/CustomIntercepts";
import LoginPage from "./PageObjects/LoginPage";

describe("Übung 4-2, Anmelden ohne Backend", () =>
{
    let loginData;
    beforeEach(() =>
    {
        LoginPage.visit();

        cy.intercept("GET", "**/api/contracts", {
            statusCode: 200,
            fixture: "singleContract",
        }).as("contractsRequest");
        cy.fixture("loginData.json").then((data) =>
        {
            loginData = data;
        });
    });
    it("Die Vertragsnummer 00025 meldet sich erfolgreich an (ohne Fixture)", () =>
    {
        CustomIntercepts.registerSuccessfulLoginRequestAs("loginRequest", "00025");
        LoginPage.login("00025", "admin");

        cy.wait("@loginRequest00025").then((interception) =>
        {
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.url().should("contain", "mainPage");
        cy.wait("@contractsRequest").then((interception) =>
        {
            expect(interception.response.statusCode).to.eq(200);
        });
    });

    it("Die Vertragsnummer 00023 meldet sich erfolgreich an", () =>
    {

        const loginApi = "**/login/" + loginData.userid;
        cy.fixture("loginResponsePos").then((loginResponse) =>
        {
            cy.intercept("POST", loginApi, loginResponse).as("loginRequest0025");
        });
        LoginPage.login(loginData.userid, loginData.password);

        cy.wait("@loginRequest0025").then((interception) =>
        {
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.url().should("contain", "mainPage");
        cy.wait("@contractsRequest").then((interception) =>
        {
            expect(interception.response.statusCode).to.eq(200);
        });
    });

    it("4-2-2 Anmeldung mit 00026 und password führt zu Erfolg", () =>
    {
        CustomIntercepts.registerSuccessfulLoginRequestAs("loginRequest", "00026");
        LoginPage.login("00026", "password");

        cy.wait("@loginRequest00026").then((interception) =>
        {
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.url().should("contain", "mainPage");
        cy.wait("@contractsRequest").then((interception) =>
        {
            expect(interception.response.statusCode).to.eq(200);
        });
    });
    it("4-2-3 Anmeldung mit 00033 und password führt zu Erfolg", () =>
    {
        CustomIntercepts.registerFailedLoginRequestWrongPasswordAs("loginRequest", "00033");
        LoginPage.login("00033", "password");

        cy.wait("@loginRequest00033").then((interception) =>
        {
            expect(interception.response.statusCode).to.eq(400);
        });

    });
    it("4-2-4 Anmeldung mit 11111 und password führt zu Erfolg", () =>
    {
        CustomIntercepts.registerFailedLoginRequestIdNotFoundAs("loginRequest", "11111");
        LoginPage.login("11111", "password");

        cy.wait("@loginRequest11111").then((interception) =>
        {
            expect(interception.response.statusCode).to.eq(404);
        });

    });

});