import { Link } from "react-router-dom";
import { Award } from "lucide-react";
import QuickActions from "./QuickActions";
import { RecentCertificatesAndProgressProps } from "@/types/types";


export default function RecentCertificatesAndProgress({
  certificates,
  completedCoursesCount,
  userCoursesCount,
  userId,
}: RecentCertificatesAndProgressProps) {
  const overallCompletionPercent =
    userCoursesCount > 0 ? (completedCoursesCount / userCoursesCount) * 100 : 0;

  return (
    <div className="space-y-6">
      {certificates.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Recent Certificates
          </h3>
          <div className="space-y-3">
            {certificates.slice(-3).map((cert) => (
              <Link
                key={cert.id}
                to={`/certificate?userId=${userId}&courseId=${cert?.id}`}
                className="block p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {cert.courseName}
                    </p>
                    <p className="text-xs text-gray-600">
                      {cert.completedAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      <QuickActions certificatesCount={certificates.length} />
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Your Progress
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Overall Completion</span>
              <span>{Math.round(overallCompletionPercent)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${overallCompletionPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
