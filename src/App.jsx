import { useEffect, useState } from 'react'
import { getPopular, searchMovies } from './api'
import MovieCard from './components/MovieCard'
import MovieModal from './components/MovieModal'

export default function App() {
  const [input, setInput] = useState('')

  const [{ query, page }, setSearch] = useState({ query: '', page: 1 })
  const [movies, setMovies] = useState([])


  const [totalPages, setTotalPages] = useState(0)
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [selected, setSelected] = useState(null)

  const startSearch = (q) =>
    setSearch((prev) => (prev.query === q ? prev : { query: q, page: 1 }))

  useEffect(() => {
    const id = setTimeout(() => startSearch(input.trim()), 400)
    return () => clearTimeout(id)
  }, [input])

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    const request = query
      ? searchMovies(query, page, controller.signal)
      : getPopular(page, controller.signal)

    request
      .then((data) => {
        setTotalPages(data.total_pages)
        setMovies((prev) => {
          const base = page === 1 ? [] : prev
          const seen = new Set(base.map((m) => m.id))
          return [...base, ...data.results.filter((m) => !seen.has(m.id))]
        })
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [query, page])

  const hasMore = page < Math.min(totalPages, 500)
  const isEmpty = !loading && !error && movies.length === 0 && query

  return (
    <>
      <header className="header">
        <h1>fuad's movie f-i-n-d-e-r</h1>
        <form className="search" role="search" onSubmit={(e) => {
          e.preventDefault()
          startSearch(input.trim())
        }}>
          <input
            type="search"
            placeholder="Search movies…"
            aria-label="Search movies"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
      </header>

      <main className="main">
        <h2 className="section-title">
          {query ? `Results for “${query}”` : 'Popular right now'}
        </h2>

        {error && <p className="message error">{error}</p>}

        {isEmpty && (
          <div className="message empty">
            <p className="empty-icon" aria-hidden="true">🎬</p>
            <p>No results for “{query}”</p>
            <p className="muted">Check the spelling or try a different title.</p>
          </div>
        )}

        <ul className="grid">
          {movies.map((movie) => (
            <li key={movie.id}>
              <MovieCard movie={movie} onSelect={setSelected} />
            </li>
          ))}
        </ul>

        {loading && <p className="message muted">Loading…</p>}

        {!loading && hasMore && movies.length > 0 && (
          <button className="load-more" onClick={() => setSearch((s) => ({ ...s, page: s.page + 1 }))}>
            Load more
          </button>
        )}
      </main>

      {selected && <MovieModal movie={selected} onClose={() => setSelected(null)} />}
    </>
  )
}
