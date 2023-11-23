/// <reference types="cypress" />
class BasePO {

  navigate(path) {
    cy.fixture("config.json").then((data) => {
      cy.visit(data.baseUrl + path)
    })
  }
}
export default BasePO;
