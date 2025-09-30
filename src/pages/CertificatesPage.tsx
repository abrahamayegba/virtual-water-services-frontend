import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Award, Download, Search, Eye, FileText } from "lucide-react";
import { UserCourse } from "@/types/types";
import LoadingScreen from "@/components/LoadingScreen";
import { useUserCourses } from "@/hooks/useUserCourses";
import { CertificatePreview } from "@/components/CertificatePreview";

export default function CertificatesPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(
    null
  );

  const userCoursesQuery = useUserCourses(user?.id!);

  const userCourses = userCoursesQuery.data?.userCourses ?? [];

  if (userCoursesQuery.isLoading) return <LoadingScreen />;

  const certificates = (userCourses || [])
    .filter((userCourse: UserCourse) => userCourse.completed)
    .map((userCourse: UserCourse) => ({
      id: userCourse.course.id,
      courseName: userCourse.course.title,
      completedAt: userCourse.completedAt
        ? new Date(userCourse.completedAt)
        : new Date(),
      score: userCourse.score,
    }));

  const filteredCertificates = certificates.filter((cert: any) =>
    cert.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCert = certificates.find(
    (c: any) => c.id === selectedCertificate
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Certificates
          </h1>
          <p className="text-gray-600">
            View and manage your training certificates
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search certificates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                Total: {certificates.length}
              </span>
            </div>
          </div>
        </div>

        {certificates.length === 0 ? (
          <div className="text-center py-12">
            <Award className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No Certificates Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Complete your first course to earn a certificate!
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Certificates List */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Your Certificates ({filteredCertificates.length})
                </h2>
                {filteredCertificates.map((certificate: any) => (
                  <div
                    key={certificate.id}
                    className={`bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer ${
                      selectedCertificate === certificate.id
                        ? "ring-2 ring-blue-500"
                        : ""
                    }`}
                    onClick={() => setSelectedCertificate(certificate.id)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <Award className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {certificate.courseName}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Completed:{" "}
                            {certificate.completedAt.toLocaleDateString()}
                          </p>
                          {certificate.score && (
                            <p className="text-sm text-green-600">
                              Score: {certificate.score}%
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCertificate(certificate.id);
                          }}
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                          title="Preview"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <Link
                          to={`/certificate?userId=${user?.id}&courseId=${selectedCert?.id}`}
                          className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                          title="View Full Certificate"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FileText className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-x-4">
                      <div className="text-xs text-gray-500">
                        Certificate ID:{" "}
                        <span className=" uppercase font-medium tracking-wide">
                          {certificate.id}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="sticky top-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Certificate Preview
                </h2>
                {selectedCertificate ? (
                  <div className="space-y-4">
                    <CertificatePreview
                      userName={user?.name!}
                      certificate={
                        certificates.find((c) => c.id === selectedCertificate)!
                      }
                    />
                    <div className="flex space-x-2">
                      <Link
                        to={`/certificate?userId=${user?.id}&courseId=${selectedCert?.id}`}
                        className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-center"
                      >
                        View Full Certificate
                      </Link>
                      <Link
                        to={`/certificate?userId=${user?.id}&courseId=${selectedCert?.id}`}
                        className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-100 rounded-lg p-8 text-center">
                    <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">
                      Select a certificate to preview
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
