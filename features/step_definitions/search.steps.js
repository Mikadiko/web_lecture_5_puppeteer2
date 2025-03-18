const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const {
  Given,
  When,
  Then,
  Before,
  After,
  setDefaultTimeout,
} = require("cucumber");
const { getText, clickElement } = require("../../lib/commands.js");

setDefaultTimeout(70000);

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("пользователь на {string} странице", async function (string) {
  return await this.page.goto(string);
});
When("пользователь выбирает шестой день недели", async function () {
  return await clickElement(this.page, "a:nth-child(6)");
});
When("пользователь выбирает время и зал на фильм Ведьмак", async function () {
  return await clickElement(
    this.page,
    ".movie-seances__time[href='#'][data-seance-id='217']"
  );
});
When("пользователь выбирает место в зале", async function () {
  return await clickElement(this.page, "div:nth-child(3) span:nth-child(3)");
});
When("пользователь нажимает кнопку: забронировать", async function () {
  return await clickElement(this.page, ".acceptin-button");
});
When(
  "пользователь нажимает кнопку: получить код бронирования",
  async function () {
    return await clickElement(this.page, "button.acceptin-button");
  }
);
Then(
  "пользователь видит страницу электронного билета {string}",
  async function (string) {
    const actual = await getText(this.page, ".ticket__check-title");
    const expected = string;
    expect(actual).contain(expected);
  }
);

When("пользователь выбирает пятый день недели", async function () {
  return await clickElement(this.page, "a:nth-child(5)");
});
When("пользователь выбирает время и зал на фильм Сталкер", async function () {
  return await clickElement(
    this.page,
    ".movie-seances__time[href='#'][data-seance-id='217']"
  );
});
When("пользователь выбирает первое место в вип зале", async function () {
  return await clickElement(this.page, "div:nth-child(3) span:nth-child(5)");
});
When("пользователь выбирает второе место в вип зале", async function () {
  return await clickElement(this.page, "div:nth-child(3) span:nth-child(6)");
});
Then("пользователь видит страницу {string}", async function (string) {
  const actual = await getText(this.page, ".ticket__check-title");
  const expected = string;
  expect(actual).contain(expected);
});

When("пользователь выбирает второй день недели", async function () {
  return await clickElement(this.page, "a:nth-child(2)");
});
Then("пользователь пробует забронировать без выбора кресла", async function () {
  const button = await this.page.$("button.acceptin-button");
  const isDisabled = await this.page.evaluate(
    (button) => button.disabled,
    button
  );
  expect(isDisabled).to.equal(true);
});
