import BasePO from "./BasePO";

class MainPagePO extends BasePO
{

    elements = {
        kontoErstellenButton: () => cy.get("[data-testid='erstellen_button']"),
    };

    navigateToMainPage ()
    {
        super.navigate("mainPage/eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNzAxOTAxNTgzfQ.5ZSSkqBD3Lq3cjNMyWwizCelfoykWkvYWvUF0WAKU2suthOQ02zCEW6rRmzdJCE2iXPlmXXGVuXoU5c_W-PF7w");
    }

    clickOnKontoErstellenButton()
    {
        this.elements.kontoErstellenButton().click();
    }
}

export default MainPagePO;
