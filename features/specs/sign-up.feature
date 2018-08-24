Feature: User sign-up 
    As a new user
    I want to create new account on GitHub.com
    So that I need to proceed all registration steps

    Background:
        Given User on the registration page

    @Positive
    Scenario Outline: New user should be registered 
        When User fullfil the forms <username> <email> <passoword>
        And click on 'Sign Up for GitHub' button
        Then User should be directed to personal plan page
        And tite should contain text 'Welcome to GitHub'
        And title should contain user name 'You've taken your first step into a larger world, @'<username>

        Examples:
            | username  | email              | password       |
            | (randome) | (randome)@test.com | (randome)_test |


    @Negative
    Scenario Outline: Validation cheks
        When User fullfil the forms <name> <email> <passoword>
        And click on 'Sign Up for GitHub' button
        Then User should not be directed to personal plan page
        And warning notification message should counatin text: <warn_text>

        Examples:
            | username | email         | password  | warn_text |
            | admin    | admin@asd.com | 123_admin | sdsd      |
            | -        | admin@asd.com | 123_admin | sdsd      |
            | admin    | -             | 123_admin | sdsd      |
            | admin    | admin@asd.com | -         | sdsd      |
            | admin    | -             | -         | sdsd      |
            | -        | -             | -         | sdsd      |
            | -        | -             | 123_admin | sdsd      |
            | admin    | admin@asd.com | 123       | sdsd      |








