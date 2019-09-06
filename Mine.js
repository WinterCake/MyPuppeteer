const puppeteer = require("puppeteer");

// TODO find a Link
// find a Link - OK
// Clientk on it - OK
// scrape the page - 'ok'
// reflexion sur l'IA

// Action du script
async function getPic() {
  // Opening a browser with the give arg.
  const browser = await puppeteer.launch({ headless: false });

  // Opening a new page
  const page = await browser.newPage();

  // // Set windows height en width
  // await page.setViewport({ width: 1600, height: 900 });

  //   Navigate to specific url and wait till network traffic is idle
  //   await page.goto("https://www.google.fr/");
  await page.goto("D:\\Dev\\Perso\\MyPuppeteer\\TestFile.html");

  const result = await page.evaluate(() => {
    let title = document.querySelector(
      "body > h1:nth-child(1) > p:nth-child(2)"
    ).innerText;
    return title;
  });

//   console.log(result);

  var ressourceSelector = "h1";
  var anchors = "h1";
  var ressources = await page.evaluate(ressourceSelector => {
    anchors = Array.from(document.querySelectorAll(ressourceSelector));
    console.log(anchors);
    return anchors.map(anchor => { return `${anchor.p[0].innerText} - ${anchor.p[1].innerText}`;
    });
  }, ressources);

  await console.log(ressources.join("\n"));

  // Close the browser
  await browser.close();
}

// Lance la function.
getPic();

// ################# EXEMPLE ####################
async function MadMoiZelleScript() {
  await page.click(
    "#tsf > div:nth-child(2) > div > div.RNNXgb > div > div.a4bIc > input"
  );

  // Use the kayboard
  await page.keyboard.type("MadMoizelle");
  await page.keyboard.press("Enter");
  await page.waitForNavigation();

  // get the first element
  const result = await page.evaluate(() => {
    let title = document.querySelector("h3").innerText;
    return title;
  });

  await page.waitFor(1000);
  console.log(result);

  // get the first element
  var element = await page.evaluate(() => {
    return document.querySelector("h3").click();
  });

  await page.waitFor(1000);
  console.log(result);

  // Extract the results from the page.
  // await ExtractResult();
}

async function ExtractResult() {
  var resultsSelector = "h3";

  const links = await page.evaluate(resultsSelector => {
    anchors = Array.from(document.querySelectorAll(resultsSelector));
    return anchors.map(anchor => {
      title = anchor.textContent.split("|")[0].trim();
      return `${title} - ${anchor.href}`;
    });
  }, resultsSelector);

  await page.waitForNavigation();
  console.log(links.join("\n"));
}
