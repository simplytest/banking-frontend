describe("Übung 5.1 - Registrierung über Backend", () => {
    const baseUrl = "http://localhost:4200/dashboard";

    beforeEach(() => {
        // Laden der Fixture-Daten für die Registrierung vor jedem Testfall
        cy.fixture("registrationData").as("registrationData");
    });

    it("5.1.1 Erfolgreiche Registrierung ohne Interception - benötigt Backend", function () {
 
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


    it("5.1.2 Neuen Account via API registrieren  und anmelden", () => {
		const registerAccountUrl = "http://localhost:5005/api/contracts";
		const firstName = "Max";
		const lastName = "Mustermann";
		const password = "123";
		const street = "Bahnhofstraße";
		const house = "10";
		const zipCode = "90403";
		const city = "Nürnberg";
		const country = "Deutschland";
		const email = "max@mustermann.de";
		const type = "Private";
		const birthDay = "1990-01-01";
		let registeredAccountId;

		// Neues Konto registrieren
		cy.request({
			method: "POST",
			url: registerAccountUrl,
			headers: {
				"Content-Type": "application/json",
			},
			body: {
				firstName: firstName,
				lastName: lastName,
				password: password,
				address: {
					street: street,
					house: house,
					zipCode: zipCode,
					city: city,
					country: country,
					email: email,
				},
				type: type,
				birthDay: birthDay,
			},
		}).then((registerAccountResponse) => {
			expect(registerAccountResponse.status).to.eq(201);
			registeredAccountId = registerAccountResponse.body.result.id;
            

            cy.visit("http://localhost:4200/dashboard");
            cy.get("#contract_input").type(registeredAccountId);
            cy.get("#password_input").type(password);
            cy.get("#login_button").click();
            cy.url().should("include", "/mainPage");
            cy.get('label[data-testid="customer_Label"]').should('contain.text', `Willkommen ${firstName}!`);
        });
	
	});


});
