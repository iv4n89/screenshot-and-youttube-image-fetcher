/* eslint-disable @typescript-eslint/no-require-imports */
"use server";

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
