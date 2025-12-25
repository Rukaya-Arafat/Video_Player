import "./index.css";
import { useState } from "react";
import { useVideos } from "./hooks/useVideos";
import PlayerPanel from "./components/PlayerPanel";
import PlaylistPanel from "./components/PlaylistPanel";

export default function App() {
  const { videos, selected, setSelected, loading, err } = useVideos();
  const [lang, setLang] = useState("en");

  return (
    <div className="app">
      <h2 className="app__title">مشغل فيديو + Playlist + Subtitles (Supabase)</h2>

      <div className="layout">
        <main className="main">
          <PlayerPanel
            loading={loading}
            err={err}
            selected={selected}
            lang={lang}
            setLang={setLang}
          />
        </main>

        <PlaylistPanel videos={videos} selected={selected} onSelect={setSelected} />
      </div>
    </div>
  );
}
