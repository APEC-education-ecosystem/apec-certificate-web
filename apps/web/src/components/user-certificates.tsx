import { getCertificatesByUser } from "@/server/certificate";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Award } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import CertificateCard from "@/components/course/detail/certificate-card";

type UserCertificatesProps = {
  walletAddress: string;
};

export async function UserCertificates({
  walletAddress,
}: UserCertificatesProps) {
  const certificates = await getCertificatesByUser(walletAddress);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5" />
          Certificates
        </CardTitle>
        <CardDescription>
          Course completion certificates ({certificates.length})
        </CardDescription>
      </CardHeader>
      <CardContent>
        {certificates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {certificates.map((cert) => (
              <CertificateCard key={cert.id} certificate={cert} />
            ))}
          </div>
        ) : (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Award />
              </EmptyMedia>
              <EmptyTitle>No certificates yet</EmptyTitle>
              <EmptyDescription>
                Complete courses to earn certificates that will be displayed
                here.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </CardContent>
    </Card>
  );
}
