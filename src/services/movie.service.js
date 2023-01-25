import axios from "axios";
const API_KEY = "a6e6381bba3f98f3d8d5d40dbe25d1a4";
const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=primary_release_date.asc`;
const API_GENRE_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;

const getTomorrowDate = () => {
  let today = new Date();
  let tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  let day = ("0" + tomorrow.getDate()).slice(-2);
  let month = ("0" + (tomorrow.getMonth() + 1)).slice(-2);
  let year = tomorrow.getFullYear();
  let formatted = year + "-" + month + "-" + day;
  return formatted;
};

class MovieService {
  getUpcomingMovies(page = 1) {
    let requestUrl =
      API_URL +
      "&page=" +
      page +
      "&primary_release_date.gte=" +
      getTomorrowDate();
    return axios.get(requestUrl);
  }

  getGenresMoviesList() {
    return axios.get(API_GENRE_URL);
  }
}
export default new MovieService();
