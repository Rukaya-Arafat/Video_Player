
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
            key={l.code} 
            type="button" 
            onClick={() => onChange(l.code)} 
            className={`btn ${isActive ? "btn--active" : ""}`} 
            aria-pressed={isActive} 
            disabled={isActive} 
            title={isActive ? "هذه هي اللغة الحالية" : `اختر ${l.label}`} 
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
