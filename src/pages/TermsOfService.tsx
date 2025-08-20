import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Scale,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Mail,
} from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Scale className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Terms of Service
            </h1>
            <p className="text-gray-600">Last updated: January 15, 2025</p>
          </div>

          {/* Content */}
          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700 mb-4">
                By accessing and using the Virtual Water Services Ltd training
                platform ("Service"), you accept and agree to be bound by the
                terms and provision of this agreement.
              </p>
              <p className="text-gray-700">
                If you do not agree to abide by the above, please do not use
                this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. Service Description
              </h2>
              <p className="text-gray-700 mb-4">
                Virtual Water Services Ltd provides online safety training
                courses, certification programs, and related educational content
                for contractors and construction professionals.
              </p>
              <p className="text-gray-700">
                Our services include but are not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-4">
                <li>Online training courses and modules</li>
                <li>Progress tracking and assessment tools</li>
                <li>Digital certificates upon course completion</li>
                <li>Learning management system access</li>
                <li>Customer support services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="h-6 w-6 mr-2 text-green-600" />
                3. User Responsibilities
              </h2>
              <p className="text-gray-700 mb-4">
                As a user of our platform, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Use the platform only for legitimate training purposes</li>
                <li>
                  Complete courses honestly and without assistance during
                  assessments
                </li>
                <li>Respect intellectual property rights of all content</li>
                <li>Not share account access with unauthorized individuals</li>
                <li>
                  Report any technical issues or security concerns promptly
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <XCircle className="h-6 w-6 mr-2 text-red-600" />
                4. Prohibited Uses
              </h2>
              <p className="text-gray-700 mb-4">You may not use our service:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  For any unlawful purpose or to solicit others to perform
                  unlawful acts
                </li>
                <li>
                  To violate any international, federal, provincial, or state
                  regulations, rules, laws, or local ordinances
                </li>
                <li>
                  To infringe upon or violate our intellectual property rights
                  or the intellectual property rights of others
                </li>
                <li>
                  To harass, abuse, insult, harm, defame, slander, disparage,
                  intimidate, or discriminate
                </li>
                <li>To submit false or misleading information</li>
                <li>
                  To upload or transmit viruses or any other type of malicious
                  code
                </li>
                <li>
                  To spam, phish, pharm, pretext, spider, crawl, or scrape
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. Course Completion and Certification
              </h2>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <p className="text-blue-800 font-medium">
                  Important Certification Requirements:
                </p>
              </div>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  Certificates are issued only upon successful completion of all
                  course requirements
                </li>
                <li>
                  A minimum passing score of 80% is required for most
                  assessments
                </li>
                <li>
                  Certificates are valid for the period specified in the course
                  materials
                </li>
                <li>
                  False completion or cheating will result in certificate
                  revocation
                </li>
                <li>
                  Employers may be notified of completion status as part of
                  compliance reporting
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. Intellectual Property Rights
              </h2>
              <p className="text-gray-700 mb-4">
                The Service and its original content, features, and
                functionality are and will remain the exclusive property of
                Virtual Water Services Ltd and its licensors.
              </p>
              <p className="text-gray-700">
                The Service is protected by copyright, trademark, and other
                laws. Our trademarks and trade dress may not be used in
                connection with any product or service without our prior written
                consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                7. Payment Terms
              </h2>
              <p className="text-gray-700 mb-4">
                Course fees and payment terms are specified during enrollment.
                By enrolling in paid courses, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Pay all fees associated with your selected courses</li>
                <li>Provide accurate billing information</li>
                <li>
                  Accept responsibility for all charges incurred under your
                  account
                </li>
                <li>
                  Understand that refunds are subject to our refund policy
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="h-6 w-6 mr-2 text-yellow-600" />
                8. Disclaimers and Limitations
              </h2>
              <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                <p className="text-yellow-800 font-medium">
                  Important Legal Notice:
                </p>
              </div>
              <p className="text-gray-700 mb-4">
                The information, tools, and material contained in this service
                are provided "as is," without any warranty, express or implied.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  We do not guarantee that the service will be uninterrupted or
                  error-free
                </li>
                <li>
                  We are not responsible for technical failures or interruptions
                </li>
                <li>
                  Course content is for educational purposes and may not reflect
                  the most current regulations
                </li>
                <li>
                  Users are responsible for verifying current regulatory
                  requirements
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                9. Account Termination
              </h2>
              <p className="text-gray-700 mb-4">
                We may terminate or suspend your account and bar access to the
                Service immediately, without prior notice or liability, under
                our sole discretion, for any reason whatsoever, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Breach of Terms of Service</li>
                <li>Fraudulent activity or misrepresentation</li>
                <li>Violation of intellectual property rights</li>
                <li>Failure to pay required fees</li>
                <li>Inappropriate conduct or harassment</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                10. Privacy Policy
              </h2>
              <p className="text-gray-700">
                Your privacy is important to us. Please review our Privacy
                Policy, which also governs your use of the Service, to
                understand our practices.
              </p>
              <Link
                to="/privacy"
                className="inline-block mt-2 text-blue-600 hover:text-blue-700 underline"
              >
                View Privacy Policy →
              </Link>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                11. Changes to Terms
              </h2>
              <p className="text-gray-700 mb-4">
                We reserve the right, at our sole discretion, to modify or
                replace these Terms at any time.
              </p>
              <p className="text-gray-700">
                If a revision is material, we will provide at least 30 days
                notice prior to any new terms taking effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Mail className="h-6 w-6 mr-2 text-blue-600" />
                12. Contact Information
              </h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please
                contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> legal@virtualwaterservices.co.uk
                </p>
                <p className="text-gray-700">
                  <strong>Phone:</strong> 03300 243222
                </p>
                <p className="text-gray-700">
                  <strong>Address:</strong> Virtual Water Services Ltd, UK
                </p>
              </div>
            </section>
          </div>

          {/* Back to Home */}
          <div className="text-center pt-8 border-t">
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
