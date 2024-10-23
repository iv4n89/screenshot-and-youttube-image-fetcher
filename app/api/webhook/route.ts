import { GITHUB_API_REPO } from "@/app/lib/constants";
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { storage } from "@/app/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export async function POST() {
  try {
    const response = await fetch(GITHUB_API_REPO);
    const data = await response.json();

    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
    const page = await browser.newPage();

    const types = Object.keys(data);

    for (const type of types) {
      for (const item of data[type]) {
        const { url, title } = item;
        if (url.includes("youtu")) {
          continue;
        }
        const fileName =
          (title?.toLowerCase()?.replace(/\s+/g, "_") ??
            url.replace(/https?:\/\//, "").replace(/\//g, "_")) + ".webp";
        try {
          await getDownloadURL(ref(storage, `screenshots/${type}/${fileName}`));
          console.log(`Screenshot already exists for ${fileName}`);
          continue;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          await page.goto(url);
          const filePath = path.join("/tmp", fileName);
          await page.screenshot({ path: filePath });
          const fileRef = ref(storage, `screenshots/${type}/${fileName}`);
          await uploadBytes(fileRef, fs.readFileSync(filePath));
          console.log(`Uploaded ${fileName}`);
        }
      }
    }

    await browser.close();

    return NextResponse.json({ message: "Data fetched and screenshots taken" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
