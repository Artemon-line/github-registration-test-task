import { Given, When, Then, And } from 'cucumber';
import { expect } from 'chai';
import { GitHubRegisterPage } from "../pages/register.page";

const page: GitHubRegisterPage = new GitHubRegisterPage();

Given(/^User on the registration page$/, (): void => {
    page.open();
});

When(/^User fullfil the forms (.+) (.+) (.+)$/, (username, email, password): void => {
    page.fulfillForm(username, email, password);
});

When(/^User fullfil the forms empty$/, (): void => {
    page.fulfillForm('', '', '');
});

Then(/User should (be|not be) directed to personal plan page/, (value: boolean) => {
    expect(page.getTitle())
        .to.be.equals("");
});

When(/click on signup button/, () => {
    page.clickOnSubmit();
});

Then(/tite should contain text "(.*)"/, (text: string) => {
    expect(page.isDirectedToPlanPage).to.be.true;
    //expect(planPage.containsMessage(text));
});

Then(/title should contain user name "You\'ve taken your first step into a larger world, @(.+)/, (username) => {
    //expect(planPage.containsMessage(text));
});

Then(/error message should be shown '(.*)'/, (message) => {
    expect(page.getErrorMessageText()).to.equal(message);
});

Then(/warning notification message should counatin text: (.+)/, (warntext) => {
    expect(page.isWarning(warntext)).true;
});

Then(/field '(.+)' should contains error '(.*)'/, (field: string, message: string) => {
    expect(page.isWarningOnField(field)).to.be.equal(message);
})

