describe("Übung 5.1 - Registrierung über Backend", () => {
    const baseUrl = "http://localhost:4200/dashboard";

    beforeEach(() => {
        // Laden der Fixture-Daten für die Registrierung vor jedem Testfall
        cy.fixture("registrationData").as("registrationData");
    });

    it("Erfolgreiche Registrierung ohne Interception - benötigt Backend", function () {
 
        cy.visit(baseUrl);

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
            .should("contain.text", `Willkommen ${registrationData.firstName}!`);

    });

});
