import PageTitle from "../components/ui/PageTitle";
import Welcome from "../components/ui/Welcome";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const Home = () => {
  return (
    <div className="page home-page">
      <PageTitle
        title="Home Page"
        subtitle="Welcome to the Hospital Management System"
      />

      <Welcome userName="Udit" projectName="Hospital Management System" />

      <Card
        title="Get Started"
        description="Book an appointment or check your dashboard."
      >
        <Button onClick={() => alert("Welcome!")}>Continue</Button>
      </Card>
    </div>
  );
};

export default Home;