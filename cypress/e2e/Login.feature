Feature: Banking App - Dashboard Page

  Scenario Outline: Validate valid login credentials
    Given I navigate to the Banking App dashboard page
    When I type a Contract ID <contractID>
    When I type a Password <password>
    When I click on login button
    Then I should be presented with a greeting text <greeting>

    Examples: 
      | contractID | password | greeting      |
      |      00002 |      123 | Hallo John!   |
      |      00003 |      123 | Hallo Amanda! |

  Scenario Outline: Validate invalid login credentials
    Given I navigate to the Banking App dashboard page
    When I type a Contract ID <contractID>
    When I type an invalid Password <password>
    When I click on login button
    Then I should be presented with an alert box containing text <expectedAlertText>

    Examples: 
      | contractID | password | expectedAlertText        |
      |      00002 |       12 | Kontrakt nicht gefunden! |
