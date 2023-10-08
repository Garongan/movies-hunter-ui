import React, { ReactEventHandler, useEffect, useState } from "react";
import { MovieInterface } from "../services/types";
import { Skeleton } from "./ui/skeleton";

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
    <div className="flex p-3">
      {nextRenderedMovies.map((movie, index) => (
        <div
          className={`${
            index === activePoster
              ? "-translate-y-[0.2rem] scale-105 filter-none"
              : ""
          } flex-none transition-all hover:-translate-y-[0.2rem] hover:duration-300 hover:scale-105 w-24 brightness-50`}
          key={index}
        >
          <div className="animateFadeAndSwipeDown">
            {movie.poster_path != null ? (
              <img
                className="rounded-md h-32 object-center"
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
        </div>
      ))}
    </div>
  );
};

export default MovieList;
