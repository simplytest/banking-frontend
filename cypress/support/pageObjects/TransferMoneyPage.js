import BasePO from "./BasePO";

class TransferMoneyPage extends BasePO
{
    elements = {
        transferAmountFiled: () => cy.get("[data-testid='amount_input']"),
        transferButton: () =>  cy.get("[data-testid='transfer_money_button']"),
        transferErrorLabel: () => cy.get("[data-testid='error_label']"),
        cancelButton: () => cy.get("[data-testid='cancel_button'"),
    };


    prepareTransfer(rate, targetAccountID)
    {
        this.elements.transferAmountFiled().focus();
        this.elements.transferAmountFiled().clear();
        this.angularInputFieldHelperByDataTestID(rate, "amount_input");
        cy.get(`[id$=':0000${targetAccountID}'`).click();
    }

    executeTransfer()
    {
        this.elements.transferButton().click();
    }

    cancelTransfer()
    {
        this.elements.cancelButton().click();
    }

    receiveMoney(amount)
    {
        this.elements.receiveAmountFiled().focus();
        this.elements.receiveAmountFiled().clear();
        this.angularInputFieldHelperByDataTestID(amount, "receiveMoney_input");

        this.elements.sendButton().click();
        this.elements.closeButton().click();
    }

}

export default TransferMoneyPage;

