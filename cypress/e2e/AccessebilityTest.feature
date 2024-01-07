Feature: Banking App - Dashboard Accessebility

  Scenario Outline: Dashboard Accessebility check
    Given Ich bin auf der Banking App als Nutzer '<contractID>' mit Passwort '<password>' eingeloggt

    Examples: 
      | contractID | password |
      |      00002 |      123 |

