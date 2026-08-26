import { useState } from "react";
import { Download, LockKeyhole } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "../auth/AuthProvider";
import { getProtectedDownloadUrl } from "../../lib/sourceCodeDownloads";

export function ProtectedDownloadButton({
  productId,
  productName,
  onLoginRequired,
}: {
  productId: number;
  productName: string;
  onLoginRequired: () => void;
}) {
  const { user, loading: authLoading } = useAuth();
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    setDownloading(true);
    setError(null);

    try {
      const signedUrl = await getProtectedDownloadUrl(productId, productName);
      window.open(signedUrl, "_blank", "noopener,noreferrer");
    } catch (downloadError) {
      setError(downloadError instanceof Error ? downloadError.message : "Unable to prepare the download.");
    } finally {
      setDownloading(false);
    }
  };

  if (authLoading) {
    return <div className="rounded-lg border border-white/10 bg-slate-800/50 px-4 py-3 text-center text-sm text-slate-400">Checking your access…</div>;
  }

  if (!user) {
    return (
      <div className="space-y-2.5">
        <Button type="button" disabled className="h-11 w-full cursor-not-allowed bg-slate-700 text-slate-400">
          <LockKeyhole className="h-4 w-4" />
          Download Source Code
        </Button>
        <p className="text-center text-xs leading-5 text-slate-400">
          Please log in to access and download the source code.{" "}
          <button type="button" onClick={onLoginRequired} className="font-semibold text-indigo-300 underline-offset-2 transition hover:text-indigo-200 hover:underline">
            Log in now
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      <Button type="button" onClick={handleDownload} disabled={downloading} className="h-11 w-full bg-emerald-600 text-white hover:bg-emerald-700">
        <Download className="h-4 w-4" />
        {downloading ? "Preparing download..." : "Download Source Code"}
      </Button>
      {error && <p className="text-xs leading-5 text-rose-300" role="alert">{error}</p>}
    </div>
  );
}