// LanguagePicker.jsx
// هذا الكومبونينت يعرض أزرار اختيار اللغة للترجمة بناءً على اللغات المتاحة للفيديو الحالي.
// - إذا لم توجد لغات متاحة: نعرض رسالة "لا توجد ترجمة"
// - عند الضغط على زر: نستدعي onChange ونمرّر كود اللغة (مثل: "ar", "en", "tr")

export default function LanguagePicker({ availableLangs, lang, onChange }) {
  // لو ما في أي ترجمات متاحة للفيديو
  if (!availableLangs?.length) {
    return <span className="muted">لا توجد ترجمة لهذا الفيديو</span>;
  }

  return (
    // صف أزرار اللغات
    <div className="btnRow" role="group" aria-label="اختيار لغة الترجمة">
      {availableLangs.map((l) => {
        const isActive = lang === l.code;

        return (
          <button
            key={l.code} // مفتاح فريد لكل لغة
            type="button" // مهم عشان ما يعمل submit لو داخل form
            onClick={() => onChange(l.code)} // تغيير اللغة عند الضغط
            className={`btn ${isActive ? "btn--active" : ""}`} // تمييز الزر النشط
            aria-pressed={isActive} // تحسين الوصولية: هل الزر "مفعل"؟
            disabled={isActive} // اختياري: يمنع الضغط على نفس اللغة المختارة
            title={isActive ? "هذه هي اللغة الحالية" : `اختر ${l.label}`} // تلميح بسيط
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
