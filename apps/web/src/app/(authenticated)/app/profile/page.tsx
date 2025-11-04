import { getUser } from "@/server/user-action";
import { ProfileView } from "@/components/profile-view";
import { Card, CardContent } from "@/components/ui/card";

const ProfilePage = async () => {
  const { data } = await getUser();
  const user = data?.data;

  if (!user) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Unable to load user profile
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <ProfileView user={user} />;
};

export default ProfilePage;
