class GitHubRegisterPage {


    private _username: string = 'input[name="user[login]"]';
    private _email: string = 'input[name="user[email]"]';
    private _password: string = 'input[name="user[password]"]';
    private _submit: string = 'button[type="submit"]';
    private _error: string = `.error`

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
            $(this._username).addValue(userName);
            $(this._email).addValue(email);
            $(this._password).addValue(password);
    }

    /**
     * clickOnSubmit
     */
    public clickOnSubmit() {
        $(this._submit).click();
        $(this._username).waitForVisible();
    }

    public isDirectedToPlanPage(): boolean {
        return browser.getUrl().includes('');
    }

    public isWarning(text: string): boolean {
        return browser.selectByVisibleText(text).isExisting();
    }

    public isWarningOnField(field: string): string {
        return this.mapTitlesToMessages('.form-group.errored', '\n').get(field);
    }
    getErrorMessageText(): string {
        return $('.flash-error').getText();
    }

    private mapTitlesToMessages(locator: string, d: string): Map<string, string> {
        return new Map($$(locator).map(x => [x.getText().split(d)[0], x.getText().split(d)[1]] as [string, string]));
    }
}

export { GitHubRegisterPage }