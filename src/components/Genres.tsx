import { MovieGenre, MovieInterface } from "@/services/types";
import { FC } from "react";

interface GenresProps {
  genres: MovieGenre[];
  filteredMovie: MovieInterface[];
}

export const Genres: FC<GenresProps> = ({ genres, filteredMovie }) => {
  const genreIds = filteredMovie[0]?.genre_ids || [];

  return genres.map((item, index) => {
    const isSelected = genreIds.includes(item.id);

    return (
      <div
        key={index}
        className={`${
          isSelected ? "bg-foreground text-background" : ""
        } transition-all duration-300 border border-input bg-background hover:bg-foreground hover:text-background h-10 px-4 py-2 rounded-lg`}
      >
        {item.name}
      </div>
    );
  });
};
