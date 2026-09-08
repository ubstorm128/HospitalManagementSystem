const PageTitle = ({ title, subtitle }) => {
  return (
    <div className="page-title">
      <h1>{title}</h1>
      {subtitle && <p className="page-subtitle">{subtitle}</p>}
    </div>
  );
};

export default PageTitle;