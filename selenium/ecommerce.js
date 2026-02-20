const { Builder, By, until } = require("selenium-webdriver");

async function greenKartTest() {

    let driver = await new Builder().forBrowser("chrome").build();

    try {

        await driver.get("https://rahulshettyacademy.com/seleniumPractise/#/");

        const items = ["Carrot", "Tomato", "Mango", "Mushroom", "Brinjal", "Pumpkin", "Walnuts"];

        // ---------- ADD PRODUCTS ----------
        let products = await driver.findElements(By.css(".product"));

        for (let product of products) {

            let name = await product.findElement(By.css(".product-name")).getText();

            for (let item of items) {
                if (name.toLowerCase().includes(item.toLowerCase())) {

                    let button = await product.findElement(By.tagName("button"));
                    await button.click();
                    break;
                }
            }
        }

        console.log("Products Added");

        // ---------- WAIT FOR CART COUNT UPDATE ----------
        await driver.wait(async () => {

            let countElement = await driver.findElement(
                By.css(".cart-info table tbody tr td strong")
            );

            let countText = await countElement.getText();
            return parseInt(countText) > 0;

        }, 10000);

        console.log("Cart Count Updated");

        // ---------- CLICK CART ICON ----------
        let cartIcon = await driver.findElement(By.css(".cart-icon"));
        await driver.wait(until.elementIsVisible(cartIcon), 5000);
        await cartIcon.click();

        console.log("Cart Opened");

        // ---------- WAIT FOR CHECKOUT BUTTON ----------
        let checkoutBtn = await driver.wait(
            until.elementLocated(By.xpath("//button[text()='PROCEED TO CHECKOUT']")),
            10000
        );

        await driver.wait(until.elementIsVisible(checkoutBtn), 5000);
        await checkoutBtn.click();

        console.log("Navigated to Cart Page");

        await driver.wait(until.urlContains("cart"), 5000);

        await driver.sleep(3000);

    } catch (error) {
        console.error("ERROR OCCURRED:", error);
    } finally {
        await driver.quit();
    }
}

greenKartTest();