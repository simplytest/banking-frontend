@Smoketest
Feature: Smoketests Prod

  Scenario Outline: Validate valid login credentials
    Given I navigate to the Banking App dashboard page
    When I type a Contract ID <contractID>
    When I type a Password <password>
    When I click on login button
    Then I should be presented with a greeting text <greeting>

    Examples: 
      | contractID | password | greeting           |
      |      00002 |      123 | Willkommen John!   |
      |      00003 |      123 | Willkommen Amanda! |

  Scenario: User with giro is created and recieve money from outside
    Given User is created with giro
    When User recieve '<recieveAmount>' money from outside
    Then GiroAccountValue has the value '<recieveAmount>'

    Examples: 
      | user  | password | recieveAmount |
      | 00001 | demo     |             1 |

  Scenario: User with giro and fixedRate is created and transfer money from giro to fixedRate
    Given User is created with giro '<giroaccountValue>' and fixedRate
    When User transfer '<transferAmount>' from giro to fixedRate
    Then '<giroaccountValue>' is lowered by the '<transferAmount>'
    And FixedRateAccountValue is raised by the '<transferAmount>'

    Examples: 
      | user  | password | giroaccountValue | transferAmount | fixedRateValue |
      | 00002 |      123 |            10000 |           1000 |           1000 |

  Scenario: User giro is created and send money outside
    Given User is created with giro '<giroaccountValue>'
    When User send '<sendAmount>' outside to another account
    Then '<giroaccountValue>' is lowered by '<sendAmount>'

    Examples: 
      | giroaccountValue | sendAmount |
      |             1000 |        100 |
