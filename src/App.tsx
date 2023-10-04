import React, { useEffect, useState } from "react";
import { getNowPlaying, searchMovie } from "./services/TmdbApi";
import "./App.css";
import PopularMovieList from "./components/MovieList";
import { MovieInterface } from "./services/types";
import { Input } from "./components/ui/input";
import { ScrollArea, ScrollBar } from "./components/ui/scroll-area";

const App: React.FC = () => {
  const [movieList, setMovieList] = useState<MovieInterface[]>([]);
  const [posterBG, setPosterBg] = useState<string>("");
  const [isImageLoaded, setIsImageLoaded] = useState(false); // State variable to track loading state
  const [activePoster, setActivePoster] = useState<number>(0);
  const [titlePage, setTitlePage] = useState<string>("Now Playing");

  useEffect(() => {
    getNowPlaying().then((result: MovieInterface[]) => {
      setMovieList(result);
    });
  }, []);

  const search = async (query: string) => {
    if (query.length > 3) {
      const searchResults = await searchMovie(query);
      setMovieList(searchResults);
      setTitlePage("Search Results");
      handleDefaultBackdrop(searchResults[0].backdrop_path);
    }
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
    if (posterBG == null)
      return 'public/3747372.jpg';
    else return `https://image.tmdb.org/t/p/original${posterBG}`;
  };

  const backdropSrc: string = getBackdropSrc();

  return (
    <>
      {/* backdrop start */}
      <img
        src={backdropSrc}
        alt="Background"
        onLoad={handleImageLoad}
        className={`w-full h-full max-h-screen fixed object-cover z-0 ${
          isImageLoaded ? "fadeIn block" : "hidden"
        }`}
      />
      {/* backdrop end */}
      <div className="z-10 relative">
        <header className="container flex flex-row items-center flex-wrap pt-6 pb-10 bg-gradient-to-b from-background/50 to-background-transparent">
          <div className="font-medium text-xl tracking-tight basis-1/3 flex items-center justify-start gap-1">
            <span className="bg-foreground text-background p-1.5 rounded">
              Movies
            </span>
            Hunter
          </div>
          <div className="items-center flex justify-end basis-2/3 gap-4">
            <div className="text-lg font-medium">
              <span className="bg-foreground text-background p-1.5 rounded">
                Movie
              </span>{" "}
              {titlePage}
            </div>
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
          <PopularMovieList
            movieList={movieList}
            onImageClick={handleImageClick}
            activePoster={activePoster}
            setDefaultBackdrop={handleDefaultBackdrop}
          />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      
    </>
  );
};

export default App;
