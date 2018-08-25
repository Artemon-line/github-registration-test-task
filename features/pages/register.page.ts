class GitHubRegisterPage {

    private _username: string = 'input[id="user[login]"]';
    private _email: string = 'input[id="user[email]"]';
    private _password: string = 'input[id="user[password]"]';
    private _submit: string = 'button[type="submit"]';

    /**
     * open page
     */
    public open(): void {
        browser.url('/');
    }

    public getTitle(): string {
        return browser.getTitle();
    }

    /**
     * fulfillForm
     */
    public fulfillForm(userName: string, email: string, password: string) {
        console.log("!!!!! " + userName, email, password);
        
            $(this._username).addValue(userName);
            $(this._email).addValue(email);
            $(this._password).addValue(password);
    }

    /**
     * clickOnSubmit
     */
    public clickOnSubmit() {
        browser.selectByVisibleText(this._submit, 'Sign up for GitHub').click();
    }

    public isDirectedToPlanPage(): boolean {
        return browser.getUrl().includes('');
    }

    public isWarning(text: string): boolean {
        return browser.selectByVisibleText(text).isExisting();
    }
}

export { GitHubRegisterPage }