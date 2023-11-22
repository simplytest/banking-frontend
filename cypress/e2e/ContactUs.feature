Feature: Webdriveruniversity - Contact Us Page

  Background: Pre condition
    Given I navigate to the webdriveruniversity homepage
    When I click on the contact us button

  Scenario: Valid Contact Us Form Submissions
    And I type first name
    And I type last name
    And I enter email address
    And I type a comment
    And I click on submit button
    Then I should be presented with a successful contact us submission message

  Scenario: Invalid Contact Us Form Submission
    And I type first name
    And I type last name
    And I type a comment
    And I click on submit button
    Then I should be presented with an unsuccessful contact us submission message

  Scenario: Valid Contact Us Form Submissions - Using specific data
    And I type a specific first name "Samy"
    And I type a specific last name "Beauty"
    And I type a specific email address "samy@beauty.com"
    And I type a specific word "Hi, there are " and number 333 pieces "beauty boxes" within the comment field
    And I click on submit button
    Then I should be presented with a successful contact us submission message

  Scenario Outline: Validate contact us page
    And I type a first name <firstName> and a last name '<lastName>'
    And I enter email '<email>' and a comment '<comment>'
    And I click on submit button
    Then I should be presented with a header text '<message>'

    Examples:
      | firstName | lastName | email           | comment              | message                      |
      | John      | Doe      | john@doe.de     | Hello, how are you ? | Thank You for your Message!  |
      | Mark      | Shagal   | mark@shagal.com | Hello, how are you ? | Thank You for your Message!  |
      | Grace     | Hudson   | grace.hudson    | Hello, I am Grace?   | Error: Invalid email address |
