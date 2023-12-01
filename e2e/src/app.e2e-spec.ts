import { browser } from "protractor";
import { AppPage } from "./app.po";

describe("workspace-project App", () =>
{
    let page: AppPage;

    beforeEach(() =>
    {
        page = new AppPage();
    });

    it("should display title ", async () =>
    {
        page.navigateTo();
        await page.testRegisterButton();

        await page.fillInRegisterForm();
        browser.sleep(2000);
    });

});
