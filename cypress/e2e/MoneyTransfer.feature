@smoke
Feature: Money Transfer

  Scenario: Receive money into my account
    Given I navigate to the Banking App dashboard page
    And I have logged in with my credentials
    When I click on Double Arrows button
    Then I should be presented with an alert box containing "Geld übertragen" text
    When I type a Betrag '<betrag>'
    When I select the desired account
    When I click on Geld übertragen button
    Then I should be presented with an alert box containing "Geld übertragen!" text
    When I click on Close button
    Then my account balance is updated with the amount '<betrag>'

  Scenario: Transfer money between two of my accounts
    Given I navigate to the Banking App dashboard page
    And I have logged in with my credentials
    When I click on Arrow button
    Then I should be presented with an alert box containing "Geld empfangen" text
    When I type a Geldbetrag '<geldbetrag>'
    When I click on Geld empfangen button
    Then I should be presented with an alert box containing "Geld gesendet!" text
    When I click on Close button
    Then my account balance is updated with the amount '<betrag>'
    And the source and destination account balances are updated


  Scenario: Transfer money from my account to someone else
    Given I navigate to the Banking App dashboard page
    And I have logged in with my credentials
    When I click on money button
    Then I should be presented with an alert box containing "Geld überweisen" text
    When I type a desired Geldbetrag '<betrag>'
    When I type a Ziel IBAN <IBAN>
    When I click on Geld überweisen button
    Then I should be presented with an alert box containing "Geld gesendet!" text
    When I click on Close button
    Then my account balance is updated with the amount '<betrag>'




