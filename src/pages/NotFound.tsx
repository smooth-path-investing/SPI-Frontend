import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { textContent } from "@/constants/textContent";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{textContent["notfound-title"]}</h1>
        <p className="text-xl text-gray-600 mb-4">{textContent["notfound-message"]}</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          {textContent["notfound-link"]}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
