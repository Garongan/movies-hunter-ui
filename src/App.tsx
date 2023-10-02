import React, { useEffect, useState } from "react";
import { getNowPlaying, searchMovie } from "./services/TmdbApi";
import "./App.css";
import PopularMovieList from "./components/PopularMovieList";
import { Movie } from "./services/types";
import { Input } from "./components/ui/input";
import { ScrollArea, ScrollBar } from "./components/ui/scroll-area";
import { Skeleton } from "./components/ui/skeleton";

const App: React.FC = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const navbar = [
    { name: "Now Playing" },
    { name: "Popular" },
    { name: "Top Rated" },
    { name: "Upcoming" },
  ];
  const [activeNavbar, setActiveNavbar] = useState<string>("Now Playing");
  const [posterBG, setPosterBg] = useState<string>("");
  const [isImageLoaded, setIsImageLoaded] = useState(true); // State variable to track loading state
  const [activePoster, setActivePoster] = useState<number>(0);

  useEffect(() => {
    getNowPlaying().then((result: Movie[]) => {
      setPopularMovies(result);
      setPosterBg(result[0].backdrop_path);
    });
  }, []);

  const search = async (query: string) => {
    if (query.length > 3) {
      const searchResults = await searchMovie(query);
      setPopularMovies(searchResults);
    }
  };

  const Navbar: React.FC = () => {
    return (
      <ul className="list-none flex flex-row">
        {navbar.map((item, id) => (
          <li
            key={id}
            className={`${
              activeNavbar == item.name ? "animateBorderBottom" : ""
            } cursor-pointer me-5`}
            onClick={() => setActiveNavbar(item.name)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    );
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
    }, 1500);
  };

  const handleImageLoad = () => {
    setIsImageLoaded(false);
  };

  return (
    <>
      {/* backdrop start */}
      {isImageLoaded && <Skeleton className="w-full h-full" />}
      <img
        src={`https://image.tmdb.org/t/p/original${posterBG}`}
        alt="Background"
        onLoad={() => handleImageLoad}
        className={`w-full h-full fixed object-cover z-0 ${
          isImageLoaded ? "fadeIn block" : "hidden"
        }`}
      />
      {/* backdrop end */}
      <div className="z-10 relative">
        <header className="container flex flex-row items-center flex-wrap py-5">
          <h1 className="font-medium text-xl tracking-tight basis-1/3">
            <span className="bg-foreground text-background p-1.5 rounded">
              Movies
            </span>{" "}
            Hunter
          </h1>
          <div className="items-center flex justify-end basis-2/3">
            <Navbar />
            <Input
              type="text"
              placeholder="🔍 Search Movies..."
              className="w-48 transition-all text-primary rounded-lg focus:w-64 focus:outline-0 input-style focus:bg-background"
              onChange={(e) => search(e.target.value)}
            />
          </div>
        </header>
      </div>
      <div className="container absolute bottom-0">
        <ScrollArea className="rounded-md py-6">
          <div className="flex">
            <PopularMovieList
              popularMovies={popularMovies}
              onImageClick={handleImageClick}
              activePoster={activePoster}
            />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};

export default App;
