@login
Feature: Banking App - Dashboard Page

  Scenario Outline: Validate valid  invalid login credentials
    Given I navigate to the Banking App dashboard page
    When I type a Contract ID <contractID>
    When I type a Password <password>
    When I click on login button
    Then I should be presented with a greeting text <greeting>
  Examples:
      | contractID | password | greeting |
      | 00001 | 123 | Hallo Herr Doe! |

  Scenario Outline:
  Given I navigate to the Banking App dashboard page
  When I type a Contract ID <contractID>
  When I type a Password <password>
  When I type an invalid Password <password>
  When I click on login button
  Then I should be presented with an alert box containing text <expectedAlertText>
  Examples:
    | contractID | password | expectedAlertText        |
    | 00001      | 12       | Kontrakt nicht gefunden! |
