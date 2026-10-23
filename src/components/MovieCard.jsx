import { IMG_BASE } from '../api'

export default function MovieCard({ movie, onSelect }) {
  const year = movie.release_date?.slice(0, 4)

  return (
    <button className="card" onClick={() => onSelect(movie)}>
      {movie.poster_path ? (
        <img
          className="poster"
          src={`${IMG_BASE}/w342${movie.poster_path}`}
          alt=""
          loading="lazy"
        />
      ) : (
        <div className="poster placeholder">No photo of movie</div>
      )}
      <div className="card-body">
        <h3 className="card-title">{movie.title}</h3>
        <p className="card-meta">
          {year || '—'}
          {movie.vote_average > 0 && <span>★ {movie.vote_average.toFixed(1)}</span>}
        </p>
      </div>
    </button>
  )
}
