
describe("Übung 6 - Registrierung und Konfiguration von Cypress", () => {
    beforeEach(() => {
        cy.visit(`${Cypress.config("baseUrl")}${Cypress.env("dashboard_page")}`);
    });

    before(() => {
        // Laden der Fixture-Daten für die Registrierung
        cy.fixture("registrationData").as("registrationData");
        cy.fixture("contracts").as("contractsData");
    });

    it("Erfolgreiche Registrierung", function () {
        // Zugriff auf die Fixture-Daten im Testfall
        const registrationData = this.registrationData;

        // Erfassen Sie den Netzwerkverkehr für die Registrierung
        cy.intercept("POST", `${Cypress.env("backendUrl")}/api/contracts`, {
            statusCode: 201,
            body: registrationData.registrationResponse
        }).as("registerRequest");

        cy.intercept("GET", `${Cypress.env("backendUrl")}/api/contracts`, {
            statusCode: 200,
            body: this.contractsData.initial
        }).as("contractsRequest");

        
        // Klicken Sie auf den Registrierungsbutton
        cy.get("#registerButton").click();

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


        // Warten Sie auf die Antwort des Servers und überprüfen Sie die erfolgreiche Registrierung
        cy.wait("@registerRequest").its('response.statusCode').should('eq', 201);

        cy.wait("@contractsRequest").its('response.statusCode').should('eq', 200);
        
        // Überprüfen Sie die angezeigte Willkommensnachricht
        cy.get('label[data-testid="customer_Label"]')
            .should("be.visible")
            .should("contain.text", `Willkommen ${registrationData.firstName}!`);
    });
});