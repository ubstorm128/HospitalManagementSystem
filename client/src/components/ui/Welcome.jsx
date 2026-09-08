const Welcome = ({ userName, projectName }) => {
  return (
    <div className="welcome-box">
      <p>
        Welcome, <strong>{userName}</strong>! You're viewing{" "}
        <strong>{projectName}</strong>.
      </p>
    </div>
  );
};

export default Welcome;