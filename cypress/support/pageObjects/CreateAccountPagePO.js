import BasePO from "./BasePO";

class CreateAccountPagePO extends BasePO
{
    elements = {
        giroKontoButton: () => cy.get("[test-dataid='giro_account_button']"),
        festgeldKontoButton: () => cy.get("[test-dataid='fixed_rate_button']"),
        tagesgeldKontoButton: () => cy.get("[test-dataid='onCall_button']"),
        immobilienFinanzierungskontoButton: () => cy.get("[test-dataid='realEstate_button']"),
        kreditBeitragInput: () => cy.get("[data-testid='credit_value']"),
        kreditTilgungsrateInput: () => cy.get("[data-testid='rate_value']"),
        kreditAnfordernButton: () => cy.get("[data-testid='create_real_estate_button']"),
    };

    navigateToCreateAccountPage ()
    {
        super.navigate("createAccount");
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

    clickKreditAnfordernButton()
    {
        this.elements.kreditAnfordernButton().click();
    }

}

export default CreateAccountPagePO;

