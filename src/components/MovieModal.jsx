import { useEffect, useRef } from 'react'
import { IMG_BASE } from '../api'

export default function MovieModal({ movie, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const year = movie.release_date?.slice(0, 4)
  const backdrop = movie.backdrop_path && `${IMG_BASE}/w1280${movie.backdrop_path}`

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      aria-labelledby="modal-title"
      onClose={onClose}
      onClick={(e) => e.target === dialogRef.current && onClose()}
    >
      <div className="modal-hero" style={backdrop ? { backgroundImage: `url(${backdrop})` } : undefined}>
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
      </div>

      <div className="modal-content">
        {movie.poster_path && (
          <img className="modal-poster" src={`${IMG_BASE}/w342${movie.poster_path}`} alt="" />
        )}
        <div className="modal-text">
          <h2 id="modal-title">{movie.title}</h2>
          <p className="modal-meta">
            {year && <span>{year}</span>}
            {movie.vote_average > 0 && (
              <span>★ {movie.vote_average.toFixed(1)} ({movie.vote_count.toLocaleString()} votes)</span>
            )}
            {movie.original_language && <span>{movie.original_language.toUpperCase()}</span>}
          </p>
          {movie.original_title !== movie.title && (
            <p className="muted">Original title: {movie.original_title}</p>
          )}
          <h3>Overview</h3>
          <p className="overview">{movie.overview || 'No overview available.'}</p>
        </div>
      </div>
    </dialog>
  )
}
