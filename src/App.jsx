import "./index.css"; // استيراد CSS العام للتطبيق
import { useMemo, useState } from "react"; // useState للحالة + useMemo لقيم مشتقة بكفاءة
import { useVideos } from "./hooks/useVideos"; // Hook يجلب الفيديوهات من Supabase ويحدد الفيديو المختار
import PlayerPanel from "./components/PlayerPanel"; // لوحة المشغل (فيديو + ترجمة + وصف)
import PlaylistPanel from "./components/PlaylistPanel"; // قائمة جانبية للفيديوهات
import Navbar from "./layout/Navbar"; // شريط علوي
import Sidebar from "./layout/Sidebar"; // سايدبار (سطح المكتب + موبايل)

export default function App() { // كومبونينت التطبيق الرئيسي
  const { videos, selected, setSelected, loading, err } = useVideos(); // بيانات الفيديوهات + المختار + حالات التحميل/الخطأ
  const [lang, setLang] = useState("en"); // اللغة الحالية للترجمة (افتراضي en)

  // حالة تصغير السايدبار في الديسكتوب
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // حالة فتح/إغلاق درج السايدبار في الموبايل
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // المفتاح الحالي في السايدبار (home وغيرها)
  const [activeSide, setActiveSide] = useState("home");

  const toggleSidebar = () => { // تبديل السايدبار حسب حجم الشاشة
    if (window.matchMedia("(max-width: 900px)").matches) { // إذا الشاشة موبايل
      setMobileSidebarOpen((s) => !s); // افتح/اقفل درج الموبايل
    } else { // إذا ديسكتوب
      setSidebarCollapsed((s) => !s); // صغّر/كبّر السايدبار
    }
  };

  // فيديوهات مقترحة تحت المشغل: نستثني الفيديو الحالي ونأخذ أول 12
  const recommended = useMemo(() => { // حساب مشتق حتى ما يعاد كل رندر بدون سبب
    if (!videos?.length) return []; // لو ما في فيديوهات نرجع مصفوفة فارغة
    if (!selected?.id) return videos.slice(0, 12); // لو ما في فيديو مختار: أول 12 فيديو
    return videos.filter((v) => v.id !== selected.id).slice(0, 12); // استثناء المختار + تحديد العدد
  }, [videos, selected]); // إعادة الحساب عند تغيّر videos أو selected

  return ( // واجهة التطبيق
    <div className="shell"> {/* الغلاف العام */}
      <Navbar onToggleSidebar={toggleSidebar} /> {/* تمرير دالة فتح/إغلاق السايدبار */}

      {/* طبقة تعتيم للموبايل عند فتح الدرج */}
      <div
        className={`backdrop ${mobileSidebarOpen ? "backdrop--show" : ""}`} // إظهار/إخفاء حسب الحالة
        onClick={() => setMobileSidebarOpen(false)} // إغلاق الدرج عند الضغط على الخلفية
      />

      <div className="body"> {/* جسم الصفحة */}
        {/* سايدبار الديسكتوب */}
        <div className="sidebarDesktop">
          <Sidebar
            collapsed={sidebarCollapsed} // حالة التصغير
            activeKey={activeSide} // العنصر النشط
            onSelect={(key) => setActiveSide(key)} // تغيير العنصر النشط
          />
        </div>

        {/* درج السايدبار في الموبايل */}
        <div className={`sidebarMobileDrawer ${mobileSidebarOpen ? "isOpen" : ""}`}>
          <Sidebar
            collapsed={false} // في الموبايل ما نحتاج تصغير
            activeKey={activeSide} // العنصر النشط
            onSelect={(key) => { // عند اختيار عنصر
              setActiveSide(key); // تحديث النشط
              setMobileSidebarOpen(false); // إغلاق الدرج
            }}
          />
        </div>

        <div className="content"> {/* منطقة المحتوى */}
          <div className="layout"> {/* توزيع: main + playlist */}
            <main className="main"> {/* المنطقة الرئيسية */}
              <PlayerPanel
                loading={loading} // حالة التحميل للمشغل
                err={err} // الخطأ إن وجد
                selected={selected} // الفيديو المختار
                lang={lang} // اللغة المختارة
                setLang={setLang} // تغيير اللغة
              />

              {/* شبكة فيديوهات تحت المشغل */}
              <section className="belowGrid">
                <div className="belowGrid__head">
                  <h3 className="belowGrid__title">فيديوهات أخرى</h3>
                </div>

                <div className="videoGrid">
                  {recommended.map((v) => { // لفيديوهات المقترحة
                    // عنوان آمن: إذا title فاضي/NULL نستخدم بدائل (وتصير واضحة للمستخدم)
                    const safeTitle =
                      (typeof v.description === "string" && v.description.trim()) || // لو title نص وفيه محتوى
                      (typeof v.name === "string" && v.name.trim()) || // بديل شائع: name (لو كان اسم العمود مختلف)
                      "بدون عنوان"; // fallback نهائي

                    return (
                      <button
                        key={v.id} // مفتاح فريد للفيديو (مهم للـ React)
                        type="button" // يمنع submit لو داخل form
                        className="videoCard" // كلاس الكارد
                        onClick={() => setSelected(v)} // اختيار الفيديو عند الضغط
                        title={safeTitle} // Tooltip على hover
                        data-title={safeTitle} // مفيد للفحص في DevTools (هل العنوان فعلاً موجود؟)
                      >
                        <div className="videoCard__thumb">
                          {v.thumb_url ? ( // إذا عندنا صورة مصغّرة
                            <img
                              src={v.thumb_url} // رابط الصورة
                              alt={safeTitle} // alt واضح
                              loading="lazy" // تحميل كسول لتحسين الأداء
                            />
                          ) : ( // إذا ما عندنا thumb: نعرض فيديو مصغّر
                            <video
                              src={v.video_url} // رابط الفيديو
                              muted // بدون صوت
                              playsInline // مهم للموبايل
                              preload="metadata" // نحمّل معلومات فقط
                            />
                          )}
                        </div>

                        <div className="videoCard__body">
                          {/* هنا يظهر العنوان */}
                          <div className="videoCard__title">{safeTitle}</div>
                          <div className="videoCard__meta">{v.channel || ""}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            </main>

            {/* القائمة الجانبية */}
            <PlaylistPanel
              videos={videos} // كل الفيديوهات
              selected={selected} // المختار
              onSelect={setSelected} // تغيير المختار
            />
          </div>
        </div>
      </div>
    </div>
  );
}
