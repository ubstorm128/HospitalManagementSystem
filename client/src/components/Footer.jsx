const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>
        © {year} CareLedger Hospital Management System. Open access institutional ledger.
      </p>
    </footer>
  );
};

export default Footer;