describe("Übung 5 - Registrierung", () => {
    const baseUrl = "http://localhost:4200/dashboard";

    beforeEach(() => {
        // Laden der Fixture-Daten für die Registrierung vor jedem Testfall
        cy.fixture("registrationData").as("registrationData");
        cy.fixture("contracts").as("contractsData");
        cy.visit(baseUrl);
    });

    it("Erfolgreiche Registrierung ohne Interception - benötigt Backend", function () {
        // Zugriff auf die Fixture-Daten im Testfall
        const registrationData = this.registrationData;

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

        // Überprüfen Sie, ob das Submit-Button aktiviert ist
        cy.get("button[data-testid='register_button']").should("be.enabled");

        // Klicken Sie auf den Submit-Button
        cy.get("button[data-testid='register_button']").click();


        // Überprüfen Sie die angezeigte Willkommensnachricht
        cy.get('label[data-testid="customer_Label"]')
            .should("be.visible")
            .invoke("text")
            .should("include", `Willkommen ${registrationData.firstName}!`);

    });

    it("Erfolgreiche Registrierung", function () {
        // Zugriff auf die Fixture-Daten im Testfall
        const registrationData = this.registrationData;
       

        // Erfassen Sie den Netzwerkverkehr für die Registrierung
        cy.intercept("POST", "http://localhost:5005/api/contracts", {
            statusCode: 201,
            body: registrationData.registrationResponse
        }).as("registerRequest");

        cy.intercept("GET", "http://localhost:5005/api/contracts", {
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

        // Überprüfen Sie, ob das Submit-Button aktiviert ist
        cy.get("button[data-testid='register_button']").should("be.enabled");

        // Klicken Sie auf den Submit-Button
        cy.get("button[data-testid='register_button']").click();

        // Warten Sie auf die Antwort des Servers und überprüfen Sie die erfolgreiche Registrierung
        cy.wait("@registerRequest").should((xhr)=> {
            expect(xhr.response.statusCode).to.equal(201); 
        });

        cy.wait("@contractsRequest").should((xhr)=> {
            expect(xhr.response.statusCode).to.equal(200); 
        });

        // Überprüfen Sie die angezeigte Willkommensnachricht
        cy.get('label[data-testid="customer_Label"]')
            .should("be.visible")
            .invoke("text")
            .should("include", `Willkommen ${registrationData.firstName}!`);
        
    });

    it("Gescheiterte Registrierung wegen Minderjährigkeit", function () {
        // Zugriff auf die Fixture-Daten im Testfall
        const registrationData = this.registrationData;

        // Erfassen Sie den Netzwerkverkehr für die fehlgeschlagene Registrierung wegen Minderjährigkeit
        cy.intercept("POST", "http://localhost:5005/api/contracts", {
            statusCode: 400,
            body: registrationData.underageRegistrationResponse
        }).as("underageRegisterRequest");

        // Klicken Sie auf den Registrierungsbutton
        cy.get("#registerButton").click();

        // Füllen Sie das Registrierungsformular mit den Daten eines Minderjährigen aus
        cy.get("#firstName").type("John");
        cy.get("#lastName").type("Doe");
        cy.get("#password").type("password123");
        cy.get("#street").type("Test Street");
        cy.get("#house").type("123");
        cy.get("#zipCode").type("12345");
        cy.get("#city").type("Test City");
        cy.get("#country").type("Test Country");
        cy.get("#email").type("john.doe@example.com");
        cy.get("#birthDay").type("2020-10-10"); // Minderjährig

        // Überprüfen Sie, ob das Submit-Button aktiviert ist
        cy.get("button[data-testid='register_button']").should("be.enabled");

        // Fügen Sie einen Listener für das `window:alert`-Ereignis hinzu
        cy.on("window:alert", (text) => {
            expect(text).to.contains("Registrierung für Minderjährige nicht erlaubt.");
        });

        // Klicken Sie auf den Submit-Button
        cy.get("button[data-testid='register_button']").click();

        // Warten Sie auf die Antwort des Servers und überprüfen Sie die fehlgeschlagene Registrierung wegen Minderjährigkeit
        cy.wait("@underageRegisterRequest").should((xhr) => {
            expect(xhr.response.statusCode).to.equal(400);
            expect(xhr.response.body.error).to.equal("Underage");
        });
    });
});
