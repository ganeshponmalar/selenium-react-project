const { Builder, By, until } = require("selenium-webdriver");

async function studentTest() {

    const driver = await new Builder().forBrowser("chrome").build();

    try {

        // Open Application
        await driver.get("http://localhost:5173/");
        await driver.manage().window().maximize();
        console.log("Application opened");

        // Login
        const email = await driver.wait(
            until.elementLocated(By.name("email")),
            10000
        );

        await email.sendKeys("ganesh@gmail.com");

        await driver.findElement(By.name("password"))
            .sendKeys("ganesh123");

        await driver.findElement(By.name("role"))
            .sendKeys("student");

        await driver.findElement(
            By.xpath("//button[contains(text(),'Login')]")
        ).click();

        console.log("Login clicked");

        //  HANDLE SUCCESS ALERT (IMPORTANT FIX)
        await driver.wait(until.alertIsPresent(), 10000);

        const alert = await driver.switchTo().alert();
        const alertText = await alert.getText();

        console.log("Alert message:", alertText);

        await alert.accept();   // Accept the alert
        console.log("Alert accepted");

        // Now continue after alert closed
        await driver.wait(until.urlContains("student"), 15000);

        console.log("Redirected successfully ");

    } catch (error) {
        console.error("TEST FAILED:", error.message);
    } finally {
        await driver.quit();
        console.log("Browser Closed");
    }
}

studentTest();