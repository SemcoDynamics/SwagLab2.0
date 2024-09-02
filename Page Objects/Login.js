export class Login{
    constructor(page){
        this.page = page
        this.usernameField = page.getByPlaceholder('Username')
        this.passwordField = page.getByPlaceholder('Password')
        this.loginButton = page.getByText('Login')
    }
    async signUp(usernameInput, passwordInput){
    await this.usernameField.fill(usernameInput)
    await this.passwordField.fill(passwordInput)
    await this.loginButton.click()
    }
}