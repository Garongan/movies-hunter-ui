import { FC, ReactEventHandler } from "react";

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
    <img
      src={backdropSrc}
      alt="Background"
      onLoad={handleImageLoad}
      className={`w-full h-full object-cover z-0 fixed pt-6 ${
        isImageLoaded ? "fadeIn block" : "hidden"
      }`}
    />
  );
};
