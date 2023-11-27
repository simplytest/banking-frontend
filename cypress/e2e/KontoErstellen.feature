Feature: Banking App - Main Page

  Scenario : Create different Bank Accounts
    Given I navigate to the Banking App main page
    When I click on Konto erstellen button
    When I click on Giro-Konto button
    Then I should be presented with a Konto type text "Ciro"
    When I click on Konto erstellen button
    When I click on Festgeld-Konto button
    Then I should be presented with a Konto type text "FixedRate"
    When I click on Konto erstellen button
    When I click on Tagesgeld-Konto button
    Then I should be presented with a Konto type text ""
    When I click on Konto erstellen button
    When I click on Immobilien-Finanzierungskonto button
    Then I should be presented with an Immobilien-Finanzierungskonto Erstellen alert box containing text <expectedAlertText>
    When I type Kredit Beitrag <kreditBeitrag> and Tilgung Rate <tilgungRate>
    When I click on Kredit Anfordern Button
    Then I should be presented with a Konto type text <any>



