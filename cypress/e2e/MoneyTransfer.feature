Feature: Money Transfer

  Scenario Outline: Receive money into my account
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
    When I click on Arrow button to receive money into my account
    And I should be presented with an alert box containing "Geld empfangen" text
    And I type a Geldbetrag <geldbetrag>
    And I click on Geld empfangen button
    Then I should be presented with an alert box containing "Geld erhalten!" text
    When I click on Close button
    Then my account balance is updated with the amount '<geldbetrag>'
    When I click on Konto erstellen button
    And I click on Giro-Konto button
    Then I should be presented with a created Giro Konto
    When I click on Double Arrows button to sent money to my other account
    And I should be presented with an alert box containing "Geld übertragen" text
    And I type a Betrag '<betrag>'
    And I select the desired account
    And I click on Geld übertragen button
    Then I should be presented with an alert box containing "Geld übertragen!" text
    When I click on Close button
    Then the account balance fromt my second account is updated with the amount '<betrag>'
    When I click on money button to send money to someone else account
    Then I should be presented with an alert box containing "Geld überweisen" text
    When I type a desired Geldbetrag '<betrag>'
    When I type a Ziel IBAN <IBAN>
    When I click on Geld überweisen button
    Then I should be presented with an alert box containing "Geld gesendet!" text
    When I click on Close button
    Then my account balance at the end has an amount of '<Endbetrag>'

    Examples: 
      | firstName | lastName | password | street    | house | zipCode | city   | country     | email       | birthDate  | greeting    | geldbetrag | betrag | IBAN                   | Endbetrag |
      | John      | Doe      |      123 | Hauptstr. |     1 |   10555 | Berlin | Deutschland | john@doe.de | 2000-09-09 | Hallo John! |       2000 |   1000 | DE02120300000000202051 |         0 |
