const { clickElement, getText } = require("./lib/commands.js");
//const { generateName } = require("./lib/util.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://qamid.tmweb.ru/client/index.php");
  //await page.setDefaultTimeout(40000);
});

afterEach(() => {
  page.close();
});

describe("Let's go to the cinema tests", () => {
  test("Happy path 1: receiving an electronic ticket", async () => {
    await page.waitForSelector("h1");
    await clickElement(page, "a:nth-child(2)");
    await clickElement(page, "a[href='#'][data-seance-id='225']");
    await clickElement(page, "div:nth-child(2) span:nth-child(1)");
    await clickElement(page, ".acceptin-button");
    await clickElement(page, "button.acceptin-button");
    const actual = await getText(page, ".ticket__check-title");
    const expected = "Электронный билет";
    await expect(actual).toContain(expected);
  }, 25000);
  test("Happy path 2: purchase of two VIP seats", async () => {
    await page.waitForSelector("h1");
    await clickElement(page, "a:nth-child(2)");
    await clickElement(
      page,
      ".movie-seances__time[href='#'][data-seance-id='217']"
    );
    await clickElement(page, "div:nth-child(10) span:nth-child(3)");
    await clickElement(page, "div:nth-child(10) span:nth-child(4)");
    await clickElement(page, ".acceptin-button");
    const actual = await getText(page, ".ticket__check-title");
    const expected = "Вы выбрали билеты:";
    await expect(actual).toContain(expected);
  }, 25000);
  test("Sad path 1: book without choosing a seat", async () => {
    await clickElement(page, "a:nth-child(7)");
    await clickElement(page, "a[href='#'][data-seance-id='225']");
    const acceptinButton = await page.$(".acceptin-button");
    const actual = await acceptinButton.evaluate((btn) => btn.disabled);
    expect(actual).toEqual(true);
  }, 20000);
});
