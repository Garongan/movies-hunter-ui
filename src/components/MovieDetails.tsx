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
  // Check if movie array is empty or activeIndex is out of range
  if (movie.length === 0 || activeIndex < 0 || activeIndex >= movie.length) {
    return <div>No movie found</div>; // Or any other message or component you want to render for invalid data
  }

  return (
    <Card className="max-w-full rounded-md bg-background outside-shadow">
      <CardHeader>
        <CardTitle>{movie[activeIndex].title}</CardTitle>
        <CardDescription>
          {movie[activeIndex].vote_average} ({movie[activeIndex].vote_count}) •{" "}
          {movie[activeIndex].release_date}
        </CardDescription>
      </CardHeader>
      <CardContent>{movie[activeIndex].overview}</CardContent>
    </Card>
  );
};

export default MovieDetails;
