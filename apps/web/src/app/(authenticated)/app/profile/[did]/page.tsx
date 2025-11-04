import { getUserByDid } from "@/server/user-action";
import { ProfileView } from "@/components/profile-view";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  params: Promise<{ did: string }>;
};

const PrivyProfilePage: React.FC<Props> = async ({ params }) => {
  const { did } = await params;
  const { data } = await getUserByDid({ did });
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

export default PrivyProfilePage;
