import { expect } from "@playwright/test"

export class Product{
    constructor(page){
        this.page = page
        this.productCard = page.locator('[data-test="inventory-item"]')
        this.productDescriptionName = page.locator('[data-test="inventory-item-name"]')
        this.productDesctionNameCount = this.productDescriptionName.count()
        this.addToCartButton = page.locator('.btn_primary.btn_small.btn_inventory')
        this.addToCartShoppingLink = page.locator('[data-test="shopping-cart-link"]')
        this.selectedFilterOption =  page.locator('[data-test="product-sort-container"] option:checked')
    }
    async productItems(){
        //Capture array in variable
        const productNameArray = await this.productDescriptionName.allTextContents()
        //iterate through array
        productNameArray.forEach((text) => {
                expect(productNameArray).toContain(text)
                console.log(text)
            });
    }/**
     * 
     * @param {string} enterProductDescrition Enter the Product Description name
     */
    async selectingProductItemToOpenProductPage(enterProductDescription){
        //Loops through product description names, finds a description and clicks on the decription link to open the product description page
        for(let i = 0; i < await this.productDesctionNameCount; i++){
            if(await this.productDescriptionName.nth(i).textContent() === enterProductDescription){
                await this.productDescriptionName.nth(i).click()
                break
            }
        }
        expect(await this.productDescriptionName.textContent()).toEqual(enterProductDescription)
        console.log(`${enterProductDescription}`)
    }/**
     * 
     * @param {string} enterProductDescrition Enter the Product Description name
     */
    async selectSpecificProduct(enterProductDescription){
        //Loops through product card, finds a description name and clicks add to cart button
        for(let i = 0; i < await this.productCard.count(); i++){
            if(await this.productDescriptionName.nth(i).textContent() === enterProductDescription){
                await this.addToCartButton.nth(i).click()
                break
            }
    }
        await this.addToCartShoppingLink.click()
        //Confirm product in cart is correct
        await expect(await this.productDescriptionName).toHaveText(enterProductDescription)
    }/**
     * 
     * @param {number} index1 Add the nth number to select the product add to cart button
     * @param {number} index2 Add the nth number to select the product add to cart button
     * @param {string} enterProductName1 Add the string value related to the product description name in the cart
     * @param {string} enterProductName2 Add the string value related to the product description name in the cart
     */
    async selectMultipleProducts(index1, index2, enterProductName1, enterProductName2){
        await this.addToCartButton.nth(index1).click()
        await this.addToCartButton.nth(index2).click()
        await this.addToCartShoppingLink.click()

        await expect(await this.page.locator('[data-test="cart-list"] [data-test="inventory-item"] [data-test="inventory-item-name"]').nth(0)).toHaveText(enterProductName1)
        await expect(await this.page.locator('[data-test="cart-list"] [data-test="inventory-item"] [data-test="inventory-item-name"]').nth(1)).toHaveText(enterProductName2)
        expect(await this.page.locator('[data-test="item-quantity"]').nth(0).innerText()).toEqual('1')
        expect(await this.page.locator('[data-test="item-quantity"]').nth(1).innerText()).toEqual('1')
    }
    /**
     * 
     * @param {string} filterOption Enter in the Filter Option Value eg 'az', 'za', 'lohi' or 'hilo'
     * @param {string} filterTextValue 
     */
    async filterSelect(filterOption, filterTextValue){
        //Observe the default filter applied to the product list.
        this.selectedFilterOption =  this.page.locator('[data-test="product-sort-container"] option:checked')
        //Select the filter
        await this.page.locator('[data-test="product-sort-container"]').selectOption(filterOption)
        //Expected Result: The default filter should be “Name (A to Z)” and products should be listed alphabetically.
        await expect(this.selectedFilterOption).toHaveText(filterTextValue)
    }
}
