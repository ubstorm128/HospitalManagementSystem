import { useState } from "react";
import PageTitle from "../components/ui/PageTitle";
import Welcome from "../components/ui/Welcome";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const Dashboard = () => {
  const [notificationCount, setNotificationCount] = useState(0);

  return (
    <div className="page dashboard-page">
      <PageTitle title="Dashboard Page" subtitle="Overview of your activity">
        {notificationCount > 0 && `${notificationCount} new`}
      </PageTitle>

      <Welcome userName="Udit" projectName="HMS Dashboard" />

      <div className="card-grid">
        <Card
          title="Appointments"
          description="You have no upcoming appointments."
        />

        <Card
          title="Notifications"
          description={
            notificationCount === 0
              ? "You have no new notifications."
              : `You have ${notificationCount} new notification(s).`
          }
        >
          <Button onClick={() => setNotificationCount(notificationCount + 1)}>
            Simulate New Notification
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;