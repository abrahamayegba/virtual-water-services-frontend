import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Award, ExternalLink, Shield, CheckCircle } from "lucide-react";
import logo from "/legionella-logo.png";

export default function Accreditations() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Award className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Our Accreditations
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Virtual Water Services Ltd maintains the highest standards through
            professional accreditations and memberships with leading industry
            bodies.
          </p>
        </div>

        {/* Accreditations Grid */}
        <div className="flex flex-col mb-24">
          {/* Legionella Control Association */}
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <div className="flex items-start space-x-6">
              <div className="flex items-center">
                <Link to="/dashboard" className="flex items-center">
                  <img src={logo} width={150} alt="legionella-logo" />
                </Link>
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Legionella Control Association
                </h2>

                <p className="text-gray-700 mb-4">
                  Virtual Water Services, part of Virtual Services Group, is a
                  registered company with the Legionella Control Association
                  (LCA):
                </p>

                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-blue-900">
                      Registration Number: 2024/4082
                    </span>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">
                  We are regularly audited and assessed by the LCA for
                  compliance with their Code of Conduct for Service Providers
                  and the Service Standards for our registered legionella
                  control services:
                </p>

                <ul className="space-y-2 mb-6">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700">
                      Legionella Risk Assessment Services
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700">
                      Hot and Cold Water Monitoring and Inspection Services
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700">
                      Cleaning and Disinfection Services
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700">
                      Legionella Monitoring Services
                    </span>
                  </li>
                </ul>

                <div className="flex space-x-3">
                  <button
                    onClick={() =>
                      window.open("/legionella-certificate.pdf", "_blank")
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>View Certificate</span>
                  </button>
                  <a
                    href="https://www.legionellacontrol.org.uk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 underline flex items-center space-x-1"
                  >
                    <span>
                      Find out more about the Legionella Control Association
                    </span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Institute of Workplace and Facilities Management */}
          {/* <div className="bg-white rounded-lg shadow-sm border p-8">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-lg flex items-center justify-center">
                  <div className="text-white text-center font-bold">
                    <div className="text-lg">iwfm</div>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Institute of Workplace and Facilities Management (IWFM)
                </h2>

                <p className="text-gray-700 mb-4">
                  We are a{" "}
                  <span className="font-semibold">Corporate Member</span> of The
                  Institute of Workplace and Facilities Management (IWFM).
                </p>

                <div className="bg-teal-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center space-x-2">
                    <Building className="h-5 w-5 text-teal-600" />
                    <span className="font-semibold text-teal-900">
                      CORPORATE MEMBER
                    </span>
                  </div>
                </div>

                <p className="text-gray-700 mb-6">
                  IWFM is the professional body for workplace and facilities
                  management professionals.
                </p>

                <div className="flex space-x-3">
                  <button
                    onClick={() =>
                      handleViewCertificate("https://www.iwfm.org.uk/")
                    }
                    className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors flex items-center space-x-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>View Certificate</span>
                  </button>
                  <a
                    href="https://www.iwfm.org.uk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:text-teal-700 underline flex items-center space-x-1"
                  >
                    <span>Find out more about IWFM</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div> */}
        </div>

        {/* Why Accreditations Matter */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Our Accreditations Matter
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Quality Assurance
              </h3>
              <p className="text-gray-600">
                Our accreditations ensure we maintain the highest standards of
                service delivery and professional competence.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Compliance
              </h3>
              <p className="text-gray-600">
                Regular audits and assessments ensure we meet all regulatory
                requirements and industry best practices.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Professional Excellence
              </h3>
              <p className="text-gray-600">
                Membership with professional bodies demonstrates our commitment
                to continuous improvement and industry leadership.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Trust in Our Expertise
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Our accreditations provide you with confidence that our training
            programs meet the highest industry standards and regulatory
            requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Explore Our Courses
            </Link>
            <Link
              to="/support"
              className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
