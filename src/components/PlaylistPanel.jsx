export default function PlaylistPanel({ videos = [], selected, onSelect }) {
  return (
    <aside className="playlist">
      <div className="playlist__list playlist__list--videosOnly">
        {videos.map((v, index) => (
          <button
            key={v.id ?? index}
            onClick={() => onSelect(v)}
            className={`playlistItem playlistItem--videoOnly ${
              selected?.id === v.id ? "playlistItem--active" : ""
            }`}
            type="button"
          >
            <video
              className="playlistVideo"
              src={v.video_url}
              muted
              playsInline
              preload="metadata"
            />
          </button>
        ))}
      </div>
    </aside>
  );
}
