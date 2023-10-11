import React, { useEffect, useState } from "react";
import {
  debounceSearch,
  getNowPlaying,
  getPopular,
  getTopRated,
  getUpcoming,
} from "./services/TmdbApi";
import "./App.css";
import { MovieInterface } from "./services/types";
import { ScrollArea, ScrollBar } from "./components/ui/scroll-area";
import { BgImage } from "./components/BgImage";
import { Header } from "./layouts/Header";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";

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
  const [searchValue, setSearchValue] = useState<string>("");

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
      const searchResults = (await debounceSearch(query)) ?? [];
      setMovieList(searchResults);
      setTitlePage("Search Results");
      setSearchValue(query);
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
      {/* header start */}
      <div className="py-6 bg-background shadow-xl relative z-10">
        <Header
          navbar={navbar}
          handleTitlePageClick={handleTitlePageClick}
          titlePage={titlePage}
          search={search}
          searchValue={searchValue}
        />
      </div>
      {/* header end */}
      <div className="relative">
        {/* backdrop start */}
        <BgImage
          backdropSrc={backdropSrc}
          handleImageLoad={handleImageLoad}
          isImageLoaded={isImageLoaded}
        />
        {/* backdrop end */}
        <div className="absolute py-6 -bottom-28 inset-x-0 container">
          {/* movie list start */}
          <ScrollArea className="bg-background rounded-lg px-4 shadow-xl">
            <MovieList
              movieList={movieList}
              onImageClick={handleImageClick}
              activePoster={activePoster}
              setDefaultBackdrop={handleDefaultBackdrop}
            />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          {/* movie list end */}
        </div>
      </div>
      {/* movie details-start */}
      <div className="container pt-28 py-6">
        <MovieDetails movie={movieList} activeIndex={activePoster} />
      </div>
      {/* movie details-end */}
    </>
  );
};

export default App;
