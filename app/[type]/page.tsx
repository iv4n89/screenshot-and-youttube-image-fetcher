import { Card } from "../components/Card";
import { fetchData } from "../lib/fetchData";
import { getScreenshotImage, getYoutubeThumbnail } from "../lib/utils";

export async function generateStaticParams() {
  const types = await fetch(
    process.env.GITHUB_RAW_URL + "/resources.json"
  ).then((res) => res.json());
  return Object.keys(types).map((type) => ({ type }));
}

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ type: string }>;
}>): Promise<JSX.Element> {
  const { type } = await params;
  const typeData = await fetchData(type);

  return (
    <div className="flex gap-5 flex-wrap">
      {typeData?.map(async (resource) => {
        let imageSrc;
        if (resource.url.includes("youtu")) {
          imageSrc = getYoutubeThumbnail(resource.url);
        } else {
          imageSrc = await getScreenshotImage(type, {
            title: resource.title,
            url: resource.url,
          });
        }
        return (
          <Card
            key={resource.title}
            imageSrc={imageSrc}
            title={resource.title}
            description={resource.description}
            url={resource.url}
          />
        );
      })}
    </div>
  );
}
