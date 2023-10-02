import React, { useEffect, useState } from "react";
import { Movie } from "../services/types";
import { Skeleton } from "./ui/skeleton";

interface PopularMovieListProps {
  popularMovies: Movie[];
  onImageClick: (backdropPath: Movie["backdrop_path"], id: Movie["id"]) => void;
  activePoster: number;
}

const PopularMovieList: React.FC<PopularMovieListProps> = ({
  popularMovies,
  onImageClick,
  activePoster,
}) => {
  const [renderedMovies, setRenderedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const delay = 1000; // 1-second delay between each movie rendering

    const renderMoviesWithDelay = () => {
      popularMovies.forEach((movie, index) => {
        const timeoutId = setTimeout(() => {
          setRenderedMovies((prevMovies) => [...prevMovies, movie]);
        }, index * delay);

        // Clean up the timeout if the component unmounts or the movie list changes
        return () => clearTimeout(timeoutId);
      });
    };

    renderMoviesWithDelay();
  }, [popularMovies]);

  const nextRenderedMovies = renderedMovies.filter((value, index, self) => {
    if (index % 2 === 0) return self.indexOf(value) === index;
  });

  return (
    <div className="flex">
      {nextRenderedMovies.map((movie, index) => (
        <div
        className={`${index == activePoster ? 'scale-95 -translate-y-1.5' : ''} flex-none px-1 first:pl-0 last:pr-0 scale-90 transition-all hover:scale-95 hover:-translate-y-1.5`}
          key={index}
        >
          {movie.poster_path != null ? (
            <img
              className="rounded-md h-52 animateFadeAndSwipeDown"
              src={`${import.meta.env.VITE_BASEIMAGEURL}${movie.poster_path}`}
              alt={movie.title}
              onClick={() => onImageClick(movie.backdrop_path, movie.id)}
            />
          ) : (
            <Skeleton className="h-full m-2" />
          )}
        </div>
      ))}
    </div>
  );
};

export default PopularMovieList;
