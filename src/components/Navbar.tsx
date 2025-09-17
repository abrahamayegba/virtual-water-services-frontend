import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User, Settings, LogOut, BookOpen } from "lucide-react";
import logo from "/logo.svg";
export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const adminRoles = new Set([
    "cmf15el060001chpoyrpk5st2",
    "cmeuae0qi0000chm032g9wp9f",
  ]);

  if (!user || location.pathname === "/") return null;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center">
              <img
                src={logo}
                height={30}
                width={100}
                alt="virtual-services-logo"
              />
              <span className="text-xl font-bold text-gray-900">
                Virtual Water Services Ltd
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            <Link
              to="/dashboard"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${
                  location.pathname === "/dashboard"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-blue-600"
                }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/profile"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${
                  location.pathname === "/profile"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-blue-600"
                }`}
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Link>
            {adminRoles.has(user.roleId) && (
              <Link
                to="/admin"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${
                    location.pathname === "/admin"
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
              >
                <Settings className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            )}
            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
              <div className="text-sm">
                <p className="font-medium text-gray-900">{user.name}</p>
              </div>
              <button
                onClick={logout}
                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                title="Sign out"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
