const fs = require('fs');

const BasePage = require('./basepage');
class GetnadaPage extends BasePage {
    constructor() {
        super();
        this.url = 'https://getnada.com/';
        this.pageTitle = 'Nada - temp mail - fast and free';
        this.emailToSend = element(by.css('.what_to_copy'));
        
        this.defaultTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;   
    };

    async open() {
        await browser.get(this.url);
    };
    
    async isLoaded() {
        await super.isLoaded(this.emailToSend);
        return await super.pageTitleCompare(this.pageTitle);
    };

    async getEmail() {
        return await this.emailToSend.getText();
    };

    async clickOnIncomeMessage(timeStamp){
        const incomeMessage = element(by.xpath(`//li[@class="msg_item"]//div[contains(string(),'${timeStamp}')]`));
        await this.waitForElementVisibility(incomeMessage);
        await incomeMessage.click();
    };
    
    async screenshotMaker(photoNumber){
            await browser.takeScreenshot().then(function(fullPage){
            var stream = fs.createWriteStream(`./screenshots/screenshot_${photoNumber}.png`);
            stream.write(new Buffer.from(fullPage, 'base64'));
            stream.end();
        });
    };     
}
module.exports = new GetnadaPage();