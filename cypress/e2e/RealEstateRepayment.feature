Feature: RealEstateRepayment

  Scenario Outline: Positivtest: Repayment Rate can be lower than 5% of the total value
    Given User with '<GiroAccountValue>' and '<creditValue>'
    When User pays a '<Rate>' that is not higher than 5% of the total credit value
    Then '<creditValue>' lowers by the amount of the '<Rate>'
    And '<GiroAccountValue>' is lowered by the amount of the '<Rate>'

    Examples: 
      | GiroAccountValue | creditValue | Rate |
      |             1000 |        1000 |   10 |
      |             1000 |        1000 |   49 |
      |             1000 |        1000 |   50 |

  Scenario Outline: Negativtest: Repayment Rate can not be over 5% of the total credit value
    Given User with '<GiroAccountValue>' and '<creditValue>'
    When User try to pay a '<RepaymentRate>' that is higher than 5% of the total credit value
    Then User gets an ErrorMessage 'Betrag ist nicht zulässig'

    Examples: 
      | GiroAccountValue | creditValue | RepaymentRate |
      |             1000 |        1000 |            51 |
      |             1000 |        1000 |           100 |
