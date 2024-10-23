import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebaseConfig";
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import path from "path";
import fs from "fs";

export const formatFileName = ({
  title,
  url,
}: {
  title?: string;
  url?: string;
}): string => {
  return (
    (title?.toLowerCase()?.replace(/\s+/g, "_") ??
      url?.replace(/https?:\/\//, "").replace(/\//g, "_")) + ".webp"
  );
};

export const getYoutubeThumbnail = (url: string): string => {
  return `https://img.youtube.com/vi/${url.split("v=")[1]}/0.jpg`;
};

export const getScreenshotImage = async (
  type: string,
  { title, url }: { title: string; url: string }
): Promise<string> => {
  const fileName = formatFileName({ title, url });
  try {
    return await getDownloadURL(
      ref(storage, `screenshots/${type}/${fileName}`)
    );
  } catch {
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
    const page = await browser.newPage();
    await page.goto(url);
    const filePath = path.join("/tmp", fileName);
    await page.screenshot({ path: filePath });
    const fileRef = ref(storage, `screenshots/${type}/${fileName}`);
    const result = await uploadBytes(fileRef, fs.readFileSync(filePath));
    console.log(`Uploaded ${fileName}`);
    await browser.close();
    return getDownloadURL(ref(storage, result.ref.fullPath));
  }
};
