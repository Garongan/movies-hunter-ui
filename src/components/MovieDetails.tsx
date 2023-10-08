import { MovieInterface } from "@/services/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { FC } from "react";

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
    <Card className="max-w-full rounded-md bg-background outside-shadow">
      {filteredMovie ? (
        <>
          <CardHeader>
            <CardTitle>{filteredMovie.title}</CardTitle>
            <CardDescription>
              {filteredMovie.vote_average} ({filteredMovie.vote_count}) •{" "}
              {filteredMovie.release_date}
            </CardDescription>
          </CardHeader>
          <CardContent>{filteredMovie.overview}</CardContent>
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
