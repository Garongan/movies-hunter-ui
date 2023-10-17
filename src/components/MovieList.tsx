import React, { ReactEventHandler, useEffect, useState } from "react";
import { MovieInterface } from "../services/types";
import { Skeleton } from "./ui/skeleton";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { debounce } from "lodash";

interface MovieListProps {
  movieList: MovieInterface[];
  onImageClick: (
    backdropPath: MovieInterface["backdrop_path"],
    index: number
  ) => void;
  activePoster: number;
  setDefaultBackdrop: (bacdropPath: MovieInterface["backdrop_path"]) => void;
}

const MovieList: React.FC<MovieListProps> = ({
  movieList,
  onImageClick,
  activePoster,
  setDefaultBackdrop,
}) => {
  const [renderedMovies, setRenderedMovies] = useState<MovieInterface[]>([]);
  let firstMovieBackdropPath: string | null = null;

  useEffect(() => {
    const renderMoviesWithDelay = () => {
      setRenderedMovies([]);
      movieList.forEach((movie, index) => {
        const timeoutId = setTimeout(() => {
          setRenderedMovies((prevMovies) => [...prevMovies, movie]);
        }, index > 12 ? index * 50 : index * 100);

        // Clean up the timeout if the component unmounts or the movie list changes
        return () => clearTimeout(timeoutId);
      });
    };
    
    const debouncedRenderMovies = debounce(renderMoviesWithDelay, 500);

    // Call the debounced function when the component mounts or movieList changes
    debouncedRenderMovies();

    // Clean up the debounced function when component unmounts
    return () => debouncedRenderMovies.cancel();
  }, [movieList]);

  const nextRenderedMovies = renderedMovies.filter(
    (value, index, self) =>
      self.findIndex((obj) => obj.id === value.id) === index
  );

  // Set the backdrop path for the first movie
  if (nextRenderedMovies.length > 0) {
    firstMovieBackdropPath = nextRenderedMovies[0].backdrop_path;
  }

  const handleDefaultBackdrop: ReactEventHandler<HTMLImageElement> = () => {
    if (firstMovieBackdropPath) {
      setDefaultBackdrop(firstMovieBackdropPath);
    }
  };

  return (
    <div className="flex py-4 gap-x-3">
      {nextRenderedMovies.map((movie, index) => (
        <div
          className={`${
            ( index == 0 && activePoster == 0 ) || movie.id == activePoster
              ? "-translate-y-[0.2rem] scale-105 filter-none"
              : ""
          } flex-none transition-all hover:-translate-y-[0.2rem] hover:duration-300 hover:scale-105 w-24 brightness-50`}
          key={index}
        >
          <div className="animateFadeAndSwipeDown">
            <AspectRatio ratio={4 / 6}>
              {movie.poster_path != null ? (
                <img
                  className="rounded-md h-full w-full object-cover"
                  src={`${import.meta.env.VITE_BASEIMAGEURL}${
                    movie.poster_path
                  }`}
                  alt={movie.title}
                  onClick={() => onImageClick(movie.backdrop_path, movie.id)}
                  onLoad={
                    index === activePoster ? handleDefaultBackdrop : undefined
                  }
                />
              ) : (
                <Skeleton className="h-full w-full" />
              )}
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
