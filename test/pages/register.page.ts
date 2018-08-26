class GitHubRegisterPage {

    private _username: string = 'input[name="user[login]"]';
    private _email: string = 'input[name="user[email]"]';
    private _password: string = 'input[name="user[password]"]';
    private _submit: string = 'button[type="submit"]';
    private _error: string = `.error`
    private _welcomeMessage: string = '#js-pjax-container';

    public open(): void {
        browser.url('/');
    }

    public getTitle(): string {
        return browser.getTitle();
    }

    public getWelcomeMessage(): any {
        let el = $(this._welcomeMessage);
        return {
            title: el.$('h1').getText(),
            text: el.$('.lead').getText()
        }
    }

    public fulfillField(field: string, arg: any): void {
        switch (field) {
            case 'Username':
                $(this._username).addValue(arg);
                break;
            case 'Email':
                $(this._email).addValue(arg);
                break;
            case 'Password':
                $(this._password).addValue(arg);
                break;
            default:
                new Error(`No seach field: ${field}`)
        }
        browser.moveToObject(this._submit);
    }

    public fulfillForm([userName, email, password]: string[]) {
        $(this._username).addValue(userName);
        $(this._email).addValue(email);
        $(this._password).addValue(password);
    }

    public isSubmitButtonEnabled(): boolean {
        return $(this._submit).isEnabled();
    }

    /**
     * clickOnSubmit
     */
    public clickOnSubmit() {
        $(this._submit).waitForEnabled();
        $(this._submit).click();

    }

    public isAlertOnField(field: string): boolean {
        $('.form-group.errored').waitForVisible(3000);
        return this.mapTitlesToMessages('.form-group.errored', '\n').get(field) != undefined;
    }

    public isDirectedToPlanPage(): boolean {
        return browser.getUrl().endsWith('/plan');
    }

    public isWarning(text: string): boolean {
        return browser.selectByVisibleText(text).isExisting();
    }

    public getFieldErrorMessage(field: string): string {
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