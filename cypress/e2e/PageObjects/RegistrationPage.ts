import RegisterNewCustomerPagePO from "../../support/pageObjects/RegisterNewCustomerPagePO";

class RegistrationPage extends RegisterNewCustomerPagePO
{
    visit()
    {
        super.navigateToRegisterNewCustomerPage();
        cy.url().should("include", "/registerNewCustomer");
    }
    validate()
    {
        cy.url().should("include", "/registerNewCustomer");
    }
    fillFormFixture(registrationData)
    {
        this.fillForm(registrationData.firstName, registrationData.lastName, registrationData.password, registrationData.street, registrationData.house, registrationData.zipCode, registrationData.city, registrationData.country, registrationData.email, registrationData.birthDay);
    }

    fillForm(firstName, lastName, password, street, house, zipCode, city, country, email, birthDay)
    {
        super.typeFirstName(firstName);
        super.typeLastName(lastName);
        super.typePassword(password);
        super.typeStreet(street);
        super.typeHouse(house);
        super.typeZipCode(zipCode);
        super.typeCity(city);
        super.typeCountry(country);
        super.typeEmail(email);
        super.typeBirthDate(birthDay);
    }

    typeFirstName(firstName)
    {
        super.typeFirstName(firstName);
    }

    typeLastName(lastName)
    {
        super.typeLastName(lastName);
    }

    typePassword(password)
    {
        super.typePassword(password);
    }
    typeStreet(street)
    {
        super.typeStreet(street);
    }
    typeHouse(house)
    {
        super.typeHouse(house);
    }
    typeZipCode(zipCode)
    {
        super.typeZipCode(zipCode);
    }
    typeCity(city)
    {
        super.typeCity(city);
    }
    typeCountry(country)
    {
        super.typeCountry(country);
    }
    typeEmail(email)
    {
        super.typeEmail(email);
    }
    typeBirthDate(birthDate)
    {
        super.typeBirthDate(birthDate);
    }
    clickOnRegistrierenButtonAgain()
    {
        super.clickOnRegistrierenButtonAgain();
    }
}

export default new RegistrationPage;