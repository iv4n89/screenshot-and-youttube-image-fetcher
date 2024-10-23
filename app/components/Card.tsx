import Image from "next/image";
import { formatFileName, getYoutubeThumbnail } from "../lib/utils";

interface Props {
  title: string;
  description: string;
  url: string;
  type: string;
}

export const Card: React.FC<Props> = ({ title, description, url, type }) => {
  let imageSrc;
  if (url.includes("youtu")) {
    imageSrc = getYoutubeThumbnail(url);
  } else {
    const fileName = formatFileName({ title, url });
    imageSrc = `/screenshots/${type}/${fileName}`;
  }
  return (
    <div
      className="border border-gray-200 rounded-lg hover:opacity-75 bg-gray-200 text-gray-700"
      style={{ width: 400 }}
    >
      <a href={url} target="_blank">
        <Image
          src={imageSrc}
          className="rounded-tl-lg rounded-tr-lg"
          alt={description}
          width={400}
          height={150}
        />
        <div className="p-5">
          <h2 className="text-xl font-bold">{title}</h2>
          <p>{description}</p>
        </div>
      </a>
    </div>
  );
};
