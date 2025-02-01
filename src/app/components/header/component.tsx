import "./style.css";
import logo from "@/public/img/logo.png";

export default function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <img src={logo.src} alt="Logo" className="logo-image" />
      </div>
      <h1 className="header-title">Latest News Blog</h1>
    </header>
  );
}
