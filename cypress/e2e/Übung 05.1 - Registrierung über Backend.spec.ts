describe("Übung 5.1 - Registrierung über Backend", () => {
    const baseUrl = "http://localhost:4200/dashboard";

    beforeEach(() => {
        // Visit the dashboard URL before each test
        const dashboardUrl = "http://localhost:4200/dashboard"
        cy.visit(dashboardUrl);
        cy.url().should("eq", dashboardUrl);
    });

    it("5.1.1 Erfolgreiche Registrierung ohne Interception - benötigt Backend", function () {
 
        // Klicken Sie auf den Registrierungsbutton
        cy.get("#registerButton").click();

        // Füllen Sie das Registrierungsformular mit den Fixture-Daten aus
        cy.get("#firstName").type("Max");
        cy.get("#lastName").type("Mustermann");
        cy.get("#password").type("123");
        cy.get("#street").type("Bahnhofstraße");
        cy.get("#house").type("10");
        cy.get("#zipCode").type("90403");
        cy.get("#city").type("Nürnberg");
        cy.get("#country").type("Deutschland");
        cy.get("#email").type("max@mustermann.de");
        cy.get("#birthDay").type("1990-01-01");

        // Überprüfen Sie, ob das Submit-Button aktiviert ist und klicken Sie sie an
        cy.get("button[data-testid='register_button']").should("be.enabled").click();


        // Überprüfen Sie die angezeigte Willkommensnachricht
        cy.get('label[data-testid="customer_Label"]')
            .should("be.visible")
            .should("contain.text", "Willkommen Max!");

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
		})
        .then((registerAccountResponse) => {
			expect(registerAccountResponse.status).to.eq(201);
			registeredAccountId = registerAccountResponse.body.result.id;
            
            cy.get("#contract_input").type(registeredAccountId);
            cy.get("#password_input").type(password);
            cy.get("#login_button").click();
            cy.url().should("include", "/mainPage");
            cy.get('label[data-testid="customer_Label"]').should('contain.text', `Willkommen ${firstName}!`);
        });
	
	});


});
