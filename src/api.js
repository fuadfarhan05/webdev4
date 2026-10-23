const BASE_URL = 'https://api.themoviedb.org/3'
const KEY = import.meta.env.VITE_TMDB_API_KEY

export const IMG_BASE = 'https://image.tmdb.org/t/p'

const isBearer = KEY && KEY.length > 40

async function tmdb(path, params = {}, signal) {
  if (!KEY) throw new Error('Missing VITE_TMDB_API_KEY — add it to your .env file.')

  const url = new URL(BASE_URL + path)
  if (!isBearer) url.searchParams.set('api_key', KEY)
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)

  const res = await fetch(url, {
    signal,
    headers: isBearer ? { Authorization: `Bearer ${KEY}` } : {},
  })
  if (!res.ok) throw new Error(`TMDB request failed (${res.status})`)
  return res.json() 
}

export function getPopular(page, signal) {
  return tmdb('/movie/popular', { page }, signal)
}

export function searchMovies(query, page, signal) {
  return tmdb('/search/movie', { query, page, include_adult: false }, signal)
}
