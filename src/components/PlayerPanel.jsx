import { useEffect, useMemo } from "react";
import ErrorBox from "./ErrorBox";
import LanguagePicker from "./LanguagePicker";
import VideoPlayer from "./VideoPlayer";
import VideoDescription from "./VideoDescription";

export default function PlayerPanel({ loading, err, selected, lang, setLang }) {
  const availableLangs = useMemo(() => {
    if (!selected) return [];
    const arr = [];
    if (selected.subtitle_en_url) arr.push({ code: "en", label: "English" });
    if (selected.subtitle_tr_url) arr.push({ code: "tr", label: "Türkçe" });
    if (selected.subtitle_ar_url) arr.push({ code: "ar", label: "العربية" });
    return arr;
  }, [selected]);

  useEffect(() => {
    if (!selected) return;
    if (availableLangs.length === 0) return;
    const ok = availableLangs.some((l) => l.code === lang);
    if (!ok) setLang(availableLangs[0].code);
  }, [selected, availableLangs, lang, setLang]);

  const subtitleUrl = useMemo(() => {
    if (!selected) return "";
    if (lang === "en") return selected.subtitle_en_url || "";
    if (lang === "tr") return selected.subtitle_tr_url || "";
    if (lang === "ar") return selected.subtitle_ar_url || "";
    return "";
  }, [selected, lang]);

  if (loading) return <p>جاري تحميل الفيديوهات...</p>;
  if (err) return <ErrorBox message={err} />;
  if (!selected) return <p>لا يوجد فيديوهات في قاعدة البيانات.</p>;

  return (
    <>
     <div className="playerHeader">
  
  
</div>


      <LanguagePicker
        availableLangs={availableLangs}
        lang={lang}
        onChange={setLang}
      />

   
      <VideoPlayer
  videoKey={selected.id}     // ✅ يتغير فقط عند تغيير الفيديو
  videoUrl={selected.video_url}
  subtitleUrl={subtitleUrl}  // يتغير عند تغيير اللغة
  lang={lang}
/>


<VideoDescription text={selected.description} />

    </>
  );
}
