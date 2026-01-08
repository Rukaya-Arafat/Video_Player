export default function Navbar({ onToggleSidebar }) {
  return (
    <div className="nav">
      <button className="iconBtn" type="button" onClick={onToggleSidebar}>
        ☰
      </button>

      <div className="brand">MyTube</div>

      <div className="nav__spacer" />

      <input className="search" placeholder="ابحث..." />
    </div>
  );
}
