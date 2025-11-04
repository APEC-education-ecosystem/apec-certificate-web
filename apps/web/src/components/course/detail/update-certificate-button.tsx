"use client";
import { useSolana } from "@/components/solana-provider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Upload, FileText, AlertCircle, CheckCircle2 } from "lucide-react";
import { useState, useRef } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useApecProgram } from "@/hooks/use-apec-program";

type Props = {
  courseId: string | number;
  creatorWallet: string;
};

type CertificateData = {
  address: string;
  name: string;
};

const UpdateCertificateButton: React.FC<Props> = ({
  courseId,
  creatorWallet,
}) => {
  const { wallet } = useSolana();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [parsedData, setParsedData] = useState<CertificateData[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { updateCertificateProof } = useApecProgram();
  const [open, setOpen] = useState(false);

  if (wallet?.address !== creatorWallet) {
    return null;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setError(null);
    setSuccess(false);
    setParsedData([]);

    // Validate file type
    if (!selectedFile.name.endsWith(".csv")) {
      setError("Please upload a CSV file");
      return;
    }

    setFile(selectedFile);

    // Parse CSV file
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split("\n").filter((line) => line.trim());

        // Skip header and parse data
        const data: CertificateData[] = [];
        for (let i = 1; i < lines.length; i++) {
          const [address, name] = lines[i].split(",").map((s) => s.trim());
          if (address && name) {
            data.push({ address, name });
          }
        }

        if (data.length === 0) {
          setError("No valid data found in CSV file");
          return;
        }

        setParsedData(data);
      } catch (err) {
        setError("Failed to parse CSV file");
      }
    };
    reader.readAsText(selectedFile);
  };

  const handleUpload = async () => {
    if (!file || parsedData.length === 0) return;

    setIsUploading(true);
    setError(null);

    try {
      const result = await updateCertificateProof.mutateAsync({
        courseId: Number(courseId),
        certList: parsedData,
      });
      console.log("Uploading certificates:", parsedData);

      if (result?.success) {
        // Reset form on successful submission
        setSuccess(true);
        setFile(null);
        setParsedData([]);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setOpen(false);
        console.log("Course created successfully!", result.signature);
      }
    } catch (err) {
      setError("Failed to update certificates. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Update Certificates</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Update Certificates</DialogTitle>
          <DialogDescription>
            Upload a CSV file with certificate information (address, name)
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* CSV Format Info */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4" />
              CSV File Format
            </h4>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Your CSV file should have 2 columns:</p>
              <code className="block bg-background p-2 rounded mt-2">
                address,name
                <br />
                7xKXtg2CW87d97TXJSDpbD5jBk... ,John Doe
                <br />
                8yLZvh3DX98e08UYTEqcE6kCm... ,Jane Smith
              </code>
            </div>
          </div>

          {/* File Upload Area */}
          <div
            className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
            onClick={handleBrowseClick}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
            />
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm font-medium mb-1">
              {file ? file.name : "Click to browse or drag and drop"}
            </p>
            <p className="text-xs text-muted-foreground">CSV files only</p>
          </div>

          {/* Parsed Data Preview */}
          {parsedData.length > 0 && (
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <h4 className="text-sm font-medium">
                Preview ({parsedData.length} certificates)
              </h4>
              <div className="max-h-40 overflow-y-auto space-y-1">
                {parsedData.slice(0, 3).map((cert, index) => (
                  <div
                    key={index}
                    className="text-xs bg-background p-2 rounded flex justify-between"
                  >
                    <span className="font-mono text-muted-foreground">
                      {cert.address.slice(0, 12)}...
                    </span>
                    <span>{cert.name}</span>
                  </div>
                ))}
                {parsedData.length > 3 && (
                  <p className="text-xs text-muted-foreground text-center pt-1">
                    ... and {parsedData.length - 3} more
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Success Alert */}
          {success && (
            <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-600">
                Certificates updated successfully!
              </AlertDescription>
            </Alert>
          )}

          {/* Upload Button */}
          <Button
            onClick={handleUpload}
            disabled={!file || parsedData.length === 0 || isUploading}
            className="w-full"
          >
            {isUploading
              ? "Uploading..."
              : `Upload ${parsedData.length} Certificates`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCertificateButton;
