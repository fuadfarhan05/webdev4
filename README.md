# Movie Finder

A React + Vite app for browsing and searching movies with the [TMDB API](https://developer.themoviedb.org/docs).

## Setup

```bash
npm install
cp .env.example .env   # then paste your TMDB key into .env
npm run dev
```

`VITE_TMDB_API_KEY` accepts either the v3 **API Key** or the v4 **API Read Access Token** from your TMDB account settings. `.env` is listed in `.gitignore`, so the key never gets committed.

## Features

- **Search**: debounced search through `/search/movie`. With no query, the page shows `/movie/popular`.
- **Empty state**: shows “No results for ‘xyz’” when a search finds nothing.
- **Movie detail modal**: click a card to open a `<dialog>` with the backdrop, poster, rating, language and the `overview` field. Close it with Esc, the × button or a click on the backdrop.
- **Load more**: requests the next `page` from TMDB and appends it to the list. The button hides once `page` reaches `total_pages` (TMDB stops at 500).
- **Mobile layout without media queries**:
  - The movie grid uses `repeat(auto-fill, minmax(min(150px, 100%), 1fr))`, so it shows 2 columns on phones and 6–8 on desktops.
  - The modal uses `flex-wrap` with a large `flex-grow` on the text, so the poster sits beside the text on wide screens and stacks above it on narrow ones.
  - The header wraps the search bar under the title.
  - Spacing scales with `clamp()`.

## Project structure

```
src/
  api.js                  TMDB fetch helpers (popular, search)
  App.jsx                 state: query, page, results, selected movie
  components/
    MovieCard.jsx         grid card
    MovieModal.jsx        detail view
  index.css               all styles
```
