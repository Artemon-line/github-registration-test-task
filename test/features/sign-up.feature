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
    Scenario Outline: Fields verificatrion
        When User add incorrect <data> to field <field_name>
        Then field <field_name> should contains alert sign
        And alert message should contains warning <text>

        Examples:
            | field_name | data  | text                                     |
            | username   | admin | Username name 'admin' is a reserved word |
            | username   | test  | Username is already taken                |
            | username   | admin | Value 3                                  |
            | username   | admin | Value 3                                  |
            | username   | admin | Value 3                                  |
            | username   | admin | Value 3                                  |

    @Negative
    Scenario Outline: Validation cheks
        When User fullfil the forms <name> <email> <password>
        And click on signup button
        Then error message should be shown 'There were problems creating your account.'
        And warning notification message should counatin text: <warn_text>

        Examples:
            | username | email         | password  | warn_text                                                                             |
            | admin    | admin@asd.com | 123_admin | sdsd                                                                                  |
            | -        | admin@asd.com | 123_admin | sdsd                                                                                  |
            | admin    | -             | 123_admin | sdsd                                                                                  |
            | admin    | admin@asd.com | -         | sdsd                                                                                  |
            | admin    | -             | -         | sdsd                                                                                  |
            | -        | -             | -         | sdsd                                                                                  |
            | -        | -             | 123_admin | sdsd                                                                                  |
            | admin    | admin@asd.com | 123       | sdsd                                                                                  |
            | aaa      | aaa@test.com  | aaa       | Password can't be your username and has been compromised in a third party data breach |








