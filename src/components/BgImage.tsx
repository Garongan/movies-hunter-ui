/**
 * this component is for rendering the backdrop path from active poster in movie list
 * you can change the style of this component if want to change by your design
 */

import { FC, useEffect } from "react";
import { Skeleton } from "./ui/skeleton";

// Props interface for BgImage component
interface BgImageProps {
  backdropSrc: string; // Source URL for the background image
  handleImageLoad: (value: boolean) => void; // Callback function for image loading status
  isImageLoaded: boolean; // Flag indicating whether the image is loaded or not
}

/**
 *
 * @param backdropSrc is variable that have the url of backdrop image
 * @param handleImageLoad is variable to set the animation when image is not ready
 * @param isImageLoaded is variable that indicates the image is loaded or not
 * @returns
 */
// Component for displaying a background image with loading indicator
const BgImage: FC<BgImageProps> = ({
  backdropSrc,
  handleImageLoad,
  isImageLoaded,
}) => {
  // Effect to handle image loading and error events
  useEffect(() => {
    const image = new Image();
    image.src = backdropSrc;

    // Event handler for successful image loading
    image.onload = () => {
      handleImageLoad(true);
    };

    // Event handler for image loading error
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
        // Render the background image if it is loaded
        <img
          src={backdropSrc}
          alt="Background"
          className={`w-full h-auto aspect-video object-cover ${
            isImageLoaded && "fadeIn"
          }`}
        />
      ) : (
        // Render a skeleton loading indicator while the image is loading
        <Skeleton className="w-full h-auto aspect-video rounded-none" />
      )}
    </>
  );
};

export default BgImage;
