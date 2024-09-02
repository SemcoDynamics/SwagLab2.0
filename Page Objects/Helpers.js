export class Helpers{
    constructor(page){
        this.page = page;
        this.productCard = page.locator('[data-test="inventory-item"]')
        this.productDescriptionName = page.locator('[data-test="inventory-item-name"]')
        this.productDesctionNameCount = this.productDescriptionName.count()
        this.addToCartButton = page.getByText('Add to cart')
        this.addToCartShoppingLink = page.locator('[data-test="shopping-cart-link"]')
        this.removeButtonAddToCart = page.getByText('Remove')
    }
    async login(username, password){
        await this.usernameField.fill(username)
        await this.passwordField.fill(password)
        await this.loginButton.click()
    }
    async selectProductToAddToCart(enterProductDescription){
        //Loops through product card, finds a description name and clicks add to cart button
        for(let i = 0; i < await this.productCard.count(); i++){
        if(await this.productDescriptionName.nth(i).textContent() === enterProductDescription){
        await this.addToCartButton.nth(i).click()
        break;
        }
    }
    }
    async clickAddToCartButton(){
        await this.page.click('[data-test="shopping-cart-link"]')
    }
    async addToCart_click_Remove_Button(enterProductDescription){
     //Loops through product card, finds a description name and clicks add to cart button
     for(let i = 0; i < await this.productCard.count(); i++){
        if(await this.productDescriptionName.nth(i).textContent() === enterProductDescription){
        await this.removeButtonAddToCart.nth(i).click()
        break;
    }
    
}
    }
}