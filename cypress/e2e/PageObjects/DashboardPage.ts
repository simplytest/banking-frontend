class DashboardPage {

    checkNoContractMessage() {
        cy.get("dialog-contract-not-found").should("be.visible")
              .and("contain.text", "Vertrag nicht gefunden!");
    }
    checkWelcomeMessage() {
        cy.get('label[data-testid="customer_Label"]', { timeout: 10000 })
            .should("contain.text", "Willkommen Max!");
    }
    checkForRedirectionAndAccountDetails() {
        cy.url().should("include", "/mainPage");
    }

    locators = {
        customerLabel: 'label[data-testid="customer_Label"]',
        receiveMoneyButton: "button[id='0-empfangen']",
        receiveMoneyTitle: "h1[data-testid='receiveMoney_title']",
        receiveMoneyInput: "input[data-testid='receiveMoney_input']",
        sendMoneyButton: "button[data-testid='send_money_button']",
        closeButton: "button[data-testid='close_button']",
        transferMoneyButton: "button[id='0-ueberweisen']",
        transferMoneyTitle: "h1[data-testid='title']",
        sendAmountInput: "input[data-testid='send_amount']",
        sendIbanInput: "input[data-testid='send_iban']"
    };

    verifyWelcomeMessage(message) {
        cy.get(this.locators.customerLabel).should('contain.text', message);
    }

    receiveMoney(amount) {
        cy.get(this.locators.receiveMoneyButton).click();
        cy.get(this.locators.receiveMoneyTitle).should("have.text", "Geld empfangen");
        cy.get(this.locators.receiveMoneyInput).focus().type(amount); // focus() is important for proper typing here
        cy.get(this.locators.sendMoneyButton).should("be.visible").click();
    }

    verifyReceiveMoney() {
        cy.get(this.locators.transferMoneyTitle).should("have.text", "Geld erhalten");
        cy.get(this.locators.closeButton).click();
    }

    sendMoney(amount, iban) {
        cy.get(this.locators.transferMoneyButton).click();
        cy.get(this.locators.transferMoneyTitle).should("have.text", "Geld überweisen");
        cy.get(this.locators.sendAmountInput).focus().type(amount); // focus() is important for proper typing here
        cy.get(this.locators.sendIbanInput).click().type(iban);
        cy.get(this.locators.sendMoneyButton).click();
    }

    verifySendMoney() {
        cy.get(this.locators.transferMoneyTitle).should("have.text", "Geld gesendet");
    }

    verifyFailedSendMoney() {
        cy.on("window:alert", (text) => {
            expect(text).to.equal('{"error":{"error":"BadIban"}}');
        });
    }
}

export default new DashboardPage();