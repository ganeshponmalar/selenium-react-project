const { Builder, By, until } = require('selenium-webdriver');

(async function practicePageTest() {

    // Launch Chrome (Selenium Manager handles driver automatically)
    let driver = await new Builder()
        .forBrowser('chrome')
        .build();

    try {

        // Maximize window
        await driver.manage().window().maximize();

        // Open Practice Page
        await driver.get("https://rahulshettyacademy.com/AutomationPractice/#top");

        // =============================
        // URL Validation
        // =============================
        let currentUrl = await driver.getCurrentUrl();
        console.log("Current URL:", currentUrl);

        if (!currentUrl.includes("AutomationPractice")) {
            throw new Error("URL validation failed");
        }

        // =============================
        // Autocomplete
        // =============================
        let auto = await driver.findElement(By.id("autocomplete"));
        await auto.sendKeys("India");

        let myautocomplete = await driver.findElement(By.id("autocomplete"))
        await myautocomplete.sendKeys("india")

        // =============================
        // Dropdown Selection
        // =============================
        let dropdown = await driver.findElement(By.id("dropdown-class-example"));
        await dropdown.sendKeys("Option1");
        await dropdown.sendKeys("Option2");

        // =============================
        // Checkboxes
        // =============================
        await driver.findElement(By.css("input[value='option1']")).click();
        await driver.findElement(By.css("input[value='option2']")).click();
        await driver.findElement(By.css("input[value='option3']")).click();

        // =============================
        // Alert Handling
        // =============================
        await driver.findElement(By.id("alertbtn")).click();

        let alert = await driver.switchTo().alert();//useing the switchto,
        let alertText = await alert.getText();//geting all text
        console.log("Alert Text:", alertText);
        await alert.accept();

        // =============================
        // Confirm Handling
        // =============================
        await driver.findElement(By.id("confirmbtn")).click();

        let confirm = await driver.switchTo().alert();
        let confirmText = await confirm.getText();
        console.log("Confirm Text:", confirmText);
        await confirm.accept();   // use dismiss() for Cancel

        // =============================
        // Hide / Show Textbox
        // =============================
        await driver.findElement(By.id("hide-textbox")).click();

        let textbox = await driver.findElement(By.id("displayed-text"));
        console.log("Textbox visible after hide:", await textbox.isDisplayed());

        await driver.findElement(By.id("show-textbox")).click();
        console.log("Textbox visible after show:", await textbox.isDisplayed());

        // Click Home button
        await driver.findElement(By.xpath("//button[text()='Home']")).click();

        console.log(" Test Completed Successfully");

    } catch (err) {
        console.error(" Error:", err);
    } finally {
        await driver.quit();
    }

})();