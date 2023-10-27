import { FC, useState } from "react";
import { AspectRatio } from "./ui/aspect-ratio";
import { Skeleton } from "./ui/skeleton";
import { MovieInterface } from "@/services/types";

type PosterImageProps = {
  title: string;
  poster_path: string;
  onImageClick: (
    backdropPath: MovieInterface["backdrop_path"],
    index: number
  ) => void;
  backdrop_path: string;
  id: number;
  index: number;
};

const PosterImage: FC<PosterImageProps> = ({
  title,
  poster_path,
  onImageClick,
  backdrop_path,
  id,
  index,
}) => {
  const baseUrl = import.meta.env.VITE_BASEIMAGEURL;
  const [isPosterShow, setIsPosterShow] = useState(false);

  const delayImage = (index: number) => {
    setTimeout(() => {
      setIsPosterShow(true);
    }, index * 150);
  };

  delayImage(index);

  return (
    <>
      {isPosterShow && (
        <div className="animateFadeAndSwipeDown">
          <AspectRatio ratio={4 / 6}>
            {poster_path != null ? (
              <img
                className="rounded-md h-full w-full object-cover"
                src={`${baseUrl}${poster_path}`}
                alt={title}
                onClick={() => onImageClick(backdrop_path, id)}
              />
            ) : (
              <Skeleton className="h-full w-full" />
            )}
          </AspectRatio>
        </div>
      )}
    </>
  );
};

export default PosterImage;
