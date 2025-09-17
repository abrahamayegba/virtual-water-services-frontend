import React from 'react'
import { Link } from 'react-router-dom';

type QuickActionsProps = {
  certificatesCount: number;
};

const QuickActions: React.FC<QuickActionsProps> = ({ certificatesCount }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="space-y-3">
          <Link
            to="/profile"
            className="block w-full p-3 hover:bg-gray-50 rounded-lg"
          >
            Update Profile
          </Link>
          <Link
            to="/support"
            className="block w-full p-3 hover:bg-gray-50 rounded-lg"
          >
            Get Support
          </Link>
          {certificatesCount > 0 && (
            <Link
              to="/certificates"
              className="block w-full p-3 hover:bg-gray-50 rounded-lg"
            >
              View All Certificates
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickActions
