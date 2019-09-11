
const puppeteer = require('puppeteer');
 
(async () => {
 
// Opening a browser with the give arg.
const browser = await puppeteer.launch({
    headless: false,
    devtools: false,
    ignoreHTTPSErrors: true,
    args: [
        '--window-size=1920,1040',
        '--no-sandbox'
    ]
});

const clickByText = async function(page, text, element) {
    const element = element || 'a';
    const escapedText = escapeXpathString(text);
    xpath = `//${element}[text()[contains(., ${escapedText})]]`;
    const elements = await page.$x(xpath);
    if(elements.length > 0) {
        for(i in elements) {
            e = elements[i];
            if(await e.isIntersectingViewport()) {
                await e.click();
                return;
            }
        }
    }
    else {
        console.log(xpath);
    }
    throw new Error(`Link not found: ${text}`);
};
 
// Opening a new page
const page = await browser.newPage();
 
// Set windows height en width
await page.setViewport({ width: 1600, height: 900 });
 
// Navigate to specific url and wait till network traffic is idle
await page.goto('https://google.com', {waitUntil: "networkidle0"});
await page.select()
await page.re()


// clickByText('https://google.com', 'google', 'a')
 
// Click on menu item Blog
const menuElement = await page.$x("//a[contains(text(), 'Blog')]");
await menuElement[0].click();
 
await page.waitForNavigation({waitUntil: "networkidle0"});
 
// Close the browser
await browser.close();
})();