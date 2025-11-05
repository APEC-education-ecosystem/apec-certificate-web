import { type NextRequest } from "next/server";
import { ImageResponse } from "next/og";
import { getCertificateByNftMint } from "@/server/certificate";
import { format } from "date-fns";
import type { Metadata, ResolvingMetadata } from "next";
import { cache } from "react";

export const contentType = "image/png";

export const size = {
  width: 900,
  height: 600,
};

type RouteParams = {
  params: Promise<{
    mint: string;
  }>;
};

const getData = cache(async (mint: string) => {
  return await getCertificateByNftMint(mint);
});

export async function generateMetadata(
  { params }: RouteParams,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { mint } = await params;

  const certRecord = await getData(mint);

  if (!certRecord) {
    return {
      title: "Certificate Not Found",
      description: "The requested certificate does not exist.",
    };
  }

  return {
    title: `Certificate for ${certRecord.name} - ${certRecord.course.name}`,
    description: `This certificate certifies that ${certRecord.name} has successfully completed the course "${certRecord.course.name}" offered by ${certRecord.course.provider.fullName}.`,
  };
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { mint } = await params;

  try {
    const certRecord = await getData(mint);
    if (!certRecord) {
      return new Response("Certificate not found", { status: 404 });
    }

    const courseName = certRecord.course?.name || "Unknown Course";
    const courseShortName = certRecord.course?.shortName || "";
    const providerName =
      certRecord.course?.provider?.fullName || "APEC Learning";
    const recipientName = certRecord.name;
    const createdDate = certRecord.created_at
      ? format(new Date(certRecord.created_at), "MMMM dd, yyyy")
      : "";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "40px",
          }}
        >
          {/* Certificate Container */}
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "white",
              borderRadius: "16px",
              padding: "50px 60px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              position: "relative",
            }}
          >
            {/* Decorative Border */}
            <div
              style={{
                display: "flex",
                position: "absolute",
                top: "20px",
                left: "20px",
                right: "20px",
                bottom: "20px",
                border: "2px solid #667eea",
                borderRadius: "8px",
              }}
            />

            {/* Top Section */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              {/* Provider Name */}
              <div
                style={{
                  display: "flex",
                  fontSize: 32,
                  fontWeight: "bold",
                  color: "#667eea",
                  marginBottom: "5px",
                }}
              >
                {providerName}
              </div>

              {/* Certificate Title */}
              <div
                style={{
                  display: "flex",
                  fontSize: 48,
                  fontWeight: "bold",
                  color: "#2d3748",
                  letterSpacing: "3px",
                  marginBottom: "5px",
                }}
              >
                CERTIFICATE
              </div>

              <div
                style={{
                  display: "flex",
                  fontSize: 24,
                  color: "#4a5568",
                  marginBottom: "20px",
                }}
              >
                OF COMPLETION
              </div>

              {/* Divider */}
              <div
                style={{
                  display: "flex",
                  width: "150px",
                  height: "2px",
                  backgroundColor: "#667eea",
                }}
              />
            </div>

            {/* Middle Section */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              {/* Recipient Section */}
              <div
                style={{
                  display: "flex",
                  fontSize: 18,
                  color: "#718096",
                  marginBottom: "12px",
                }}
              >
                This is to certify that
              </div>

              <div
                style={{
                  display: "flex",
                  fontSize: 38,
                  fontWeight: "bold",
                  color: "#2d3748",
                  marginBottom: "20px",
                }}
              >
                {recipientName}
              </div>

              {/* Course Section */}
              <div
                style={{
                  display: "flex",
                  fontSize: 18,
                  color: "#718096",
                  marginBottom: "10px",
                }}
              >
                has successfully completed the course
              </div>

              <div
                style={{
                  display: "flex",
                  fontSize: 28,
                  fontWeight: "600",
                  color: "#667eea",
                  textAlign: "center",
                  marginBottom: "5px",
                  maxWidth: "700px",
                }}
              >
                {courseName}
              </div>

              {courseShortName && (
                <div
                  style={{
                    display: "flex",
                    fontSize: 18,
                    color: "#a0aec0",
                  }}
                >
                  ({courseShortName})
                </div>
              )}
            </div>

            {/* Bottom Section - Date */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              {createdDate && (
                <div
                  style={{
                    display: "flex",
                    fontSize: 16,
                    color: "#718096",
                  }}
                >
                  Issued on {createdDate}
                </div>
              )}
            </div>
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (error) {
    return new Response("Failed to generate the image", { status: 500 });
  }
}
