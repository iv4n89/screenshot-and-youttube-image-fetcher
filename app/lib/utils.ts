/* eslint-disable @typescript-eslint/no-require-imports */
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebaseConfig";

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
    return '';
  }
};
