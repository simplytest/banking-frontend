import BasePO from "./BasePO";

class ConfirmationDialogPage extends BasePO
{
    elements = {
        confirmMessage: () => cy.get("[data-testid='title']"),
        closeButton: () => cy.get("[data-testid='close_button'"),
    };

    close()
    {
        this.elements.closeButton().click();
    }

}

export default ConfirmationDialogPage;

