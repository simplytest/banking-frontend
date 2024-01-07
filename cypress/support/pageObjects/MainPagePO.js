import BasePO from "./BasePO";

class MainPagePO extends BasePO
{

    elements = {
        kontoErstellenButton: () => cy.get("[data-testid=\"erstellen_button\"]"),
        accountReceiveButton: (accountID) => cy.get(`[id='${accountID}-empfangen']`),
        accountTransferButton: (accountID) => cy.get(`[id='${accountID}-transferieren']`),
        accountBalanceCell: (accountID) => cy.get(`[id='${accountID}.kontostand']`),
    };

    navigateToMainPage ()
    {
        super.navigate("mainPage/eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNzAxOTAxNTgzfQ.5ZSSkqBD3Lq3cjNMyWwizCelfoykWkvYWvUF0WAKU2suthOQ02zCEW6rRmzdJCE2iXPlmXXGVuXoU5c_W-PF7w");
    }

    clickOnKontoErstellenButton()
    {
        this.elements.kontoErstellenButton().click();
    }

    clickOnReceiveButton(accountID)
    {
        this.elements.accountReceiveButton(accountID).click();
    }

    clickOnTransferButton(accountID)
    {
        this.elements.accountTransferButton(accountID).click();
    }

    checkAccountBalance(accountID, expectedBalance)
    {
        this.elements.accountBalanceCell(accountID).should("have.text", " " + expectedBalance + " $ ");
    }
}

export default MainPagePO;
