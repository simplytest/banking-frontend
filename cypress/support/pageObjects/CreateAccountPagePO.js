import BasePO from "./BasePO";

class CreateAccountPagePO extends BasePO
{
    elements = {
        giroKontoButton: () => cy.get("[test-dataid=\"giro_account_button\"]"),
        festgeldKontoButton: () => cy.get("[test-dataid=\"fixed_rate_button\"]"),
        tagesgeldKontoButton: () => cy.get("[test-dataid=\"onCall_button\"]"),
        immobilienFinanzierungskontoButton: () => cy.get("[test-dataid=\"realEstate_button\"]"),
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
        cy.get("[test-dataid=\"realEstate_button\"]").click();
    }
    typeKreditBeitrag(kreditBeitrag)
    {
        cy.get("[data-testid='credit_value_input']").focus();
        cy.get("[data-testid='credit_value_input']").clear();
        const betrag = kreditBeitrag.split("");
        for (let part of betrag)
        {
            cy.get("[data-testid='credit_value_input']").type(part);
        }
    }
    typeTilgungRate(tilgungRate)
    {
        cy.get("[data-testid='rate_input']").focus();
        cy.get("[data-testid='rate_input']").clear();
        const betrag = tilgungRate.split("");
        for (let part of betrag)
        {
            cy.get("[data-testid='rate_input']").type(part);
        }
    }
}

export default CreateAccountPagePO;

