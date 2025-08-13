import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';
import Navbar from '../components/Navbar';
import { User, Mail, Building, CreditCard, Award, BookOpen, Clock, Save, Edit2 } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();
  const { courses, certificates } = useCourses();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    company: user?.company || '',
    contractorId: user?.contractorId || ''
  });

  console.log({formData})

  const completedCourses = courses.filter(course => course.completed);
  const inProgressCourses = courses.filter(course => course.progress > 0 && !course.completed);
  const totalStudyTime = courses.reduce((acc, course) => acc + (course.duration * course.progress / 100), 0);

  const handleSave = () => {
    // In production, this would update the user profile via API
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Profile Information</h1>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center space-x-2 px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Edit2 className="h-4 w-4" />
                  <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
                </button>
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{user?.name}</p>
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{user?.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Building className="h-4 w-4 inline mr-2" />
                    Company
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{user?.company}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <CreditCard className="h-4 w-4 inline mr-2" />
                    Contractor ID
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.contractorId}
                      onChange={(e) => setFormData(prev => ({ ...prev, contractorId: e.target.value }))}
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{user?.contractorId}</p>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="mt-6 flex space-x-4">
                  <button
                    onClick={handleSave}
                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Learning Progress */}
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Learning Progress</h2>
              
              <div className="space-y-6">
                {/* Completed Courses */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Completed Courses</h3>
                  {completedCourses.length > 0 ? (
                    <div className="space-y-3">
                      {completedCourses.map(course => (
                        <div key={course.id} className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                              <Award className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{course.title}</p>
                              <p className="text-sm text-gray-600">{course.category}</p>
                            </div>
                          </div>
                          <div className="text-sm text-green-700">
                            <p>Completed</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">No courses completed yet. Start your first course today!</p>
                  )}
                </div>

                {/* In Progress Courses */}
                {inProgressCourses.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Courses in Progress</h3>
                    <div className="space-y-3">
                      {inProgressCourses.map(course => (
                        <div key={course.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                              <BookOpen className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{course.title}</p>
                              <p className="text-sm text-gray-600">{course.category}</p>
                            </div>
                          </div>
                          <div className="text-sm text-blue-700">
                            <p>{Math.round(course.progress)}% complete</p>
                            <div className="w-24 bg-blue-200 rounded-full h-2 mt-1">
                              <div 
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Certificates */}
            {certificates.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">My Certificates</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {certificates.map(cert => (
                    <div key={cert.id} className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
                      <div className="flex items-center space-x-3 mb-2">
                        <Award className="h-6 w-6 text-green-600" />
                        <h3 className="font-medium text-gray-900">{cert.courseName}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Completed: {cert.completedAt.toLocaleDateString()}
                      </p>
                      {cert.score && (
                        <p className="text-sm text-gray-600 mb-2">Score: {cert.score}%</p>
                      )}
                      <p className="text-xs text-gray-500">Certificate ID: {cert.id}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Your Statistics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                    <span className="text-gray-600">Courses Enrolled</span>
                  </div>
                  <span className="font-semibold text-gray-900">{courses.length}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-green-500" />
                    <span className="text-gray-600">Certificates Earned</span>
                  </div>
                  <span className="font-semibold text-gray-900">{certificates.length}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <span className="text-gray-600">Study Time</span>
                  </div>
                  <span className="font-semibold text-gray-900">{Math.round(totalStudyTime)} min</span>
                </div>
              </div>
            </div>

            {/* Account Status */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Account Status</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Account Active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Email Verified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Safety Certified</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  Change Password
                </button>
                <button className="w-full text-left p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  Download Certificates
                </button>
                <button className="w-full text-left p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  Export Learning History
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}