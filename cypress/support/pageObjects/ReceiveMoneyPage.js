import BasePO from "./BasePO";

class ReceiveMoneyPage extends BasePO
{
    elements = {
        receiveAmountFiled: () => cy.get("[data-testid='receiveMoney_input']"),
        sendButton: () => cy.get("[data-testid='send_money_button']"),
        closeButton: () => cy.get("[data-testid='close_button']"),
    };

    receiveMoney(amount)
    {
        this.elements.receiveAmountFiled().focus();
        this.elements.receiveAmountFiled().clear();
        this.angularInputFieldHelperByDataTestID(amount, "receiveMoney_input");

        this.elements.sendButton().click();
        this.elements.closeButton().click();
    }

}

export default ReceiveMoneyPage;

