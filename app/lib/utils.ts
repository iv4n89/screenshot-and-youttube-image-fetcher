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
}

