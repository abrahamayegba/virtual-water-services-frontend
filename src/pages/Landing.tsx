import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { HardHat, Shield, Award, Users } from "lucide-react";
import logo from "/logo.svg";
import Footer from "../components/Footer";
import AuthForm from "@/components/AuthForm";
import LoadingScreen from "@/components/LoadingScreen";

export default function Landing() {
  const { user, loading } = useAuth();
  if (loading) {
    <LoadingScreen />;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-1">
            <div className="flex items-center">
              <img
                src={logo}
                height={30}
                width={120}
                alt="virtual-services-logo"
              />
              <span className="text-2xl font-bold text-gray-900">
                Virtual Water Services Ltd
              </span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <Link
                to="/accreditations"
                className="hover:text-gray-900 transition-colors"
              >
                Accreditations
              </Link>
              <span>Professional Training for Teams</span>
            </div>
          </div>
        </div>
      </header>
      <div className="flex border-t border-gray-200">
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Comprehensive Safety Training for Professionals
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Industry-leading training courses designed specifically for
                contractors, site workers, and safety professionals
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <Shield className="h-12 w-12 text-orange-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Safety First
                </h3>
                <p className="text-gray-600">
                  Comprehensive safety protocols and best practices for
                  construction environments
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <Award className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Certified Training
                </h3>
                <p className="text-gray-600">
                  Industry-recognized certificates upon successful course
                  completion
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <Users className="h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Team Management
                </h3>
                <p className="text-gray-600">
                  Track progress and manage training for your entire
                  construction team
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <HardHat className="h-12 w-12 text-purple-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Equipment Training
                </h3>
                <p className="text-gray-600">
                  Specialized training for heavy machinery and equipment
                  operation
                </p>
              </div>
            </div>
          </div>
        </div>
        <AuthForm />
      </div>
      <Footer />
    </div>
  );
}
