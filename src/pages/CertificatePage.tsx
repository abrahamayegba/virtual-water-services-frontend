import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Award, Download, Share, Calendar, FileText } from "lucide-react";
import { Lesson } from "@/types/types";
import LoadingScreen from "@/components/LoadingScreen";
import { useUserCourseByCourseId } from "@/hooks/useUserCourses";
import { useAuth } from "@/context/AuthContext";

export default function CertificatePage() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");

  const { data: userCourseResponse, isLoading: userCourseLoading } =
    useUserCourseByCourseId(user?.id!, courseId!);

  const userCourse = userCourseResponse?.userCourse;

  const course = userCourse?.course;

  const lessons = course?.Lessons;

  const certificate = {
    courseName: course?.title || "the course",
    completedAt: new Date(),
    score: userCourse?.score,
    id: user?.id,
  };

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

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    const element = document.createElement("a");
    const file = new Blob(
      [
        `Certificate: ${certificate.courseName}\nAwarded to: ${
          user?.name
        }\nDate: ${certificate.completedAt.toLocaleDateString()}`,
      ],
      { type: "text/plain" }
    );
    element.href = URL.createObjectURL(file);
    element.download = `certificate-${certificate.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Safety Training Certificate - ${certificate.courseName}`,
          text: `I've completed the ${certificate.courseName} course and earned my safety certification!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Certificate link copied to clipboard!");
    }
  };

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

        <div className="bg-white shadow-2xl border border-gray-300 rounded-2xl p-12 mb-8 relative overflow-hidden max-w-4xl mx-auto">
          <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"></div>
          <div className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"></div>

          <div className="absolute inset-0 flex items-center justify-center opacity-5">
            <img src="/logo.png" alt="Virtual Water Logo" className="w-96" />
          </div>

          <div className="text-center relative z-10">
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

            <div className="mb-8">
              <h4 className="text-2xl font-semibold text-gray-900 mb-3">
                {/* {userCourse.course.title}  */}
                Virtual Water Training
              </h4>
              <span>on</span>
              <p className="text-blue-600 max-w-2xl font-bold text-2xl mx-auto mt-2">
                {/* {userCourse.course.description} */}
                {userCourse.course.title}
              </p>
            </div>

            <div className="mb-12 text-left max-w-3xl mx-auto">
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                Training Content Covered
              </h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {lessons?.map((lesson: Lesson) => (
                  <li key={lesson.id}>{lesson.title}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-center items-center space-x-16 mb-12 text-sm text-gray-600">
              <div className="text-center">
                <Calendar className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                <p className="font-medium">Date Completed</p>
                <p>{completedAt}</p>
              </div>

              {userCourse.score && (
                <div className="text-center">
                  <Award className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                  <p className="font-medium">Final Score</p>
                  <p>{userCourse.score}%</p>
                </div>
              )}

              <div className="text-center">
                <FileText className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                <p className="font-medium">Certificate ID</p>
                <p className="font-mono">{userCourse.id}</p>
              </div>
            </div>

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

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={handleDownload}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
          >
            <Download className="h-5 w-5" />
            <span>Download PDF</span>
          </button>

          <button
            onClick={handleShare}
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
              <p className="font-medium font-mono">{userCourse.id}</p>
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
              <p className="font-medium">{user?.id}</p>
            </div>
            <div>
              <p className="text-gray-600">Valid</p>
              <p className="font-medium text-green-600">Lifetime</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
