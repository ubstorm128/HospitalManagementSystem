import PageTitle from "../components/ui/PageTitle";
import Button from "../components/ui/Button";

const Login = () => {
  return (
    <div className="page login-page">
      <PageTitle
        title="Login Page"
        subtitle="Access your account"
      />

      <Button onClick={() => alert("Login form coming soon!")}>
        Login
      </Button>
    </div>
  );
};

export default Login;