Feature: Immobilientilgungskonto - Sondertilgung 

  Scenario Outline: Erfolgreiche Sondertilgung eines Betrages unter 5% des Kreditvolumens
    Given Ich bin registrierter Privatkunde mit Konto von Typ Giro Konto mit aktuellem Kontostand '<GiroAccountValue>' €
    And Ich habe ein neues Immobilien-Finanzierungskonto mit Kredit von '<creditValue>' €
    When Ich von Giro Konto '<Rate>' € auf ein Immobilien-Finanzierungskonto übertrage
    Then Ich sehe die Erfolgsmeldung "Geld übertragen!"
    And beträgt der aktuelle Kontostand von Giro Konto '<Balance>' €
    And beträgt der aktuelle Kontostand von Immobilien-Finanzierungskonto '<Balance>' €

    Examples: 
      | GiroAccountValue | creditValue | Rate | Balance |
      |             1000 |        1000 |   10 |     990 |


  Scenario Outline: Abgelehnte Sondertilgung eines Betrages oberhalb 5% des Kreditvolumens
    Given Ich bin registrierter Privatkunde mit Konto von Typ Giro Konto mit aktuellem Kontostand '<GiroAccountValue>' €
    And Ich habe ein neues Immobilien-Finanzierungskonto mit Kredit von '<creditValue>' €
    When Ich versuche von Giro Konto '<Rate>' € auf ein Immobilien-Finanzierungskonto zu übertragen
    Then Ich sehe die Fehlermeldung ' Betrag ist nicht zulässig '
    And beträgt der aktuelle Kontostand von Giro Konto '<Balance>' €
    And beträgt der aktuelle Kontostand von Immobilien-Finanzierungskonto '<Balance>' €

    Examples: 
      | GiroAccountValue | creditValue | Rate | Balance |
      |             1000 |        1000 |  100 |    1000 |
