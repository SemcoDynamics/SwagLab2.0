import {test, expect} from "@playwright/test"
import { Login } from "../Page Objects/Login"
import { Product } from "../Page Objects/Product"
import { Helpers } from "../Page Objects/Helpers"

test('Verify that a valid user can successfully log in with correct credentials',{tag: '@login'},  async ({ page }) => {
    await page.goto("/")
    const signUp = new Login(page)
    await signUp.signUp('standard_user', 'secret_sauce')
    await page.close()
})
test('Verify that an invalid user cannot log in with incorrect credentials and appropriate error message is displayed.', {tag: '@login'},  async ({ page }) => {
    await page.goto("/")
    const signUp = new Login(page)
    await signUp.signUp('Hanna', 'Montana')
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service')
    await page.close()
})
test.beforeEach(async ({ page }) => {
    await page.goto('/')
    const signUp = new Login(page)
    await signUp.signUp("standard_user", "secret_sauce")
})
test('Verify that products are displayed correctly on the inventory page.', {tag: '@product'},  async ({ page }) => {
    const productItems = new Product(page)
    await productItems.productItems()
    await page.close()
})
test('Click on a product and verify that the product details page opens correctly.', {tag: '@product'}, async ({ page }) => {
    const productItems = new Product(page)
    await productItems.selectingProductItemToOpenProductPage('Sauce Labs Onesie')
    await page.close()
})
test('Add a product to the cart and verify that it appears in the cart with correct details.', {tag: '@product'}, async ({ page }) => {
    const productItems = new Product(page)
    await productItems.selectSpecificProduct('Sauce Labs Bike Light')
})
test('Verify that the shopping cart page displays all added products with correct details and quantities.',{tag: '@addToCart'}, async ({ page }) => {
    const productItems = new Product(page)
    await productItems.selectMultipleProducts(1, 2, 'Sauce Labs Bike Light', 'Sauce Labs Fleece Jacket')
})
test('Remove a product from the cart and verify that it is no longer displayed.', async ({ page }) => {
    //work in progress as the remove buttons are indexed vertically instead of horizontally.
    const helper = new Helpers(page)
    await helper.selectProductToAddToCart('Sauce Labs Backpack')
    await helper.selectProductToAddToCart('Sauce Labs Bike Light')
    await helper.clickAddToCartButton()
    await helper.addToCart_click_Remove_Button('Sauce Labs Backpack')
    await helper.addToCart_click_Remove_Button('Sauce Labs Bolt T-Shirt')
})
test.describe('Functional test - Filters', async () => {
    test('Verify Default Filters - Ensure defualt filter is applied correctly', async ({ page }) => {
        const productItems = new Product(page)
        await productItems.filterSelect('az', 'Name (A to Z)')
    })
    test('Verify Filter by Price (Low to High) - Ensure the “Price (low to high)” filter works correctly.', async ({ page }) => {
        const productItems = new Product(page)
        await productItems.filterSelect('lohi', 'Price (low to high)')
    })
    
})
