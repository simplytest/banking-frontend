import BasePO from "./BasePO";

class RegisterNewCustomerPagePO extends BasePO
{

    elements = {
        firstNameInput: () => cy.get("[data-testid='firstname_input']"),
        lastNameInput: () => cy.get("[data-testid='lastname_input']"),
        passwordInput: () => cy.get("[data-testid='password_input']"),
        streetInput: () => cy.get("[data-testid='street_input']"),
        houseNumberInput: () => cy.get("[data-testid='housenumber_input']"),
        zipCodeInput: () => cy.get("[data-testid='zipcode_input']"),
        cityInput: () => cy.get("[data-testid='city_input']"),
        countryInput: () => cy.get("[data-testid='land_input']"),
        eMailInput: () => cy.get("[data-testid='e-mail_input']"),
        birthdayInput: () => cy.get("[data-testid='birthday_input']"),
        registerButton: () => cy.get("[data-testid='register_button']")
    };


    typeFirstName(firstName)
    {
        this.elements.firstNameInput().type(firstName);
    }

    typeLastName(lastName) 
    {
        this.elements.lastNameInput().type(lastName);
    }

    typePassword(password)
    {
        this.elements.passwordInput().type(password);
    }
    typeStreet(street)
    {
        this.elements.streetInput().type(street);
    }
    typeHouse(house)
    {
        this.elements.houseNumberInput().type(house);
    }
    typeZipCode(zipCode)
    {
        this.elements.zipCodeInput().type(zipCode);
    }
    typeCity(city)
    {
        this.elements.cityInput().type(city);
    }
    typeCountry(country)
    {
        this.elements.countryInput().type(country);
    }
    typeEmail(email)
    {
        this.elements.eMailInput().type(email);
    }
    typeBirthDate(birthDate)
    {
        this.elements.birthdayInput().type(birthDate);
    }
    clickOnRegistrierenButtonAgain()
    {
        this.elements.registerButton().invoke("removeAttr", "target").click();
    }
}

export default RegisterNewCustomerPagePO;
