/**
 * this component is for show the genres of active poster from movie list
 * you can change the style of this component when rendering
 * change the style by using tailwind css class
 */
import { MovieGenre, MovieInterface } from "@/services/types";
import { FC } from "react";

// Props interface for Genres component
interface GenresProps {
  genres: MovieGenre[]; // Array of movie genres
  filteredMovie: MovieInterface[]; // Array of filtered movie data
}

/**
 *
 * @param genres is variable that have all the genres from api
 * @param filteredMovie is variable that have the active movie genre
 * @returns the component the show the active genres from all genres
 */
// Component for displaying movie genres
const Genres: FC<GenresProps> = ({ genres, filteredMovie }) => {
  // Extract genre IDs from the first movie in filteredMovie, if available
  const genreIds = filteredMovie[0]?.genre_ids || [];

  // Map through genres and render genre items
  return genres.map((item, index) => {
    // Check if the current genre is selected (included in genreIds)
    const isSelected = genreIds.includes(item.id);

    return (
      <div
        key={index} // Use index as the key for React components
        className={`${
          isSelected ? "bg-foreground text-background" : ""
        } transition-all duration-300 border border-input bg-background hover:bg-foreground hover:text-background h-10 px-4 py-2 rounded-lg`}
      >
        {item.name}
      </div>
    );
  });
};

export default Genres;
