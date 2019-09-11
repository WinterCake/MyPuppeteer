const puppeteer = require("puppeteer");

var PlanetMetal = 0;
var PlanetCrystal = 0;
var PlanetDeuterium = 0;

// Lance la function.
startProg();

// Action du script
async function startProg() {
  // Opening a browser with the give arg. - headless show the navigator
  const browser = await puppeteer.launch({ headless: true });

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

  console.log(result);

  // Récupération des ressources du fichier de test
   await GetRessources(page);

  // Close the browser
  await browser.close();
}


async function GetRessources(page) {
    //Selector for the ressources
    var ressourceSelector = "p";

    var ressources = await page.evaluate(ressourceSelector => {
        const anchors = Array.from(document.querySelectorAll(ressourceSelector));
        return anchors.map(anchor => {
            const title = anchor.textContent.split("|")[0].trim();
            return `${title}`;
        });
    }, ressourceSelector);

    // récupération des ressources
    for (let index = 0; index < ressources.length; index++) {
        const element = ressources[index];
        if (element == "Métal") 
            PlanetMetal = ressources[index + 1];
        if (element == "Crystal")
            PlanetCrystal = ressources[index + 1];
        if (element == "Deutérium")
            PlanetDeuterium = ressources[index + 1];
    }

    //Log the ressources
    await console.log("PlanetMetal : " + PlanetMetal);
    await console.log("PlanetCrystal : " + PlanetCrystal);
    await console.log("PlanetDeuterium : " + PlanetDeuterium);
}

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
