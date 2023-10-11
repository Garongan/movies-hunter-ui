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
  movie: MovieInterface[];
  activeIndex: number;
}

const MovieDetails: FC<MovieDetailsProps> = ({ movie, activeIndex }) => {
  let filteredMovie: MovieInterface | undefined; // Assuming MovieType is the type of your movie objects

  if (activeIndex === 0) {
    filteredMovie = movie[0];
  } else {
    filteredMovie = movie.find((item) => item.id == activeIndex);
  }

  return (
    <Card className="max-w-full my-3 rounded-lg bg-background shadow-xl">
      {filteredMovie ? (
        <>
          <CardHeader>
            <CardTitle>{filteredMovie.title}</CardTitle>
            <div className="text-md">Rate:</div>
            <CardDescription className="h-5 flex items-center gap-2">
              <img src="src/assets/icon-tmdb.svg" alt="" className="h-full" />
              <div className="font-bold">{filteredMovie.vote_average}</div> (
              {filteredMovie.vote_count}) •{" release-date: "}
              {filteredMovie.release_date}
            </CardDescription>
          </CardHeader>
          <ScrollArea className="h-32 pb-6">
              <CardContent>
                <div className="text-md">Overview:</div>
                {filteredMovie.overview}
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
