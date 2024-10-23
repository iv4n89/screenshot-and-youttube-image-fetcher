"use server";

import fs from "fs";
import path from "path";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { Resource } from "./types";

export const fetchData = async (type: string): Promise<Array<Resource>> => {
  const resourceUrl = `${process.env.GITHUB_RAW_URL}/resources.json`;
  const response = await fetch(resourceUrl, {
    method: "GET",
    headers: {
      contentType: "application/json",
    },
    next: {
      revalidate: 60,
    },
  });
  const json = await response.json();
  if (json?.[type]) {
    return json[type];
  }
  throw new Error("Failed to fetch data");
};

export const getScreenshots = async (
  type: string,
  data: { [k: string]: { url: string; title: string } }
) => {
  // Crear el directorio 'public/screenshots' si no existe
  const screenshotsDir = path.join("public", "screenshots", type);
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const urls = Object.values(data).flatMap((resource) => ({
    url: resource.url,
    title: resource.title,
  }));

  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });
  const page = await browser.newPage();

  for (const url of urls) {
    if (
      fs.existsSync(
        path.join("public", "screenshots", type, url.title + ".png")
      )
    ) {
      return;
    }
    await page.goto(url.url);
    const fileName =
      (url.title ?? url.url.replace(/https?:\/\//, "").replace(/\//g, "_")) +
      ".png";
    const filePath = path.join("public", "screenshots", type, fileName);
    await page.screenshot({ path: filePath });
  }
};
