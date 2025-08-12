import { useParams, Link } from 'react-router-dom';
import { useCourses } from '../context/CourseContext';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { Award, Download, Share, Calendar, User, FileText } from 'lucide-react';

export default function CertificatePage() {
  const { certificateId } = useParams();
  const { certificates } = useCourses();
  const { user } = useAuth();
  
  const certificate = certificates.find(cert => cert.id === certificateId);

  if (!certificate) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Certificate not found</h1>
            <Link to="/dashboard" className="text-blue-500 hover:text-blue-600 mt-4 inline-block">
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    const element = document.createElement('a');
    const file = new Blob([`Certificate: ${certificate.courseName}\nAwarded to: ${user?.name}\nDate: ${certificate.completedAt.toLocaleDateString()}`], {type: 'text/plain'});
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
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Certificate link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Award className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Congratulations!</h1>
          <p className="text-lg text-gray-600">You have successfully completed the training course</p>
        </div>

        {/* Certificate */}
        <div className="bg-white border-8 border-blue-500 rounded-lg p-12 mb-8 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"></div>
          <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"></div>
          
          <div className="text-center relative z-10">
            <div className="mb-8">
              <Award className="h-16 w-16 text-blue-500 mx-auto mb-4" />
              <h2 className="text-4xl font-bold text-gray-900 mb-2">CERTIFICATE OF COMPLETION</h2>
              <p className="text-lg text-gray-600">Safety Training Certification</p>
            </div>
            
            <div className="mb-8">
              <p className="text-lg text-gray-700 mb-2">This is to certify that</p>
              <h3 className="text-3xl font-bold text-blue-600 mb-2">{user?.name}</h3>
              <p className="text-lg text-gray-700">has successfully completed the course</p>
            </div>
            
            <div className="mb-8">
              <h4 className="text-2xl font-bold text-gray-900 mb-4">"{certificate.courseName}"</h4>
              <p className="text-gray-600 mb-4">
                This certification demonstrates proficiency in safety protocols, 
                equipment operation, and industry best practices.
              </p>
            </div>
            
            <div className="flex justify-center items-center space-x-12 mb-8 text-sm text-gray-600">
              <div className="text-center">
                <Calendar className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                <p className="font-medium">Date Completed</p>
                <p>{certificate.completedAt.toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
              
              {certificate.score && (
                <div className="text-center">
                  <Award className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                  <p className="font-medium">Final Score</p>
                  <p>{certificate.score}%</p>
                </div>
              )}
              
              <div className="text-center">
                <FileText className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                <p className="font-medium">Certificate ID</p>
                <p className="font-mono">{certificate.id}</p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <div className="flex justify-center items-center space-x-8 text-sm text-gray-600">
                <div className="text-center">
                  <div className="h-16 w-32 border-b-2 border-gray-300 mb-2 flex items-end justify-center">
                    <span className="text-xs">Authorized Signature</span>
                  </div>
                  <p className="font-medium">Virtual Water</p>
                  <p>Certification Authority</p>
                </div>
                
                <div className="text-center">
                  <User className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                  <p className="font-medium">{user?.name}</p>
                  <p>Contractor ID: {user?.contractorId}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
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

        {/* Certificate Details */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Certificate Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Recipient</p>
              <p className="font-medium">{user?.name}</p>
            </div>
            <div>
              <p className="text-gray-600">Course</p>
              <p className="font-medium">{certificate.courseName}</p>
            </div>
            <div>
              <p className="text-gray-600">Completed</p>
              <p className="font-medium">{certificate.completedAt.toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-gray-600">Certificate ID</p>
              <p className="font-medium font-mono">{certificate.id}</p>
            </div>
            {certificate.score && (
              <div>
                <p className="text-gray-600">Score</p>
                <p className="font-medium">{certificate.score}%</p>
              </div>
            )}
            <div>
              <p className="text-gray-600">Company</p>
              <p className="font-medium">{user?.company}</p>
            </div>
            <div>
              <p className="text-gray-600">Contractor ID</p>
              <p className="font-medium">{user?.contractorId}</p>
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