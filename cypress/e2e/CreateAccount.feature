Feature: Banking App - Create Account Page

  Scenario Outline: Create Giro-Konto Account
    Given I navigate to the Banking App dashboard page
    When I type a Contract ID <contractID>
    When I type a Password <password>
    When I click on login button
    Then I should be presented with a greeting text <greeting>
    When I click on Konto erstellen button
    Then I should be presented with a header text <header>
    When I click on Giro-Konto button
    Then I should be presented with a Konto type text <kontoTyp>
    Examples:
      | contractID | password | greeting    | header | kontoTyp |
      | 00001      | 123      | Hallo John!  Ihre Kontonummer ist:  | Konto Typ Auswahl:| Giro |







