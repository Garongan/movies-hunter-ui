import { FC, useEffect } from "react";
import { Skeleton } from "./ui/skeleton";

interface BgImageProps {
  backdropSrc: string;
  handleImageLoad: (value: boolean) => void;
  isImageLoaded: boolean;
}

export const BgImage: FC<BgImageProps> = ({
  backdropSrc,
  handleImageLoad,
  isImageLoaded,
}) => {
  useEffect(() => {
    const image = new Image();
    image.src = backdropSrc;

    image.onload = () => {
      handleImageLoad(true);
    };

    image.onerror = () => {
      handleImageLoad(false);
      // Handle error if the image fails to load
    };

    // Cleanup event listeners when the component is unmounted
    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, [backdropSrc, handleImageLoad]);

  return (
    <>
      {isImageLoaded ? (
        <img
          src={backdropSrc}
          alt="Background"
          className={`w-full h-auto aspect-video object-cover ${
            isImageLoaded && "fadeIn"
          }`}
        />
      ) : (
        <Skeleton className="w-full h-auto aspect-video rounded-none" />
      )}
    </>
  );
};
