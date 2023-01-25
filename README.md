# Movie App

## General description

### Main technology

```
This project was build on Vue 3, Vuetify 3, Pinia as storage manager and Vue Router to route control.
```

### The project

```
This app funcionalities are:

1- Get and show the next 50 upcoming movies in ascendent order by date.
    1.1- API: I decided to use the discover route instead of upcoming route because the discover route gives you more freedom with request params.
    1.2- Requests: Each page that comes from the API has 20 items, so three requests are made before showing data (also another request to get genre_ids).
    1.3- Loading: There is a loading component to give user feedback while the app is fetching data. There is also a loading component at
    posters images.
    1.4- The upcoming movies request will always set the query to start at the next day you are executing this app ("tomorrow").
    1.5- The 50 upcoming movies received are stored at the app store, if an axios error occur, user will se a simple message asking to reload the page.
2- Make a list of favorite movies
    2.1- Each movie list card has a heart button which changes color when clicked, aswell setting that movie as a favorite one.
    2.2- You can set/unset clicking at this heart button or at the corresponding button at Movie Details View.
    2.3- You can check all favorited movies clicking "check favorites" and also remove the movie over there if you want to.
3- Select a specific movie to see details (name, poster image, genre, overview and release date)
    3.1- If you click at the post image at the movies list, you will be redirect to the movie details page. At this page you can check the
    movie general informations, add/remove from favorites and go back to check upcoming/favorites movies list.
4- (Optional) Search for movies by entering a partial or full movie name.
    4.1- I decided to implement search based at the 50 upcoming movies. When you click at the component you have two options: write movie title and use the autocomplete, or find the movie title at the list.
    4.2- When you click at a movie title, you are redirected to the corresponding movie details view.
```

### Third party libraries

```
Vuetify 3 was chosen for its complete component library and css helpers classes.
Pinia was chosen because I needed a state management tool. Pinia was chosen over vuex because now Pinia is the new official vue management state library.
Vue-router was chosen for simple route control.
```

## Project setup

```
# yarn
yarn

# npm
npm install

# pnpm
pnpm install
```

### Compiles and hot-reloads for development

```
# yarn
yarn dev

# npm
npm run dev

# pnpm
pnpm dev
```

### Compiles and minifies for production

```
# yarn
yarn build

# npm
npm run build

# pnpm
pnpm build
```
