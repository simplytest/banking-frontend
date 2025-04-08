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
        cy.get("#firstName").type(registrationData.firstName);
        cy.get("#lastName").type(registrationData.lastName);
        cy.get("#password").type(registrationData.password);
        cy.get("#street").type(registrationData.street);
        cy.get("#house").type(registrationData.house);
        cy.get("#zipCode").type(registrationData.zipCode);
        cy.get("#city").type(registrationData.city);
        cy.get("#country").type(registrationData.country);
        cy.get("#email").type(registrationData.email);
        cy.get("#birthDay").type(registrationData.birthDay);

        // Überprüfen Sie, ob das Submit-Button aktiviert ist und klicken Sie sie an
        cy.get("button[data-testid='register_button']").should("be.enabled").click();
        cy.get("label[data-testid=\"customer_Label\"]").should("contain", "Max");
        cy.url().should("contain", "mainPage");
    });

    it("Gescheiterte Registrierung wegen Minderjährigkeit", function ()
    {
        // Zugriff auf die Fixture-Daten im Testfall
        const registrationData = this.registrationData;

        // Erfassen Sie den Netzwerkverkehr für die fehlgeschlagene Registrierung wegen Minderjährigkeit
        cy.intercept("POST", `${Cypress.env("backendUrl")}/api/contracts`, {
            statusCode: 400,
            body: registrationData.underageRegistrationResponse,
        }).as("underageRegisterRequest");

        // Klicken Sie auf den Registrierungsbutton
        cy.get("#registerButton").click();

        // Füllen Sie das Registrierungsformular mit den Daten eines Minderjährigen aus
        cy.get("#firstName").type(registrationData.firstName);
        cy.get("#lastName").type(registrationData.lastName);
        cy.get("#password").type(registrationData.password);
        cy.get("#street").type(registrationData.street);
        cy.get("#house").type(registrationData.house);
        cy.get("#zipCode").type(registrationData.zipCode);
        cy.get("#city").type(registrationData.city);
        cy.get("#country").type(registrationData.country);
        cy.get("#email").type(registrationData.email);
        cy.get("#birthDay").type("2020-10-10"); // Minderjährig

        // Fügen Sie einen Listener für das `window:alert`-Ereignis hinzu
        cy.on("window:alert", (text) =>
        {
            expect(text).to.contains("Underage");
        });

        // Überprüfen Sie, ob das Submit-Button aktiviert ist und klicken Sie sie an
        cy.get("button[data-testid='register_button']").should("be.enabled").click();

        // Warten Sie auf die Antwort des Servers und überprüfen Sie die fehlgeschlagene Registrierung wegen Minderjährigkeit
        cy.wait("@underageRegisterRequest").should((xhr) =>
        {
            expect(xhr.response.statusCode).to.equal(400);
            expect(xhr.response.body.error).to.equal("Underage");
        });
    });
});