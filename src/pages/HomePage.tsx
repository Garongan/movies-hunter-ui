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
import { FC, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

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
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [activePoster, setActivePoster] = useState<number>(0);
  const [titlePage, setTitlePage] = useState<string>("Now Playing");
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    switch (titlePage) {
      case "Popular":
        setIsImageLoaded(false);
        getPopular().then((result: MovieInterface[]) => {
          setMovieList(result);
          setPosterBg(result[0].backdrop_path);
          setIsImageLoaded(true);
        });
        break;
      case "Top Rated":
        setIsImageLoaded(false);
        getTopRated().then((result: MovieInterface[]) => {
          setMovieList(result);
          setPosterBg(result[0].backdrop_path);
          setIsImageLoaded(true);
        });
        break;
      case "Upcoming":
        setIsImageLoaded(false);
        getUpcoming().then((result: MovieInterface[]) => {
          setMovieList(result);
          setPosterBg(result[0].backdrop_path);
          setIsImageLoaded(true);
        });
        break;

      default:
        setIsImageLoaded(false);
        getNowPlaying().then((result: MovieInterface[]) => {
          setMovieList(result);
          setPosterBg(result[0].backdrop_path);
          setIsImageLoaded(true);
        });
        break;
    }
    getGenres().then((result: MovieGenre[]) => {
      setGenres(result);
    });
  }, [titlePage]);

  const search = async (query: string) => {
    if (query.length > 3) {
      const searchResults = await searchMovie(query);
      setMovieList(searchResults);
      setTitlePage("Search Results");
      setSearchValue(query);
      setPosterBg(searchResults[0].backdrop_path);
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

  const handleImageLoad = (value: boolean) => {
    setIsImageLoaded(value);
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

  const [refDetails, inViewDetails] = useInView({
    triggerOnce: true, // Animation will trigger only once
    threshold: 0.5, // Triggers the animation when 10% of the component is visible
  });

  return (
    <>
      {/* header start */}
      <div className="bg-background shadow-xl dark:shadow-lg-dark">
        <Header
          navbar={navbar}
          handleTitlePageClick={handleTitlePageClick}
          titlePage={titlePage}
          search={search}
          searchValue={searchValue}
        />
      </div>
      {/* header end */}

      {/* backdrop start */}
      <BgImage
        backdropSrc={backdropSrc}
        handleImageLoad={handleImageLoad}
        isImageLoaded={isImageLoaded}
      />
      {/* backdrop end */}

      <section
        ref={refDetails}
        className={`${
          inViewDetails ? "animate__fadeInUp" : "opacity-0"
        } transition-all container max-h-screen`}
      >
        {/* movie list start */}
        {inViewDetails && (
          <div className="py-6">
            <ScrollArea className="bg-background rounded-lg px-4 shadow-xl dark:shadow-lg-dark">
              <MovieList
                movieList={movieList}
                onImageClick={handleImageClick}
                activePoster={activePoster}
              />
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        )}
        {/* movie list end */}

        {/* movie details-start */}
        <MovieDetails filteredMovie={filteredMovie} />
        {/* movie details-end */}

        {/* genres start */}
        <div className="py-6 flex flex-wrap justify-center gap-4">
          <Genres genres={genres} filteredMovie={filteredMovie} />
        </div>
        {/* genres end */}

        {/* footer start */}
        <footer className="py-6 text-center font-medium border-t-2">
          Created By Alvindo Tri Jatmiko @2023
        </footer>
        {/* footer end */}
      </section>
    </>
  );
};

export default HomePage;
