import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  Award,
  Download,
  Share,
  Calendar,
  FileText,
  BadgeCheck,
} from "lucide-react";
import { Lesson } from "@/types/types";
import LoadingScreen from "@/components/LoadingScreen";
import { useUserCourseByCourseId } from "@/hooks/useUserCourses";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

export default function CertificatePage() {
  const { user } = useAuth();
  const certificateRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");
  const [showCertificateForPrint, setShowCertificateForPrint] = useState(false);
  const promiseResolveRef = useRef<(() => void) | null>(null);

  const { data: userCourseResponse, isLoading: userCourseLoading } =
    useUserCourseByCourseId(user?.id!, courseId!);

  const userCourse = userCourseResponse?.userCourse;

  useEffect(() => {
    if (showCertificateForPrint && promiseResolveRef.current) {
      promiseResolveRef.current();
      promiseResolveRef.current = null;
    }
  }, [showCertificateForPrint]);

  const handlePrint = useReactToPrint({
    contentRef: certificateRef,
    documentTitle: `certificate-${userCourse?.id}`,
    onBeforePrint: () => {
      return new Promise<void>((resolve) => {
        promiseResolveRef.current = resolve;
        setShowCertificateForPrint(true);
      });
    },
    onAfterPrint: () => setShowCertificateForPrint(false),
  });

  const course = userCourse?.course;

  const lessons = course?.Lessons;

  if (userCourseLoading) return <LoadingScreen />;
  if (!userCourse) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Certificate not found
            </h1>
            <Link
              to="/dashboard"
              className="text-blue-500 hover:text-blue-600 mt-4 inline-block"
            >
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const completedAt = userCourse.completedAt
    ? new Date(userCourse.completedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        <div className=" w-full flex items-center justify-center">
          <div
            id="certificate-download"
            className="bg-white w-[250mm] h-[345mm] p-14 relative overflow-hidden"
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "14px",
              lineHeight: "1.4",
            }}
          >
            {/* Elegant border frame */}
            <div className="absolute inset-4 border-4 border-blue-900"></div>
            <div className="absolute inset-6 border border-blue-300"></div>

            {/* Decorative corner elements */}
            <div className="absolute top-8 left-8 w-16 h-16 border-l-4 border-t-4 border-blue-900 opacity-30"></div>
            <div className="absolute top-8 right-8 w-16 h-16 border-r-4 border-t-4 border-blue-900 opacity-30"></div>
            <div className="absolute bottom-8 left-8 w-16 h-16 border-l-4 border-b-4 border-blue-900 opacity-30"></div>
            <div className="absolute bottom-8 right-8 w-16 h-16 border-r-4 border-b-4 border-blue-900 opacity-30"></div>

            {/* Main content */}
            <div className="relative z-10 h-full flex flex-col justify-between">
              {/* Header */}
              <div className="text-center">
                <div>
                  <img
                    src="/logo.svg"
                    alt="Virtual Water"
                    className="w-48 mx-auto mb-4 opacity-90"
                  />
                </div>

                <h1 className="text-5xl font-bold text-blue-900 mb-2 tracking-wide">
                  CERTIFICATE
                </h1>
                <h2 className="text-2xl text-blue-700 font-light tracking-widest">
                  OF COMPLETION
                </h2>

                {/* Decorative line */}
                <div className="flex items-center justify-center mt-6">
                  <div className="h-px bg-blue-300 w-24"></div>
                  <div className="mx-4">
                    <BadgeCheck className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="h-px bg-blue-300 w-24"></div>
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1 flex flex-col justify-center text-center">
                <div className="mb-8">
                  <p className="text-xl text-gray-700 mb-4 font-light">
                    This is to certify that
                  </p>
                  <h3 className="text-4xl font-bold text-blue-900 mb-6 border-b-2 border-blue-200 pb-2 inline-block">
                    {user?.name}
                  </h3>
                  <p className="text-xl text-gray-700 mb-2 font-light">
                    has successfully completed the comprehensive training
                    program
                  </p>
                </div>

                <div className="mb-8 bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
                  <h4 className="text-3xl font-bold text-blue-900 mb-2">
                    {userCourse.course.title}
                  </h4>
                  <p className="text-lg text-blue-700 font-medium">
                    {userCourse.course.description}
                  </p>
                </div>

                {/* Training modules */}
                <div className="mb-8 text-left mx-auto">
                  <h4 className="text-xl font-bold text-gray-900 mb-4 text-center border-b border-gray-300 pb-2">
                    Training Modules Completed
                  </h4>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                    {lessons?.map((lesson: Lesson, index: number) => (
                      <div
                        key={lesson.id}
                        className="flex items-center text-gray-700"
                      >
                        <span className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                          {index + 1}
                        </span>
                        <span className="text-sm">{lesson.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer section */}
              <div className="mt-8">
                {/* Statistics */}
                <div className="flex justify-center items-center space-x-12 mb-8 text-sm">
                  <div className="text-center bg-gray-50 p-4 rounded-lg min-w-[120px]">
                    <Calendar className="h-5 w-5 mx-auto mb-2 text-blue-600" />
                    <p className="font-bold text-gray-900">Date Completed</p>
                    <p className="text-gray-700">{completedAt}</p>
                  </div>

                  {userCourse.score && (
                    <div className="text-center bg-gray-50 p-4 rounded-lg min-w-[120px]">
                      <Award className="h-5 w-5 mx-auto mb-2 text-blue-600" />
                      <p className="font-bold text-gray-900">Final Score</p>
                      <p className="text-blue-700 font-bold">
                        {userCourse.score}%
                      </p>
                    </div>
                  )}

                  <div className="text-center bg-gray-50 p-4 rounded-lg min-w-[120px]">
                    <FileText className="h-5 w-5 mx-auto mb-2 text-blue-600" />
                    <p className="font-bold text-gray-900">Certificate ID</p>
                    <p className="font-mono text-xs text-gray-700">
                      {userCourse.id.slice(0, 8).toUpperCase()}-
                      {userCourse.id.slice(8, 12).toUpperCase()}
                    </p>
                  </div>
                </div>

                {/* Signature section */}
                <div className="border-t-2 border-gray-200 pt-6">
                  <div className="flex justify-between items-end">
                    <div className="text-left">
                      <div className="border-b border-gray-400 w-48 mb-2"></div>
                      <p className="text-sm font-bold text-gray-900">
                        Alan Hart
                      </p>
                      <p className="text-sm text-gray-700">
                        Water Hygiene Manager
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Virtual Water Training Institute
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                        <BadgeCheck className="w-12 h-12 text-blue-600" />
                      </div>
                      <p className="text-xs text-gray-500">Official Seal</p>
                    </div>

                    <div className="text-right">
                      <div className="border-b border-gray-400 w-48 mb-2"></div>
                      <p className="text-sm font-bold text-gray-900">
                        Date Issued
                      </p>
                      <p className="text-sm text-gray-700">{completedAt}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Certification Authority
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer note */}
                <div className="text-center mt-6 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    This certificate verifies the successful completion of the
                    specified training program and demonstrates competency in
                    the subject matter as of the date issued.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 mt-4">
          <button
            onClick={handlePrint}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
          >
            <Download className="h-5 w-5" />
            <span>Download PDF</span>
          </button>

          <button
            disabled
            className="bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
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
              <p className="font-medium">{userCourse.course.title}</p>
            </div>
            <div>
              <p className="text-gray-600">Completed</p>
              <p className="font-medium">{completedAt}</p>
            </div>
            <div>
              <p className="text-gray-600">Certificate ID</p>
              <p className="font-medium font-mono">
                {userCourse.id.slice(0, 8).toUpperCase()}-
                {userCourse.id.slice(8, 12).toUpperCase()}
              </p>
            </div>
            {userCourse.score && (
              <div>
                <p className="text-gray-600">Score</p>
                <p className="font-medium">{userCourse.score}%</p>
              </div>
            )}
            <div>
              <p className="text-gray-600">Company</p>
              <p className="font-medium">Virtual Water Services Ltd</p>
            </div>
            <div>
              <p className="text-gray-600">User ID</p>
              <p className="font-medium">
                {" "}
                {user?.id.slice(0, 8).toUpperCase()}-
                {user?.id.slice(8, 12).toUpperCase()}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Valid</p>
              <p className="font-medium text-green-600">Lifetime</p>
            </div>
          </div>
        </div>

        <div
          ref={certificateRef}
          className="bg-white w-[250mm] h-[345mm] p-14 relative mt-5 overflow-hidden"
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "14px",
            lineHeight: "1.4",
            display: showCertificateForPrint ? "block" : "none",
          }}
        >
          {/* Elegant border frame */}
          <div className="absolute inset-4 border-4 border-blue-900"></div>
          <div className="absolute inset-6 border border-blue-300"></div>

          {/* Decorative corner elements */}
          <div className="absolute top-8 left-8 w-16 h-16 border-l-4 border-t-4 border-blue-900 opacity-30"></div>
          <div className="absolute top-8 right-8 w-16 h-16 border-r-4 border-t-4 border-blue-900 opacity-30"></div>
          <div className="absolute bottom-8 left-8 w-16 h-16 border-l-4 border-b-4 border-blue-900 opacity-30"></div>
          <div className="absolute bottom-8 right-8 w-16 h-16 border-r-4 border-b-4 border-blue-900 opacity-30"></div>

          {/* Main content */}
          <div className="relative z-10 h-full flex flex-col justify-between">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="mb-6">
                <img
                  src="/logo.svg"
                  alt="Virtual Water"
                  className="w-48 mx-auto mb-4 opacity-90"
                />
              </div>

              <h1 className="text-5xl font-bold text-blue-900 mb-2 tracking-wide">
                CERTIFICATE
              </h1>
              <h2 className="text-2xl text-blue-700 font-light tracking-widest">
                OF COMPLETION
              </h2>

              {/* Decorative line */}
              <div className="flex items-center justify-center mt-6 mb-8">
                <div className="h-px bg-blue-300 w-24"></div>
                <div className="mx-4">
                  <BadgeCheck className="w-6 h-6 text-blue-600" />
                </div>
                <div className="h-px bg-blue-300 w-24"></div>
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col justify-center text-center">
              <div className="mb-8">
                <p className="text-xl text-gray-700 mb-4 font-light">
                  This is to certify that
                </p>
                <h3 className="text-4xl font-bold text-blue-900 mb-6 border-b-2 border-blue-200 pb-2 inline-block">
                  {user?.name}
                </h3>
                <p className="text-xl text-gray-700 mb-2 font-light">
                  has successfully completed the comprehensive training program
                </p>
              </div>

              <div className="mb-8 bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
                <h4 className="text-3xl font-bold text-blue-900 mb-2">
                  {userCourse.course.title}
                </h4>
                <p className="text-lg text-blue-700 font-medium">
                  {userCourse.course.description}
                </p>
              </div>

              {/* Training modules */}
              <div className="mb-8 text-left max-w-4xl mx-auto">
                <h4 className="text-xl font-bold text-gray-900 mb-4 text-center border-b border-gray-300 pb-2">
                  Training Modules Completed
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {lessons?.map((lesson: Lesson, index: number) => (
                    <div
                      key={lesson.id}
                      className="flex items-center text-gray-700"
                    >
                      <span className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        {index + 1}
                      </span>
                      <span className="text-sm">{lesson.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer section */}
            <div className="mt-8">
              {/* Statistics */}
              <div className="flex justify-center items-center space-x-12 mb-8 text-sm">
                <div className="text-center bg-gray-50 p-4 rounded-lg min-w-[120px]">
                  <Calendar className="h-5 w-5 mx-auto mb-2 text-blue-600" />
                  <p className="font-bold text-gray-900">Date Completed</p>
                  <p className="text-gray-700">{completedAt}</p>
                </div>

                {userCourse.score && (
                  <div className="text-center bg-gray-50 p-4 rounded-lg min-w-[120px]">
                    <Award className="h-5 w-5 mx-auto mb-2 text-blue-600" />
                    <p className="font-bold text-gray-900">Final Score</p>
                    <p className="text-blue-700 font-bold">
                      {userCourse.score}%
                    </p>
                  </div>
                )}

                <div className="text-center bg-gray-50 p-4 rounded-lg min-w-[120px]">
                  <FileText className="h-5 w-5 mx-auto mb-2 text-blue-600" />
                  <p className="font-bold text-gray-900">Certificate ID</p>
                  <p className="font-mono text-xs text-gray-700">
                    {userCourse.id.slice(0, 8).toUpperCase()}-
                    {userCourse.id.slice(8, 12).toUpperCase()}
                  </p>
                </div>
              </div>

              {/* Signature section */}
              <div className="border-t-2 border-gray-200 pt-6">
                <div className="flex justify-between items-end">
                  <div className="text-left">
                    <div className="border-b border-gray-400 w-48 mb-2"></div>
                    <p className="text-sm font-bold text-gray-900">Alan Hart</p>
                    <p className="text-sm text-gray-700">
                      Water Hygiene Manager
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Virtual Water Training Institute
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                      <BadgeCheck className="w-12 h-12 text-blue-600" />
                    </div>
                    <p className="text-xs text-gray-500">Official Seal</p>
                  </div>

                  <div className="text-right">
                    <div className="border-b border-gray-400 w-48 mb-2"></div>
                    <p className="text-sm font-bold text-gray-900">
                      Date Issued
                    </p>
                    <p className="text-sm text-gray-700">{completedAt}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Certification Authority
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer note */}
              <div className="text-center mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  This certificate verifies the successful completion of the
                  specified training program and demonstrates competency in the
                  subject matter as of the date issued.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
