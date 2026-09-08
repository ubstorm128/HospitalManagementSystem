const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>
        © {year} Hospital Management System — Developed by Udit
      </p>
    </footer>
  );
};

export default Footer;