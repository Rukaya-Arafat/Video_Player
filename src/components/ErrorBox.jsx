export default function ErrorBox({ message }) {
  if (!message) return null;

  return (
    <div className="errorBox">
      <b>خطأ:</b> {message}
      <div className="errorBox__hint">
        تأكدي من Policy القراءة العامة + اسم الجدول videos + مفاتيح .env
      </div>
    </div>
  );
}
