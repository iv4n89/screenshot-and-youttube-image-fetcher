import { GITHUB_API_REPO } from "@/app/lib/constants";
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";
import puppeteer from "puppeteer";

export async function POST() {
  try {
    const response = await fetch(GITHUB_API_REPO);
    const data = await response.json();
    const filePath = path.join("tmp", "data.json");
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const types = Object.keys(data);

    for (const type of types) {
      // Crear el directorio 'public/screenshots' si no existe
      const screenshotsDir = path.join("public", "screenshots", type);
      if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir, { recursive: true });
      }

      for (const item of data[type]) {
        const { url, title } = item;
        if (url.includes("youtu")) {
          continue;
        }
        const fileName =
          (title?.toLowerCase()?.replace(/\s+/g, "_") ??
            url.replace(/https?:\/\//, "").replace(/\//g, "_")) + ".webp";
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

    return NextResponse.json({ message: "Data fetched and screenshots taken" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
