import BasePO from "./BasePO";

class CreateAccountPagePO extends BasePO
{
    elements = {
        giroKontoButton: () => cy.get("[test-dataid='giro_account_button']"),
        festgeldKontoButton: () => cy.get("[test-dataid='fixed_rate_button']"),
        tagesgeldKontoButton: () => cy.get("[test-dataid='onCall_button']"),
        immobilienFinanzierungskontoButton: () => cy.get("[test-dataid='realEstate_button']"),
        kreditBeitragInput: () => cy.get("[test-dataid='credit_value']"),
        kreditTilgungsrateInput: () => cy.get("[test-dataid='rate_value']")
    };

    navigateToCreateAccountPage ()
    {
        super.navigate("createAccount/eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzAxODg2OTE3fQ.bgQo-rEmTDO3MeiNac6EwPqrReYLeFX22_S8opo1CId7oZMGiWbe83u3eZ23xoxoiVs9YrXoehaDQrfQEBiDcQ");
    }

    clickOnGiroKontoButton()
    {
        this.elements.giroKontoButton().click();
    }
    clickOnFestgeldKontoButton()
    {
        this.elements.festgeldKontoButton().click();
    }
    clickOnTagesgeldKontoButton()
    {
        this.elements.tagesgeldKontoButton().click();
    }
    clickOnImmobilienFinanzierungskontoButton()
    {
        this.elements.immobilienFinanzierungskontoButton().click();
    }
    typeKreditBeitrag(kreditBeitrag)
    { 
        this.elements.kreditBeitragInput().type(kreditBeitrag);
    }
    typeTilgungRate(tilgungRate)
    {
        this.elements.kreditTilgungsrateInput().type(tilgungRate);
    }
}

export default CreateAccountPagePO;

