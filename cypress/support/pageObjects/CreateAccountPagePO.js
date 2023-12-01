/// <reference types="cypress" />

import BasePO from "./BasePO";


class CreateAccountPagePO extends BasePO {

  elements = {
    giroKontoButton : () => cy.get("[test-dataid=\"giro_account_button\"]"),
    festgeldKontoButton: () => cy.get("[test-dataid=\"fixed_rate_button\"]"),
    tagesgeldKontoButton : () => cy.get("[test-dataid=\"onCall_button\"]"),
    immobilienFinanzierungskontoButton : () => cy.get("[test-dataid=\"realEstate_button\"]")

  }

  navigateToCreateAccountPage ()
  {
    super.navigate("createAccount/eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzAxMTc5Mzg4fQ.BDez8tseWCffeck6MdgIzrOyQOUN-bcgAN-wCBySlSLR0M7zmkksvj33Z9KqiTqTBresf5wSrCYjUviOkOaxEw");
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
    this.elements.immobilienFinanzierungskontoButton.click();
  }
  typeKreditBeitrag(kreditBeitrag){
    cy.get("#mat-input-0").type(kreditBeitrag);
  }
  typeTilgungRate(tilgungRate) {
    cy.get("#mat-input-1").type(tilgungRate);
  }

}
export default CreateAccountPagePO;


