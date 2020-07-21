class BasePage {
    constructor() {
        this.ec = protractor.ExpectedConditions;
    };

    async isLoaded(element) {
        return await element.isDisplayed();
    };

    async pageTitleCompare(pageTitle) {
        const title = await this.getPageTitle();
        return title === pageTitle;
    };

    async waitForElementVisibility(element) {
        await browser.wait(this.ec.visibilityOf(element), this.defaultTimeout);
    };

    async getCurrentUrl() {
        return await browser.getCurrentUrl();
    };

    async getPageTitle() {
        return await browser.getTitle();
    };

    async sendTextToElement(element, text) {
        await this.waitForElementVisibility(element);
        await element.sendKeys(text);
    };

    async scrollTo(element) {
        await browser.executeScript('arguments[0].scrollIntoView()', element.getWebElement());
    };

    async clickElement(element) {
        await this.waitForElementVisibility(element);
        await element.click();
    }
}

module.exports = BasePage;