import { MovieInterface } from "../services/types";
import PosterImage from "./PosterImage";

interface MovieListProps {
  movieList: MovieInterface[];
  onImageClick: (
    backdropPath: MovieInterface["backdrop_path"],
    index: number
  ) => void;
  activePoster: number;
}

const MovieList: React.FC<MovieListProps> = ({
  movieList,
  onImageClick,
  activePoster,
}) => {
  return (
    <div className="flex py-4 gap-x-3">
      {movieList.map((movie, index) => (
        <div
          className={`${
            (index == 0 && activePoster == 0) || movie.id == activePoster
              ? "-translate-y-[0.2rem] scale-105 filter-none"
              : ""
          } flex-none transition-all hover:-translate-y-[0.2rem] hover:duration-300 hover:scale-105 w-24 brightness-50`}
          key={movie.id}
        >
          <PosterImage
            key={movie.id}
            title={movie.title}
            backdrop_path={movie.backdrop_path}
            id={movie.id}
            index={index}
            onImageClick={onImageClick}
            poster_path={movie.poster_path}
          />
        </div>
      ))}
    </div>
  );
};

export default MovieList;
