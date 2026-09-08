import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/">HMS</NavLink>
      </div>

      <button
        className="navbar-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
        <NavLink to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
        <NavLink to="/profile" onClick={() => setMenuOpen(false)}>Profile</NavLink>
        <NavLink to="/login" onClick={() => setMenuOpen(false)}>Login</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;