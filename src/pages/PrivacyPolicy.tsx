import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Shield, Eye, Lock, Database, Users, Mail } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Privacy Policy
            </h1>
            <p className="text-gray-600">Effective: August 2025</p>
          </div>

          {/* Content */}
          <div className="prose max-w-none">
            {/* Intro */}
            <section className="mb-6">
              <p className="text-gray-700">
                We value your privacy very highly. Please read this Privacy
                Policy carefully before using the Training Platform (the
                “Platform”) operated under Virtual Water Services Limited
                (Company No. SC660750)
              </p>
                <p className="text-gray-700 mt-4">
                  This Privacy Policy explains how we collect, use, and protect
                  your information when you use the Platform and related
                  services.
                  </p>
              <p className="text-gray-700 mt-4">
                By accessing or using the Platform, you agree to this Privacy
                Policy. If you disagree with any part, please discontinue use of
                the Platform.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Eye className="h-6 w-6 mr-2 text-blue-600" />
                Information We Collect
              </h2>
              <p className=" mb-2 text-gray-700">
                We collect the following categories of information when you
                register, access, or use the Platform:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  Identifying information: name, email address,
                  employer/organisation, postal address (if required for
                  certification or invoicing)
                </li>
                <li>
                  Account information: login credentials (username, password),
                  role (trainee, trainer, administrator)
                </li>
                <li>
                  Training data: course enrolments, progress, assessment
                  results, certifications issued
                </li>
                <li>
                  Technical information: device identifiers, IP address, browser
                  type, operating system
                </li>
                <li>
                  Usage data: interactions with the Platform, learning history,
                  support requests
                </li>
                <li>
                  Marketing data: communication preferences, interactions with
                  emails or advertising
                </li>
              </ul>
            </section>

            {/* How We Use Info */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Database className="h-6 w-6 mr-2 text-green-600" />
                How We Use Your Information
              </h2>
              <p className=" mb-2 text-gray-700">
                We use your personal information to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Provide, operate, and maintain the training platform</li>
                <li>Manage enrolments, progress, and certification records</li>
                <li>
                  Communicate with you about training, updates, and support
                </li>
                <li>Improve the Platform through analytics and feedback</li>
                <li>Comply with legal and regulatory obligations</li>
                <li>
                  Send relevant marketing communications (only with consent or
                  where permitted by law)
                </li>
              </ul>
              <p className="text-gray-700 mt-4">
                Legal bases: Performance of contract, Legitimate interests,
                Consent, Legal obligations.
              </p>
            </section>

            {/* Sharing */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="h-6 w-6 mr-2 text-purple-600" />
                Sharing Your Information
              </h2>
              <p className=" mb-2 text-gray-700">
                We may share your personal data with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  Service providers (hosting, LMS, analytics, communication)
                </li>
                <li>
                  Your employer/organisation (if training is via corporate
                  agreement)
                </li>
                <li>
                  Digital marketing providers (in compliance with data
                  protection law)
                </li>
                <li>Regulatory or accreditation bodies where required</li>
              </ul>
              <p className="text-gray-700 mt-2">
                We do not sell your personal information.
              </p>
            </section>

            {/* Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Cookies and Analytics
              </h2>
              <p className="text-gray-700 mb-2">
                The Platform uses cookies and Google Analytics to improve
                functionality and monitor usage. See our Cookie Policy for
                details. You can opt out of Google Analytics.
              </p>
            </section>

            {/* Retention */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Retention of Information
              </h2>
              <p className="text-gray-700 mb-2">
                We retain personal data only as long as necessary to provide
                services and comply with law. Training records and certificates
                are typically stored for at least 3 years, or longer if
                required.
              </p>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Your Rights
              </h2>
              <p className=" mb-2 text-gray-700">
                You have the following rights under data protection law:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>To access the personal data we hold about you.</li>
                <li>To request correction of inaccurate or incomplete data.</li>
                <li>
                  To request deletion of your personal data (subject to legal or
                  contractual requirements).
                </li>
                <li>To restrict or object to our processing of your data.</li>
                <li>To request data portability.</li>
                <li>
                  To withdraw consent (where consent was previously given).
                </li>
                <li>To stop receiving marketing communications.</li>
                <li>
                  To lodge a complaint with the ICO or another supervisory
                  authority.
                </li>
              </ul>
            </section>

            {/* Exercising Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Exercising Your Rights
              </h2>
              <p className="text-gray-700 mb-2">
                You can exercise your rights by contacting our Data Processing
                Office:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>
                  <strong>Email:</strong> DPO@virtualservicesgroup.co.uk
                </p>
                <p>
                  <strong>Phone:</strong> 03300 243222
                </p>
                <p>
                  <strong>Address:</strong> Scottish Enterprise Technology Park,
                  Orion House, Bramah Avenue, East Kilbride, G75 0RD, Scotland
                </p>
              </div>
              <p className="text-gray-700 mt-4">
                We may ask for proof of identity before responding to your
                request.
              </p>
            </section>

            {/* International transfers */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                International Data Transfers
              </h2>
              <p className="text-gray-700">
                Some service providers may be outside the UK/EEA. We ensure
                safeguards such as UK GDPR-compliant Standard Contractual
                Clauses.
              </p>
            </section>

            {/* Other sections */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Children’s Privacy
              </h2>
              <p className="text-gray-700">
                This Platform is not intended for individuals under 18. If we
                discover that we hold personal information about a minor, we
                will delete it promptly.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Third-Party Websites
              </h2>
              <p className="text-gray-700">
                The Platform may link to third-party websites. We are not
                responsible for their privacy practices and encourage you to
                read their privacy policies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Updates to This Policy
              </h2>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. The latest
                version will always be available on the Platform.
              </p>
            </section>

            {/* Contact */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Mail className="h-6 w-6 mr-2 text-blue-600" />
                Questions
              </h2>
              <p className="text-gray-700">
                If you have questions about this Privacy Policy, contact us at:
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Email:</strong> info@virtualservicesgroup.co.uk
              </p>
            </section>
          </div>

          {/* Back to Home */}
          <div className="text-center pt-8 border-t">
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
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
