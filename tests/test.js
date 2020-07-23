const fetch = require('node-fetch');
const nodemailer = require('nodemailer');
const { browser } = require('protractor');
const { getnadapage } = require('../pages');
const secret = require('../secret')

describe('Test task', function () {
    let email, dog, fox;
    const timeStamp = Date.now();

    it('Getting random emai from getnada.com', async () => {
        await getnadapage.open();
        email = await getnadapage.getEmail();
        expect(email).toBe(String);
        console.log('Random email:', email);
    });

    it('API request from RandomFox and RandomDog', async () => {
        // -------------------------------DOG-------------------------
        let dogResponse = await fetch("https://random.dog/woof.json");
        var contentDog = await dogResponse.json();
        dog = contentDog.url;
        console.log('Random Dog link:', contentDog.url);
        // -------------------------------FOX-------------------------
        let foxResponse = await fetch("https://randomfox.ca/floof/");
        var contentFox = await foxResponse.json();
        fox = contentFox.link;
        console.log('Random Fox link:', contentFox.link);
    });

    it('GMAIL sending email to random mail generated abowe', async () => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: `${secret.user}`,
                pass: `${secret.pass}`,
            }
        });
        let mailOptions = {
            from: `${secret.user}`,
            to: `${email}`,
            subject: `Test email:${timeStamp}`,
            text: `Random Dog Link: <a class="dog" href="${dog}">Dog</a> <br> Random Fox Link: <a class="fox" href="${fox}">Fox</a>`
        };
        const sentEmail = await transporter.sendMail(mailOptions);
        expect(sentEmail.messageId).toBeDefined();
    });

    it('Open getnada.com, wait for email, click email, click links and make screenshots)', async () => {
        await getnadapage.clickOnIncomeMessage(timeStamp);
        await browser.sleep(2000);
        await browser.switchTo().frame('idIframe');
        await browser.findElement(by.linkText('Dog')).click();
        let windows = await browser.getAllWindowHandles();
        await browser.switchTo().window(windows[0]);
        await browser.switchTo().frame('idIframe');
        await browser.findElement(by.linkText('Fox')).click();
        windows = await browser.getAllWindowHandles();
        await browser.switchTo().window(windows[1]);
        await getnadapage.screenshotMaker(1);
        await browser.switchTo().window(windows[2]);
        await getnadapage.screenshotMaker(2);
    });

});


