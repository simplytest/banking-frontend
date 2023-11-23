/// <reference types="cypress" />

import BasePO from "./BasePO";

class DashboardPagePO extends BasePO{
 navigateToDashboardPage(){
   super.navigate("")
 }
 clickOnRegistrierenButton(){
   cy.get("#registerButton").click();
 }

  clickOnLoginButton() {
    cy.get("[type='submit']").invoke("removeAttr","target").click();
  }

}
export default DashboardPagePO;
