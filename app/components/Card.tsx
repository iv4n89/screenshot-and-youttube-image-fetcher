import Image from "next/image";

interface Props {
  title: string;
  description: string;
  url: string;
  imageSrc: string;
}

export const Card: React.FC<Props> = ({
  title,
  description,
  url,
  imageSrc,
}) => {
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
