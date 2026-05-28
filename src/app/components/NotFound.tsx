import { Link } from "react-router";
import { Home, Search } from "lucide-react";
import { Button } from "./ui/button";

export function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <Search className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h1 className="text-6xl mb-4 text-gray-900">404</h1>
          <h2 className="text-3xl mb-4 text-gray-700">Page Not Found</h2>
          <p className="text-xl text-gray-600 max-w-md mx-auto mb-8">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <Link to="/">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
