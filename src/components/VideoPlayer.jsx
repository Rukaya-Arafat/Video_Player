import { useEffect, useRef } from "react"; // Hooks للتحكم بعنصر الفيديو وقت تغيير الترجمة

export default function VideoPlayer({ videoUrl, subtitleUrl, lang, videoKey }) {
  const videoRef = useRef(null); // مرجع لعنصر الفيديو

  useEffect(() => { // هذا التأثير خاص بتبديل الترجمة بدون ما نخسر وقت الفيديو
    const video = videoRef.current; // نجيب عنصر الفيديو
    if (!video) return; // حماية إذا لم يتوفر العنصر بعد

    const wasPlaying = !video.paused; // هل كان الفيديو شغال؟
    const t = video.currentTime || 0; // نخزن الوقت الحالي قبل تغيير الترجمة

    video.load(); // نطلب من المتصفح إعادة تحميل المسارات (track)
    video.currentTime = t; // نرجع لنفس الوقت

    if (wasPlaying) { // إذا كان شغال، نخليه يكمل
      video.play().catch(() => {}); // نتجاهل أي منع تشغيل تلقائي
    }
  }, [subtitleUrl]); // يتنفذ فقط عند تغيير ملف الترجمة

  return (
    <video
      key={videoKey}              // ✅ يتغير فقط عند تغيير الفيديو => يبدأ من البداية
      ref={videoRef}              // ربط ref بعنصر الفيديو
      controls                    // أزرار التحكم
      crossOrigin="anonymous"     // مهم للترجمة من روابط خارجية
      playsInline                 // مهم للموبايل
      className="video"           // ستايل
    >
      <source src={videoUrl} type="video/mp4" /> {/* مصدر الفيديو */}

      {subtitleUrl ? ( // إذا يوجد ترجمة
        <track
          src={subtitleUrl}        // رابط ملف الترجمة
          kind="subtitles"         // نوع المسار ترجمة
          srcLang={lang}           // كود اللغة
          label={lang.toUpperCase()} // اسم يظهر في قائمة الترجمة
          default                 // افتراضي
        />
      ) : null}
    </video>
  );
}
