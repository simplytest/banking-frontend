describe("Übung 2 Test Suite", () => {
    it("Konsolenausgabe", () => {
        // wird in der Cypress-Oberfläche auf der linken Seite angezeigt
        cy.log("Hallo Welt!");
        // wird in der F12 Konsole angezeigt
        console.log("Tschüss Welt!");
    });
});