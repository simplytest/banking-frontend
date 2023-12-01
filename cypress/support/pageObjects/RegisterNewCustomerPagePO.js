import BasePO from "./BasePO";

class RegisterNewCustomerPagePO extends BasePO
{
    typeFirstName(firstName)
    {
        cy.get("#firstName").type(firstName);
    }

    typeLastName(lastName)
    {
        cy.get("#lastName").type(lastName);
    }

    typePassword(password)
    {
        cy.get("#password").type(password);
    }
    typeStreet(street)
    {
        cy.get("#street").type(street);
    }
    typeHouse(house)
    {
        cy.get("#house").type(house);
    }
    typeZipCode(zipCode)
    {
        cy.get("#zipCode").type(zipCode);
    }
    typeCity(city)
    {
        cy.get("#city").type(city);
    }
    typeCountry(country)
    {
        cy.get("#country").type(country);
    }
    typeEmail(email)
    {
        cy.get("#email").type(email);
    }
    typeBirthDate(birthDate)
    {
        cy.get("#birthDay").type(birthDate);
    }
    clickOnRegistrierenButtonAgain()
    {
        cy.get("[data-testid=\"register_button\"]").invoke("removeAttr", "target").click();
    }
}

export default RegisterNewCustomerPagePO;
