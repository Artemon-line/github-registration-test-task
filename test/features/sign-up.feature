Feature: User sign-up
    As a new user
    I want to create new account on GitHub.com
    So that I need to proceed all registration steps

    Background:
        Given User on the registration page

    @Positive
    Scenario Outline: New user should be registered
        When User fullfil the forms <username> <email> <password>
        And click on signup button
        Then User should be directed to varify account page
        When click on signup button
        Then User should be directed to personal plan page
        And Welcome message should appear with text "Welcome to GitHub"
        And title should contain user name "You've taken your first step into a larger world, @"<username>

        Examples:
            | username | email             | password         |
            | (random) | (random)@test.com | (random)_test123 |

    @Negative
    Scenario: Fields should be empty
        When User fullfil the forms empty
        And click on signup button
        Then error message should be shown 'There were problems creating your account.'
        And field 'Username' should contains error 'Login can't be blank'
        And field 'Email address' should contains error 'Email can't be blank'
        And field 'Password' should contains error 'Password can't be blank and is too short (minimum is 7 characters)'


    @Negative
    Scenario Outline: Fields onfly validation
        When User fullfil field '<field_name>' with '<data>'
        Then field '<field_name>' should contains alert sign
        And field '<field_name>' should contains error '<text>' for  input <data>
        Examples:
            | field_name | data                                       | text                                                                                                                                                  |
            | Username   | admin                                      | Username name 'admin' is a reserved word                                                                                                              |
            | Username   | test                                       | Username is already taken                                                                                                                             |
            | Username   | testtesttesttesttesttesttesttesttesttest   | Username is too long (maximum is 39 characters)                                                                                                       |
            | Username   | testtesttesttesttesttesttesttesttest--test | Username is too long (maximum is 39 characters) and may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen |
            | Username   | -test                                      | Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen                                            |
            | Username   | test-                                      | Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen and is already taken                       |
            | Username   | -test-                                     | Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen                                            |
            | Email      | admin                                      | Email is invalid or already taken                                                                                                                     |

    @Negative
    Scenario Outline: Password post validation cheks
        When User fullfil the forms <username> <email> <password>
        And click on signup button
        Then error message should be shown 'There were problems creating your account.'
        And field 'Password' should contains error '<text>' for input <username> <email> <password>

        Examples:
            | username      | email             | password      | text                                                                                                                                        |
            | (random)-name | (random)@test.com | (random)-name | Password can't be your username                                                                                                             |
            | (random)-name | (random)@test.com | 1234AA        | Password is too short (minimum is 7 characters), needs at least one lowercase letter, and has been compromised in a third party data breach |
            | (random)-name | (random)@test.com | 1adMin        | Password is too short (minimum is 7 characters)                                                                                             |
            | (random)-name | (random)@test.com | ADMINADMIN123 | Password needs at least one lowercase letter                                                                                                |








