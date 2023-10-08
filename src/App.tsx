import React, { useEffect, useState } from "react";
import {
  getNowPlaying,
  getPopular,
  getTopRated,
  getUpcoming,
  searchMovie,
} from "./services/TmdbApi";
import "./App.css";
import { MovieInterface } from "./services/types";
import { ScrollArea, ScrollBar } from "./components/ui/scroll-area";
import { BgImage } from "./components/BgImage";
import { Header } from "./layouts/Header";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const App: React.FC = () => {
  const [movieList, setMovieList] = useState<MovieInterface[]>([]);
  const navbar = [
    { name: "Now Playing" },
    { name: "Popular" },
    { name: "Top Rated" },
    { name: "Upcoming" },
  ];
  const [posterBG, setPosterBg] = useState<string>("");
  const [isImageLoaded, setIsImageLoaded] = useState(false); // State variable to track loading state
  const [activePoster, setActivePoster] = useState<number>(7);
  const [titlePage, setTitlePage] = useState<string>("Now Playing");

  useEffect(() => {
    switch (titlePage) {
      case "Popular":
        getPopular().then((result: MovieInterface[]) => {
          setMovieList(result);
        });
        break;
      case "Top Rated":
        getTopRated().then((result: MovieInterface[]) => {
          setMovieList(result);
        });
        break;
      case "Upcoming":
        getUpcoming().then((result: MovieInterface[]) => {
          setMovieList(result);
        });
        break;

      default:
        getNowPlaying().then((result: MovieInterface[]) => {
          setMovieList(result);
        });
        break;
    }
  }, [titlePage]);

  const search = async (query: string) => {
    if (query.length > 3) {
      const searchResults = await searchMovie(query);
      setMovieList(searchResults);
      setTitlePage("Search Results");
      handleDefaultBackdrop(searchResults[0].backdrop_path);
    }
  };

  const handleTitlePageClick = (name: string) => {
    setActivePoster(0);
    setTitlePage(name);
  };

  const handleImageClick = (
    movie_backdrop_path: string,
    activePoster: number
  ) => {
    setIsImageLoaded(false);
    setPosterBg(movie_backdrop_path);
    setActivePoster(activePoster);
    setTimeout(() => {
      setIsImageLoaded(true);
    }, 500);
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleDefaultBackdrop = (backdrop_path: string) => {
    setIsImageLoaded(false);
    setPosterBg(backdrop_path);
    setTimeout(() => {
      setIsImageLoaded(true);
    }, 1500);
  };

  const getBackdropSrc = () => {
    if (posterBG == null) return "public/3747372.jpg";
    else return `https://image.tmdb.org/t/p/original${posterBG}`;
  };

  const backdropSrc: string = getBackdropSrc();

  return (
    <>
      {/* backdrop start */}
      <BgImage
        backdropSrc={backdropSrc}
        handleImageLoad={handleImageLoad}
        isImageLoaded={isImageLoaded}
      />
      {/* backdrop end */}
      {/* header start */}
      <div className="z-10 relative">
        <div className="py-3 bg-background shadow-xl">
          <Header
            navbar={navbar}
            handleTitlePageClick={handleTitlePageClick}
            titlePage={titlePage}
            search={search}
          />
        </div>
      </div>
      {/* header end */}
      <div className="absolute z-10 bottom-0 inset-x-0 w-3/4 container">
        <Accordion type="single" collapsible className="py-6">
          <AccordionItem value="movie-details" className="relative top-3">
            <AccordionTrigger
              className={`justify-center bg-background w-12 rounded-t-lg mx-auto ${
                isImageLoaded ? "" : "hidden"
              }`}
            />
            {/* movie details start */}
            <AccordionContent className="bg-background rounded-t-lg pb-3">
              <div className="container pt-6">
                <MovieDetails movie={movieList} activeIndex={activePoster} />
              </div>
            </AccordionContent>
          </AccordionItem>
          {/* movie list start */}
          <ScrollArea className="bg-background rounded-lg">
            <MovieList
              movieList={movieList}
              onImageClick={handleImageClick}
              activePoster={activePoster}
              setDefaultBackdrop={handleDefaultBackdrop}
            />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          {/* movie list end */}
        </Accordion>
      </div>
      {/* movie details end */}
    </>
  );
};

export default App;
