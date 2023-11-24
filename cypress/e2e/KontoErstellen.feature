Feature: Banking App - Main Page

  Scenario:



  Scenario Outline:  create Giro-Konto
    Given I navigate to the Banking App dashboard page
    When I type a Contract ID <contractID>
    When I type a Password <password>
    When I click on login button
    When I click on Konto erstellen button
    When I click on Giro-Konto button
    Then I should be presented with a Konto type text <kontoTyp>
    Examples:
      | contractID | password | kontoTyp    |
      | 00001      | 123      | Giro        |


  Scenario Outline:  create Festgeld-Konto
    Given I navigate to the Banking App dashboard page
    When I type a Contract ID <contractID>
    When I type a Password <password>
    When I click on login button
    When I click on Konto erstellen button
    When I click on Festgeld-Konto button
    Then I should be presented with a Konto type text <kontoTyp>
    Examples:
      | contractID | password | kontoTyp       |
      | 00001      | 123      | FixedRate |

  Scenario Outline:  create Festgeld-Konto
    Given I navigate to the Banking App dashboard page
    When I type a Contract ID <contractID>
    When I type a Password <password>
    When I click on login button
    When I click on Konto erstellen button
    When I click on Tagesgeld-Konto button
    Then I should be presented with a Konto type text <kontoTyp>
    Examples:
      | contractID | password | kontoTyp|
      | 00001      | 123      | OnCall  |

  Scenario Outline:  create Festgeld-Konto
    Given I navigate to the Banking App dashboard page
    When I type a Contract ID <contractID>
    When I type a Password <password>
    When I click on login button
    When I click on Konto erstellen button
    When I click on Immobilien-Finanzierungskonto button
    Then I should be presented with a Konto type text <kontoTyp>
    Examples:
      | contractID | password | kontoTyp     |
      | 00001      | 123      |  RealEstate  |
