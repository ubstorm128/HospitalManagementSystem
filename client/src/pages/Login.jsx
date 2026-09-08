import { useState } from "react";
import PageTitle from "../components/ui/PageTitle";
import Button from "../components/ui/Button";

const Login = () => {
  const [username, setUsername] = useState("");

  return (
    <div className="page login-page">
      <PageTitle
        title="Login Page"
        subtitle="Access your account"
      />

      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input-field"
      />

      {username && <p>Hello, {username}!</p>}

      <Button onClick={() => alert(`Login form coming soon, ${username || "Guest"}!`)}>
        Login
      </Button>
    </div>
  );
};

export default Login;