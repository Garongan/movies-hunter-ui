import axios, { AxiosResponse } from "axios";
import { MovieInterface } from "./types";
import { debounce } from "lodash";

const baseURL: string = import.meta.env.VITE_BASE_URL as string;
const apiKey: string = import.meta.env.VITE_API_KEY as string;

export const getNowPlaying = async (): Promise<MovieInterface[]> => {
  try {
    const response: AxiosResponse = await axios.get(
      `${baseURL}/movie/now_playing?api_key=${apiKey}`
    );
    // Check if 'results' exists in the response data
    if (response.data && Array.isArray(response.data.results)) {
      return response.data.results.slice(0, 20) as MovieInterface[];
    } else {
      // Handle the case where 'results' doesn't exist as expected
      throw new Error("Unexpected API response format");
    }
  } catch (error) {
    // Handle any errors that may occur during the request
    throw new Error("Failed to fetch movie list");
  }
};

export const getPopular = async (): Promise<MovieInterface[]> => {
  try {
    const response: AxiosResponse = await axios.get(
      `${baseURL}/movie/popular?api_key=${apiKey}`
    );
    // Check if 'results' exists in the response data
    if (response.data && Array.isArray(response.data.results)) {
      return response.data.results.slice(0, 20) as MovieInterface[];
    } else {
      // Handle the case where 'results' doesn't exist as expected
      throw new Error("Unexpected API response format");
    }
  } catch (error) {
    // Handle any errors that may occur during the request
    throw new Error("Failed to fetch movie list");
  }
};

export const getTopRated = async (): Promise<MovieInterface[]> => {
  try {
    const response: AxiosResponse = await axios.get(
      `${baseURL}/movie/top_rated?api_key=${apiKey}`
    );
    // Check if 'results' exists in the response data
    if (response.data && Array.isArray(response.data.results)) {
      return response.data.results.slice(0, 20) as MovieInterface[];
    } else {
      // Handle the case where 'results' doesn't exist as expected
      throw new Error("Unexpected API response format");
    }
  } catch (error) {
    // Handle any errors that may occur during the request
    throw new Error("Failed to fetch movie list");
  }
};

export const getUpcoming = async (): Promise<MovieInterface[]> => {
  try {
    const response: AxiosResponse = await axios.get(
      `${baseURL}/movie/upcoming?api_key=${apiKey}`
    );
    // Check if 'results' exists in the response data
    if (response.data && Array.isArray(response.data.results)) {
      return response.data.results.slice(0, 20) as MovieInterface[];
    } else {
      // Handle the case where 'results' doesn't exist as expected
      throw new Error("Unexpected API response format");
    }
  } catch (error) {
    // Handle any errors that may occur during the request
    throw new Error("Failed to fetch movie list");
  }
};

const searchMovie = async (query: string): Promise<MovieInterface[]> => {
  try {
    const response: AxiosResponse = await axios.get(
      `${baseURL}/search/movie?query=${query}&api_key=${apiKey}`
    );
    // Check if 'results' exists in the response data
    if (response.data && Array.isArray(response.data.results)) {
      return response.data.results.slice(0, 20) as MovieInterface[];
    } else {
      // Handle the case where 'results' doesn't exist as expected
      throw new Error("Unexpected API response format");
    }
  } catch (error) {
    // Handle any errors that may occur during the request
    throw new Error("Failed to search for movies");
  }
};

export const debounceSearch = debounce(searchMovie, 500)
