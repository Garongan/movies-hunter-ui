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

interface MovieDetailsProps {
  filteredMovie?: MovieInterface[];
}

const MovieDetails: FC<MovieDetailsProps> = ({ filteredMovie }) => {
  const movie =
    filteredMovie && filteredMovie.length > 0 ? filteredMovie[0] : undefined;

  return (
    <Card className="max-w-full my-3 rounded-lg bg-background shadow-xl dark:shadow-lg-dark">
      {movie ? (
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
          <ScrollArea className="h-32 pb-6">
            <CardContent>
              <div className="text-md">Overview:</div>
              {movie.overview}
            </CardContent>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </>
      ) : (
        <CardHeader>
          <CardTitle>Not Found</CardTitle>
        </CardHeader>
      )}
    </Card>
  );
};

export default MovieDetails;
