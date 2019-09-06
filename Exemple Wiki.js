const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://en.wikipedia.org', {waitUntil: 'networkidle2'});

    await page.waitFor('input[name=search]');

    // await page.type('input[name=search]', 'Adenosine triphosphate');
    await page.$eval('input[name=search]', el => el.value = 'Adenosine triphosphate');

    await page.click('input[type="submit"]');
    await page.waitForSelector('#mw-content-text');
    const text = await page.evaluate(() => {
        const anchor = document.querySelector('#mw-content-text');
        return anchor.textContent;
    });
    console.log(text);
    await browser.close();
})();