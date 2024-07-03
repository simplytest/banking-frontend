describe("Übung 3 - Banking App Smoke Test Suite", () => {
	it("Übung 03 - Erster Cypress Testfall", () => {
		let bankingUrl = "http://localhost:4200/dashboard";
		cy.visit(bankingUrl);
		cy.url().should("eq", bankingUrl);
	});
});
