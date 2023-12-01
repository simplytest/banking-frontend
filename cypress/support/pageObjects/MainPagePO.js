import BasePO from "./BasePO";

class MainPagePO extends BasePO
{

    elements = {
        kontoErstellenButton: () => cy.get("[data-testid=\"erstellen_button\"]"),
    };

    navigateToMainPage ()
    {
        super.navigate("mainPage/eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzAxMDc4MTg4fQ.qR0ONmc72xgvYUqmys4c80Pp0asGu7Icp0DF6kAk0TKO88uI5mbkLGiaIMowa65myYkFOwU4P8NHO3c7gaCcJg");
    }

    clickOnKontoErstellenButton()
    {
        this.elements.kontoErstellenButton().click();
    }
}

export default MainPagePO;
