import axios, { AxiosResponse } from "axios";
import { MovieInterface } from "./types";

const baseURL: string = import.meta.env.VITE_BASE_URL as string;
const apiKey: string = import.meta.env.VITE_API_KEY as string;

export const getNowPlaying = async (): Promise<MovieInterface[]> => {
  try {
    const response: AxiosResponse = await axios.get(
      `${baseURL}/movie/now_playing?api_key=${apiKey}`
    );
    // Check if 'results' exists in the response data
    if (response.data && Array.isArray(response.data.results)) {
      return response.data.results as MovieInterface[];
    } else {
      // Handle the case where 'results' doesn't exist as expected
      throw new Error("Unexpected API response format");
    }
  } catch (error) {
    // Handle any errors that may occur during the request
    throw new Error("Failed to fetch movie list");
  }
};

export const searchMovie = async (query: string): Promise<MovieInterface[]> => {
  try {
    const response: AxiosResponse = await axios.get(
      `${baseURL}/search/movie?query=${query}&api_key=${apiKey}`
    );
    // Check if 'results' exists in the response data
    if (response.data && Array.isArray(response.data.results)) {
      return response.data.results as MovieInterface[];
    } else {
      // Handle the case where 'results' doesn't exist as expected
      throw new Error("Unexpected API response format");
    }
  } catch (error) {
    // Handle any errors that may occur during the request
    throw new Error("Failed to search for movies");
  }
};
