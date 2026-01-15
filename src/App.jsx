import "./index.css";
import { useMemo, useState } from "react";
import { useVideos } from "./hooks/useVideos";
import PlayerPanel from "./components/PlayerPanel";
import PlaylistPanel from "./components/PlaylistPanel";
import Navbar from "./layout/Navbar";
import Sidebar from "./layout/Sidebar";

export default function App() {
  const { videos, selected, setSelected, loading, err } = useVideos();
  const [lang, setLang] = useState("en");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeSide, setActiveSide] = useState("home");

  const toggleSidebar = () => {
    if (window.matchMedia("(max-width: 900px)").matches) {
      setMobileSidebarOpen((s) => !s);
    } else {
      setSidebarCollapsed((s) => !s);
    }
  };

  const recommended = useMemo(() => {
    if (!videos?.length) return [];
    if (!selected?.id) return videos.slice(0, 12);
    return videos.filter((v) => v.id !== selected.id).slice(0, 12);
  }, [videos, selected]);

  return (
    <div className="shell">
      <Navbar onToggleSidebar={toggleSidebar} />

      <div
        className={`backdrop ${mobileSidebarOpen ? "backdrop--show" : ""}`}
        onClick={() => setMobileSidebarOpen(false)}
      />

      <div className="body">
        <div className="sidebarDesktop">
          <Sidebar
            collapsed={sidebarCollapsed}
            activeKey={activeSide}
            onSelect={(key) => setActiveSide(key)}
          />
        </div>

        <div
          className={`sidebarMobileDrawer ${
            mobileSidebarOpen ? "isOpen" : ""
          }`}
        >
          <Sidebar
            collapsed={false}
            activeKey={activeSide}
            onSelect={(key) => {
              setActiveSide(key);
              setMobileSidebarOpen(false);
            }}
          />
        </div>

        <div className="content">
          <div className="layout">
            <main className="main">
              <PlayerPanel
                loading={loading}
                err={err}
                selected={selected}
                lang={lang}
                setLang={setLang}
              />

              <section className="belowGrid">
                <div className="belowGrid__head">
                  <h3 className="belowGrid__title">فيديوهات أخرى</h3>
                </div>

                <div className="videoGrid">
                  {recommended.map((v) => {
                    const safeTitle =
                      (typeof v.description === "string" &&
                        v.description.trim()) ||
                      (typeof v.name === "string" && v.name.trim()) ||
                      "بدون عنوان";

                    return (
                      <button
                        key={v.id}
                        type="button"
                        className="videoCard"
                        onClick={() => setSelected(v)}
                        title={safeTitle}
                        data-title={safeTitle}
                      >
                        <div className="videoCard__thumb">
                          {v.thumb_url ? (
                            <img
                              src={v.thumb_url}
                              alt={safeTitle}
                              loading="lazy"
                            />
                          ) : (
                            <video
                              src={v.video_url}
                              muted
                              playsInline
                              preload="metadata"
                            />
                          )}
                        </div>

                        <div className="videoCard__body">
                          <div className="videoCard__title">{safeTitle}</div>
                          <div className="videoCard__meta">
                            {v.channel || ""}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            </main>

            <PlaylistPanel
              videos={videos}
              selected={selected}
              onSelect={setSelected}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
