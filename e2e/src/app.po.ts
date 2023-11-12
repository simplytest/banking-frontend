import { browser, by, element } from 'protractor';

export class AppPage {

  locators = {
    registerButton: element(by.id('registerButton')),

    businessCustomer: element(by.id('businessCustomer')),
    privateCustomer: element(by.id('privateCustomer')),

    firstName: element(by.id('firstName')),
    lastName: element(by.id('lastName')),

    street: element(by.id('street')),
    house: element(by.id('house')),
    zipCode: element(by.id('zipCode')),
    city: element(by.id('city')),
    country: element(by.id('country')),
    email: element(by.id('email')),

    birthDay: element(by.id('birthDay')),



    companyName: element(by.id('companyName')),
    ustNumber: element(by.id('ustNumber')),
    revenue: element(by.id('revenue')),

    registerButtonDashboard: element(by.id('registerButtonDashboard'))

  }



  navigateTo() {
    return browser.get('http://localhost:4200/dashboard')
  }

  async testRegisterButton() {
    await this.locators.registerButton.click();
    await expect(await this.getPrivateCustomerButton()).toEqual('Private Kunde');

  }

  async getBusinessCustomerButton() {
    
    await this.locators.businessCustomer.click();
    return await this.locators.businessCustomer.getText();

  }

  async getPrivateCustomerButton() {

    await this.locators.privateCustomer.click();
    return await this.locators.privateCustomer.getText();

  }

  async fillInRegisterForm() {
    await this.locators.firstName.sendKeys('Alan');
    await this.locators.lastName.sendKeys('Turing');

    await this.locators.street.sendKeys('Obermaierstr.');
    await this.locators.house.sendKeys('18');
    await this.locators.zipCode.sendKeys('90408');
    await this.locators.city.sendKeys('Nürnberg');
    await this.locators.country.sendKeys('Deutschland');
    await this.locators.email.sendKeys('alan.turing@simplytest.de');

    //await this.locators.companyName.sendKeys('SimplyTest GmbH');
    //await this.locators.ustNumber.sendKeys('AKV6464');
    //await this.locators.revenue.sendKeys('46846164684');


    await this.locators.birthDay.sendKeys('23.06.1912');
    await this.locators.registerButtonDashboard.click();

  }




}
