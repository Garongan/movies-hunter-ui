/**
 * This component displays a poster image with optional delay and animation.
 * The component accepts props like title, poster_path, backdrop_path, id, and index.
 * It uses the useState hook to manage the state of whether the poster should be displayed or not.
 * The delayImage function sets a delay based on the index of the poster, so that each poster is displayed with a delay relative to its index.
 * The component also has an onClick event handler that calls the onImageClick function passed as a prop when the poster is clicked.
 */
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

/**
 * 
 * @param title is movie title from api 
 * @param poster_path is movie poster by sending the url from api
 * @param onImageClick is function to set the movie details, backdrop path, and active poster
 * @param backdrop_path is movie backdrop by sending the url path from api
 * @param id is variabel key from movie id api
 * @param index is generated index from parent component that describes the default active poster
 * @returns the component that rendering the poster image that have animation on show
 */
const PosterImage: FC<PosterImageProps> = ({
  title,
  poster_path,
  onImageClick,
  backdrop_path,
  id,
  index,
}) => {
  // state variable
  const baseUrl = import.meta.env.VITE_BASEIMAGEURL;
  const [isPosterShow, setIsPosterShow] = useState(false);

  // function to delay the image to show
  const delayImage = (index: number) => {
    setTimeout(() => {
      setIsPosterShow(true);
    }, index * 150);
  };

  // run the function delay image
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
