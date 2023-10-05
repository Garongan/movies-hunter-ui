import React, { useEffect, useState } from "react";
import {
  getNowPlaying,
  getPopular,
  getTopRated,
  getUpcoming,
  searchMovie,
} from "./services/TmdbApi";
import "./App.css";
import PopularMovieList from "./components/MovieList";
import { MovieInterface } from "./services/types";
import { ScrollArea, ScrollBar } from "./components/ui/scroll-area";
import { BgImage } from "./components/BgImage";
import { Header } from "./layouts/Header";
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
  const [activePoster, setActivePoster] = useState<number>(0);
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
      <div className="z-10 relative bg-gradient-to-b from-background/75 to-background-transparent pt-6 pb-16">
        <Header
          navbar={navbar}
          handleTitlePageClick={handleTitlePageClick}
          titlePage={titlePage}
          search={search}
        />
      </div>
      {/* header end */}
      <div className="container absolute inset-x-0 bottom-0">
        <ScrollArea className="rounded-md py-6">
          <PopularMovieList
            movieList={movieList}
            onImageClick={handleImageClick}
            activePoster={activePoster}
            setDefaultBackdrop={handleDefaultBackdrop}
          />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <Accordion type="single" collapsible className="">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default App;
