import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));

  const types = Object.keys(data);

  for (const type of types) {
    // Crear el directorio 'public/screenshots' si no existe
    const screenshotsDir = path.join("public", "screenshots", type);
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    for (const item of data[type]) {
      const { url, title } = item;
      if (url.includes('youtu')) {
        continue;
      }
      const fileName = (title?.toLowerCase()?.replace(/\s+/g, "_") ?? url.replace(/https?:\/\//, "").replace(/\//g, "_")) + ".webp";
      if (fs.existsSync(path.join(screenshotsDir, fileName))) {
        console.log(`Skipping ${title}`);
        continue;
      }
      await page.goto(url);
      const filePath = path.join(screenshotsDir, fileName);
      await page.screenshot({ path: filePath });
    }

  }

  await browser.close();
})();
