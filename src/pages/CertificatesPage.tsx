import { useState } from "react";
import { Link } from "react-router-dom";
import { useCourses } from "../context/CourseContext";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Award,
  Download,
  Share,
  Calendar,
  Search,
  Eye,
  FileText,
} from "lucide-react";

export default function CertificatesPage() {
  const { certificates } = useCourses();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(
    null
  );

  const filteredCertificates = certificates.filter((cert) => {
    const matchesSearch = cert.courseName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleDownload = (certificate: any) => {
    const element = document.createElement("a");
    const file = new Blob(
      [
        `CERTIFICATE OF COMPLETION\n\n` +
          `Course: ${certificate.courseName}\n` +
          `Awarded to: ${user?.name}\n` +
          `Company: ${user?.company}\n` +
          `Contractor ID: ${user?.contractorId}\n` +
          `Date: ${certificate.completedAt.toLocaleDateString()}\n` +
          `Score: ${certificate.score || "N/A"}%\n` +
          `Certificate ID: ${certificate.id}\n\n` +
          `This certificate verifies successful completion of safety training requirements.`,
      ],
      { type: "text/plain" }
    );
    element.href = URL.createObjectURL(file);
    element.download = `certificate-${certificate.courseName
      .replace(/\s+/g, "-")
      .toLowerCase()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShare = async (certificate: any) => {
    const shareData = {
      title: `Safety Training Certificate - ${certificate.courseName}`,
      text: `I've completed the ${certificate.courseName} course and earned my safety certification!`,
      url: `${window.location.origin}/certificate/${certificate.id}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(shareData.url);
      alert("Certificate link copied to clipboard!");
    }
  };

  const CertificatePreview = ({ certificate }: { certificate: any }) => (
    <div className="bg-white border-4 border-blue-500 rounded-lg p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"></div>
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"></div>

      <div className="text-center">
        <Award className="h-12 w-12 text-blue-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          CERTIFICATE OF COMPLETION
        </h3>
        <p className="text-gray-600 mb-4">Safety Training Certification</p>

        <p className="text-gray-700 mb-2">This is to certify that</p>
        <h4 className="text-xl font-bold text-blue-600 mb-2">{user?.name}</h4>
        <p className="text-gray-700 mb-4">
          has successfully completed the course
        </p>

        <h5 className="text-lg font-bold text-gray-900 mb-4">
          "{certificate.courseName}"
        </h5>

        <div className="flex justify-center items-center space-x-8 text-sm text-gray-600 mb-4">
          <div className="text-center">
            <Calendar className="h-4 w-4 mx-auto mb-1" />
            <p className="font-medium">Date Completed</p>
            <p>{certificate.completedAt.toLocaleDateString()}</p>
          </div>

          {certificate.score && (
            <div className="text-center">
              <Award className="h-4 w-4 mx-auto mb-1" />
              <p className="font-medium">Score</p>
              <p>{certificate.score}%</p>
            </div>
          )}

          <div className="text-center">
            <FileText className="h-4 w-4 mx-auto mb-1" />
            <p className="font-medium">Certificate ID</p>
            <p className="font-mono text-xs">{certificate.id}</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <p className="text-sm text-gray-600">Virtual Water Services Ltd</p>
          <p className="text-xs text-gray-500">Certification Authority</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Certificates
          </h1>
          <p className="text-gray-600">
            View and manage your training certificates
          </p>
        </div>

        {/* Search and Filter */}
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
            {/* Certificates Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Certificates List */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Your Certificates ({filteredCertificates.length})
                </h2>
                {filteredCertificates.map((certificate) => (
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
                          to={`/certificate/${certificate.id}`}
                          className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                          title="View Full Certificate"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FileText className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        Certificate ID: {certificate.id}
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(certificate);
                          }}
                          className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors flex items-center space-x-1"
                        >
                          <Download className="h-3 w-3" />
                          <span>Download</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShare(certificate);
                          }}
                          className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors flex items-center space-x-1"
                        >
                          <Share className="h-3 w-3" />
                          <span>Share</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Certificate Preview */}
              <div className="sticky top-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Certificate Preview
                </h2>
                {selectedCertificate ? (
                  <div className="space-y-4">
                    <CertificatePreview
                      certificate={certificates.find(
                        (c) => c.id === selectedCertificate
                      )}
                    />
                    <div className="flex space-x-2">
                      <Link
                        to={`/certificate/${selectedCertificate}`}
                        className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-center"
                      >
                        View Full Certificate
                      </Link>
                      <button
                        onClick={() =>
                          handleDownload(
                            certificates.find(
                              (c) => c.id === selectedCertificate
                            )
                          )
                        }
                        className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </button>
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
