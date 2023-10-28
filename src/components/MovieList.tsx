/**
 * this component is to rendering the movie list by showing the poster
 * don't change this code, except you have an issue about the wrong array of movieList variable
 */

import React from 'react';
import { MovieInterface } from '../services/types';
import PosterImage from './PosterImage';

// Props interface for MovieList component
interface MovieListProps {
  movieList: MovieInterface[]; // Array of movie objects
  onImageClick: (backdropPath: MovieInterface['backdrop_path'], index: number) => void; // Function to handle image click
  activePoster: number; // Index of the active poster
}

// Functional component representing a list of movies
/**
 * 
 * @param movieList is array variable to get the current array
 * @param onImageClick is function when the user is click the poster movie and change the backrop movie and details
 * @param activePoster is variable to check the active poster of movie
 * @returns the component of movie poster by list
 */
const MovieList: React.FC<MovieListProps> = ({ movieList, onImageClick, activePoster }) => {
  return (
    <div className="flex py-4 gap-x-3">
      {/* Iterate through movieList and render movie posters */}
      {movieList.map((movie, index) => (
        <div
          className={`${
            // Apply conditional styles based on activePoster and index
            (index === 0 && activePoster === 0) || movie.id === activePoster
              ? '-translate-y-[0.2rem] scale-105 filter-none'
              : ''
          } flex-none transition-all hover:-translate-y-[0.2rem] hover:duration-300 hover:scale-105 w-24 brightness-50`}
          key={movie.id} // Use movie ID as the key for React components
        >
          {/* Render PosterImage component with movie details */}
          <PosterImage
            key={movie.id} // Key prop for optimization in React rendering
            title={movie.title} // Movie title
            backdrop_path={movie.backdrop_path} // Backdrop path for the movie
            id={movie.id} // Movie ID
            index={index} // Index of the movie in the list
            onImageClick={onImageClick} // Click event handler for the poster
            poster_path={movie.poster_path} // Poster path for the movie
          />
        </div>
      ))}
    </div>
  );
};

export default MovieList;
