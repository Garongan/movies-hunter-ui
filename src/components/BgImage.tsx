import { FC, ReactEventHandler } from "react";
import { Skeleton } from "./ui/skeleton";

interface BgImageProps {
  backdropSrc: string;
  handleImageLoad: ReactEventHandler<HTMLImageElement>;
  isImageLoaded: boolean;
}

export const BgImage: FC<BgImageProps> = ({
  backdropSrc,
  handleImageLoad,
  isImageLoaded,
}) => {
  return (
    <>
      {isImageLoaded ? (
        <img
          src={backdropSrc}
          alt="Background"
          onLoad={handleImageLoad}
          className={`w-full h-[32rem] object-cover ${
            isImageLoaded ? "fadeIn" : ""
          }`}
        />
      ) : (
        <Skeleton className="w-full h-[32rem] rounded-none" />
      )}
    </>
  );
};
