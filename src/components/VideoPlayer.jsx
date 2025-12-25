export default function VideoPlayer({ videoUrl, subtitleUrl, lang, videoKey }) {
  return (
    <>
      <video
        key={videoKey}
        controls
        crossOrigin="anonymous"
        className="video"
      >
        <source src={videoUrl} type="video/mp4" />
        {subtitleUrl ? (
          <track
            key={`${lang}-${subtitleUrl}`}
            src={subtitleUrl}
            kind="subtitles"
            srcLang={lang}
            label={lang.toUpperCase()}
            default
          />
        ) : null}
      </video>

    
    </>
  );
}
