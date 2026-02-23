const { Builder, By, until } = require("selenium-webdriver");

async function teacherLoginAndCreate() {

    const driver = await new Builder().forBrowser("chrome").build();

    try {

        // ==========================
        // OPEN APPLICATION
        // ==========================
        await driver.get("http://localhost:5173/"); // ⚠ Change if needed
        await driver.manage().window().maximize();
        console.log("Application opened");

        // ==========================
        // LOGIN SECTION
        // ==========================
        const email = await driver.wait(
            until.elementLocated(By.name("email")),
            10000
        );
        await email.sendKeys("moon@gmail.com");

        await driver.findElement(By.name("password"))
            .sendKeys("moon123");

        await driver.findElement(By.name("role"))
            .sendKeys("teacher");

        await driver.findElement(
            By.xpath("//button[contains(text(),'Login')]")
        ).click();

        console.log("Login clicked");

        // ==========================
        // HANDLE LOGIN SUCCESS ALERT
        // ==========================
        await driver.wait(until.alertIsPresent(), 10000);

        let alert = await driver.switchTo().alert();
        let alertText = await alert.getText();

        console.log("Login Alert:", alertText);

        if (alertText.includes("User login successful")) {
            console.log("Login successful ");
        }

        await alert.accept();
        console.log("Login alert accepted");

        // ==========================
        // VERIFY REDIRECT
        // ==========================
        await driver.wait(
            until.urlContains("teacher-home"),
            20000
        );

        console.log("Redirected to teacher-home");

        // Verify Teacher Page Loaded
        await driver.wait(
            until.elementLocated(
                By.xpath("//*[contains(text(),'Teacher Management')]")
            ),
            10000
        );

        console.log("Teacher page loaded successfully");

        // ==========================
        // FILL TEACHER FORM
        // ==========================
        await driver.findElement(By.name("userId")).clear();
        await driver.findElement(By.name("userId")).sendKeys("user123");

        await driver.findElement(By.name("subject"))
            .sendKeys("Maths");

        await driver.findElement(By.name("department"))
            .sendKeys("Science");

        await driver.findElement(By.name("hireDate"))
            .sendKeys("2024-06-01");

        await driver.findElement(By.name("qualification"))
            .sendKeys("MSc B.Ed");

        console.log("Teacher form filled");

        // ==========================
        // CLICK ADD TEACHER
        // ==========================
        await driver.findElement(
            By.xpath("//button[contains(text(),'Add Teacher')]")
        ).click();

        console.log("Add Teacher clicked");

        // ==========================
        // HANDLE SUCCESS ALERT
        // ==========================
        await driver.wait(until.alertIsPresent(), 10000);

        alert = await driver.switchTo().alert();
        alertText = await alert.getText();

        console.log("Teacher Alert:", alertText);

        if (alertText.includes("Teacher Created Successfully")) {
            console.log("Teacher created successfully ");
        }

        await alert.accept();
        console.log("Teacher alert accepted");

        console.log("TEST COMPLETED SUCCESSFULLY ");

    } catch (error) {
        console.error("TEST FAILED :", error.message);
    } finally {
        await driver.quit();
        console.log("Browser Closed");
    }
}

teacherLoginAndCreate();