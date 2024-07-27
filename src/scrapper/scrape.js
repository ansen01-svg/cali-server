const puppeteer = require("puppeteer");
const {
  live1xBetdata,
  upcoming1xBetData,
  upcoming22BetData,
  live22BetData,
} = require("./callbacks");

const scrapper = async (url, site, event) => {
  const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    timeout: 120000,
  });
  const page = await browser.newPage();
  await page.setDefaultTimeout(120000);

  let result;

  try {
    if (site === "22bet" && event === "Upcoming") {
      await page.goto(url);
      result = await page.evaluate(upcoming22BetData);
    } else if (site === "22bet" && event === "Live") {
      await page.goto(url);
      result = await page.evaluate(live22BetData);
    } else if (site === "1xBet" && event === "Upcoming") {
      await page.goto(url, { waitUntil: "networkidle0" });
      result = await page.evaluate(upcoming1xBetData);
    } else if (site === "1xBet" && event === "Live") {
      await page.goto(url, { waitUntil: "networkidle0" });
      result = await page.evaluate(live1xBetdata);
    } else {
      throw new Error("Invalid site or event type");
    }
  } catch (error) {
    console.error(`Error scraping data from ${url}:`, error);
    result = null;
  } finally {
    await browser.close();
  }

  return result;
};

module.exports = scrapper;
