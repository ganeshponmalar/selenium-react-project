const { Builder, By, Key, until, Select } = require('selenium-webdriver');
const fs = require('fs');
const path = require('path');

(async function automateDropdownAndIframe() {

    // Launch Chrome
    let driver = await new Builder().forBrowser('chrome').build();

    try {

        // Maximize window
        await driver.manage().window().maximize();
        console.log("✓ Browser window maximized");

        // Open practice page
        await driver.get("https://rahulshettyacademy.com/AutomationPractice/");
        await driver.sleep(500);

        console.log("✓ Page loaded successfully");

        // Take initial screenshot
        await takeScreenshot(driver, "01-page-loaded.png");

        // ===== DROPDOWN AUTOMATION =====
        console.log("\n--- Testing Dropdown ---");

        // Find dropdown element
        let dropdown = await driver.findElement(By.id("dropdown-class-example"));
        
        // Create Select object to interact with dropdown
        let selectDropdown = new Select(dropdown);

        // Select option by value
        await selectDropdown.selectByValue("option2");
        await driver.sleep(500);
        console.log("✓ Selected dropdown option by value (Option2)");

        // Take screenshot after dropdown selection
        await takeScreenshot(driver, "02-dropdown-selected.png");
        console.log("✓ Screenshot saved: dropdown-selected.png");

        // Get selected option
        let selectedOption = await selectDropdown.getFirstSelectedOption();
        let selectedText = await selectedOption.getText();
        console.log("✓ Selected option text: " + selectedText);

        await driver.sleep(500);

        // Select another option by visible text
        await selectDropdown.selectByVisibleText("Option3");
        await driver.sleep(500);
        console.log("✓ Selected dropdown by visible text (Option3)");

        // Take screenshot
        await takeScreenshot(driver, "03-dropdown-option3.png");

        await driver.sleep(500);

        // ===== IFRAME AUTOMATION =====
        console.log("\n--- Testing iFrame ---");

        // Scroll down to see iframe
        await driver.executeScript("window.scrollBy(0, 500)");
        await driver.sleep(500);

        // Switch to iframe by ID
        let iframe = await driver.findElement(By.id("courses-iframe"));
        await driver.switchTo().frame(iframe);
        await driver.sleep(500);
        console.log("✓ Switched to iframe successfully");

        // Take screenshot inside iframe
        await takeScreenshot(driver, "04-iframe-content.png");
        console.log("✓ Screenshot taken inside iframe");

        // Find element inside iframe and get text
        try {
            let courseTitle = await driver.findElement(By.tagName("h1"));
            let titleText = await courseTitle.getText();
            console.log("✓ Found iframe content: " + titleText);
        } catch (e) {
            console.log("✓ Iframe loaded and accessible");
        }

        // Switch back to main content
        await driver.switchTo().defaultContent();
        await driver.sleep(500);
        console.log("✓ Switched back to main content");

        // Scroll back up
        await driver.executeScript("window.scrollBy(0, -500)");
        await driver.sleep(500);

        // ===== CHECKBOX TESTING =====
        console.log("\n--- Testing Checkboxes ---");

        // Click checkboxes
        await driver.findElement(By.css("input[value='option1']")).click();
        await driver.findElement(By.css("input[value='option2']")).click();
        await driver.findElement(By.css("input[value='option3']")).click();
        await driver.sleep(500);
        console.log("✓ All checkboxes selected");

        // Take screenshot
        await takeScreenshot(driver, "05-checkboxes-selected.png");

        // ===== ALERT HANDLING =====
        console.log("\n--- Testing Alert ---");

        await driver.findElement(By.id("alertbtn")).click();
        await driver.sleep(1000);

        // Wait for alert and get text
        let alert = await driver.switchTo().alert();
        let alertText = await alert.getText();
        console.log("✓ Alert text: " + alertText);

        // Note: Cannot take screenshot while alert is open, so we accept it first
        await alert.accept();
        await driver.sleep(500);
        console.log("✓ Alert accepted");

        // Take screenshot after alert is closed
        await takeScreenshot(driver, "06-alert-handled.png");

        // Take final screenshot
        await takeScreenshot(driver, "07-final-state.png");

        console.log("\n✓ All tests completed successfully!");

    } catch (error) {
        console.error("✗ Error occurred: ", error);
        // Take screenshot on error
        await takeScreenshot(driver, "error-screenshot.png");
    } finally {
        await driver.quit();
        console.log("\n✓ Browser closed\n");
    }

})();

// Function to take and save screenshot
async function takeScreenshot(driver, filename) {
    try {
        let screenshot = await driver.takeScreenshot();
        let screenshotDir = path.join(__dirname, 'screenshots');
        let filepath = path.join(screenshotDir, filename);
        
        // Create screenshots directory if it doesn't exist
        if (!fs.existsSync(screenshotDir)) {
            fs.mkdirSync(screenshotDir, { recursive: true });
        }
        
        fs.writeFileSync(filepath, screenshot, 'base64');
        console.log("   → Screenshot saved: " + filename);
    } catch (error) {
        console.error("   → Error taking screenshot: ", error);
    }
}
