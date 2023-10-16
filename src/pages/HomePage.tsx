import { BgImage } from "@/components/BgImage";
import { Genres } from "@/components/Genres";
import MovieDetails from "@/components/MovieDetails";
import MovieList from "@/components/MovieList";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Header } from "@/layouts/Header";
import {
  getGenres,
  getNowPlaying,
  getPopular,
  getTopRated,
  getUpcoming,
  searchMovie,
} from "@/services/TmdbApi";
import { MovieGenre, MovieInterface } from "@/services/types";
import { debounce } from "lodash";
import { FC, useEffect, useState } from "react";

const HomePage: FC = () => {
  const [movieList, setMovieList] = useState<MovieInterface[]>([]);
  const [genres, setGenres] = useState<MovieGenre[]>([]);
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
    getGenres().then((result: MovieGenre[]) => {
      setGenres(result);
    });
  }, [titlePage]);

  const debouncedSetMovieList = debounce((newMovieList) => {
    setMovieList(newMovieList);
  }, 500);

  const search = async (query: string) => {
    if (query.length > 3) {
      const searchResults = await searchMovie(query);
      debouncedSetMovieList(searchResults);
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
    }, 500);
  };

  const getBackdropSrc = () => {
    if (posterBG == null) return "public/3747372.jpg";
    else return `https://image.tmdb.org/t/p/w1280${posterBG}`;
  };

  const backdropSrc: string = getBackdropSrc();

  let filteredMovie: MovieInterface[] = []; // Initialize as an empty array

  if (activePoster === 0) {
    filteredMovie = [movieList[0]]; // Assign an array with a single object
  } else {
    const foundMovie = movieList.find((item) => item.id === activePoster);
    if (foundMovie) {
      filteredMovie = [foundMovie]; // Assign an array with the found object
    }
    // You might want to handle the case where foundMovie is undefined (no movie found) here
  }

  return (
    <>
      {/* header start */}
      <div className="py-6 bg-background shadow-xl dark:shadow-lg-dark relative z-10">
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
          <ScrollArea className="bg-background rounded-lg px-4 shadow-xl dark:shadow-lg-dark">
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
      <div className="container pt-28">
        <MovieDetails filteredMovie={filteredMovie} />
      </div>
      {/* movie details-end */}
      {/* genres start */}
      <div className="container py-6 flex flex-wrap justify-center gap-4">
        <Genres genres={genres} filteredMovie={filteredMovie} />
      </div>
      {/* genres end */}
      {/* footer start */}
      <footer className="py-6 text-center bg-foreground text-background font-medium">
        Created By Alvindo Tri Jatmiko @2023
      </footer>
      {/* footer end */}
    </>
  );
};

export default HomePage;
