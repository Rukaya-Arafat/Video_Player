const mainItems = [
  { key: "home", label: "الرئيسية", icon: "🏠" },
  { key: "shorts", label: "Shorts", icon: "🎬" },
  { key: "subs", label: "الاشتراكات", icon: "📺" },
];

const youItems = [
  { key: "library", label: "المكتبة", icon: "📚" },
  { key: "history", label: "السجل", icon: "🕘" },
  { key: "watchlater", label: "المشاهدة لاحقًا", icon: "⏳" },
];

export default function Sidebar({ collapsed, activeKey, onSelect }) {
  return (
    <aside className={`sidebar ${collapsed ? "sidebar--collapsed" : ""}`}>
      <div className="sidebar__section">
        {mainItems.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`sideItem ${activeKey === item.key ? "sideItem--active" : ""}`}
            onClick={() => onSelect(item.key)}
            title={collapsed ? item.label : undefined}
          >
            <span className="sideItem__icon">{item.icon}</span>
            {!collapsed && <span className="sideItem__label">{item.label}</span>}
          </button>
        ))}
      </div>

      <div className="sidebar__divider" />

      <div className="sidebar__section">
        {!collapsed && <div className="sidebar__title">أنت</div>}
        {youItems.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`sideItem ${activeKey === item.key ? "sideItem--active" : ""}`}
            onClick={() => onSelect(item.key)}
            title={collapsed ? item.label : undefined}
          >
            <span className="sideItem__icon">{item.icon}</span>
            {!collapsed && <span className="sideItem__label">{item.label}</span>}
          </button>
        ))}
      </div>
    </aside>
  );
}
