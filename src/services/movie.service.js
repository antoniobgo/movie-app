import axios from "axios";
const API_KEY = "a6e6381bba3f98f3d8d5d40dbe25d1a4";
const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&primary_release_date.gte=2023-01-30&sort_by=primary_release_date.asc`;

class MovieService {
  //
  getUpcomingMovies(page = 1) {
    return axios.get(API_URL + "&page=" + page);
  }
}
export default new MovieService();
