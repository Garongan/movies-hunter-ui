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
      className={`w-full h-[28rem] object-cover ${
        isImageLoaded ? "fadeIn visible" : "invisible"
      }`}
    />
  );
};
