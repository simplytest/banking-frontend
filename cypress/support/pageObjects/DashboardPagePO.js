/// <reference types="cypress" />

import BasePO from "./BasePO";

class DashboardPagePO extends BasePO
{
    navigateToDashboardPage()
    {
        super.navigate("");
    }

  elements = {
    loginButton : () => cy.get("#registerButton"),
    registrierenButton : () => cy.get("#registerButton"),
    expectedAlertText : () => cy.get("#mat-mdc-dialog-title-0"),


  }

    clickOnRegistrierenButton()
    {
        this.elements.registrierenButton().click();
    }

    clickOnLoginButton()
    {
        this.elements.loginButton().invoke("removeAttr", "target").click();
    }

    typeContractID () {
      cy.get("[name='contractID']").type(contractID);
    }
    typePassword(){
      cy.get("[name='password']").type(password);
    }
    typeInvalidPassword(){
      cy.get("[name='password']").type(password);
    }

    validateAlertText (expectedAlertText){
      this.elements.expectedAlertText().contains(expectedAlertText);
    }

}

export default DashboardPagePO;
