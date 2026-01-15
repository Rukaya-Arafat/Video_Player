import { useState } from "react";

export default function VideoDescription({ text }) {
  const [open, setOpen] = useState(false);

  if (text == null) return null; 
  const str = String(text);
  const canToggle = str.length > 180;

  return (
    <div className="videoDesc">
      <p className={`videoDesc__text ${open ? "open" : ""}`}>
        {str || "لا يوجد وصف"}
      </p>

      {canToggle && (
        <button
          type="button"
          className="videoDesc__toggle"
          onClick={() => setOpen((s) => !s)}
        >
          {open ? "عرض أقل" : "عرض المزيد"}
        </button>
      )}
    </div>
  );
}
