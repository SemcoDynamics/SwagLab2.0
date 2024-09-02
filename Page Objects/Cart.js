export class Cart{
    constructor(page){
        this.page = page
        this.inventoryItem = page.locator('[data-test="inventory-item"]')
        this.cartQuantity = page.locator('[data-test="item-quantity"]')
    }
    async addToCart(){
        await this.inventoryItem.nth(0)
    }
}
