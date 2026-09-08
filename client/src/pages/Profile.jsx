import { useState } from "react";
import PageTitle from "../components/ui/PageTitle";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const Profile = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="page profile-page">
      <PageTitle
        title="Profile Page"
        subtitle="Manage your account details"
      />

      <Card title="Account Information">
        <Button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? "Hide Details" : "Show Details"}
        </Button>

        {showDetails && (
          <p>Name: Udit | Role: Student | Project: HMS</p>
        )}
      </Card>

      <Button onClick={() => alert("Edit profile coming soon!")}>
        Edit Profile
      </Button>
    </div>
  );
};

export default Profile;