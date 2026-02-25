const { Builder, By, until } = require("selenium-webdriver");

async function greenKartTest() {

    let driver = await new Builder().forBrowser("chrome").build();

    try {

        await driver.get("https://rahulshettyacademy.com/seleniumPractise/#/");

        const items = ["Carrot", "Tomato", "Mango"];

        let products = await driver.findElements(By.css(".product"));

        for (let product of products) {

            let name = await product.findElement(By.css(".product-name")).getText();
            let formattedName = name.split("-")[0].trim();

            if (items.includes(formattedName)) {

                let incrementBtn = await product.findElement(By.css(".increment"));
                await incrementBtn.click();
                await incrementBtn.click();

                let quantityInput = await product.findElement(By.css("input.quantity"));
                let value = await quantityInput.getAttribute("value");

                if (value !== "3") {
                    throw new Error("Quantity not updated");
                }

                let addButton = await product.findElement(By.tagName("button"));
                await addButton.click();
            }
        }

        console.log("Products Added");

        // 🔥 WAIT UNTIL CART COUNT UPDATES (Very Important)
        await driver.wait(async () => {

            let countText = await driver.findElement(
                By.css(".cart-info table tbody tr td strong")
            ).getText();

            return parseInt(countText) > 0;

        }, 10000);

        console.log("Cart Count Updated");

        // 🔥 FIXED CART CLICK (Relocate element fresh)
        await driver.wait(
            until.elementLocated(By.css(".cart-icon")),
            10000
        );

        await driver.wait(
            until.elementIsVisible(
                driver.findElement(By.css(".cart-icon"))
            ),
            5000
        );

        await driver.findElement(By.css(".cart-icon")).click();

        console.log("Cart Opened");

        // Proceed to checkout
        let checkoutBtn = await driver.wait(
            until.elementLocated(By.xpath("//button[text()='PROCEED TO CHECKOUT']")),
            10000
        );

        await checkoutBtn.click();

        await driver.wait(until.urlContains("cart"), 5000);

        console.log("Navigated to Cart Page");

    } catch (error) {
        console.error("ERROR:", error);
    } finally {
        await driver.quit();
    }
}

greenKartTest();