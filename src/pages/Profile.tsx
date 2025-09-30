import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import {
  User,
  Mail,
  Award,
  BookOpen,
  Clock,
  Landmark,
  UserCog,
  Save,
  Edit,
  X,
} from "lucide-react";
import { useCompanies, useRoles } from "@/hooks/useGetCompanies&Roles";
import { Certificate, Company, Lesson, Role, UserCourse } from "@/types/types";
import LoadingScreen from "@/components/LoadingScreen";
import { useUserCourseLessons, useUserCourses } from "@/hooks/useUserCourses";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AccountStatus from "@/components/AccountStatus";
import ProfileQuickActions from "@/components/ProfileQuickActions";
import { updateUser } from "@/api/users";
import { toast } from "sonner";

export default function Profile() {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [loading, setLoading] = useState(false);
  const companiesQuery = useCompanies();
  const rolesQuery = useRoles();

  const isLoading = companiesQuery.isLoading || rolesQuery.isLoading;

  const companiesData = companiesQuery.data;
  const rolesData = rolesQuery.data;

  const userCompany = companiesData?.companies.find(
    (c: Company) => c.id === user?.companyId
  );
  const userRole = rolesData?.roles.find((r: Role) => r.id === user?.roleId);

  const companyName = userCompany?.companyName ?? "";
  const roleName = userRole?.roleName ?? "";

  const userCoursesQuery = useUserCourses(user?.id!);
  const userCourses = userCoursesQuery.data?.userCourses ?? [];

  const lessonsResponses = useUserCourseLessons(userCourses);
  const userProgressByCourse = useMemo(() => {
    const progress: Record<string, Lesson[]> = {};
    lessonsResponses.forEach((res, i) => {
      const courseId = userCourses[i]?.id;
      if (courseId) progress[courseId] = res.data?.lessons ?? [];
    });
    return progress;
  }, [lessonsResponses, userCourses]);

  const lessonsData: Record<string, Lesson[]> = {};
  userCourses.forEach((uc) => {
    lessonsData[uc.id] = userProgressByCourse[uc.id] ?? [];
  });

  const inProgressCourses = userCourses.filter((uc) => {
    if (uc.completed) return false;
    const lessons = userProgressByCourse[uc.id] ?? [];
    const hasStarted = lessons.some(
      (lesson) => lesson.progress?.completed === true
    );
    return hasStarted;
  });

  const completedCourses = userCourses.filter((uc) => uc.completed);

  const certificates: Certificate[] = completedCourses.map((course) => ({
    id: course.courseId,
    courseName: course.course.title,
    completedAt: new Date(),
    score: course.score,
  }));

  const totalStudyTime = userCourses
    .filter((course) => course.completed)
    .reduce((acc, course) => acc + course.course.duration, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const updated = await updateUser(user?.id!, {
        name: formData.name,
        email: formData.email,
      });
      setUser(updated.user);
      setIsEditing(false);
      toast("Profile updated successfully!", {
        description: "Your profile information has been saved.",
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  Profile Information
                </h1>

                {isEditing ? (
                  <div className="space-x-2">
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                      {loading ? (
                        "Saving..."
                      ) : (
                        <Save className="h-4 w-4 inline mr-1" />
                      )}
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                    >
                      <X className="h-4 w-4 inline mr-1" />
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                  >
                    <Edit className="h-4 w-4 inline mr-1" />
                    Edit
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="h-4 w-4 inline mr-2" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                      {user?.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="h-4 w-4 inline mr-2" />
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                      {user?.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Landmark className="h-4 w-4 inline mr-2" />
                    Company
                  </label>
                  <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                    {companyName}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <UserCog className="h-4 w-4 inline mr-2" />
                    Role
                  </label>
                  <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                    {roleName}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Learning Progress
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Completed Courses
                  </h3>
                  {completedCourses.length > 0 ? (
                    <div className="space-y-3">
                      {completedCourses.map((course: UserCourse) => (
                        <Link
                          to={`/certificate?userId=${user?.id}&courseId=${course.courseId}`}
                          key={course.id}
                          className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                              <Award className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {course.course.title}
                              </p>
                              <p className="text-sm text-gray-600">
                                {course.course.category?.categoryName}
                              </p>
                            </div>
                          </div>
                          <div className="text-sm text-green-700">
                            <p>Completed</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">
                      No courses completed yet. Start your first course today!
                    </p>
                  )}
                </div>

                {/* In Progress Courses */}
                {inProgressCourses.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Courses in Progress
                    </h3>
                    <div className="space-y-3">
                      {inProgressCourses.map((course) => {
                        const lessons = userProgressByCourse[course.id] ?? [];
                        const completedLessons = lessons.filter(
                          (l) => l.progress.completed
                        ).length;
                        const progressPercent = lessons.length
                          ? (completedLessons / lessons.length) * 100
                          : 0;

                        return (
                          <div
                            key={course.id}
                            className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                <BookOpen className="h-4 w-4 text-white" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {course.course.title}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {course.course.category?.categoryName ??
                                    "General"}
                                </p>
                              </div>
                            </div>
                            <div className="text-sm text-blue-700">
                              <p>{Math.round(progressPercent)}% complete</p>
                              <div className="w-24 bg-blue-200 rounded-full h-2 mt-1">
                                <div
                                  className="bg-blue-500 h-2 rounded-full"
                                  style={{ width: `${progressPercent}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {certificates.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  My Certificates
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {certificates.map((cert) => (
                    <Link
                      key={cert.id}
                      to={`/certificate?userId=${user?.id}&courseId=${cert?.id}`}
                      className="border-2 border-green-200 rounded-lg p-4 bg-green-50"
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <Award className="h-6 w-6 text-green-600" />
                        <h3 className="font-medium text-gray-900">
                          {cert.courseName}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Completed: {cert.completedAt.toLocaleDateString()}
                      </p>
                      {cert && (
                        <p className="text-sm text-gray-600 mb-2">
                          Score: {cert.score}%
                        </p>
                      )}
                      <p className="text-xs text-gray-500">
                        Certificate ID: {cert.id}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Your Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                    <span className="text-gray-600">Courses Enrolled</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {userCourses.length}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-green-500" />
                    <span className="text-gray-600">Certificates Earned</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {certificates.length}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <span className="text-gray-600">Study Time</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {Math.round(totalStudyTime)} min
                  </span>
                </div>
              </div>
            </div>
            <AccountStatus />
            <ProfileQuickActions />
          </div>
        </div>
      </main>
    </div>
  );
}
