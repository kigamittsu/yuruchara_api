const puppeteer = require("puppeteer");
const config = require("./config");
const jconv = require("jaconv/lib/jaconv");
const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));

!(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("http://www.yurugp.jp/ranking/?year=2018");
    const linkList = await page.evaluate(() => {
      // debugger;
      const dataList = [];
      const nodeList = document.querySelectorAll("a");
      nodeList.forEach(node => {
        if (node.href.includes("character")) {
          dataList.push(node.href);
        }
      });
      return dataList;
    });
    let yurucharas = [];
    for (let i = 0; i < 100; i++) {
      await console.log(`proceed ${linkList[i]}`);
      await page.goto(linkList[i], {
        waitUntil: "domcontentloaded"
      });
      const yuruchara = await page.evaluate(() => {
        const elePrefecture = document
          .querySelector(".entry_no")
          .innerText.match(/\（.*\）/)[0];
        const prefecture = elePrefecture.substring(1, elePrefecture.length - 1);
        const rank = document
          .querySelector(".rank_pt")
          .innerText.split(" ")[0]
          .match(/\d{1,3}/)[0];
        const name = document.querySelector("h3").innerText;
        const group = document
          .querySelector("strong")
          .innerText.split("：")[1]
          .trim();
        const text = document.querySelector(".caption").innerHTML;
        const img = document.querySelector(".mainImg>img").src;

        return {
          name,
          prefecture,
          // rank,
          group,
          text,
          img_url: img
        };
      });
      await yurucharas.push(yuruchara);
      await page.waitFor(500);
    }
    await browser.close();

    yurucharas = await yurucharas.map(yuruchara => {
      yuruchara.name = jconv.toHebon(jconv.toHiragana(yuruchara.name));
      return yuruchara;
    });
    await fs.writeFileSync(
      "./data/yurucharas.json",
      JSON.stringify(yurucharas)
    );
  } catch (e) {
    console.log(e);
  }
})();
