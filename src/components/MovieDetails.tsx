
/**
 * this component is to show the details of active poster from movie list
 * 
 */
import { MovieInterface } from "@/services/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { FC } from "react";
import { ScrollBar, ScrollArea } from "./ui/scroll-area";

// Props interface for MovieDetails component
interface MovieDetailsProps {
  filteredMovie?: MovieInterface[]; // Optional filtered movie data
}

/**
 * 
 * @param filteredMovie is variable that has the content active poster from movie list
 * @returns the component of details active movie
 */
// Functional component representing movie details
const MovieDetails: FC<MovieDetailsProps> = ({ filteredMovie }) => {
  // Extract the first movie from filteredMovie, if available
  const movie = filteredMovie && filteredMovie.length > 0 ? filteredMovie[0] : undefined;

  return (
    <Card className="max-w-full my-3 rounded-lg bg-background shadow-lg dark:shadow-lg-dark">
      {movie ? (
        // Render movie details if movie data is available
        <>
          <CardHeader>
            <CardTitle>{movie.title}</CardTitle>
            <div className="text-md">Rate:</div>
            <CardDescription className="h-5 flex items-center gap-2">
              <img src="src/assets/icon-tmdb.svg" alt="" className="h-full" />
              <div className="font-bold">{movie.vote_average}</div> (
              {movie.vote_count}) • release-date: {movie.release_date}
            </CardDescription>
          </CardHeader>
          {/* Scrollable area for movie overview */}
          <ScrollArea className="h-32 pb-6">
            <CardContent>
              <div className="text-md">Overview:</div>
              {movie.overview}
            </CardContent>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </>
      ) : (
        // Render "Not Found" message if no movie data is available
        <CardHeader>
          <CardTitle>Not Found</CardTitle>
        </CardHeader>
      )}
    </Card>
  );
};

export default MovieDetails;
