import { useAuth } from "@/context/AuthContext";
import { Certificate } from "@/types/types";
import { Award, Calendar, Download, FileText, Share } from "lucide-react";
import { Link } from "react-router-dom";

export default function CertificateComponent({
  id,
  courseName,
  completedAt,
  score,
}: Certificate) {
  const { user } = useAuth();
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <Award className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Congratulations!
        </h1>
        <p className="text-lg text-gray-600">
          You have successfully completed the training course
        </p>
      </div>

      {/* Certificate */}
      <div className="bg-white shadow-2xl border border-gray-300 rounded-2xl p-12 mb-8 relative overflow-hidden max-w-4xl mx-auto">
        {/* Decorative edges */}
        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"></div>
        <div className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"></div>

        {/* Watermark logo in background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <img src="/logo.png" alt="Virtual Water Logo" className="w-96" />
        </div>

        <div className="text-center relative z-10">
          {/* Logo & Title */}
          <div className="mb-8">
            <img
              src="/logo.svg"
              alt="Virtual Water"
              className="w-[250px] mx-auto mb-4"
            />
            <h2 className="text-4xl font-extrabold tracking-wide text-gray-900 mb-2">
              Certificate of Completion
            </h2>
          </div>

          {/* Recipient */}
          <div className="mb-6">
            <p className="text-lg text-gray-700 mb-2">
              This is to certify that
            </p>
            <h3 className="text-3xl font-bold text-blue-600 mb-2">
              {user?.name}
            </h3>
            <p className="text-lg text-gray-700">
              has successfully completed the
            </p>
          </div>

          {/* Course Info */}
          <div className="mb-8">
            <h4 className="text-2xl font-semibold text-gray-900 mb-3">
              {courseName}
            </h4>
            <span>on</span>
            <p className="text-blue-600 max-w-2xl font-medium mx-auto mt-2">
              {/* Add course description or subtitle here if available */}
            </p>
          </div>
          <div className="flex justify-center items-center space-x-16 mb-12 text-sm text-gray-600">
            <div className="text-center">
              <Calendar className="h-6 w-6 mx-auto mb-2 text-gray-400" />
              <p className="font-medium">Date Completed</p>
              <p>
                {completedAt.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            {score && (
              <div className="text-center">
                <Award className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                <p className="font-medium">Final Score</p>
                <p>{score}%</p>
              </div>
            )}

            <div className="text-center">
              <FileText className="h-6 w-6 mx-auto mb-2 text-gray-400" />
              <p className="font-medium">Certificate ID</p>
              <p className="font-mono">{id}</p>
            </div>
          </div>

          {/* Signature & Authority */}
          <div className="border-t border-gray-300 pt-8 flex justify-between items-center">
            <div className="text-start flex flex-col gap-y-3">
              <p className="font-medium">
                Content By: <span className="text-gray-800">Alan Hart</span>
              </p>
              <p className="font-medium">
                Title:{" "}
                <span className="text-gray-800">Water Hygiene Manager</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <button
          onClick={() => {
            /* Implement PDF download logic here */
          }}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
        >
          <Download className="h-5 w-5" />
          <span>Download PDF</span>
        </button>

        <button
          onClick={() => {
            /* Implement share logic here */
          }}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
        >
          <Share className="h-5 w-5" />
          <span>Share Certificate</span>
        </button>

        <Link
          to="/dashboard"
          className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
        >
          <span>Back to Dashboard</span>
        </Link>
      </div>

      {/* Certificate Details */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Certificate Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Recipient</p>
            <p className="font-medium">{user?.name}</p>
          </div>
          <div>
            <p className="text-gray-600">Course</p>
            <p className="font-medium">{courseName}</p>
          </div>
          <div>
            <p className="text-gray-600">Completed</p>
            <p className="font-medium">{completedAt.toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-gray-600">Certificate ID</p>
            <p className="font-medium font-mono">{id}</p>
          </div>
          {score && (
            <div>
              <p className="text-gray-600">Score</p>
              <p className="font-medium">{score}%</p>
            </div>
          )}
          <div>
            <p className="text-gray-600">Company</p>
            <p className="font-medium">Virtual Water Services Ltd</p>
          </div>
          <div>
            <p className="text-gray-600">Contractor ID</p>
            <p className="font-medium">{user?.companyId}</p>
          </div>
          <div>
            <p className="text-gray-600">Valid</p>
            <p className="font-medium text-green-600">Lifetime</p>
          </div>
        </div>
      </div>
    </main>
  );
}
