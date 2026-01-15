import { useEffect, useRef } from "react";

export default function VideoPlayer({ videoUrl, subtitleUrl, lang, videoKey }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const wasPlaying = !video.paused;
    const t = video.currentTime || 0;

    video.load();
    video.currentTime = t;

    if (wasPlaying) {
      video.play().catch(() => {});
    }
  }, [subtitleUrl]);

  return (
    <video
      key={videoKey}
      ref={videoRef}
      controls
      crossOrigin="anonymous"
      playsInline
      className="video"
    >
      <source src={videoUrl} type="video/mp4" />

      {subtitleUrl ? (
        <track
          src={subtitleUrl}
          kind="subtitles"
          srcLang={lang}
          label={lang.toUpperCase()}
          default
        />
      ) : null}
    </video>
  );
}
