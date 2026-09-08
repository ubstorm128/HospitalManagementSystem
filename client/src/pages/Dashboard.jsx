import PageTitle from "../components/ui/PageTitle";
import Card from "../components/ui/Card";

const Dashboard = () => {
  return (
    <div className="page dashboard-page">
      <PageTitle
        title="Dashboard Page"
        subtitle="Overview of your activity"
      />

      <div className="card-grid">
        <Card
          title="Appointments"
          description="You have no upcoming appointments."
        />

        <Card
          title="Notifications"
          description="You have no new notifications."
        />
      </div>
    </div>
  );
};

export default Dashboard;