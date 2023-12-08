Feature: Banking App - RegisterNewCustomer Page

  Scenario Outline: Register new Privat Customer
	Given I navigate to the Banking App dashboard page
	When When I click on Registrieren button
	And I type a first name '<firstName>' and a last name '<lastName>'
	And I type a password <password>
	And I enter street name <street> a house number '<house>'
	And I enter a postcode <zipCode> a city <city> and a country <country>
	And I enter an email <email>
	And I enter a birthDate <birthDate>
	And When I click on Registrieren button again
	Then I should be presented with a greeting text <greeting>

	Examples:
	  | firstName | lastName | password | street    | house | zipCode | city   | country     | email       | birthDate  | greeting    |
	  | John      | Doe      | 123      | Hauptstr. | 1     | 10555   | Berlin | Deutschland | john@doe.de | 2000-09-09 | Hallo John! |


  Scenario Outline: Register new Business Customer
	Given I navigate to the Banking App dashboard page
	When When I click on Registrieren button
	And I click on Business Kunde button
	And I type a first name '<firstName>' and a last name '<lastName>'
	And I type a password <password>
	And I enter street name <street> a house number '<house>'
	And I enter a postcode <zipCode> a city <city> and a country <country>
	And I enter an email <email>
	And I enter a companyName <companyName>
	And I enter a ustNumber <ustNumber>
	And I enter a revenue <revenue>
	And When I click on Registrieren button again
	Then I should be presented with a greeting text <greeting>

	Examples:
	  | firstName | lastName | password | street    | house | zipCode | city   | country     | email            | companyName | greeting      | ustNumber | revenue |
	  | Amanda    | Clarck   | 123      | Hauptstr. | 1     | 10555   | Berlin | Deutschland | amanda@clarck.de | Vista       | Hallo Amanda! | 34M3555   | 100000  |


