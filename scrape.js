const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const seeds = [
    15,16,17,18,19,
    20,21,22,23,24
  ];

  let grandTotal = 0;

  for (let seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url);

    // Wait for table to load
    await page.waitForSelector("table");

    const numbers = await page.$$eval("table td", cells =>
      cells.map(cell => parseFloat(cell.innerText)).filter(n => !isNaN(n))
    );

    const sum = numbers.reduce((a, b) => a + b, 0);
    console.log(`Seed ${seed} sum: ${sum}`);

    grandTotal += sum;
  }

  console.log("=================================");
  console.log("FINAL TOTAL:", grandTotal);
  console.log("=================================");

  await browser.close();
})();
