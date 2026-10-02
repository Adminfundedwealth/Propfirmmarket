import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link, useLocation } from "wouter";
import { PageMetadata } from "@/components/PageMetadata";

export default function NotFound() {
  const [location] = useLocation();
  const currentUrl = `https://propfirmmarket.in${location || '/'}`;

  return (
    <>
      <PageMetadata
        title="Page Not Found | PropFirmMarket"
        description="The page you requested could not be found on PropFirmMarket."
        url={currentUrl}
        noIndex
      />
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6">
            <div className="flex mb-4 gap-2">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
            </div>

            <p className="mt-4 text-sm text-gray-600">
              The requested page does not exist or is no longer available.
            </p>

            <div className="mt-6">
              <Link href="/" className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700">
                Return to homepage
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
