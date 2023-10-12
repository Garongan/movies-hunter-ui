// types.ts
export interface MovieInterface {
  id: number;
  genre_ids: number[];
  title: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  poster_path: string;
  backdrop_path: string;
  overview: string;
}

export interface NavbarInterface {
  name: string;
}

export interface MovieGenre {
  id: number;
  name: string;
}
