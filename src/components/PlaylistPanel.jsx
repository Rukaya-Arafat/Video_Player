import { useState } from "react";
function formatDuration(seconds = 0) {
  if (!seconds || isNaN(seconds)) return "";
  const total = Math.floor(seconds);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function PlaylistPanel({ videos = [], selected, onSelect }) {
  const [durations, setDurations] = useState({}); // { [id]: seconds }

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
            aria-label={v.title || "video"}
          >
            <div className="playlistThumb">
              <video
                className="playlistVideo"
                src={v.video_url}
                muted
                playsInline
                preload="metadata"
                onLoadedMetadata={(e) => {
                  const dur = e.currentTarget.duration;
                  if (!v.id) return;
                  setDurations((prev) => {
                    if (prev[v.id]) return prev;
                    return { ...prev, [v.id]: dur };
                  });
                }}
              />

              {durations[v.id] ? (
                <span className="playlistDuration">
                  {formatDuration(durations[v.id])}
                </span>
              ) : null}
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}
