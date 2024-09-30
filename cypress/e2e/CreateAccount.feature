Feature: Banking App - Create Account Page

  Scenario Outline: Create Accounts
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
    When I click on Konto erstellen button
    And I click on Giro-Konto button
    Then I should be presented with a created Giro Konto
    When I click on Konto erstellen button
    And I click on Festgeld-Konto button
    Then I should be presented with a created Festgeld-Konto called FixedRate
    When I click on Konto erstellen button
    And I click on Tagesgeld-Konto button
    Then I should be presented with a created Tagesgeld-Konto called OnCall
    When I click on Konto erstellen button
    And I click on Immobilien-Finanzierungskonto button
    Then I should be presented an alert box with text Immobilien-Finanzierungskonto Erstellen
    When I click on Kredit Anfordern Button
    Then I should be presented with a created  Immobilien-Finanzierungskonto called RealEstate

    Examples: 
      | firstName | lastName | password | street    | house | zipCode | city   | country     | email       | birthDate  | greeting         |
      | John      | Doe      |      123 | Hauptstr. |     1 |   10555 | Berlin | Deutschland | john@doe.de | 2000-09-09 | Willkommen John! |
