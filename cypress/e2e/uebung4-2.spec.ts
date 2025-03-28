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
        const loginApi = "**/login/" + "00025";
        cy.intercept("POST", loginApi, {
            "statusCode": 200,
            "body": {
                "result": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyNSIsImlhdCI6MTcxND",
            },
        }).as("loginRequest00025");
        LoginPage.login("0025", "admin");

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

    it.only("Die Vertragsnummer 00025 meldet sich erfolgreich an", () =>
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

});