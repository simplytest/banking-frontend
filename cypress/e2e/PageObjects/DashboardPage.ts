class DashboardPage {
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
        cy.get(this.locators.customerLabel)
            .invoke("text")
            .then((text) => {
                expect(text).to.include(message);
            });
    }

    receiveMoney(amount) {
        cy.get(this.locators.receiveMoneyButton).click();
        cy.get(this.locators.receiveMoneyTitle).should("have.text", "Geld empfangen");
        cy.get(this.locators.receiveMoneyInput).focus().type(amount);
        cy.get(this.locators.sendMoneyButton).should("be.visible").click();
    }

    verifyReceiveMoney() {
        cy.wait("@receiveMoney").then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            expect(interception.response.body.result).to.equal(true);
            cy.get(this.locators.transferMoneyTitle).should("have.text", "Geld erhalten");
        });

        cy.get(this.locators.closeButton).click();
    }

    sendMoney(amount, iban) {
        cy.get(this.locators.transferMoneyButton).click();
        cy.get(this.locators.transferMoneyTitle).should("have.text", "Geld überweisen");
        cy.get(this.locators.sendAmountInput).focus().type(amount);
        cy.get(this.locators.sendIbanInput).click().type(iban);
        cy.get(this.locators.sendMoneyButton).click();
    }

    verifySendMoney() {
        cy.wait("@sendMoney").then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
            cy.get(this.locators.transferMoneyTitle).should("have.text", "Geld gesendet");
        });
    }

    verifyFailedSendMoney() {
        cy.wait("@failedTransaction").then((interception) => {
            expect(interception.response.statusCode).to.equal(400);
        });

        cy.on("window:alert", (text) => {
            expect(text).to.equal('{"error":{"error":"BadIban"}}');
        });
    }
}

export default new DashboardPage();