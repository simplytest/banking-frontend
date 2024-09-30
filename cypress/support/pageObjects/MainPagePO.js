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
        super.navigate("mainPage");
    }

    clickOnKontoErstellenButton()
    {
        this.mainElements.kontoErstellenButton().click();
    }
}

export default MainPagePO;
