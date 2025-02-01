import "./style.css";
import logo from "@/public/img/logo.png"; // Import the logo image

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={logo.src} alt="Logo" />
        </div>
        <p className="footer-text">
          &copy; {new Date().getFullYear()} News Analytics. All rights reserved.
        </p>
        <div className="footer-links">
          <a href="#privacy-policy" className="footer-link">Privacy Policy</a>
          <a href="#terms-of-service" className="footer-link">Terms of Service</a>
          <a href="#contact-us" className="footer-link">Contact Us</a>
        </div>
      </div>
    </footer>
  );
}
