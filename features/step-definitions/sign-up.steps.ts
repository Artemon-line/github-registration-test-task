import { Given, When, Then, And } from 'cucumber';
import { expect } from 'chai';
import { GitHubRegisterPage } from "../pages/register.page";

const page: GitHubRegisterPage = new GitHubRegisterPage();

Given(/^User on the registration page$/, (): void => {
    page.open();
});

When(/^User fullfil the forms (.+) (.+) (.+)$/, (username, email, password): void => {
    console.log(username, email, password);

    page.fulfillForm(username, email, password);
});

Then(/User should (be|not be) directed to personal plan page/, (value: boolean) => {
    expect(page.getTitle())
        .to.be.equals("");
});

When(/click on "Sign Up for GitHub" button/, () => {
    page.clickOnSubmit();
});

Then(/tite should contain text "(.*)"/, (text: string) => {
    expect(page.isDirectedToPlanPage).to.be.true;
    //expect(planPage.containsMessage(text));
});

Then(/title should contain user name "You\'ve taken your first step into a larger world, @(.+)/, (username) => {
    //expect(planPage.containsMessage(text));
});

Then(/warning notification message should counatin text: (.+)/, (warntext) => {
    expect(page.isWarning(warntext)).true;
});

