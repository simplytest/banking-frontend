import RegistrationPage from "./PageObjects/RegistrationPage";

describe("Übung 5-2, Registeriung ohne Backend", () =>
{
    const dashboardUrl = "http://localhost:4200/dashboard";

    beforeEach(() =>
    {
        // Laden der Registeriungsdaten
        cy.fixture("registrationData").as("registrationData");
        cy.fixture("contracts").as("contractsData");
        cy.visit("/");
        cy.get("h1").should("contain", "Smart Money");
        cy.url().should("eq", dashboardUrl);
    });

    it("5.2.1 Erfolgreiche Registrierung ohne Interception - benötigt Backend", function ()
    {
        // Zugriff auf die Fixture-Daten im Testfall
        const registrationData = this.registrationData;

        // Klicken Sie auf den Registrierungsbutton
        cy.get("#registerButton").click();

        RegistrationPage.validate();
        // Erfassen Sie den Netzwerkverkehr für die Registrierung
        cy.intercept("POST", "**/api/contracts", {
            statusCode: 201,
            body: registrationData.registrationResponse,
        }).as("registerRequest");

        cy.intercept("GET", "**/api/contracts", {
            statusCode: 200,
            body: this.contractsData.initial,
        }).as("contractsRequest");

        // Füllen Sie das Registrierungsformular mit den Fixture-Daten aus
        RegistrationPage.fillFormFixture(registrationData);
    });

    it("Gescheiterte Registrierung wegen Minderjährigkeit", function ()
    {
        // Zugriff auf die Fixture-Daten im Testfall
        const registrationData = this.registrationData;

        // Erfassen Sie den Netzwerkverkehr für die fehlgeschlagene Registrierung wegen Minderjährigkeit
        cy.intercept("POST", "/api/contracts", {
            statusCode: 400,
            body: registrationData.underageRegistrationResponse,
        }).as("underageRegisterRequest");

        // Klicken Sie auf den Registrierungsbutton
        cy.get("#registerButton").click();

        // Füllen Sie das Registrierungsformular mit den Daten eines Minderjährigen aus
        RegistrationPage.typeFirstName("John");
        RegistrationPage.typeLastName("Doe");
        RegistrationPage.typePassword("password123");
        RegistrationPage.typeStreet("Test Street");
        RegistrationPage.typeHouse("123");
        RegistrationPage.typeZipCode("12345");
        RegistrationPage.typeCity("Test City");
        RegistrationPage.typeCountry("Test Country");
        RegistrationPage.typeEmail("john.doe@example.com");
        RegistrationPage.typeBirthDate("2020-10-10"); // Minderjährig
        // Fügen Sie einen Listener für das `window:alert`-Ereignis hinzu
        cy.on("window:alert", (text) =>
        {
            //expect(text).to.contains("Underage");
        });

        // Überprüfen Sie, ob das Submit-Button aktiviert ist und klicken Sie sie an
        cy.get("button[data-testid='register_button']").should("be.enabled");
        RegistrationPage.clickOnRegistrierenButtonAgain();

        // Warten Sie auf die Antwort des Servers und überprüfen Sie die fehlgeschlagene Registrierung wegen Minderjährigkeit
        cy.wait("@underageRegisterRequest").should((xhr) =>
        {
            expect(xhr.response.statusCode).to.equal(400);
            expect(xhr.response.body.error).to.equal("Underage");
        });
    });

});