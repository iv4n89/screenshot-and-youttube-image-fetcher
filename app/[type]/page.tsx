import data from "../../data.json";
import { Card } from "../components/Card";
import { Resources } from "../lib/types";

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ type: string }>;
}>): Promise<JSX.Element> {
  const { type } = await params;
  const typeData = (data as Resources)[type];

  return (
    <div className="flex gap-5 flex-wrap">
      {typeData?.map((resource) => (
        <Card
          key={resource.title}
          type={type}
          title={resource.title}
          description={resource.description}
          url={resource.url}
        />
      ))}
    </div>
  );
}
