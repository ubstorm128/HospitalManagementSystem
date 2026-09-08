const PageTitle = ({ title, subtitle, children }) => {
  return (
    <div className="page-title">
      <h1>
        {title} {children && <span className="page-title-badge">{children}</span>}
      </h1>
      {subtitle && <p className="page-subtitle">{subtitle}</p>}
    </div>
  );
};

export default PageTitle;