import React from "react";
import { Link } from "react-router-dom";

interface SupportProps {
  basePath?: string; // Optional prop to customize base URL for the links
}

const Support: React.FC<SupportProps> = ({ basePath = "/support" }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Need Help?</h3>
      <div className="space-y-3 text-sm">
        <Link
          to={`${basePath}`}
          className="block text-blue-600 hover:text-blue-700"
        >
          Contact Support
        </Link>
        <Link
          to={`${basePath}`}
          className="block text-blue-600 hover:text-blue-700"
        >
          Technical Issues
        </Link>
        <Link
          to={`${basePath}`}
          className="block text-blue-600 hover:text-blue-700"
        >
          Course Content Questions
        </Link>
      </div>
    </div>
  );
};

export default Support;
