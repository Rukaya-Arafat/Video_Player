export default function LanguagePicker({ availableLangs, lang, onChange }) {
  if (!availableLangs?.length) {
    return <span className="muted">لا توجد ترجمة لهذا الفيديو</span>;
  }

  return (
    <div className="btnRow">
      {availableLangs.map((l) => (
        <button
          key={l.code}
          onClick={() => onChange(l.code)}
          className={`btn ${lang === l.code ? "btn--active" : ""}`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
