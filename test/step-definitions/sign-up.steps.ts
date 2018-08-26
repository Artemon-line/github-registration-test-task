import { Given, When, Then, And } from 'cucumber';
import { expect } from 'chai';
import { GitHubRegisterPage } from "../pages/register.page";
import * as randomstring from "randomstring";

const page: GitHubRegisterPage = new GitHubRegisterPage();
let randomPrefix;
let randomMarker = '(random)';

Given(/^User on the registration page$/, (): void => {
    page.open();
});

When(/^User fullfil the forms (.+) (.+) (.+)$/, (username, email, password): void => {
    randomPrefix = (`${username}${email}${password}`.includes(randomMarker)) ? randomstring.generate({ length: 12, charset: 'alphabetic' }) : '';
    let args = [username, email, password].map(x => (x.includes(randomMarker) ? x.replace(randomMarker, randomPrefix) : x));
    page.fulfillForm(args);
});

When(/^User fullfil the forms empty$/, (): void => {
    page.fulfillForm(['', '', '']);
});

When(/click on signup button/, () => {
    page.clickOnSubmit();
});

When(/User fullfil field '(.*)' with '(.*)'/, (field: string, data: any) => {
    page.fulfillField(field, data);
});

Then(/field '(.*)' should contains alert sign/, (field: string) => {
    expect(page.isAlertOnField(field), `alert doesn't appear on field ${field}`).to.be.true;
});

Then(/User should (be|not be) directed to personal plan page/, (value: string) => {
    let cond = !value.includes('not');
    expect(page.isDirectedToPlanPage()).to.equal(cond);
});

Then(/User should be directed to varify account page/, () => {
    expect('Join GitHub · GitHub').to.equals(page.getTitle());
})

Then(/Welcome message should appear with text "(.*)"/, (text: string) => {
    expect(page.getWelcomeMessage()).to.contains({ title: text });
});

Then(/title should contain user name "(.*)"(.+)/, (welcomeText, username) => {

    let currentUser = (username.includes(randomMarker)) ? username.replace(randomMarker, randomPrefix) : username;
    expect(page.getWelcomeMessage()).to.contains({ text: `${welcomeText}${currentUser}.` });
});

Then(/error message should be shown '(.*)'/, (message) => {
    expect(message).to.equal(page.getErrorMessageText());
});

Then(/warning notification message should counatin text: (.+)/, (warntext) => {
    expect(page.isWarning(warntext)).true;
});

Then(/field '(.+)' should contains error '(.*)'(?:)?/, (field: string, message: string) => {
    expect(message).to.be.equal(page.getFieldErrorMessage(field));
});


