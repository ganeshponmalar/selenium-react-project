import { Builder, By, until } from "selenium-webdriver";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function dropdownPracticeTest() {

    const driver = await new Builder().forBrowser("chrome").build();

    try {

        // ==========================
        // OPEN APPLICATION
        // ==========================
        await driver.get("https://rahulshettyacademy.com/dropdownsPractise/");
        await driver.manage().window().maximize();
        console.log("Application opened");
        await delay(2000);

        // ==========================
        // ORIGIN
        // ==========================
        await driver.findElement(
            By.id("ctl00_mainContent_ddl_originStation1_CTXT")
        ).click();

        await driver.wait(
            until.elementLocated(
                By.xpath("//a[contains(text(),'Bengaluru (BLR)')]")
            ),
            10000
        ).click();

        console.log("Origin selected: Bengaluru");
        await delay(500);

        // ==========================
        // DESTINATION
        // ==========================
        await driver.findElement(
            By.id("ctl00_mainContent_ddl_destinationStation1_CTXT")
        ).click();

        await driver.wait(
            until.elementLocated(
                By.xpath("(//a[contains(text(),'Goa (GOI)')])[2]")
            ),
            10000
        ).click();

        console.log("Destination selected: Goa");
        await delay(500);

        // ==========================
        // DEPARTURE DATE
        // ==========================
        await driver.findElement(
            By.id("ctl00_mainContent_view_date1")
        ).click();

        await driver.wait(
            until.elementLocated(
                By.xpath("//a[text()='25']")
            ),
            10000
        ).click();

        console.log("Departure Date selected: 25");
        await delay(500);

        // ==========================
        // ROUND TRIP
        // ==========================
        await driver.findElement(
            By.id("ctl00_mainContent_rbtnl_Trip_1")
        ).click();

        console.log("Round Trip selected");
        await delay(500);

        // ==========================
        // RETURN DATE
        // ==========================
        await driver.findElement(
            By.id("ctl00_mainContent_view_date2")
        ).click();

        await driver.wait(
            until.elementLocated(
                By.xpath("//a[text()='30']")
            ),
            10000
        ).click();

        console.log("Return Date selected: 30");
        await delay(500);

        // ==========================
        // PASSENGER SELECTION
        // ==========================
        await driver.findElement(By.id("divpaxinfo")).click();

        // Student Discount
        const studentCheckbox = await driver.findElement(
            By.id("ctl00_mainContent_chk_StudentDiscount")
        );
        await studentCheckbox.click();

        console.log("Student discount selected");
        await delay(500);

        // Close passenger popup
        await driver.findElement(By.id("btnclosepaxoption")).click();


        // ==========================
        // SENIOR CITIZEN CHECKBOX
        // ==========================
        const seniorCheckbox = await driver.findElement(
            By.id("ctl00_mainContent_chk_SeniorCitizenDiscount")
        );

        await seniorCheckbox.click();

        const isChecked = await seniorCheckbox.isSelected();
        console.log("Senior Citizen selected:", isChecked);

        await delay(500);

        // ==========================
        // CURRENCY DROPDOWN
        // ==========================
        const currency = await driver.findElement(
            By.id("ctl00_mainContent_DropDownListCurrency")
        );

        await currency.sendKeys("USD");

        console.log("Currency selected: USD");

        await delay(3000);

        console.log("TEST COMPLETED SUCCESSFULLY ");

    } catch (error) {
        console.error("TEST FAILED :", error.message);
    } finally {
        await driver.quit();
        console.log("Browser Closed");
    }
}

dropdownPracticeTest();