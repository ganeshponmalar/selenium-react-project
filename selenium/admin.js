import { Builder, By, until } from "selenium-webdriver";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function adminDashboardTest() {

    const driver = await new Builder().forBrowser("chrome").build();

    try {

        // OPEN APP
        await driver.get("http://localhost:5173/");
        await driver.manage().window().maximize();
        console.log("Application opened");
        await delay(2000);

        // LOGIN
        const email = await driver.wait(
            until.elementLocated(By.name("email")),
            10000
        );

        await email.sendKeys("raj@gmail.com");
        await delay(1000);

        const password = await driver.findElement(By.name("password"));
        await password.sendKeys("raj123");
        await delay(1000);

        const role = await driver.findElement(By.name("role"));
        await role.sendKeys("admin");
        await delay(1000);

        const loginBtn = await driver.findElement(
            By.xpath("//button[contains(text(),'Login')]")
        );

        await loginBtn.click();
        console.log("Login clicked");

        // 🔥 HANDLE ALERT SAFELY
        await driver.wait(until.alertIsPresent(), 10000);
        const alert = await driver.switchTo().alert();

        console.log("Alert text:", await alert.getText());

        await alert.accept();
        console.log("Alert accepted");

        await delay(2000);

        // VERIFY DASHBOARD
        await driver.wait(
            until.elementLocated(
                By.xpath("//*[contains(text(),'School Management System')]")
            ),
            15000
        );

        console.log("Dashboard Loaded Successfully");

        await delay(3000);

    } catch (error) {
        console.error("TEST FAILED:", error.message);
    } finally {
        await driver.quit();
        console.log("Browser Closed");
    }
}

adminDashboardTest();