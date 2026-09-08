import PageTitle from "../components/ui/PageTitle";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const Profile = () => {
  return (
    <div className="page profile-page">
      <PageTitle
        title="Profile Page"
        subtitle="Manage your account details"
      />

      <Card
        title="Account Information"
        description="Your profile details will appear here."
      >
        <Button onClick={() => alert("Edit profile coming soon!")}>
          Edit Profile
        </Button>
      </Card>
    </div>
  );
};

export default Profile;