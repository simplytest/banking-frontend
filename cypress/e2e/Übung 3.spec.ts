// Die Angabe von reference types ist notwendig für die Autovervollständigung.
// Sie werden in spec-Dateien dieses Projekts automatisch integriert.
/// <reference types="cypress" />

describe("Übung 3", () => {
    it("Erster Cypress Testfall", () => {
        cy.visit("http://localhost:4200/dashboard");
        cy.url().should("eq", "http://localhost:4200/dashboard");
    });
    it("Aufgabe 1a", () => {
        cy.visit("http://app.testorbit.de:4200/de/dashboard");
        cy.url().should("eq", "http://app.testorbit.de:4200/de/dashboard");
    });
});