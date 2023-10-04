import React, { ReactEventHandler, useEffect, useState } from "react";
import { MovieInterface } from "../services/types";
import { Skeleton } from "./ui/skeleton";

interface MovieListProps {
  movieList: MovieInterface[];
  onImageClick: (
    backdropPath: MovieInterface["backdrop_path"],
    id: MovieInterface["id"]
  ) => void;
  activePoster: number;
  setDefaultBackdrop: (bacdropPath: MovieInterface["backdrop_path"]) => void;
}

const PopularMovieList: React.FC<MovieListProps> = ({
  movieList,
  onImageClick,
  activePoster,
  setDefaultBackdrop,
}) => {
  const [renderedMovies, setRenderedMovies] = useState<MovieInterface[]>([]);
  let firstMovieBackdropPath: string | null = null;

  useEffect(() => {
    const delay = 300; // 300ms-second delay between each movie rendering

    const renderMoviesWithDelay = () => {
      movieList.forEach((movie, index) => {
        const timeoutId = setTimeout(() => {
          setRenderedMovies((prevMovies) => [...prevMovies, movie]);
        }, index * delay);

        // Clean up the timeout if the component unmounts or the movie list changes
        return () => clearTimeout(timeoutId);
      });
    };

    setTimeout(() => {
      setRenderedMovies([]);
      renderMoviesWithDelay();
    }, 500);
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
    <div className="flex gap-x-2">
      {nextRenderedMovies.map((movie, index) => (
        <div
          className={`${
            index === activePoster ? "scale-95 -translate-y-[0.3rem]" : ""
          } flex-none first:pl-0 last:pr-0 transition-all scale-90 hover:scale-95 hover:-translate-y-[0.3rem] w-28`}
          key={index}
        >
          {movie.poster_path != null ? (
            <img
              className="rounded-md h-44 object-center animateFadeAndSwipeDown"
              src={`${import.meta.env.VITE_BASEIMAGEURL}${movie.poster_path}`}
              alt={movie.title}
              onClick={() => onImageClick(movie.backdrop_path, index)}
              onLoad={
                index === activePoster ? handleDefaultBackdrop : undefined
              }
            />
          ) : (
            <Skeleton className="h-full w-full" />
          )}
        </div>
      ))}
    </div>
  );
};

export default PopularMovieList;
