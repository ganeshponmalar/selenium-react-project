const { Builder, By, Key, until } = require('selenium-webdriver');

(async function loginTest() {

    // Launch Chrome
    let driver = await new Builder().forBrowser('chrome').build();

    try {

        // Open login page
        await driver.get("https://rahulshettyacademy.com/loginpagePractise/");

        // Enter username and password
        await driver.findElement(By.id("username")).sendKeys("ganesharchitect");
        await driver.sleep(500);

        await driver.findElement(By.id("password")).sendKeys("Web-Architect");
        await driver.sleep(500);

        // Select 'User' radio button
        await driver.findElement(By.css("input[value='user']")).click();
        await driver.sleep(600);

        // Click OK popup button
        await driver.wait(until.elementLocated(By.id("okayBtn")), 5000);
        await driver.findElement(By.id("okayBtn")).click();
        await driver.sleep(500);

        // Accept terms
        await driver.findElement(By.id("terms")).click();
        await driver.sleep(500);

        // Select dropdown
        let dropdown = await driver.findElement(By.css("select.form-control"));
        await dropdown.sendKeys("Teacher");
        await driver.sleep(1000);

        // Click Sign In
        await driver.findElement(By.id("signInBtn")).click();
        await driver.sleep(1000);

        // Navigate to forgot password page
        await driver.get("https://rahulshettyacademy.com/locatorspractice/");

        // Click Forgot Password
        await driver.findElement(By.linkText("Forgot your password?")).click();
        await driver.sleep(500);

        // Fill reset form
        await driver.findElement(By.xpath("//input[@placeholder='Name']")).sendKeys("Ganesh");
        await driver.sleep(400);

        await driver.findElement(By.xpath("//input[@placeholder='Email']")).sendKeys("ganesh@gmail.com");
        await driver.sleep(500);

        await driver.findElement(By.xpath("//input[@placeholder='Phone Number']")).sendKeys("9876543210");
        await driver.sleep(500);

        // Submit reset form
        await driver.findElement(By.css("button.reset-pwd-btn")).click();
        await driver.sleep(500);

        // Go back to login
        await driver.findElement(By.css("button.go-to-login-btn")).click();
        await driver.sleep(500);

        // Enter login credentials again
        let usernameField = await driver.findElement(By.id("inputUsername"));
        await usernameField.clear();
        await usernameField.sendKeys("ganesh");

        let passwordField = await driver.findElement(By.xpath("//input[@placeholder='Password']"));
        await passwordField.clear();
        await passwordField.sendKeys("rahulshettyacademy");

        // Check checkboxes
        await driver.findElement(By.id("chkboxOne")).click();
        await driver.sleep(500);

        await driver.findElement(By.id("chkboxTwo")).click();
        await driver.sleep(500);

        // Final submit
        await driver.findElement(By.css("button[type='submit']")).click();
        await driver.sleep(1000);

    

    } finally {
        await driver.quit();
    }

})();