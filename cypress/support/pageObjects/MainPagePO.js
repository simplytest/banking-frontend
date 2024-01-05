import BasePO from "./BasePO";

class MainPagePO extends BasePO
{

    mainElements = {
        kontoErstellenButton: () => cy.get("[data-testid='erstellen_button']"),
    };

    sendMoneyElements = {
        amountInput: () => cy.get("[data-testid='send_amount']"),
        

    };

    navigateToMainPage ()
    {
        super.navigate("mainPage/eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNzAxOTAxNTgzfQ.5ZSSkqBD3Lq3cjNMyWwizCelfoykWkvYWvUF0WAKU2suthOQ02zCEW6rRmzdJCE2iXPlmXXGVuXoU5c_W-PF7w");
    }

    clickOnKontoErstellenButton()
    {
        this.mainElements.kontoErstellenButton().click();
    }
}

export default MainPagePO;
