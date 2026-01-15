export default function ErrorBox({ message }) {
  if (!message) return null;

  return (
    <div className="errorBox">
      <b>خطأ:</b> {message}
      <div className="errorBox__hint">
        حاول تحديث الصفحة أو العودة لاحقًا.
      </div>
    </div>
  );
}
